// Black Sea East Breakeven Tool — Data Layer
// Generated 2026-03-09

const BS_DATA = {

  // ── Vessel Class Definitions (Baltic Exchange GMB standard specs) ──
  vesselClasses: {
    HANDC37: {
      name: "HANDC37 (Baltic Clean Handy)", dwt: 37800, intake: 34000,
      cargoBSIndia: 34000,        // no draft limit, full intake
      ladenSpeed: 13.0, ballastSpeed: 12.0,
      ladenCons: 21.3, ballastCons: 16.8,
      portConsLoad: 5.0, portConsDisch: 20.0, portConsWait: 5.0,
      commissionPct: 3.75, seaMargin: 1.05,
      riverDays: 0, cleaningCost: 25000, cleaningDays: 1.0,
    },
    MR50: {
      name: "MR50 (Baltic Standard MR)", dwt: 50000, intake: 46000,
      cargoBSIndia: 40000,        // capped at 40k (Odessa draft)
      ladenSpeed: 13.0, ballastSpeed: 12.0,
      ladenCons: 23.3, ballastCons: 17.0,
      portConsLoad: 5.0, portConsDisch: 25.0, portConsWait: 5.0,
      commissionPct: 3.75, seaMargin: 1.05,
      riverDays: 0, cleaningCost: 25000, cleaningDays: 1.0,
    },
    LR1_75: {
      name: "LR1-75 (Baltic Standard LR1)", dwt: 75000, intake: 70000,
      cargoBSIndia: 61000,        // capped at 61k (Odessa draft)
      ladenSpeed: 13.0, ballastSpeed: 12.0,
      ladenCons: 30.5, ballastCons: 24.5,
      portConsLoad: 5.0, portConsDisch: 32.0, portConsWait: 5.0,
      commissionPct: 3.75, seaMargin: 1.05,
      riverDays: 0, cleaningCost: 25000, cleaningDays: 1.0,
    },
    LR2_115: {
      name: "LR2-115 (Baltic Standard LR2)", dwt: 115000, intake: 105000,
      cargoBSIndia: 61000,        // capped at 61k (Odessa draft)
      ladenSpeed: 13.0, ballastSpeed: 12.0,
      ladenCons: 35.3, ballastCons: 25.3,
      portConsLoad: 5.0, portConsDisch: 44.0, portConsWait: 5.0,
      commissionPct: 3.75, seaMargin: 1.05,
      riverDays: 0, cleaningCost: 25000, cleaningDays: 1.0,
    },
  },

  // ── Backward compat: default vessel points to MR50 ──
  get vessel() { return this.vesselClasses.MR50; },

  // ── Terminal Pumping Rates (mt/hr) — derived from Baltic GMB ──
  // Each route's standard cargo / 2 days (48hrs) = mt/hr at load & discharge
  terminalRates: {
    TC2:  { load: 771, disch: 771 },    // 37,000 / 48h
    TC5:  { load: 1146, disch: 1146 },  // 55,000 / 48h
    TC6:  { load: 625, disch: 625 },    // 30,000 / 48h
    TC12: { load: 729, disch: 729 },    // 35,000 / 48h
    TC14: { load: 792, disch: 792 },    // 38,000 / 48h
    TC17: { load: 729, disch: 729 },    // 35,000 / 48h
    // BS→India physical (derived from 40,000mt / 200hrs)
    BS_LOAD:  200,    // mt/hr at Tuapse/Taman
    BS_DISCH: 200,    // mt/hr at Indian discharge ports
  },

  // ── Laytime (BS→India charterparty standard for MR50 40k cargo) ──
  laytime: {
    loadHours: 200,            // 200 hours loading (baseline for 40k)
    dischHours: 200,           // 200 hours discharging (baseline for 40k)
    get loadDays() { return this.loadHours / 24; },
    get dischDays() { return this.dischHours / 24; },
  },

  // ── TC Route Definitions ──
  // bunkerRef: 'asia' routes use Singapore VLSFO; all others use Rotterdam VLSFO
  routes: {
    TC2:  { desc: "Continent → USAC 37kt",         loadPort: "Rotterdam",  dischPort: "New York",      cargo: 37000,  vesselClass: "MR",  ballastBack: "Houston",    usesSuez: false, bunkerRef: "atlantic" },
    TC5:  { desc: "MEG → Japan 55kt (LR1)",         loadPort: "Ras Tanura", dischPort: "Yokohama",      cargo: 55000,  vesselClass: "LR1", ballastBack: "Ras Tanura", usesSuez: false, bunkerRef: "asia" },
    TC6:  { desc: "Algeria → Med 30kt (Handy)",     loadPort: "Skikda",     dischPort: "Lavera",        cargo: 30000,  vesselClass: "Small",ballastBack: "Skikda",    usesSuez: false, bunkerRef: "atlantic" },
    TC12: { desc: "WCI → Japan 55kt (LR1)",         loadPort: "Mundra",     dischPort: "Yokohama",      cargo: 55000,  vesselClass: "LR1", ballastBack: "Mundra",     usesSuez: false, bunkerRef: "asia" },
    TC14: { desc: "USG → Continent 38kt",           loadPort: "Houston",    dischPort: "Amsterdam",     cargo: 38000,  vesselClass: "MR",  ballastBack: "Rotterdam",  usesSuez: false, bunkerRef: "atlantic" },
    TC17: { desc: "AG → East Africa 35kt",          loadPort: "Ras Tanura", dischPort: "Dar es Salaam", cargo: 35000,  vesselClass: "MR",  ballastBack: "Ras Tanura", usesSuez: false, bunkerRef: "asia" },
  },

  // ── Opening Positions & Competition Mapping ──
  openingPositions: {
    // Black Sea
    "Constanta":   { region: "Romania",      competingRoutes: ["TC6", "TC2"],       nextVoyage: { TC6: "BEST_TC6_TC2", TC2: "TC14" } },
    "Istanbul":    { region: "Turkey",       competingRoutes: ["TC6", "TC2"],       nextVoyage: { TC6: "BEST_TC6_TC2", TC2: "TC14" } },
    // Med East
    "Piraeus":     { region: "Greece",       competingRoutes: ["TC6", "TC2"],       nextVoyage: { TC6: "BEST_TC6_TC2", TC2: "TC14" } },
    "Augusta":     { region: "Sicily",       competingRoutes: ["TC6", "TC2"],       nextVoyage: { TC6: "BEST_TC6_TC2", TC2: "TC14" } },
    // Med West
    "Lavera":      { region: "S. France",    competingRoutes: ["TC6"],              nextVoyage: { TC6: "BEST_TC6_TC2" } },
    "Algeciras":   { region: "Spain",        competingRoutes: ["TC2", "TC6"],       nextVoyage: { TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    // NW Europe
    "Rotterdam":   { region: "NW Europe",    competingRoutes: ["TC2", "TC6"],       nextVoyage: { TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    // Atlantic / WAF
    "Las Palmas":  { region: "Canaries",     competingRoutes: ["TC2", "TC6"],       nextVoyage: { TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    "Dakar":       { region: "Senegal",      competingRoutes: ["TC14", "TC2", "TC6"], nextVoyage: { TC14: "TC2", TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    "Accra":       { region: "Ghana",        competingRoutes: ["TC14", "TC2", "TC6"], nextVoyage: { TC14: "TC2", TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    "Lagos":       { region: "Nigeria",      competingRoutes: ["TC14", "TC2", "TC6"], nextVoyage: { TC14: "TC2", TC2: "TC14", TC6: "BEST_TC6_TC2" } },
    // AG
    "Fujairah":    { region: "UAE",          competingRoutes: ["TC17", "TC5"],      nextVoyage: { TC17: "TC17", TC5: "TC17" } },
    // South Africa
    "Durban":      { region: "South Africa", competingRoutes: ["TC17", "TC14"],     nextVoyage: { TC17: "TC17", TC14: "TC2" } },
  },

  // ── Black Sea → India voyage structure ──
  bsIndiaVoyage: {
    loadPorts: [
      { name: "Tuapse", cargo: 30000, isRiver: false },
      { name: "Taman", cargo: 10000, isRiver: false },
    ],
    dischOptions: {
      WCI: { ports: ["Mundra", "Kandla"], label: "West Coast India" },
      ECI: { ports: ["Chennai", "Haldia"], label: "East Coast India" },
    },
    ballastAfter: "Ras Tanura",
    nextVoyageOptions: ["TC17", "TC5", "TC12"],
    // Transit costs for laden voyage (Black Sea → Med → Suez → India)
    // Suez costs are vessel-class specific; looked up via state.vesselClass
    ladenTransits: {
      bosphorus: { cost: 10000, days: 0.5 },
      suez: { cost: { HANDC37: 120000, MR50: 170000, LR1_75: 350000, LR2_115: 450000 }, days: 1.0 },
    },
  },

  // ── Distance Matrix (nm) ──
  distances: {
    // === Opening positions → Tuapse (BS load port) ===
    // Black Sea (no Bosphorus transit needed)
    "Constanta|Tuapse":      350,
    // Med + others (Bosphorus transit needed — cost added in bosphorusLegs)
    "Istanbul|Tuapse":       650,
    "Piraeus|Tuapse":        1000,
    "Augusta|Tuapse":        1600,
    "Lavera|Tuapse":         2200,
    "Algeciras|Tuapse":      2800,
    "Rotterdam|Tuapse":      4200,
    "Las Palmas|Tuapse":     3500,
    "Dakar|Tuapse":          4400,
    "Accra|Tuapse":          5000,
    "Lagos|Tuapse":          4800,
    "Fujairah|Tuapse":       4200,    // via Suez + Med + Bosphorus
    "Durban|Tuapse":         5800,    // via Cape → Med → Bosphorus

    // === Opening positions → Competition load ports ===
    // → Houston (TC14)
    "Constanta|Houston":     5800,
    "Istanbul|Houston":      5400,
    "Piraeus|Houston":       5600,
    "Augusta|Houston":       5400,
    "Lavera|Houston":        5200,
    "Algeciras|Houston":     4200,
    "Rotterdam|Houston":     4890,
    "Las Palmas|Houston":    4100,
    "Dakar|Houston":         4500,
    "Accra|Houston":         5800,
    "Lagos|Houston":         5500,
    "Fujairah|Houston":      8800,
    "Durban|Houston":        7600,

    // → Rotterdam (TC2)
    "Rotterdam|Rotterdam":   0,       // self — vessel already at load port
    "Constanta|Rotterdam":   3600,
    "Istanbul|Rotterdam":    3200,
    "Piraeus|Rotterdam":     3400,
    "Augusta|Rotterdam":     3200,
    "Lavera|Rotterdam":      2100,
    "Algeciras|Rotterdam":   1900,
    "Las Palmas|Rotterdam":  1700,
    "Dakar|Rotterdam":       2800,
    "Accra|Rotterdam":       3600,
    "Lagos|Rotterdam":       4100,
    "Fujairah|Rotterdam":    6200,
    "Durban|Rotterdam":      6400,

    // → Skikda (TC6)
    "Constanta|Skikda":      1400,
    "Istanbul|Skikda":       1100,
    "Piraeus|Skikda":        900,
    "Augusta|Skikda":        500,
    "Lavera|Skikda":         430,
    "Algeciras|Skikda":      600,
    "Rotterdam|Skikda":      2250,
    "Las Palmas|Skikda":     1200,
    "Dakar|Skikda":          2200,
    "Accra|Skikda":          3100,
    "Lagos|Skikda":          3300,
    "Fujairah|Skikda":       4000,
    "Durban|Skikda":         5900,

    // → Ras Tanura (TC5 / TC17)
    "Constanta|Ras Tanura":  4600,    // via Bosphorus + Med + Suez
    "Istanbul|Ras Tanura":   4200,    // via Med + Suez
    "Piraeus|Ras Tanura":    3700,    // via Med + Suez
    "Augusta|Ras Tanura":    4000,    // via Med + Suez
    "Lavera|Ras Tanura":     4400,    // via Med + Suez
    "Algeciras|Ras Tanura":  4800,    // via Med + Suez (or via Suez + Red Sea)
    "Rotterdam|Ras Tanura":  6200,    // via Suez
    "Las Palmas|Ras Tanura": 5600,    // via Suez
    "Dakar|Ras Tanura":      6400,    // via Cape or via Suez
    "Accra|Ras Tanura":      6800,    // via Cape
    "Lagos|Ras Tanura":      6600,    // via Cape
    "Fujairah|Ras Tanura":   200,
    "Durban|Ras Tanura":     3400,

    // → Mundra (TC12)
    "Constanta|Mundra":      5200,    // via Bosphorus + Med + Suez + Arabian Sea
    "Istanbul|Mundra":       4800,    // via Med + Suez + Arabian Sea
    "Piraeus|Mundra":        4300,    // via Med + Suez + Arabian Sea
    "Augusta|Mundra":        4600,    // via Med + Suez + Arabian Sea
    "Lavera|Mundra":         5000,    // via Med + Suez + Arabian Sea
    "Algeciras|Mundra":      5400,    // via Med + Suez + Arabian Sea
    "Rotterdam|Mundra":      6800,    // via Suez + Arabian Sea
    "Las Palmas|Mundra":     6200,    // via Suez
    "Dakar|Mundra":          7000,    // via Cape or Suez
    "Accra|Mundra":          7400,    // via Cape
    "Lagos|Mundra":          7200,    // via Cape
    "Fujairah|Mundra":       900,     // Arabian Sea direct
    "Durban|Mundra":         3600,    // via Indian Ocean

    // === Black Sea laden voyage ===
    "Tuapse|Taman":          100,     // coastal hop in Black Sea
    "Taman|Mundra":          4500,    // via Bosphorus + Suez
    "Taman|Kandla":          4600,
    "Taman|Chennai":         5100,    // via Suez + around India
    "Taman|Haldia":          5600,
    "Mundra|Kandla":         150,     // coastal WCI
    "Chennai|Haldia":        700,     // coastal ECI

    // === Post-discharge ballast to AG ===
    "Mundra|Ras Tanura":     1200,
    "Kandla|Ras Tanura":     1250,
    "Chennai|Ras Tanura":    2800,
    "Haldia|Ras Tanura":     3500,

    // === TC route laden distances ===
    "Houston|Amsterdam":     4850,
    "Rotterdam|New York":    3460,
    "Skikda|Lavera":         430,
    "Ras Tanura|Yokohama":   6570,
    "Ras Tanura|Dar es Salaam": 3100,
    "Mundra|Yokohama":       4500,

    // === TC route ballast-back distances ===
    "Amsterdam|Rotterdam":   60,
    "New York|Houston":      1610,
    "Lavera|Skikda":         430,
    "Lavera|Rotterdam":      2100,
    "Dar es Salaam|Ras Tanura": 3100,
    "Yokohama|Ras Tanura":   6570,
    "Yokohama|Mundra":       4500,
  },

  // ── Port Costs (USD per call) ──
  portCosts: {
    // Black Sea
    "Tuapse":         45000,
    "Taman":          35000,
    // Med
    "Constanta":      40000,
    "Piraeus":        35000,
    "Augusta":        35000,
    "Algeciras":      35000,
    // Existing
    "Mundra":         50000,
    "Kandla":         50000,
    "Chennai":        55000,
    "Haldia":         55000,
    "Ras Tanura":     35000,
    "Houston":        37000,
    "Amsterdam":      60000,
    "Rotterdam":      44000,
    "New York":       41000,
    "Skikda":         25000,
    "Lavera":         30000,
    "Yokohama":       50000,
    "Dar es Salaam":  35000,
    "Fujairah":       30000,
    "Durban":         45000,
    "Las Palmas":     30000,
    "Lagos":          55000,
    "Dakar":          35000,
    "Istanbul":       45000,
    "Accra":          35000,
  },

  // ── Canal Costs (vessel-class specific for Suez) ──
  canalCosts: {
    suez_laden:   { HANDC37: 120000, MR50: 170000, LR1_75: 350000, LR2_115: 450000 },
    suez_ballast: { HANDC37: 100000, MR50: 140000, LR1_75: 280000, LR2_115: 360000 },
    suez_days:    1.0,
    bosphorus_laden:   10000,    // Montreux Convention: no toll, agency/pilotage only
    bosphorus_ballast: 8000,
    bosphorus_days: 0.5,
    panama_ballast: 150000,
    panama_waitDays: 2.0,
  },

  // ── Panama Canal Legs ──
  panamaLegs: {
    // none for Black Sea tool
  },

  // ── Bosphorus Transit Legs (ballast entering/exiting Black Sea) ──
  bosphorusLegs: {
    // Ballast TO Tuapse — all non-Black-Sea positions
    "Istanbul|Tuapse":     true,
    "Piraeus|Tuapse":      true,
    "Augusta|Tuapse":      true,
    "Lavera|Tuapse":       true,
    "Algeciras|Tuapse":    true,
    "Rotterdam|Tuapse":    true,
    "Las Palmas|Tuapse":   true,
    "Dakar|Tuapse":        true,
    "Accra|Tuapse":        true,
    "Lagos|Tuapse":        true,
    "Fujairah|Tuapse":     true,
    "Durban|Tuapse":       true,
    // Ballast FROM Black Sea to competition ports
    "Constanta|Houston":   true,
    "Constanta|Rotterdam": true,
    "Constanta|Skikda":    true,
    "Constanta|Ras Tanura": true,
    "Constanta|Mundra":    true,
  },

  // ── Suez Transit Legs (ballast through Suez) ──
  suezBallastLegs: {
    "Fujairah|Tuapse":     true,    // AG → Med → Black Sea
    "Fujairah|Houston":    true,    // AG → Suez → Med → Atlantic
    "Fujairah|Rotterdam":  true,
    "Fujairah|Skikda":     true,
    // Med/Atlantic/WAF → Ras Tanura or Mundra via Suez
    "Constanta|Ras Tanura": true,
    "Istanbul|Ras Tanura":  true,
    "Piraeus|Ras Tanura":   true,
    "Augusta|Ras Tanura":   true,
    "Lavera|Ras Tanura":    true,
    "Algeciras|Ras Tanura": true,
    "Rotterdam|Ras Tanura": true,
    "Las Palmas|Ras Tanura":true,
    "Constanta|Mundra":     true,
    "Istanbul|Mundra":      true,
    "Piraeus|Mundra":       true,
    "Augusta|Mundra":       true,
    "Lavera|Mundra":        true,
    "Algeciras|Mundra":     true,
    "Rotterdam|Mundra":     true,
    "Las Palmas|Mundra":    true,
  },
};
