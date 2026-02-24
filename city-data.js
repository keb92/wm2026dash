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
        { id: "nyc-001", name: "MetLife Stadium", label: "Matchday Venue", category: "Stadium", lat: 40.8135, lon: -74.0745, address: "1 MetLife Stadium Dr, East Rutherford", notes: "WM-Spielort", approx: false, sourceType: "official" },
        { id: "nyc-002", name: "FIFA Fan Festival Manhattan", label: "Fan Treff", category: "Fan Hub", lat: 40.7712, lon: -73.9742, address: "Central Park South", notes: "Public Viewing", approx: true, sourceType: "official" },
        { id: "nyc-003", name: "JFK Airport", label: "Ankunft", category: "Airport", lat: 40.6413, lon: -73.7781, address: "Queens", notes: "International", approx: false, sourceType: "venue" },
        { id: "nyc-004", name: "Legends NYC", label: "Soccer Pub", category: "Soccer Pub", lat: 40.7599, lon: -73.9845, address: "6 W 33rd St", notes: "Spielübertragungen", approx: false, sourceType: "pub" },
        { id: "nyc-005", name: "Katz's Delicatessen", label: "Kultlokal", category: "Food Spot", lat: 40.7223, lon: -73.9874, address: "205 E Houston St", notes: "Schneller Food Stop", approx: false, sourceType: "sight" },
        { id: "nyc-006", name: "Manhatta", label: "Dinner", category: "Restaurant", lat: 40.7075, lon: -74.0094, address: "28 Liberty St", notes: "Skyline View", approx: false, sourceType: "venue" },
        { id: "nyc-007", name: "Brooklyn Bridge", label: "Sightseeing", category: "Sight", lat: 40.7061, lon: -73.9969, address: "Brooklyn Bridge", notes: "Morgenwalk", approx: false, sourceType: "sight" }
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
        { id: "boston-fanhub-cityhall", name: "Boston Fan Festival (City Hall Plaza)", label: "Fan Hub: City Hall Plaza", category: "Fan Hub", lat: 42.3598, lon: -71.0583, address: "City Hall Plaza, Boston, MA", notes: "Offizieller Fan Festival Standort laut Boston Host Committee", approx: false, sourceType: "official" },
        { id: "boston-airport-logan", name: "Boston Logan International Airport (BOS)", label: "Flughafen Logan (BOS)", category: "Airport", lat: 42.3656, lon: -71.0096, address: "Boston Logan International Airport, East Boston, MA", notes: "Massport / Logan", approx: false, sourceType: "venue" },
        { id: "boston-pub-phoenix", name: "The Phoenix Landing", label: "Soccer Pub: Phoenix Landing", category: "Soccer Pub", lat: 42.3665, lon: -71.1059, address: "512 Massachusetts Ave, Cambridge, MA 02139", notes: "Bekannter Soccer-Pub", approx: false, sourceType: "pub" },
        { id: "boston-pub-banners", name: "Banners Kitchen & Tap", label: "Soccer Pub: Banners", category: "Soccer Pub", lat: 42.3663, lon: -71.0619, address: "80 Causeway Street, Boston, MA 02114", notes: "Nähe TD Garden / Sportsbar", approx: false, sourceType: "pub" },
        { id: "boston-pub-banshee", name: "The Banshee", label: "Soccer Pub: The Banshee", category: "Soccer Pub", lat: 42.3175, lon: -71.0576, address: "934 Dorchester Ave, Dorchester, MA 02125", notes: "Soccer-Bar / Pub", approx: false, sourceType: "pub" },
        { id: "boston-sight-freedomtrail", name: "Freedom Trail", label: "Sight: Freedom Trail", category: "Sight", lat: 42.3572, lon: -71.0621, address: "Boston, MA (Route/Trail)", notes: "Offizieller Freedom Trail (Startpunkt als Marker)", approx: true, sourceType: "sight" },
        { id: "boston-sight-faneuil", name: "Faneuil Hall", label: "Sight: Faneuil Hall", category: "Sight", lat: 42.3601, lon: -71.0569, address: "1 Faneuil Hall Square, Boston, MA 02109", notes: "", approx: false, sourceType: "sight" },
        { id: "boston-sight-garden", name: "Boston Public Garden", label: "Sight: Public Garden", category: "Sight", lat: 42.3551, lon: -71.0696, address: "4 Charles Street, Boston, MA 02116", notes: "", approx: false, sourceType: "sight" }
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
        { id: "dallas-stadium-att", name: "AT&T Stadium", label: "Stadion: AT&T Stadium", category: "Stadium", lat: 32.7473, lon: -97.0945, address: "1 AT&T Way, Arlington, TX 76011", notes: "Dallas Host Venue (WM 2026)", approx: false, sourceType: "official" },
        { id: "dallas-fanhub-fairpark", name: "Dallas Fan Festival (Fair Park)", label: "Fan Hub: Fair Park", category: "Fan Hub", lat: 32.7793, lon: -96.7597, address: "Fair Park, Dallas, TX", notes: "Offizieller Fan Festival Standort laut City of Dallas Memo", approx: true, sourceType: "official" },
        { id: "dallas-airport-love", name: "Dallas Love Field (DAL)", label: "Flughafen: Love Field", category: "Airport", lat: 32.8471, lon: -96.8517, address: "8008 Herb Kelleher Way, Dallas, TX 75235", notes: "", approx: false, sourceType: "venue" },
        { id: "dallas-airport-dfw", name: "DFW Airport", label: "Flughafen: DFW", category: "Airport", lat: 32.8998, lon: -97.0403, address: "3200 E Airfield Dr, DFW Airport, TX 75261", notes: "Vor finalem Build gegen offizielle DFW-Mapping/API validieren", approx: false, sourceType: "venue" },
        { id: "dallas-pub-londoner", name: "The Londoner (Mockingbird)", label: "Soccer Pub: The Londoner", category: "Soccer Pub", lat: 32.8385, lon: -96.7769, address: "Mockingbird Station, Dallas, TX", notes: "Home of Soccer; genaue Anschrift im Build validieren", approx: true, sourceType: "pub" },
        { id: "dallas-pub-trinity", name: "Trinity Hall Irish Pub", label: "Soccer Pub: Trinity Hall", category: "Soccer Pub", lat: 32.8384, lon: -96.7768, address: "5321 E Mockingbird Ln #250, Dallas, TX 75206", notes: "Standortdaten im Build live validieren", approx: false, sourceType: "pub" },
        { id: "dallas-pub-dubliner", name: "The Dubliner (Dallas)", label: "Soccer Pub: The Dubliner", category: "Soccer Pub", lat: 32.8155, lon: -96.7708, address: "2818 Greenville Ave, Dallas, TX 75206", notes: "", approx: false, sourceType: "pub" },
        { id: "dallas-sight-reunion", name: "Reunion Tower", label: "Sight: Reunion Tower", category: "Sight", lat: 32.7758, lon: -96.8084, address: "300 Reunion Blvd E, Dallas, TX 75207", notes: "", approx: false, sourceType: "sight" },
        { id: "dallas-sight-sixthfloor", name: "The Sixth Floor Museum at Dealey Plaza", label: "Sight: Sixth Floor Museum", category: "Sight", lat: 32.779, lon: -96.8086, address: "411 Elm Street, Dallas, TX 75202", notes: "", approx: false, sourceType: "sight" },
        { id: "dallas-sight-dma", name: "Dallas Museum of Art", label: "Sight: Dallas Museum of Art", category: "Sight", lat: 32.7876, lon: -96.8009, address: "1717 N Harwood St, Dallas, TX 75201", notes: "Adresse im Build final validieren (North Harwood Street)", approx: false, sourceType: "sight" }
      ]
    }
  };

  window.CATEGORY_CONFIG = CATEGORY_CONFIG;
  window.CITY_DATA = CITY_DATA;
})();
