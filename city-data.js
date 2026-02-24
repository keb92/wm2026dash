const CITY_DATA = {
  nyc: {
    cityKey: "nyc", cityName: "New York City", center: [40.758, -73.9855], zoom: 10,
    dateRange: { start: "2026-07-24", end: "2026-07-27" },
    points: [{"name":"Fan-Hub Rockefeller","label":"Fan-Hub: Rockefeller","category":"Fan Hub","lat":40.758678,"lon":-73.978798,"address":"45 Rockefeller Plaza, New York, NY 10111","notes":"Public Viewing + Programm (04.–19.07.2026)"},{"name":"Fan-Hub Queens (USTA)","label":"Fan-Hub: Queens","category":"Fan Hub","lat":40.750694,"lon":-73.846336,"address":"USTA Billie Jean King Tennis Center, Queens","notes":"Fan-Zone (17.–28.06.2026)"},{"name":"Stadion MetLife","label":"Stadion: MetLife","category":"Stadium","lat":40.813778,"lon":-74.07431,"address":"1 MetLife Stadium Dr, East Rutherford, NJ 07073","notes":"NY/NJ WM-Stadion"},{"name":"Flughafen JFK","label":"Airport: JFK","category":"Airport","lat":40.6413111,"lon":-73.7781391,"address":"JFK International Airport, Queens","notes":""},{"name":"Flughafen Newark (EWR)","label":"Airport: EWR","category":"Airport","lat":40.6895314,"lon":-74.1744624,"address":"Newark Liberty International Airport, NJ","notes":""},{"name":"Soccer-Pub Legends (33rd St)","label":"Pub: Legends","category":"Soccer Pub","lat":40.7479631,"lon":-73.9857839,"address":"6 W 33rd St, New York, NY 10001","notes":"Football Factory @ Legends"},{"name":"Soccer-Pub Smithfield Hall","label":"Pub: Smithfield","category":"Soccer Pub","lat":40.7447465,"lon":-73.9936414,"address":"138 W 25th St, New York, NY 10001","notes":""},{"name":"Soccer-Pub Hibernia (Hell’s Kitchen)","label":"Pub: Hibernia","category":"Soccer Pub","lat":40.7636714,"lon":-73.9893688,"address":"401 W 50th St, New York, NY 10019","notes":""},{"name":"Soccer-Pub Banter (Brooklyn)","label":"Pub: Banter","category":"Soccer Pub","lat":40.7129,"lon":-73.9569,"address":"132 Havemeyer St, Brooklyn, NY 11211","notes":"Koordinate approx."},{"name":"Sehenswürdigkeit Times Square","label":"Sight: Times Sq","category":"Sight","lat":40.758,"lon":-73.9855,"address":"Times Square, Manhattan","notes":""},{"name":"Sehenswürdigkeit Central Park","label":"Sight: Central Park","category":"Sight","lat":40.7678,"lon":-73.9718,"address":"Central Park (Süd), Manhattan","notes":""},{"name":"Sehenswürdigkeit Empire State","label":"Sight: Empire State","category":"Sight","lat":40.7484,"lon":-73.9857,"address":"20 W 34th St, New York, NY 10001","notes":""},{"name":"Sehenswürdigkeit Brooklyn Bridge","label":"Sight: Brooklyn Bridge","category":"Sight","lat":40.7061,"lon":-73.9969,"address":"Brooklyn Bridge (Manhattan-Seite)","notes":""},{"name":"Sehenswürdigkeit One World Trade Center","label":"Sight: One WTC","category":"Sight","lat":40.712743,"lon":-74.013379,"address":"285 Fulton St, New York, NY 10007","notes":""},{"name":"Sehenswürdigkeit Fähre Freiheitsstatue","label":"Sight: Statue-Fähre","category":"Sight","lat":40.7033,"lon":-74.017,"address":"Battery Park, Manhattan","notes":"Start für Statue/Ellis Fähren"}]
  },
  boston: { cityKey:"boston", cityName:"Boston", center:[42.3601,-71.0589], zoom:10, dateRange:{start:"2026-07-28",end:"2026-08-02"}, points:[
    {name:"Boston Fan Zone (tbd)",label:"Fan Hub: Boston TBD",category:"Fan Hub",lat:42.3587,lon:-71.0577,address:"Downtown Boston (Platzhalter)",notes:"TBD – offizieller Fan-Zone-Standort später aktualisieren."},
    {name:"Gillette Stadium",label:"Stadion: Gillette",category:"Stadium",lat:42.0909,lon:-71.2643,address:"1 Patriot Pl, Foxborough, MA 02035",notes:"Boston host venue for FIFA World Cup 2026 (Foxborough)."},
    {name:"Boston Logan International Airport (BOS)",label:"Airport: BOS",category:"Airport",lat:42.3656,lon:-71.0096,address:"1 Harborside Dr, Boston, MA",notes:""},
    {name:"Manchester-Boston Regional Airport (MHT)",label:"Airport: MHT",category:"Airport",lat:42.9345,lon:-71.4371,address:"1 Airport Rd, Manchester, NH 03103",notes:"Regional alternative."},
    {name:"T.F. Green International Airport (PVD)",label:"Airport: PVD",category:"Airport",lat:41.724,lon:-71.4282,address:"2000 Post Rd, Warwick, RI 02886",notes:"Alternative für An-/Abreise."},
    {name:"The Banshee",label:"Pub: Banshee",category:"Soccer Pub",lat:42.3144,lon:-71.0576,address:"934 Dorchester Ave, Boston, MA 02125",notes:""},
    {name:"The Phoenix Landing",label:"Pub: Phoenix",category:"Soccer Pub",lat:42.3662,lon:-71.1051,address:"512 Massachusetts Ave, Cambridge, MA 02139",notes:""},
    {name:"Banners Kitchen & Tap",label:"Pub: Banners",category:"Soccer Pub",lat:42.3666,lon:-71.0623,address:"82 Causeway St, Boston, MA 02114",notes:""},
    {name:"The Greatest Bar",label:"Pub: Greatest",category:"Soccer Pub",lat:42.3658,lon:-71.0616,address:"262 Friend St, Boston, MA 02114",notes:""},
    {name:"Bleacher Bar",label:"Pub: Bleacher",category:"Soccer Pub",lat:42.3467,lon:-71.0972,address:"82A Lansdowne St, Boston, MA 02215",notes:""},
    {name:"Freedom Trail / Boston Common",label:"Sight: Freedom Trail",category:"Sight",lat:42.355,lon:-71.0656,address:"Boston Common",notes:""},
    {name:"Faneuil Hall Marketplace",label:"Sight: Faneuil Hall",category:"Sight",lat:42.3601,lon:-71.0568,address:"4 S Market St, Boston, MA",notes:""},
    {name:"Quincy Market",label:"Sight: Quincy",category:"Sight",lat:42.3601,lon:-71.0542,address:"206 S Market St, Boston, MA",notes:""},
    {name:"Fenway Park",label:"Sight: Fenway",category:"Sight",lat:42.3467,lon:-71.0972,address:"4 Jersey St, Boston, MA",notes:""},
    {name:"Harborwalk / Seaport",label:"Sight: Harborwalk",category:"Sight",lat:42.3522,lon:-71.0455,address:"Boston Seaport",notes:""}
  ]},
  dallas: { cityKey:"dallas", cityName:"Dallas", center:[32.7767,-96.797], zoom:10, dateRange:{start:"2026-07-28",end:"2026-08-02"}, points:[
    {name:"Dallas Fan Zone (tbd)",label:"Fan Hub: Dallas TBD",category:"Fan Hub",lat:32.7792,lon:-96.8003,address:"Downtown Dallas (Platzhalter)",notes:"TBD – Standort später konkretisieren."},
    {name:"AT&T Stadium",label:"Stadion: AT&T",category:"Stadium",lat:32.7473,lon:-97.0945,address:"1 AT&T Way, Arlington, TX 76011",notes:"Dallas host venue World Cup 2026."},
    {name:"Dallas/Fort Worth International Airport (DFW)",label:"Airport: DFW",category:"Airport",lat:32.8998,lon:-97.0403,address:"3200 E Airfield Dr, DFW Airport, TX 75261",notes:""},
    {name:"Dallas Love Field (DAL)",label:"Airport: DAL",category:"Airport",lat:32.8471,lon:-96.8517,address:"8008 Herb Kelleher Way, Dallas, TX 75235",notes:""},
    {name:"The Londoner",label:"Pub: Londoner",category:"Soccer Pub",lat:32.9521,lon:-96.8238,address:"14930 Midway Rd, Addison, TX 75001",notes:""},
    {name:"The Dubliner",label:"Pub: Dubliner",category:"Soccer Pub",lat:32.8626,lon:-96.7704,address:"2818 Greenville Ave, Dallas, TX 75206",notes:""},
    {name:"Frankie's Downtown",label:"Pub: Frankie's",category:"Soccer Pub",lat:32.7816,lon:-96.798,address:"1303 Main St, Dallas, TX 75202",notes:""},
    {name:"Harwood Arms",label:"Pub: Harwood",category:"Soccer Pub",lat:32.7873,lon:-96.7975,address:"2850 N Harwood St, Dallas, TX 75201",notes:"Koordinate approx."},
    {name:"Christies Sports Bar",label:"Pub: Christies",category:"Soccer Pub",lat:32.8092,lon:-96.7802,address:"2817 Oak Lawn Ave, Dallas, TX 75219",notes:""},
    {name:"Dealey Plaza / Sixth Floor Museum",label:"Sight: Dealey Plaza",category:"Sight",lat:32.7785,lon:-96.8084,address:"411 Elm St, Dallas, TX 75202",notes:""},
    {name:"Reunion Tower",label:"Sight: Reunion",category:"Sight",lat:32.7756,lon:-96.8089,address:"300 Reunion Blvd E, Dallas, TX 75207",notes:""},
    {name:"Klyde Warren Park",label:"Sight: Klyde Warren",category:"Sight",lat:32.7904,lon:-96.8003,address:"2012 Woodall Rodgers Fwy, Dallas, TX 75201",notes:""},
    {name:"Dallas Arts District",label:"Sight: Arts District",category:"Sight",lat:32.7898,lon:-96.8009,address:"Dallas Arts District",notes:""},
    {name:"Deep Ellum",label:"Sight: Deep Ellum",category:"Sight",lat:32.7849,lon:-96.7845,address:"Deep Ellum, Dallas",notes:""},
    {name:"Fort Worth Stockyards",label:"Sight: Stockyards",category:"Sight",lat:32.7881,lon:-97.3479,address:"131 E Exchange Ave, Fort Worth, TX 76164",notes:"Optionaler Tagestrip."}
  ]}
};
