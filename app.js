const APP_PASSWORD = "WM2026!Roadtrip";
const categoryColor = { "Fan Hub": "#e11d48", Stadium: "#22c55e", Airport: "#8b5cf6", "Soccer Pub": "#f59e0b", Sight: "#64748b", Custom: "#26c6da" };

const fmtRange = (r) => `${r.start.split("-").reverse().join(".")} – ${r.end.split("-").reverse().join(".")}`;
const byCategory = (pts, cat) => pts.filter((p) => p.category === cat).length;
const weatherCodeToIcon = (code) => ({0:"☀️",1:"🌤️",2:"⛅",3:"☁️",45:"🌫️",61:"🌧️",63:"🌦️",65:"🌧️",80:"🌦️",95:"⛈️"}[code] || "🌡️");

function initDashboard() {
  const overlay = document.getElementById("loginOverlay");
  const dashboard = document.getElementById("dashboard");
  const loginError = document.getElementById("loginError");
  const unlock = () => { overlay.classList.add("hidden"); dashboard.classList.remove("hidden"); dashboard.setAttribute("aria-hidden", "false"); renderCityCards(); renderWeatherCards(); renderCountdown(); };
  if (sessionStorage.getItem("wmLoggedIn") === "1") unlock();

  document.getElementById("loginForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = document.getElementById("passwordInput").value;
    if (value === APP_PASSWORD) { sessionStorage.setItem("wmLoggedIn", "1"); loginError.textContent = ""; unlock(); }
    else loginError.textContent = "Falsches Passwort. Bitte erneut versuchen.";
  });

  document.getElementById("logoutBtn")?.addEventListener("click", () => { sessionStorage.removeItem("wmLoggedIn"); location.reload(); });
}

function renderCityCards() {
  const wrap = document.getElementById("cityCards");
  wrap.innerHTML = "";
  Object.values(CITY_DATA).forEach((city) => {
    const stadium = city.points.find((p) => p.category === "Stadium")?.name || "-";
    wrap.insertAdjacentHTML("beforeend", `<article class="card city-card"><h3>${city.cityName}</h3><p class="muted">${fmtRange(city.dateRange)}</p><p><b>Stadion:</b> ${stadium}</p><div class="meta"><span>Flughäfen: <b>${byCategory(city.points, "Airport")}</b></span><span>Soccer-Pubs: <b>${byCategory(city.points, "Soccer Pub")}</b></span><span>Sehenswürdigkeiten: <b>${byCategory(city.points, "Sight")}</b></span><span>Fan Hubs: <b>${byCategory(city.points, "Fan Hub")}</b></span></div><a class="btn btn-primary" href="${city.cityKey}.html">Öffnen</a></article>`);
  });
}

