(function () {
  function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
  }

  function isVisible(el) {
    if (!el) return false;
    const rect = el.getBoundingClientRect();
    return rect.width > 0 && rect.height > 0;
  }

  function waitUntilVisible(el, done, tries = 0) {
    if (isVisible(el)) return done();
    if (tries > 40) return done();
    requestAnimationFrame(() => waitUntilVisible(el, done, tries + 1));
  }

  function validateCustomPoint(point) {
    if (!point.name || !point.category || !point.address) return "Bitte Name, Kategorie und Adresse/Notiz ausfüllen.";
    if (Number.isNaN(point.lat) || Number.isNaN(point.lon)) return "Bitte gültige Koordinaten eintragen.";
    if (point.lat < -90 || point.lat > 90 || point.lon < -180 || point.lon > 180) return "Koordinaten außerhalb des gültigen Bereichs.";
    return "";
  }

  function createIcon(category) {
    const cfg = window.CATEGORY_CONFIG[category] || window.CATEGORY_CONFIG.Sight;
    return L.divIcon({
      className: "pin-wrap",
      html: `<span class="pin" style="--pin:${cfg.color}">${cfg.icon}</span>`,
      iconSize: [28, 28],
      iconAnchor: [14, 28],
      popupAnchor: [0, -22]
    });
  }

  function markerPopup(point) {
    const cfg = window.CATEGORY_CONFIG[point.category] || window.CATEGORY_CONFIG.Sight;
    return `<div class="popup-card">
      <p class="popup-tag" style="background:${cfg.color}">${cfg.label}</p>
      <h3>${point.name}</h3>
      <p>${point.address || "Keine Adresse"}</p>
      <p class="muted">${point.notes || ""}</p>
      <p class="tiny-meta">${point.approx ? "Koordinate approx." : "Koordinate verifiziert"} · Quelle: ${point.sourceType || "n/a"}</p>
    </div>`;
  }

  function renderLegend() {
    const legend = document.getElementById("legend");
    if (!legend) return;
    const rows = Object.entries(window.CATEGORY_CONFIG)
      .filter(([key]) => key !== "Custom")
      .map(([_, cfg]) => `<div class="legend-row"><span class="dot" style="background:${cfg.color}">${cfg.icon}</span>${cfg.label}</div>`)
      .join("");
    legend.innerHTML = `<h3>Legende</h3>${rows}<div class="legend-row"><span class="dot" style="background:${window.CATEGORY_CONFIG.Custom.color}">⭐</span>Eigene Einträge</div><p class="tiny-meta">FIFA Fan Festival: zentrale Fan-Destination.</p>`;
  }

  function initCityPage() {
    const cityKey = document.body.dataset.city;
    const city = window.CITY_DATA[cityKey];
    if (!city) return;
    if (!window.L) {
      console.error("Leaflet wurde nicht geladen.");
      document.getElementById("mapFallback")?.classList.remove("hidden");
      return;
    }

    setText("cityTitle", city.cityName);
    setText("cityDate", window.WMApp.formatDateRange(city.dateRange));
    const points = city.points;
    setText(
      "cityMeta",
      `${city.stadiumName} · Flughäfen ${window.WMApp.countByCategory(points, "Airport")} · Pubs ${window.WMApp.countByCategory(points, "Soccer Pub")} · Restaurants ${window.WMApp.countByCategory(points, "Restaurant")} · Food Spots ${window.WMApp.countByCategory(points, "Food Spot")}`
    );

    renderLegend();
    document.getElementById("legendToggle")?.addEventListener("click", () => document.getElementById("legend")?.classList.toggle("open"));

    const select = document.getElementById("customCategory");
    if (select) {
      select.innerHTML = Object.entries(window.CATEGORY_CONFIG)
        .filter(([key]) => key !== "Custom")
        .map(([key, cfg]) => `<option value="${key}">${cfg.label}</option>`)
        .join("");
    }

    const mapEl = document.getElementById("map");
    waitUntilVisible(mapEl, () => {
      const map = L.map("map", { zoomControl: true, preferCanvas: true }).setView(city.center, city.zoom);
      const fallback = document.getElementById("mapFallback");
      const status = document.getElementById("mapStatus");

      let hasTileLoad = false;
      const tiles = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "&copy; OpenStreetMap"
      }).addTo(map);

      tiles.on("tileload", () => {
        hasTileLoad = true;
      });

      tiles.on("tileerror", (event) => {
        console.error("Tile-Layer Fehler", event);
        fallback?.classList.remove("hidden");
        if (status) {
          status.classList.remove("hidden");
          status.textContent = "Probleme beim Laden einzelner Kartenkacheln.";
        }
      });

      map.on("load", () => {
        fallback?.classList.add("hidden");
      });

      setTimeout(() => {
        if (!hasTileLoad) {
          fallback?.classList.remove("hidden");
          if (status) {
            status.classList.remove("hidden");
            status.textContent = "Karte lädt verzögert. Verbindung prüfen und ggf. neu laden.";
          }
        }
      }, 4500);

      const layerGroups = {};
      Object.keys(window.CATEGORY_CONFIG).forEach((category) => {
        if (category !== "Custom") layerGroups[category] = L.layerGroup().addTo(map);
      });
      const customLayer = L.layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = L.marker([point.lat, point.lon], { icon: createIcon(point.category) }).bindPopup(markerPopup(point));
        marker.addTo(layerGroups[point.category]);
      });

      const chips = document.getElementById("categoryChips");
      if (chips) {
        chips.innerHTML = Object.entries(window.CATEGORY_CONFIG).filter(([key]) => key !== "Custom").map(([key, cfg]) => `<button class="chip is-active" data-cat="${key}">${cfg.icon} ${cfg.label}</button>`).join("");
        chips.addEventListener("click", (event) => {
          const target = event.target.closest("button[data-cat]");
          if (!target) return;
          const cat = target.dataset.cat;
          const active = target.classList.toggle("is-active");
          if (active) map.addLayer(layerGroups[cat]);
          else map.removeLayer(layerGroups[cat]);
        });
      }

      L.control.layers(null, {
        "Fan Hub": layerGroups["Fan Hub"],
        "Stadion": layerGroups["Stadium"],
        "Flughafen": layerGroups["Airport"],
        "Soccer-Pub": layerGroups["Soccer Pub"],
        "Restaurant": layerGroups["Restaurant"],
        "Food Spot": layerGroups["Food Spot"],
        "Sehenswürdigkeit": layerGroups["Sight"],
        "Eigene Einträge": customLayer
      }, { collapsed: true }).addTo(map);

      const bounds = L.latLngBounds(points.map((p) => [p.lat, p.lon]));
      map.fitBounds(bounds.pad(0.18));

      const hardInvalidate = () => {
        map.invalidateSize();
      };
      hardInvalidate();
      requestAnimationFrame(hardInvalidate);
      setTimeout(hardInvalidate, 200);
      window.addEventListener("resize", hardInvalidate);
      document.addEventListener("visibilitychange", hardInvalidate);
      mapEl?.addEventListener("transitionend", hardInvalidate);

      const form = document.getElementById("customPointForm");
      const list = document.getElementById("customPointList");
      const msg = document.getElementById("formMessage");

      let customPoints = window.WMApp.getCustomPoints(cityKey);
      const drawCustom = () => {
        customLayer.clearLayers();
        customPoints.forEach((point) => {
          L.marker([point.lat, point.lon], { icon: createIcon("Custom") }).bindPopup(markerPopup({ ...point, category: "Custom" })).addTo(customLayer);
        });
        list.innerHTML = customPoints.length
          ? customPoints.map((point) => `<li><div><strong>${point.name}</strong><p>${point.address}</p></div><button class="btn btn-ghost" data-del="${point.id}">Löschen</button></li>`).join("")
          : "<li class='empty'>Noch keine eigenen Einträge.</li>";
      };
      drawCustom();

      form?.addEventListener("submit", (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const point = {
          id: `custom-${Date.now()}`,
          name: String(formData.get("name") || "").trim(),
          category: String(formData.get("category") || "").trim(),
          address: String(formData.get("address") || "").trim(),
          lat: Number(formData.get("lat")),
          lon: Number(formData.get("lon")),
          notes: "Eigener Eintrag"
        };

        const validation = validateCustomPoint(point);
        if (validation) {
          msg.textContent = validation;
          return;
        }

        customPoints.push(point);
        window.WMApp.saveCustomPoints(cityKey, customPoints);
        form.reset();
        msg.textContent = "Eintrag gespeichert.";
        drawCustom();
        hardInvalidate();
      });

      list?.addEventListener("click", (event) => {
        const button = event.target.closest("button[data-del]");
        if (!button) return;
        customPoints = customPoints.filter((point) => point.id !== button.dataset.del);
        window.WMApp.saveCustomPoints(cityKey, customPoints);
        drawCustom();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    if (document.body.dataset.page === "city") initCityPage();
  });
})();
