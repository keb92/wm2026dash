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
      heroImage: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1200&q=80",
      stadiumName: "MetLife Stadium",
      points: [
        { id: "nyc-001", name: "MetLife Stadium", label: "Matchday Venue", category: "Stadium", lat: 40.8135, lon: -74.0745, address: "1 MetLife Stadium Dr, East Rutherford", notes: "WM-Spielort", approx: false },
        { id: "nyc-002", name: "FIFA Fan Festival Manhattan", label: "Fan Treff", category: "Fan Hub", lat: 40.7712, lon: -73.9742, address: "Central Park South", notes: "Public Viewing", approx: true },
        { id: "nyc-003", name: "JFK Airport", label: "Ankunft", category: "Airport", lat: 40.6413, lon: -73.7781, address: "Queens", notes: "International", approx: false },
        { id: "nyc-004", name: "Legends NYC", label: "Soccer Pub", category: "Soccer Pub", lat: 40.7599, lon: -73.9845, address: "6 W 33rd St", notes: "Spielübertragungen", approx: false },
        { id: "nyc-005", name: "Katz's Delicatessen", label: "Kultlokal", category: "Food Spot", lat: 40.7223, lon: -73.9874, address: "205 E Houston St", notes: "Schneller Food Stop", approx: false },
        { id: "nyc-006", name: "Manhatta", label: "Dinner", category: "Restaurant", lat: 40.7075, lon: -74.0094, address: "28 Liberty St", notes: "Skyline View", approx: false },
        { id: "nyc-007", name: "Brooklyn Bridge", label: "Sightseeing", category: "Sight", lat: 40.7061, lon: -73.9969, address: "Brooklyn Bridge", notes: "Morgenwalk", approx: false }
      ]
    },
    boston: {
      cityKey: "boston",
      cityName: "Boston",
      dateRange: { start: "2026-06-28", end: "2026-07-02" },
      center: [42.3601, -71.0589],
      zoom: 12,
      heroImage: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?auto=format&fit=crop&w=1200&q=80",
      stadiumName: "Gillette Stadium",
      points: [
        { id: "bos-001", name: "Gillette Stadium", label: "Matchday Venue", category: "Stadium", lat: 42.0909, lon: -71.2643, address: "1 Patriot Pl, Foxborough", notes: "WM-Spielort", approx: false },
        { id: "bos-002", name: "Fan Zone Boston Common", label: "Fan Treff", category: "Fan Hub", lat: 42.355, lon: -71.0656, address: "139 Tremont St", notes: "Abendprogramm", approx: true },
        { id: "bos-003", name: "Logan Airport", label: "Ankunft", category: "Airport", lat: 42.3656, lon: -71.0096, address: "Boston", notes: "Terminal E", approx: false },
        { id: "bos-004", name: "The Greatest Bar", label: "Soccer Pub", category: "Soccer Pub", lat: 42.3664, lon: -71.0622, address: "262 Friend St", notes: "Match-Nights", approx: false },
        { id: "bos-005", name: "Neptune Oyster", label: "Seafood", category: "Restaurant", lat: 42.363, lon: -71.0569, address: "63 Salem St", notes: "Reservierung empfohlen", approx: false },
        { id: "bos-006", name: "Quincy Market Food Hall", label: "Snack Stop", category: "Food Spot", lat: 42.3601, lon: -71.0542, address: "4 S Market St", notes: "Viele Küchen", approx: false },
        { id: "bos-007", name: "Freedom Trail Start", label: "Sightseeing", category: "Sight", lat: 42.3572, lon: -71.0621, address: "Boston Common", notes: "Kurze Walking Tour", approx: false }
      ]
    },
    dallas: {
      cityKey: "dallas",
      cityName: "Dallas",
      dateRange: { start: "2026-06-28", end: "2026-07-02" },
      center: [32.7767, -96.797],
      zoom: 11,
      heroImage: "https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80",
      stadiumName: "AT&T Stadium",
      points: [
        { id: "dal-001", name: "AT&T Stadium", label: "Matchday Venue", category: "Stadium", lat: 32.7473, lon: -97.0945, address: "1 AT&T Way, Arlington", notes: "WM-Spielort", approx: false },
        { id: "dal-002", name: "Klyde Warren Fan Zone", label: "Fan Treff", category: "Fan Hub", lat: 32.7903, lon: -96.8003, address: "2012 Woodall Rodgers Fwy", notes: "Public Viewing", approx: true },
        { id: "dal-003", name: "DFW Airport", label: "Ankunft", category: "Airport", lat: 32.8998, lon: -97.0403, address: "DFW", notes: "Großer Hub", approx: false },
        { id: "dal-004", name: "The Londoner", label: "Soccer Pub", category: "Soccer Pub", lat: 32.9604, lon: -96.8386, address: "14930 Midway Rd", notes: "EPL & WM", approx: false },
        { id: "dal-005", name: "Pecan Lodge", label: "BBQ", category: "Restaurant", lat: 32.7805, lon: -96.7838, address: "2702 Main St", notes: "Texas Klassiker", approx: false },
        { id: "dal-006", name: "Fuel City Tacos", label: "Late Bite", category: "Food Spot", lat: 32.7545, lon: -96.8103, address: "801 S Riverfront Blvd", notes: "24/7 Snack", approx: false },
        { id: "dal-007", name: "Dealey Plaza", label: "Sightseeing", category: "Sight", lat: 32.7787, lon: -96.8084, address: "411 Elm St", notes: "Downtown Spot", approx: false }
      ]
    }
  };

  window.CATEGORY_CONFIG = CATEGORY_CONFIG;
  window.CITY_DATA = CITY_DATA;
})();
