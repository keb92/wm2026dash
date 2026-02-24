(function () {
  const APP_PASSWORD = "WM2026!Roadtrip";

  function formatDateRange(range) {
    const toDe = (iso) => {
      const [y, m, d] = iso.split("-");
      return `${d}.${m}.${y}`;
    };
    return `${toDe(range.start)} – ${toDe(range.end)}`;
  }

  function countByCategory(points, category) {
    return points.filter((point) => point.category === category).length;
  }

  function weatherIcon(code) {
    const map = { 0: "☀️", 1: "🌤️", 2: "⛅", 3: "☁️", 45: "🌫️", 51: "🌦️", 61: "🌧️", 63: "🌧️", 80: "🌦️", 95: "⛈️" };
    return map[code] || "🌡️";
  }

  function daysUntil(dateIso) {
    const target = new Date(`${dateIso}T12:00:00`);
    const now = new Date();
    return Math.ceil((target - now) / (1000 * 60 * 60 * 24));
  }

  function getStorageKey(cityKey) {
    return `wmplanner_custom_${cityKey}`;
  }

  function getCustomPoints(cityKey) {
    try {
      return JSON.parse(localStorage.getItem(getStorageKey(cityKey)) || "[]");
    } catch (error) {
      console.warn("Custom Points konnten nicht gelesen werden", error);
      return [];
    }
  }

  function saveCustomPoints(cityKey, points) {
    localStorage.setItem(getStorageKey(cityKey), JSON.stringify(points));
  }

  function buildCityCards() {
    const container = document.getElementById("cityCards");
    if (!container) return;

    container.innerHTML = Object.values(window.CITY_DATA).map((city) => {
      const c = city.points;
      return `
        <a href="${city.cityKey}.html" class="city-card" style="background-image:linear-gradient(180deg, rgba(3,9,20,.35), rgba(4,10,24,.88)),url('${city.heroImage}')">
          <div class="city-card-top">
            <h3>${city.cityName}</h3>
            <span class="meta-chip">${formatDateRange(city.dateRange)}</span>
          </div>
          <div class="city-kpis">
            <span>🏟️ ${city.stadiumName}</span>
            <span>✈️ ${countByCategory(c, "Airport")}</span>
            <span>🍻 ${countByCategory(c, "Soccer Pub")}</span>
            <span>🍽️ ${countByCategory(c, "Restaurant")}</span>
            <span>🌮 ${countByCategory(c, "Food Spot")}</span>
            <span>🎉 ${countByCategory(c, "Fan Hub")}</span>
          </div>
          <p class="tiny-meta city-microcopy">FIFA Fan Festival = zentraler Fan-Hub</p>
          <span class="btn btn-primary">Stadt öffnen</span>
        </a>`;
    }).join("");
  }

  async function fetchWeather(city) {
    const { start, end } = city.dateRange;
    const [lat, lon] = city.center;
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto&start_date=${start}&end_date=${end}`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const daily = data.daily;
      if (!daily || !daily.time || !daily.time.length) throw new Error("Keine Forecast-Daten verfügbar");

      const maxTemp = Math.round(Math.max(...daily.temperature_2m_max));
      const minTemp = Math.round(Math.min(...daily.temperature_2m_min));
      const avgRain = Math.round((daily.precipitation_probability_max || [0]).reduce((a, b) => a + (b || 0), 0) / daily.time.length);
      return { mode: "live", maxTemp, minTemp, avgRain, icon: weatherIcon(daily.weather_code[0]) };
    } catch (error) {
      console.warn(`Wetter-Fallback für ${city.cityName}:`, error);
      const seasonal = { nyc: { min: 22, max: 30 }, boston: { min: 20, max: 28 }, dallas: { min: 27, max: 36 } }[city.cityKey];
      return { mode: "fallback", maxTemp: seasonal.max, minTemp: seasonal.min, avgRain: 30, icon: "🧭" };
    }
  }

  async function renderWeatherCards() {
    const container = document.getElementById("weatherCards");
    if (!container) return;
    container.innerHTML = Object.values(window.CITY_DATA).map((city) => `<article class="weather-card glass-card"><h3>${city.cityName}</h3><p class="muted">${formatDateRange(city.dateRange)}</p><p>Lädt …</p></article>`).join("");

    const cards = await Promise.all(Object.values(window.CITY_DATA).map(fetchWeather));
    container.innerHTML = Object.values(window.CITY_DATA).map((city, index) => {
      const weather = cards[index];
      const status = weather.mode === "live" ? "Forecast aktiv" : "Noch kein exakter Forecast verfügbar – saisonale Orientierung";
      return `<article class="weather-card glass-card">
        <div class="weather-head"><h3>${city.cityName}</h3><span>${weather.icon}</span></div>
        <p class="muted">${formatDateRange(city.dateRange)}</p>
        <p class="weather-temp">${weather.minTemp}° – ${weather.maxTemp}°C</p>
        <p class="tiny-meta">Regenrisiko Ø ${weather.avgRain}%</p>
        <p class="tiny-meta">${status}</p>
      </article>`;
    }).join("");
  }

  function renderQuickStats() {
    const el = document.getElementById("quickStats");
    if (!el) return;
    const total = Object.values(window.CITY_DATA).reduce((sum, city) => sum + city.points.length + getCustomPoints(city.cityKey).length, 0);
    const countdown = daysUntil(window.CITY_DATA.nyc.dateRange.start);
    el.innerHTML = `
      <article class="glass-card quick-card"><p class="muted">Gesamtorte</p><p class="quick-number">${total}</p></article>
      <article class="glass-card quick-card"><p class="muted">Countdown NYC Start</p><p class="quick-number">${countdown} Tage</p></article>
      <article class="glass-card quick-card"><p class="muted">Hinweis</p><p class="tiny-meta">Eigene Spots werden lokal auf diesem Gerät gespeichert.</p></article>`;
  }

  function setupDashboardAuth() {
    const overlay = document.getElementById("loginOverlay");
    const dashboard = document.getElementById("dashboard");
    const form = document.getElementById("loginForm");
    const error = document.getElementById("loginError");

    const unlock = () => {
      overlay.classList.add("hidden");
      dashboard.classList.remove("hidden");
      dashboard.setAttribute("aria-hidden", "false");
      buildCityCards();
      renderWeatherCards();
      renderQuickStats();
      const cd = document.getElementById("countdown");
      if (cd) cd.textContent = `${daysUntil(window.CITY_DATA.nyc.dateRange.start)} Tage bis NYC`; 
    };

    if (sessionStorage.getItem("wmLoggedIn") === "1") unlock();

    form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const value = document.getElementById("passwordInput").value;
      if (value === APP_PASSWORD) {
        sessionStorage.setItem("wmLoggedIn", "1");
        error.textContent = "";
        unlock();
      } else {
        error.textContent = "Passwort falsch. Bitte erneut versuchen.";
      }
    });

    document.getElementById("logoutBtn")?.addEventListener("click", () => {
      sessionStorage.removeItem("wmLoggedIn");
      window.location.reload();
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.page === "dashboard") setupDashboardAuth();
  });

  window.WMApp = { formatDateRange, countByCategory, weatherIcon, getCustomPoints, saveCustomPoints, getStorageKey };
})();