async function fetchWeather(city) {
  const [lat, lon] = city.center;
  const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=2023${city.dateRange.start.slice(4)}&end_date=2023${city.dateRange.end.slice(4)}&daily=temperature_2m_max,temperature_2m_min,weathercode,precipitation_probability_max&timezone=auto`;
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("API");
    const data = await res.json();
    return { fallback: true, daily: data.daily };
  } catch {
    return { fallback: true, daily: null };
  }
}

async function renderWeatherCards() {
  const wrap = document.getElementById("weatherCards");
  wrap.innerHTML = "";
  for (const city of Object.values(CITY_DATA)) {
    const weather = await fetchWeather(city);
    const days = weather.daily?.time?.map((date, idx) => `<div class="weather-day"><span>${new Date(date).toLocaleDateString("de-DE", {weekday:"short", day:"2-digit", month:"2-digit"})}</span><span>${weatherCodeToIcon(weather.daily.weathercode[idx])} ${Math.round(weather.daily.temperature_2m_min[idx])}° / ${Math.round(weather.daily.temperature_2m_max[idx])}°</span><span>🌧️ ${weather.daily.precipitation_probability_max?.[idx] ?? "-"}%</span></div>`).join("") || "<p class='muted'>Wetterdaten derzeit nicht erreichbar.</p>";
    wrap.insertAdjacentHTML("beforeend", `<article class="card"><h3>${city.cityName}</h3><p class="muted">Zeitraum: ${fmtRange(city.dateRange)}</p><p class="muted">Noch kein exakter Forecast verfügbar – Anzeige basiert auf saisonalen Durchschnittswerten / Placeholder.</p><div class="weather-days">${days}</div></article>`);
  }
}

function renderCountdown() {
  const start = new Date("2026-07-24T00:00:00");
  const diff = Math.ceil((start - new Date()) / (1000 * 60 * 60 * 24));
  document.getElementById("countdown").textContent = diff > 0 ? `${diff} Tage bis Reisebeginn` : "Reisezeitraum läuft / vorbei";
}

function getCustomKey(cityKey) { return `wm2026_custom_${cityKey}`; }
function loadCustom(cityKey) { try { return JSON.parse(localStorage.getItem(getCustomKey(cityKey)) || "[]"); } catch { return []; } }
function saveCustom(cityKey, data) { localStorage.setItem(getCustomKey(cityKey), JSON.stringify(data)); }

function initCityPage() {
  const cityKey = document.body.dataset.city;
  const city = CITY_DATA[cityKey];
  if (!city || !window.L) return;
  document.getElementById("cityTitle").textContent = city.cityName;
  document.getElementById("cityMeta").textContent = `${fmtRange(city.dateRange)} · Stadion: ${city.points.find((p) => p.category === "Stadium")?.name || "-"} · Flughäfen: ${byCategory(city.points, "Airport")} · Soccer-Pubs: ${byCategory(city.points, "Soccer Pub")}`;

  const map = L.map("map", { zoomControl: true, preferCanvas: true });
  L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", { subdomains: "abcd", maxZoom: 19, attribution: "&copy; OpenStreetMap &copy; CARTO" }).addTo(map);

  const layers = { "Fan-Hubs": L.layerGroup(), Stadion: L.layerGroup(), Flughäfen: L.layerGroup(), "Soccer-Pubs": L.layerGroup(), Sehenswürdigkeiten: L.layerGroup(), "Eigene Einträge": L.layerGroup() };
  const allMarkers = [];

  const makeIcon = (color) => L.divIcon({ className: "", html: `<div style="width:12px;height:12px;border-radius:50%;background:${color};border:2px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,.18)"></div>`, iconSize: [12, 12], iconAnchor: [6, 6] });
  const addPoint = (p, custom = false) => {
    if (!Number.isFinite(+p.lat) || !Number.isFinite(+p.lon)) return;
    const color = custom ? categoryColor.Custom : (categoryColor[p.category] || "#64748b");
    const marker = L.marker([+p.lat, +p.lon], { icon: makeIcon(color) }).bindPopup(`<div style="min-width:220px"><b>${p.name}</b><br><small>Typ: ${p.category}</small><br>${p.address || ""}<br>${p.notes || ""}</div>`);
    marker.bindTooltip(`<span class="poi-label">${p.label || p.name}</span>`, { permanent: !custom && ["Fan Hub", "Stadium", "Airport"].includes(p.category), direction: "right", offset: [10, 0], opacity: 1 });
    if (custom) layers["Eigene Einträge"].addLayer(marker);
    else if (p.category === "Fan Hub") layers["Fan-Hubs"].addLayer(marker);
    else if (p.category === "Stadium") layers.Stadion.addLayer(marker);
    else if (p.category === "Airport") layers.Flüghäfen.addLayer(marker);
    else if (p.category === "Soccer Pub") layers["Soccer-Pubs"].addLayer(marker);
    else layers.Sehenswürdigkeiten.addLayer(marker);
    allMarkers.push(marker);
  };

  city.points.forEach((p) => addPoint(p));
  let customPoints = loadCustom(cityKey);
  customPoints.forEach((p) => addPoint(p, true));
  Object.values(layers).forEach((l) => l.addTo(map));
  L.control.layers(null, layers, { collapsed: true }).addTo(map);
  if (allMarkers.length) map.fitBounds(L.featureGroup(allMarkers).getBounds().pad(0.16));
  else map.setView(city.center, city.zoom);

  const list = document.getElementById("customPointList");
  const renderList = () => {
    list.innerHTML = customPoints.length ? "" : "<li class='muted'>Noch keine eigenen Einträge.</li>";
    customPoints.forEach((p, idx) => list.insertAdjacentHTML("beforeend", `<li class="entry-item"><span>${p.name} <small class="muted">(${p.category})</small></span><button class="btn btn-secondary" data-del="${idx}">Löschen</button></li>`));
  };
  renderList();

  list.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-del]");
    if (!btn) return;
    customPoints.splice(+btn.dataset.del, 1);
    saveCustom(cityKey, customPoints);
    location.reload();
  });

  document.getElementById("customPointForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const point = { name: form.get("name")?.toString().trim(), label: form.get("name")?.toString().trim(), category: form.get("category"), address: form.get("address")?.toString().trim(), notes: "Eigener Eintrag", lat: Number(form.get("lat")), lon: Number(form.get("lon")) };
    const msg = document.getElementById("formMessage");
    if (!point.name || !Number.isFinite(point.lat) || !Number.isFinite(point.lon)) { msg.textContent = "Bitte Name, Latitude und Longitude korrekt ausfüllen."; return; }
    customPoints.push(point); saveCustom(cityKey, customPoints); msg.textContent = "Eintrag gespeichert."; e.currentTarget.reset(); setTimeout(() => location.reload(), 250);
  });

  const legend = document.getElementById("legend");
  document.getElementById("legendToggle")?.addEventListener("click", () => {
    const show = legend.style.display === "none" || legend.style.display === "";
    legend.style.display = show ? "block" : "none";
    document.getElementById("legendToggle").textContent = show ? "Legende ausblenden" : "Legende";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  if (page === "dashboard") initDashboard();
  if (page === "city") initCityPage();
});
