(function () {
  const CATEGORY_CONFIG = {
    "Fan Hub": { label: "Fan Hub / Fan-Zone", color: "#5B5FEE", icon: "🎉" },
    "Stadium": { label: "Stadion", color: "#1FA971", icon: "🏟️" },
    "Airport": { label: "Flughafen", color: "#596D86", icon: "✈️" },
    "Soccer Pub": { label: "Soccer-Pub", color: "#E09F1D", icon: "🍻" },
    "Restaurant": { label: "Restaurant", color: "#9D2B4D", icon: "🍽️" },
    "Food Spot": { label: "Food Spot", color: "#0EA5A7", icon: "🌮" },
    "Sight": { label: "Sehenswürdigkeit", color: "#7A5AF8", icon: "📍" },
    "Custom": { label: "Eigener Eintrag", color: "#0EA5A7", icon: "⭐" }
  };

  const CITY_DATA = {
    nyc: {
      cityKey: "nyc",
      cityName: "New York City",
      dateRange: { start: "2026-06-24", end: "2026-06-28" },
      center: [40.758, -73.9855],
      zoom: 11,
      heroImage: "assets/cities/nyc.svg",
      stadiumName: "MetLife Stadium",
      points: [
        { id: "nyc-fanhub-rockefeller", name: "Fan-Hub Rockefeller", label: "Fan-Hub: Rockefeller", category: "Fan Hub", lat: 40.758678, lon: -73.978798, address: "45 Rockefeller Plaza, New York, NY 10111", notes: "Public Viewing + Programm (04.–19.07.2026)", approx: false, sourceType: "existing-nyc-html" },
        { id: "nyc-fanhub-queens-usta", name: "Fan-Hub Queens (USTA)", label: "Fan-Hub: Queens", category: "Fan Hub", lat: 40.750694, lon: -73.846336, address: "USTA Billie Jean King Tennis Center, Queens", notes: "Fan-Zone (17.–28.06.2026)", approx: false, sourceType: "existing-nyc-html" },
        { id: "nyc-stadium-metlife", name: "Stadion MetLife", label: "Stadion: MetLife", category: "Stadium", lat: 40.813778, lon: -74.07431, address: "1 MetLife Stadium Dr, East Rutherford, NJ 07073", notes: "NY/NJ WM-Stadion", approx: false, sourceType: "existing-nyc-html" },
        { id: "nyc-airport-jfk", name: "Flughafen JFK", label: "Airport: JFK", category: "Airport", lat: 40.6413111, lon: -73.7781391, address: "JFK International Airport, Queens", notes: "", approx: false, sourceType: "existing-nyc-html" },
        { id: "nyc-airport-ewr", name: "Flughafen Newark (EWR)", label: "Airport: EWR", category: "Airport", lat: 40.6895314, lon: -74.1744624, address: "Newark Liberty International Airport, NJ", notes: "", approx: false, sourceType: "existing-nyc-html" },
        { id: "nyc-pub-legends-33rd", name: "Soccer-Pub Legends (33rd St)", label: "Pub: Legends", category: "Soccer Pub", lat: 40.7479631, lon: -73.9857839, address: "6 W 33rd St, New York, NY 10001", notes: "Football Factory @ Legends", approx: false, sourceType: "existing-nyc-html" },
        { id: "nyc-pub-smithfield-hall", name: "Soccer-Pub Smithfield Hall", label: "Pub: Smithfield", category: "Soccer Pub", lat: 40.7447465, lon: -73.9936414, address: "138 W 25th St, New York, NY 10001", notes: "", approx: false, sourceType: "existing-nyc-html" },
        { id: "nyc-pub-hibernia-hells-kitchen", name: "Soccer-Pub Hibernia (Hell’s Kitchen)", label: "Pub: Hibernia", category: "Soccer Pub", lat: 40.7636714, lon: -73.9893688, address: "401 W 50th St, New York, NY 10019", notes: "", approx: false, sourceType: "existing-nyc-html" },
        { id: "nyc-pub-banter-brooklyn", name: "Soccer-Pub Banter (Brooklyn)", label: "Pub: Banter", category: "Soccer Pub", lat: 40.7129, lon: -73.9569, address: "132 Havemeyer St, Brooklyn, NY 11211", notes: "Koordinate approx.", approx: true, sourceType: "existing-nyc-html" },
        { id: "nyc-sight-times-square", name: "Sehenswürdigkeit Times Square", label: "Sight: Times Sq", category: "Sight", lat: 40.758, lon: -73.9855, address: "Times Square, Manhattan", notes: "", approx: false, sourceType: "existing-nyc-html" },
        { id: "nyc-sight-central-park", name: "Sehenswürdigkeit Central Park", label: "Sight: Central Park", category: "Sight", lat: 40.7678, lon: -73.9718, address: "Central Park (Süd), Manhattan", notes: "", approx: false, sourceType: "existing-nyc-html" },
        { id: "nyc-sight-empire-state", name: "Sehenswürdigkeit Empire State", label: "Sight: Empire State", category: "Sight", lat: 40.7484, lon: -73.9857, address: "20 W 34th St, New York, NY 10001", notes: "", approx: false, sourceType: "existing-nyc-html" },
        { id: "nyc-sight-brooklyn-bridge", name: "Sehenswürdigkeit Brooklyn Bridge", label: "Sight: Brooklyn Bridge", category: "Sight", lat: 40.7061, lon: -73.9969, address: "Brooklyn Bridge (Manhattan-Seite)", notes: "", approx: false, sourceType: "existing-nyc-html" },
        { id: "nyc-sight-one-wtc", name: "Sehenswürdigkeit One World Trade Center", label: "Sight: One WTC", category: "Sight", lat: 40.712743, lon: -74.013379, address: "285 Fulton St, New York, NY 10007", notes: "", approx: false, sourceType: "existing-nyc-html" },
        { id: "nyc-sight-statue-ferry", name: "Sehenswürdigkeit Fähre Freiheitsstatue", label: "Sight: Statue-Fähre", category: "Sight", lat: 40.7033, lon: -74.017, address: "Battery Park, Manhattan", notes: "Start für Statue/Ellis Fähren", approx: false, sourceType: "existing-nyc-html" }
      ]
    },
    boston: {
      cityKey: "boston",
      cityName: "Boston",
      dateRange: { start: "2026-06-28", end: "2026-07-02" },
      center: [42.3601, -71.0589],
      zoom: 11,
      heroImage: "assets/cities/boston.svg",
      stadiumName: "Gillette Stadium",
      points: [
        { id: "boston-stadium-gillette", name: "Gillette Stadium", label: "Stadion: Gillette", category: "Stadium", lat: 42.0909, lon: -71.2643, address: "1 Patriot Pl, Foxborough, MA 02035", notes: "Boston Host Venue (WM 2026)", approx: false, sourceType: "official" },
        { id: "boston-fanhub-cityhall-plaza", name: "Boston Fan Festival (City Hall Plaza)", label: "Fan-Hub: City Hall Plaza", category: "Fan Hub", lat: 42.3603, lon: -71.0583, address: "1 City Hall Square, Boston, MA 02203", notes: "Offizieller Fan-Festival-Standort (Boston Host Committee)", approx: true, sourceType: "host-city" },
        { id: "boston-airport-logan-bos", name: "Flughafen Logan (BOS)", label: "Airport: BOS", category: "Airport", lat: 42.3656, lon: -71.0096, address: "Boston Logan International Airport, East Boston, MA 02128", notes: "Massport / Logan", approx: false, sourceType: "official" },
        { id: "boston-pub-phoenix-landing", name: "Soccer-Pub The Phoenix Landing", label: "Pub: Phoenix Landing", category: "Soccer Pub", lat: 42.3660, lon: -71.1039, address: "512 Massachusetts Ave, Cambridge, MA 02139", notes: "Bekannter Soccer-Pub in Cambridge", approx: false, sourceType: "official" },
        { id: "boston-pub-banners-kitchen-tap", name: "Soccer-Pub Banners Kitchen & Tap", label: "Pub: Banners", category: "Soccer Pub", lat: 42.3662, lon: -71.0610, address: "80 Causeway St, Boston, MA 02114", notes: "Sportsbar nahe TD Garden / North Station", approx: true, sourceType: "official" },
        { id: "boston-pub-banshee", name: "Soccer-Pub The Banshee", label: "Pub: Banshee", category: "Soccer Pub", lat: 42.3206, lon: -71.0569, address: "934 Dorchester Ave, Dorchester, MA 02125", notes: "Soccer-Bar / Pub", approx: true, sourceType: "official" },
        { id: "boston-sight-freedom-trail", name: "Freedom Trail (Start Boston Common Visitor Center)", label: "Sight: Freedom Trail", category: "Sight", lat: 42.3552, lon: -71.0638, address: "139 Tremont St, Boston, MA 02111", notes: "2.5-mile Freedom Trail; Marker = Startpunkt/Visitor Center", approx: true, sourceType: "official" },
        { id: "boston-sight-faneuil-hall", name: "Faneuil Hall", label: "Sight: Faneuil Hall", category: "Sight", lat: 42.36, lon: -71.0569, address: "1 Faneuil Hall Square, Boston, MA 02109", notes: "", approx: false, sourceType: "official" },
        { id: "boston-sight-public-garden", name: "Boston Public Garden", label: "Sight: Public Garden", category: "Sight", lat: 42.354, lon: -71.0705, address: "4 Charles Street, Boston, MA 02116", notes: "", approx: false, sourceType: "official" }
      ]
    },
    dallas: {
      cityKey: "dallas",
      cityName: "Dallas",
      dateRange: { start: "2026-06-28", end: "2026-07-02" },
      center: [32.7767, -96.797],
      zoom: 11,
      heroImage: "assets/cities/dallas.svg",
      stadiumName: "AT&T Stadium",
      points: [
        { id: "dallas-stadium-att", name: "AT&T Stadium (Arlington)", label: "Stadion: AT&T", category: "Stadium", lat: 32.7473, lon: -97.0945, address: "1 AT&T Way, Arlington, TX 76011", notes: "Dallas Host Venue (WM 2026)", approx: false, sourceType: "official" },
        { id: "dallas-fanhub-fair-park", name: "Dallas Fan Festival (Fair Park)", label: "Fan-Hub: Fair Park", category: "Fan Hub", lat: 32.7799, lon: -96.7597, address: "3809 Grand Ave, Dallas, TX 75210", notes: "Offizieller Fan-Festival-Standort (City of Dallas Memo / Fair Park)", approx: true, sourceType: "official" },
        { id: "dallas-airport-love-field-dal", name: "Flughafen Dallas Love Field (DAL)", label: "Airport: DAL", category: "Airport", lat: 32.8471, lon: -96.8517, address: "8008 Herb Kelleher Way, Dallas, TX 75235", notes: "", approx: false, sourceType: "official" },
        { id: "dallas-airport-dfw", name: "DFW Airport", label: "Airport: DFW", category: "Airport", lat: 32.8998, lon: -97.0403, address: "3200 E Airfield Dr, DFW Airport, TX 75261", notes: "Vor finalem Build gegen offizielle DFW-Mapping/API validieren", approx: true, sourceType: "official/airline-reference" },
        { id: "dallas-pub-londoner-mockingbird", name: "Soccer-Pub The Londoner (Mockingbird)", label: "Pub: Londoner", category: "Soccer Pub", lat: 32.8384, lon: -96.7717, address: "5321 E Mockingbird Ln #250, Dallas, TX 75206", notes: "Mockingbird Station / 'Home of Soccer'", approx: true, sourceType: "official" },
        { id: "dallas-pub-trinity-hall", name: "Soccer-Pub Trinity Hall Irish Pub", label: "Pub: Trinity Hall", category: "Soccer Pub", lat: 32.8384, lon: -96.7717, address: "5321 E Mockingbird Lane #250, Dallas, TX 75206", notes: "Standortdaten im Build live validieren (historisch/aktuell prüfen)", approx: true, sourceType: "venue-listing" },
        { id: "dallas-pub-dubliner", name: "Soccer-Pub The Dubliner", label: "Pub: Dubliner", category: "Soccer Pub", lat: 32.8146, lon: -96.7709, address: "2818 Greenville Ave, Dallas, TX 75206", notes: "", approx: true, sourceType: "official" },
        { id: "dallas-sight-reunion-tower", name: "Reunion Tower", label: "Sight: Reunion Tower", category: "Sight", lat: 32.7755, lon: -96.8080, address: "300 Reunion Blvd E, Dallas, TX 75207", notes: "", approx: false, sourceType: "official" },
        { id: "dallas-sight-sixth-floor-museum", name: "The Sixth Floor Museum at Dealey Plaza", label: "Sight: Sixth Floor Museum", category: "Sight", lat: 32.7791, lon: -96.8084, address: "411 Elm Street, Dallas, TX 75202", notes: "", approx: false, sourceType: "official" },
        { id: "dallas-sight-dma", name: "Dallas Museum of Art", label: "Sight: DMA", category: "Sight", lat: 32.7877, lon: -96.8003, address: "1717 N Harwood St, Dallas, TX 75201", notes: "Adresse im Build final validieren (North Harwood Street)", approx: true, sourceType: "venue-directory" }
      ]
    }
  };

  window.CATEGORY_CONFIG = CATEGORY_CONFIG;
  window.CITY_DATA = CITY_DATA;
})();
