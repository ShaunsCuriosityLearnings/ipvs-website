import { getMediaUrl } from '../utils/media';

export interface AdvisoryMember {
  id: string;
  name: string;
  designation: string;
  company: string;
  category: 'advisory' | 'technical';
  image?: string;
  companyLogo?: string;
}

export interface StallOption {
  type: 'bare' | 'shell';
  title: string;
  description: string;
  features: string[];
  recommendedFor: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Exhibitors' | 'Visitors' | 'Venue & Timings';
}

export interface IndustrySector {
  name: string;
  iconName: string;
  description: string;
}

export const EVENT_DETAILS = {
  title: "IPVS 2026",
  subTitle: "Industrial Pumps, Valves & Process Systems Exhibition",
  focusHeadline: "Ethanol, Pharma & Water Sectors | Pumps, Valves & Automation",
  focusSectors: "Pumps, Valves | Oil & Gas | Pharma | Water | Chemicals | Power | Steel | Food | Cement | EPC | OEM",
  organizer: "Orbit Exhibitions Pvt. Ltd.",
  organizerAddress: "103, Navyug Industrial Estate, Tokershi Jivraj Rd, Sewri, Mumbai, Maharashtra 400015",
  email: "info@orbitexhibitions.com",
  phone: "+91 22 2410 2801",
  dates: "03 - 04 December 2026",
  startDateISO: "2026-12-03T10:00:00+05:30",
  timings: "10:00 AM - 6:00 PM IST",
  venue: "HITEX Exhibition Center",
  location: "Izzat Nagar, Hyderabad – 500 084, Telangana, India",
  stats: [
    { label: "Expected Visitors", value: "+7000 visitors", change: "+25% YoY" },
    { label: "Leading Exhibitors", value: "100+ Exhibitors", change: "Global & Domestic" },
    { label: "Focus Sectors", value: "Ethanol, Pharma & Water", change: "Core Demand" },
    { label: "Key Industries", value: "11 Priority Sectors", change: "Full Supply Chain" }
  ],
  brochureUrl: "https://ipvs.in/wp-content/uploads/2026/04/IPVS_Brochure_2026.pdf"
};

export const ADVISORY_BOARD: AdvisoryMember[] = [
  {
    id: "advisory-1",
    name: "Shankar Rajaram",
    designation: "Director",
    company: "GRUNDFOS PUMPS INDIA PVT LTD",
    category: "advisory",
    image: "/advisory member/shankar rajaram - grundfos.webp",
    companyLogo: "/Logo/Grundfos Pumps India Pvt Ltd.PNG"
  },
  {
    id: "advisory-2",
    name: "Praveen Singh",
    designation: "Vice President (Pumps)",
    company: "ANDRITZ TECHNOLOGIES PVT. LTD.",
    category: "advisory",
    image: "/advisory member/praveen singh.png",
    companyLogo: "/Logo/andritz-logo-icon (1).webp"
  },
  {
    id: "advisory-3",
    name: "Nishit Doshi",
    designation: "Managing Director",
    company: "FIVEBRO WATER SERVICES PVT. LTD.",
    category: "advisory",
    image: "/advisory member/nishit doshi.png",
    companyLogo: "/Logo/Fivebro Water Services Pvt Ltd.webp"
  },
  {
    id: "advisory-4",
    name: "Abbas Lehry",
    designation: "Managing Director",
    company: "LEHRY INSTRUMENTATION & VALVES",
    category: "advisory",
    image: "/advisory member/abbas lehry.png",
    companyLogo: "/Logo/LEHRY INSTRUMENTATION & VALVES.png"
  },
  {
    id: "advisory-5",
    name: "Bhupesh Deshmukh",
    designation: "President Sales - Domestic",
    company: "BDK Valve Pvt. Ltd.",
    category: "advisory",
    image: "/advisory member/Bhupesh_Deshmukh.jpg",
    companyLogo: "/Logo/bdk.png"
  },
  {
    id: "advisory-6",
    name: "Chandrashekhar Thakurdesai",
    designation: "AVP and Segment Head",
    company: "WILO Mather & Platt Pumps Pvt Ltd",
    category: "advisory",
    image: "/advisory member/Chandrashekhar_Thakurdesai.jpg",
    companyLogo: "/Logo/wilo.png"
  },
  {
    id: "advisory-7",
    name: "Divyang Rajput",
    designation: "General Manager",
    company: "Delval Flow Controls",
    category: "advisory",
    image: "/advisory member/Divyang_rajput.jpg",
    companyLogo: "/Logo/Delval Flow Controls.png"
  },
  {
    id: "advisory-8",
    name: "Rupen Vikamsey",
    designation: "Managing Director",
    company: "Orbit Exhibitions Pvt. Ltd.",
    category: "advisory",
    image: "/advisory member/rupen-sir.jpg.jpeg",
    companyLogo: "/Logo/orbit.png"
  },
  {
    id: "advisory-9",
    name: "Shashi Shankar Naik",
    designation: "Project Director",
    company: "Kiron Hydraulic Needs Pvt. Ltd.",
    category: "technical",
    image: "/advisory member/Shashi Shankar Naik​​.jpg",
    companyLogo: "/Logo/kiron.png"
  },
  {
    id: "advisory-10",
    name: "Ranganath N.K.",
    designation: "Business Leader & Independent Director",
    company: "Industry Leader & Independent Director",
    category: "advisory",
    image: "/advisory member/Ranganath N.K..jpg",
  },
  {
    id: "advisory-11",
    name: "S. L. Abhyankar",
    designation: "Project Director",
    company: "IPVS Technical Committee",
    category: "technical",
    image: "/advisory member/S. L. Abhyankar​.webp",

  }
].map(m => ({
  ...m,
  image: m.image ? getMediaUrl(m.image) : undefined,
  companyLogo: m.companyLogo ? getMediaUrl(m.companyLogo) : undefined
})) as AdvisoryMember[];

export const STALL_OPTIONS: StallOption[] = [
  {
    type: "bare",
    title: "Bare Space Stall",
    description: "Ideal for companies looking to build a fully customized exhibition stall experience tailored to brand guidelines.",
    recommendedFor: "Large OEMs, custom booth builders, and high-impact live machinery demonstrations.",
    features: [
      "Open raw floor space for custom stall construction",
      "Maximum flexibility in height, branding, and layout",
      "Suitable for heavy machinery and live demo rigs",
      "Additional electrical points & utilities available on demand",
      "Full access to exhibitor technical support services"
    ]
  },
  {
    type: "shell",
    title: "Standard Shell Scheme",
    description: "A plug-and-play Octanorm shell booth pre-built with standard furniture, lighting, and company fascia.",
    recommendedFor: "SMEs, component manufacturers, component suppliers, and ready-to-exhibit teams.",
    features: [
      "Standard Octanorm wall panels (rear & side)",
      "Printed Fascia board with Company Name & Stand Number",
      "Wall-to-wall carpet flooring",
      "1 x 5-Amp power socket included",
      "3 x High-efficiency LED spotlights",
      "1 x Furniture set (1 Table, 2 Chairs, 1 Waste Bin)",
      "Ready for immediate pull-up banner display"
    ]
  }
];

export const SQM_SIZES = [9, 12, 18, 36, 54, 72];

export const SMART_VALVE_TECH = [
  {
    title: "Smart Control Valves",
    desc: "Intelligent valve systems designed for precise flow regulation, digital calibration, and automated safety trips."
  },
  {
    title: "Electric & Pneumatic Actuators",
    desc: "High-torque, fast-acting actuator assemblies delivering reliable automated valve operation."
  },
  {
    title: "Digital Valve Positioners",
    desc: "Smart positioning systems providing HART/Foundation Fieldbus diagnostics and real-time accuracy."
  },
  {
    title: "Industrial IoT Integration",
    desc: "Connected valve networks enabling remote condition monitoring, cloud telemetry, and predictive alerts."
  },
  {
    title: "SCADA & DCS Integration",
    desc: "Seamless protocol integration with central plant control rooms for centralized optimization."
  },
  {
    title: "Predictive Condition Monitoring",
    desc: "Advanced diagnostic sensors that predict seat wear, stem friction, and prevent unscheduled shutdowns."
  }
];

export const SMART_PUMP_TECH = [
  {
    title: "Smart IoT Pumps",
    desc: "Connected centrifugal and positive displacement pumps equipped with vibration and thermal sensors."
  },
  {
    title: "Predictive Analytics & Diagnostics",
    desc: "Algorithmic monitoring detecting cavitation, bearing wear, and seal degradation before failure."
  },

  {
    title: "Smart VFD Pump Controllers",
    desc: "Variable frequency drives optimizing speed based on dynamic process flow demand, saving energy."
  },
  {
    title: "Cloud Telemetry Platforms",
    desc: "Centralized multi-plant dashboard offering live pressure, flow, and efficiency metrics."
  },
  {
    title: "Digital Twin Simulations",
    desc: "Virtual hydraulic modeling allowing engineers to test flow scenarios without process downtime."
  },
  {
    title: "Industrial IoT Edge Devices",
    desc: "Ruggedized hardware edge nodes processing sensor data directly at the pump casing."
  }
];

export const TARGET_INDUSTRIES: IndustrySector[] = [
  { name: "Ethanol & Biofuels", iconName: "Flame", description: "Distilleries, bio-ethanol plants, bio-CNG & blending facilities." },
  { name: "Pharma & Biotech", iconName: "Pill", description: "API manufacturing, sterile fluid handling, cleanrooms, formulations." },
  { name: "Water & Wastewater", iconName: "Droplets", description: "Desalination, ETP/STP plants, municipal distribution, zero liquid discharge." },
  { name: "Pumps, Valves & Automation", iconName: "Sliders", description: "Industrial pumps, control valves, actuators, smart flow instrumentation." },
  { name: "Oil & Gas", iconName: "Fuel", description: "Offshore exploration, refinery operations, cross-country pipeline terminals." },
  { name: "Chemicals & Petrochemicals", iconName: "FlaskConical", description: "Specialty chemicals, polymers, fertilizers, industrial solvents." },
  { name: "Power Generation", iconName: "Zap", description: "Thermal, nuclear, pumped hydro, solar thermal, boiler feed loops." },
  { name: "Steel & Metallurgy", iconName: "Factory", description: "Blast furnace cooling, rolling mills, pickling line fluid circuits." },
  { name: "Food, Beverage & Dairy", iconName: "Utensils", description: "Sanitary pumps, pasteurization, homogenizers, bottling automation." },
  { name: "Cement & Minerals", iconName: "Layers", description: "Slurry handling, dewatering systems, kiln cooling, raw mill grinding." },
  { name: "EPC Contractors", iconName: "Building2", description: "Turnkey plant engineering, procurement, construction & process design." },
  { name: "OEM & System Integrators", iconName: "Cpu", description: "Original equipment manufacturing, skid builders & industrial automation." }
];

export const FAQS: FAQItem[] = [
  {
    id: "faq-1",
    question: "What are the exact dates and location of IPVS 2026?",
    answer: "IPVS 2026 will take place on December 03 - 04, 2026 at the HITEX Exhibition Center, Izzat Nagar, Hyderabad – 500 084, Telangana, India. Timings are 10:00 AM to 6:00 PM daily.",
    category: "Venue & Timings"
  },
  {
    id: "faq-2",
    question: "Is visitor registration free or paid?",
    answer: "Visitor entry for trade professionals, plant engineers, EPC consultants, and industrial buyers is completely FREE upon pre-registration on our website.",
    category: "Visitors"
  },
  {
    id: "faq-3",
    question: "How can I inquire about booking an exhibitor stall?",
    answer: "Exhibitors can choose between Bare Space custom setups and Standard Shell Scheme booths. Contact our sales team or submit an inquiry form on our website to receive stall availability, layout options, and technical specifications.",
    category: "Exhibitors"
  },
  {
    id: "faq-4",
    question: "Who is organizing the IPVS Exhibition?",
    answer: "The exhibition is organized by Orbit Exhibitions Pvt. Ltd., headquartered in Mumbai, India, with over two decades of experience organizing flagship B2B industrial trade shows.",
    category: "General"
  },
  {
    id: "faq-5",
    question: "What are the primary industry sectors focused at IPVS 2026?",
    answer: "IPVS 2026 is mainly focused towards Pumps, Valves & Automation across Ethanol, Pharma & Water Sectors, as well as Oil & Gas, Chemicals, Power, Steel, Food, Cement, EPC, and OEMs.",
    category: "General"
  },
  {
    id: "faq-6",
    question: "What amenities are included in the Shell Scheme booth?",
    answer: "Shell scheme includes standard Octanorm wall panels, fascia board with your company name & stand number, carpet, 1 x 5A socket, 3 LED spotlights, waste bin, and 1 table with 2 chairs.",
    category: "Exhibitors"
  }
];

export interface ExhibitorItem {
  id: string;
  name: string;
  sector: string;
  booth: string;
  logo: string;
  image: string;
  description: string;
  country: string;
  featured: boolean;
}

export const ESTEEMED_EXHIBITORS: ExhibitorItem[] = [
  {
    id: "ex-1",
    name: "Bell-o-Seal Valves Private Limited",
    sector: "Bellow Sealed Valves",
    booth: "Hall 2 - Booth E110",
    logo: "/Logo/bell-o-seal.webp",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
    description: "Zero-leakage bellow seal valves for hazardous chemical, ethanol, and nuclear power applications.",
    country: "India",
    featured: true
  },
  {
    id: "ex-2",
    name: "Grundfos Pumps India Pvt Ltd",
    sector: "Pumps & Water Solutions",
    booth: "Hall 1 - Booth A102",
    logo: "/Logo/Grundfos Pumps India Pvt Ltd.PNG",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description: "Global leader in advanced pump solutions and energy-efficient water technologies for process industries.",
    country: "Denmark / India",
    featured: true
  },
  {
    id: "ex-3",
    name: "Ti Anode Fabricators Pvt.Ltd.",
    sector: "Specialty Electrodes",
    booth: "Hall 3 - Booth B301",
    logo: "/Logo/Ti Anode Fabricators Pvt.Ltd..webp",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
    description: "Titanium anode and cathode fabrications for chemical electrolysis and electro-chlorination.",
    country: "India",
    featured: true
  },
  {
    id: "ex-4",
    name: "Sandoz Valves (India) Pvt Ltd",
    sector: "Process Control Valves",
    booth: "Hall 2 - Booth C405",
    logo: "/Logo/Sandoz Valves (India) Pvt Ltd.png",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    description: "High-performance stainless steel valves for pharmaceutical and bio-ethanol processing plants.",
    country: "India",
    featured: true
  },
  {
    id: "ex-5",
    name: "Fivebro Water Services Pvt Ltd",
    sector: "Water Treatment Systems",
    booth: "Hall 2 - Booth D201",
    logo: "/Logo/Fivebro Water Services Pvt Ltd.webp",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    description: "Comprehensive industrial water treatment, reverse osmosis, and zero liquid discharge solutions.",
    country: "India",
    featured: true
  },
  {
    id: "ex-6",
    name: "Adinath Extrusion Private Limited",
    sector: "Extrusion Machinery",
    booth: "Hall 3 - Booth C110",
    logo: "/Logo/Adinath Extrusion Private Limited.jpeg",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    description: "Industrial extrusion lines and specialized plastic pipe manufacturing systems.",
    country: "India",
    featured: true
  },
  {
    id: "ex-7",
    name: "AIP Industries",
    sector: "Precision Engineering",
    booth: "Hall 3 - Booth A105",
    logo: "/Logo/AIP Industries.png",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    description: "Heavy duty industrial pump components, impellers, and custom alloy casting.",
    country: "India",
    featured: true
  },
  {
    id: "ex-8",
    name: "Brevera Technologies Pvt Ltd",
    sector: "IIoT Telemetry Solutions",
    booth: "Hall 2 - Booth E302",
    logo: "/Logo/Brevera Technologies Pvt Ltd.png",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description: "Smart wireless vibration and acoustic sensors for predictive pump maintenance.",
    country: "India",
    featured: true
  },
  {
    id: "ex-9",
    name: "The Supreme Industries Limited",
    sector: "Piping & Valves Systems",
    booth: "Hall 1 - Booth C105",
    logo: "/Logo/The Supreme Industries Limited.png",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    description: "India's leading plastic piping system and industrial fluid handling manufacturer.",
    country: "India",
    featured: true
  },
  {
    id: "ex-10",
    name: "Buchiglas India Private Limited",
    sector: "Chemical Reactor Systems",
    booth: "Hall 1 - Booth A308",
    logo: "/Logo/Buchiglas India Private Limited.jpg",
    image: "https://images.unsplash.com/photo-1542744094-3a3172720202?auto=format&fit=crop&w=600&q=80",
    description: "Swiss engineered glass reactors and pressure reaction equipment for pharmaceutical synthesis.",
    country: "Switzerland / India",
    featured: true
  },
  {
    id: "ex-11",
    name: "Hitech Dynamic Controls Private Limited",
    sector: "Process Control & Instrumentation",
    booth: "Hall 1 - Booth B118",
    logo: "/Logo/Hitech Dynamic Controls Private Limited (2).jpeg",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description: "Advanced hydraulic controllers, digital positioners, and automated process valve telemetry.",
    country: "India",
    featured: true
  },
  {
    id: "ex-12",
    name: "Lucas Tvs Limited",
    sector: "Electrical Motors & Drives",
    booth: "Hall 1 - Booth E202",
    logo: "/Logo/lucas TVS.PNG",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    description: "High efficiency electric drive motors and pumps powering industrial automation.",
    country: "India",
    featured: true
  },
  {
    id: "ex-13",
    name: "JK Seals India Pvt Ltd",
    sector: "Mechanical Seals & Gaskets",
    booth: "Hall 2 - Booth A401",
    logo: "/Logo/JK SEAL LOGO -fINAL.jpg",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80",
    description: "Engineered mechanical seals, cartridge seals, and high-temp gland packing.",
    country: "India",
    featured: true
  },
  {
    id: "ex-14",
    name: "Rajeev and Company (Kavaata Valves)",
    sector: "Industrial Control Valves",
    booth: "Hall 2 - Booth B112",
    logo: "/Logo/Kavaata Valves.PNG",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80",
    description: "Precision engineered ball, butterfly, and check valves designed for demanding process conditions.",
    country: "India",
    featured: true
  },
  {
    id: "ex-15",
    name: "Triumph Engineers & Associates Pvt. Ltd.",
    sector: "EPC & Skid Systems",
    booth: "Hall 1 - Booth D208",
    logo: "/Logo/Triumph Engineers & Associates Pvt. Ltd..PNG",
    image: "https://images.unsplash.com/photo-1542744094-3a3172720202?auto=format&fit=crop&w=600&q=80",
    description: "Turnkey industrial pumping skids, piping engineering, and plant automation consultancy.",
    country: "India",
    featured: true
  },
  {
    id: "ex-16",
    name: "Swatika Industries",
    sector: "Heavy Duty Pumps",
    booth: "Hall 3 - Booth D102",
    logo: "/Logo/swastika.jpeg",
    image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=600&q=80",
    description: "High capacity centrifugal and slurry pumps for steel and power plants.",
    country: "India",
    featured: true
  },
  {
    id: "ex-17",
    name: "Sumatic Flow Controls Pvt Ltd",
    sector: "Process Automation",
    booth: "Hall 1 - Booth F204",
    logo: "/Logo/Sumatic.jpeg",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=600&q=80",
    description: "Pneumatic positioners, solenoid valves, and plant SCADA integration.",
    country: "India",
    featured: true
  },
  {
    id: "ex-18",
    name: "RS Corrosion Resistant Alloys",
    sector: "Specialty Alloys & Metals",
    booth: "Hall 3 - Booth C205",
    logo: "/Logo/RS Corrosion Resistant Alloys.jpg",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=600&q=80",
    description: "High performance nickel alloy fittings, titanium piping, and corrosion-resistant valves.",
    country: "India",
    featured: true
  }
].map(e => ({
  ...e,
  logo: getMediaUrl(e.logo)
}));

export interface MediaPartner {
  id: string;
  name: string;
  category: string;
  logo: string;
  website?: string;
}

export const MEDIA_PARTNERS: MediaPartner[] = [
  { 
    id: "mp-1", 
    name: "Chemical Industry Digest", 
    category: "Pioneer Chemical & Process Journal", 
    logo: "/mediapartners/chemical-industry-digest.png",
    website: "https://chemindigest.com"
  },
  { 
    id: "mp-2", 
    name: "Spicos Media", 
    category: "Chemical & Industrial Process Media", 
    logo: "/mediapartners/Spicos.PNG",
    website: "https://www.spicos.com"
  },
  { 
    id: "mp-3", 
    name: "Mantonia", 
    category: "Industrial Engineering & Machinery Media", 
    logo: "/mediapartners/mantonia.PNG"
  }
].map(p => ({
  ...p,
  logo: getMediaUrl(p.logo)
}));

export interface BlogSection {
  heading: string;
  content: string[];
  bulletPoints?: string[];
  callout?: string;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  pullQuote?: string;
  seoTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  authorRole: string;
  authorAvatar?: string;
  type: 'exhibitor' | 'visitor' | 'technology';
  date: string;
  readTime: string;
  image: string;
  tags: string[];
  keyTakeaways: string[];
  sections: BlogSection[];
  faq: BlogFaq[];
  ctaType: 'exhibitor' | 'visitor';
}

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: "blog-1",
    slug: "smart-indian-pump-manufacturers-tco",
    title: "The World Isn't Looking for Cheap Pumps Anymore. It's Looking for Smarter Indian Manufacturers.",
    subtitle: "Why global procurement has abandoned low-cost casting arbitrage in favor of Total Cost of Ownership (TCO), edge telemetry, and predictive uptime.",
    pullQuote: "When an unscheduled shutdown costs a refinery or municipal utility tens of thousands of dollars per hour, a low initial purchase price means absolutely nothing. The hunt for the lowest quote is officially over. The hunt for the smartest engineering partner has begun.",
    seoTitle: "The World Isn't Looking for Cheap Pumps Anymore: Smarter Indian Engineering | IPVS 2026",
    metaDescription: "Global buyers are no longer seeking discount pumps. Explore why Total Cost of Ownership (TCO), IoT telemetry, and smart Indian fluid engineering dominate modern procurement at IPVS 2026.",
    excerpt: "For decades, India was viewed as a destination for capex discount arbitrage. Today, international buyers demand high-efficiency metallurgy, IoT telemetry, and zero unplanned downtime.",
    content: "For decades, the global narrative around Indian manufacturing was dominated by a single metric: cost-efficiency. India was viewed as a destination for capital expenditure arbitrage—the place you went when the primary budget was tight. But a massive paradigm shift has occurred in fluid mechanics and industrial flow control. Global buyers have realized a painful operational truth: when an unscheduled shutdown costs a refinery or municipal utility tens of thousands of dollars per hour, a low initial purchase price means absolutely nothing.",
    category: "Smart Fluid Handling & Export Strategy",
    author: "Orbit Technical Research Desk",
    authorRole: "Fluid Dynamics & Global B2B Sourcing Analyst",
    authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    type: "exhibitor",
    date: "28 Jan 2026",
    readTime: "6 min read",
    image: "/blogs/smart-indian-pumps-tco.png",
    tags: ["Smart Pumps", "Make in India", "Total Cost of Ownership", "Industrial IoT", "IPVS 2026", "Export Manufacturing", "Flow Control"],
    keyTakeaways: [
      "Global procurement has decisively shifted from initial capex discount hunting to Total Cost of Ownership (TCO) and lifecycle energy efficiency.",
      "In heavy process industries, electricity accounts for 85% of an industrial pump's lifecycle cost, while the initial purchase price accounts for only 5%.",
      "Indian manufacturers are replacing commoditized cast iron with high-nickel alloys, computational fluid dynamics (CFD), and integrated vibration sensors.",
      "International EPC contractors require physical verification, live capability demonstrations, and vetted validation on the IPVS 2026 exhibition floor."
    ],
    sections: [
      {
        heading: "The Paradigm Shift in Fluid Mechanics & Global Procurement",
        content: [
          "For decades, international procurement heads flew into industrial hubs with a single mandate: find the lowest quote. If a cast-iron centrifugal pump could move fluid from Point A to Point B at a 30% discount compared to European or American counterparts, the purchase order was issued.",
          "Today, that procurement playbook is obsolete. In continuous process industries—such as petrochemical refining, pharmaceutical synthesis, supercritical thermal power, and municipal water distribution—a single hour of unscheduled downtime bleeds between $20,000 and $75,000 in lost production, safety liabilities, and emergency remediation.",
          "Industrial buyers have recognized that a 'cheap pump' is often the single most expensive mistake a plant director can make. Total Cost of Ownership (TCO), energy optimization, and predictive uptime are the only metrics that matter."
        ],
        callout: "Purchase price represents less than 8% of an industrial pump's lifecycle cost. Energy consumption represents over 80%, and maintenance absorbs the rest."
      },
      {
        heading: "The Mathematical Fallacy of 'Low-Cost' Hardware",
        content: [
          "Consider a standard 75 kW continuous-duty slurry or chemical process pump running 8,000 hours annually. Over a typical 15-year operational lifecycle, the electricity consumed exceeds the original capital equipment cost by more than 10 to 15 times.",
          "When equipment operates just 3% below optimal hydraulic efficiency due to primitive impeller profiling or loose mechanical tolerances, that single inefficiency wastes more money in utility bills within 24 months than the entire initial purchase discount."
        ],
        bulletPoints: [
          "Energy Consumption: 80% – 85% of 15-year TCO",
          "Maintenance & Spare Parts: 10% – 15% of 15-year TCO",
          "Initial Capital Equipment Cost: Only 5% – 8% of 15-year TCO",
          "Unscheduled Downtime Cost: Infinite liability capable of wiping out quarterly EBITDA"
        ]
      },
      {
        heading: "The Risk of Being Invisible to the Global Supply Chain",
        content: [
          "Indian pump and valve manufacturers have aggressively stepped up to this global standard. Across industrial corridors in Coimbatore, Ahmedabad, Rajkot, Pune, and Hyderabad, Indian plants are producing world-class fluid handling hardware.",
          "They are utilizing precision investment casting, super duplex stainless steels, Hastelloy-C metallurgy, and factory-integrated edge telemetry nodes that monitor bearing vibration, casing temperature, and cavitation frequencies in real time.",
          "However, possessing world-class engineering is only half the battle. If your brand is not actively showcased on international-grade platforms, the global supply chain will continue to look past you. High-level EPC decision-makers and international procurement heads do not award multi-million-dollar supply contracts based on a PDF catalog or an unsolicited email. They require physical verification, live demonstrations, and face-to-face trust."
        ]
      },
      {
        heading: "Why Booking a Stall at IPVS 2026 is a Strategic Business Imperative",
        content: [
          "The Industrial Pumps and Valves Show (IPVS 2026) at HITEX Exhibition Centre in Hyderabad serves as the localized epicenter for this exact validation. It bridges the gap between forward-thinking international buyers and the Indian engineering firms that have successfully moved up the value chain.",
          "By taking an exhibition stall at IPVS, manufacturers gain three decisive commercial advantages:"
        ],
        bulletPoints: [
          "Vetted Decision-Makers: IPVS curates high-level buyer delegations, EPC contractors, and infrastructure planners with active procurement budgets.",
          "Live Capability Demonstrations: Bring your flagship smart pumps, high-pressure control valves, and IoT telemetry setups to life right in front of the project specifiers.",
          "Authoritative Brand Positioning: Position your brand alongside the elite vanguard of smart Indian manufacturing, commanding the commercial premiums your precision engineering deserves."
        ],
        callout: "Stop competing on price points. Start competing on brainpower, uptime, and energy efficiency. Secure your space at IPVS 2026."
      }
    ],
    faq: [
      {
        question: "Why has Total Cost of Ownership (TCO) superseded purchase price in pump selection?",
        answer: "Industrial process pumps consume massive amounts of electrical energy. Over a 10-15 year lifecycle, electricity accounts for more than 80% of total expenditure. High-efficiency smart pumps with precision hydraulics pay for themselves within months through power savings and downtime prevention."
      },
      {
        question: "What types of international buyers attend IPVS 2026 in Hyderabad?",
        answer: "IPVS hosts pre-qualified delegations from chemical processing, pharmaceutical manufacturing, municipal water authorities, oil & gas refineries, ethanol distilleries, and power plants across Southeast Asia, the Middle East, Africa, and Europe."
      },
      {
        question: "How does exhibiting at IPVS 2026 help Indian OEMs expand exports?",
        answer: "Exhibitors interact directly with global EPC contractors and procurement heads who require physical inspection of metallurgy, tolerance finishes, and live IoT diagnostic telemetry before approving vendors for mega-projects."
      }
    ],
    ctaType: "exhibitor"
  },
  {
    id: "blog-2",
    slug: "india-water-management-problem-smart-flow",
    title: "India Doesn't Have a Water Problem. It Has a Water Management Problem.",
    subtitle: "How Zero Liquid Discharge (ZLD), smart valve automation, and circular industrial flow systems are redefining water resilience across Indian process industries.",
    pullQuote: "The future of India's industries won't be defined by who has access to more water. It will be defined by who manages, treats, and reuses every single drop more intelligently.",
    seoTitle: "India Doesn't Have a Water Problem: Smart Industrial Flow & ZLD | IPVS 2026",
    metaDescription: "India's industrial crisis is water distribution and treatment, not absolute scarcity. Discover how Zero Liquid Discharge (ZLD), smart valves, and IoT flow grids are leading the charge at IPVS 2026.",
    excerpt: "The popular belief is that India is running out of water. But the true bottleneck is distribution losses and lack of reuse. Learn how smart pumps and ZLD are transforming industries.",
    content: "Every year, the national conversation around water becomes more urgent. Headlines warn of impending day-zero crises and shrinking reservoirs. But when you examine the industrial reality across chemical processing, textiles, pharmaceuticals, thermal power, and municipal utilities, the real challenge isn't simply the physical availability of water—it is how efficiently we move, treat, reuse, and manage it.",
    category: "Industrial Water & Wastewater Technologies",
    author: "IPVS Environmental Engineering Group",
    authorRole: "Industrial Water & Wastewater Working Committee",
    authorAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    type: "technology",
    date: "22 Jan 2026",
    readTime: "7 min read",
    image: "/blogs/water-management-ipvs.png",
    tags: ["Water Management", "Zero Liquid Discharge", "Smart Valves", "Industrial IoT", "ZLD", "Wastewater Treatment", "Circular Economy"],
    keyTakeaways: [
      "The primary bottleneck in Indian industry is not absolute water scarcity, but distribution inefficiencies, transmission losses, and low circular recycling rates.",
      "Zero Liquid Discharge (ZLD) and advanced membrane filtration are transforming industrial wastewater into a primary reliable water source.",
      "Smart modulating valves and variable frequency drives (VFDs) reduce water losses by up to 35% while slashing pumping energy consumption.",
      "62% of industrial process enterprises are actively accelerating IoT and automation adoption in pumps, valves, and flow telemetry."
    ],
    sections: [
      {
        heading: "Rethinking the Narrative: From Scarcity to Intelligent Stewardship",
        content: [
          "Water is the lifeblood of industrial manufacturing. Whether used as a solvent in active pharmaceutical ingredient (API) synthesis, cooling water in power generation, steam generation in textile processing, or washdown in food processing, modern manufacturing collapses without uninterrupted water supplies.",
          "Yet, millions of cubic meters of water are lost annually to pipeline leaks, cavitation damage, unmonitored pressure spikes, and un-recycled effluents.",
          "Forward-thinking manufacturing leaders have stopped viewing water as a low-cost utility and are now treating it as a strategic operational asset requiring closed-loop engineering."
        ],
        callout: "62% of industrial enterprises are actively accelerating IoT & automation adoption in Pumps and Valves to combat rising water scarcity."
      },
      {
        heading: "Three Critical Insights Driving Industrial Flow Transformation",
        content: [
          "Based on field research and exhibitor case studies across Indian process manufacturing clusters, three structural pillars are reshaping water management:"
        ],
        bulletPoints: [
          "Insight 01: Water Reuse is Becoming the New Water Source: Rather than drilling deeper borewells or purchasing high-cost commercial tanker supplies, plants are investing in Zero Liquid Discharge (ZLD) systems that recover 95%+ of industrial effluent for continuous recycling.",
          "Insight 02: Smart Flow Technologies Are Redefining Flow Control: Intelligent valve automation and multi-stage smart pumps dynamically modulate line pressures to eliminate hydraulic hammer, prevent pipe bursts, and eradicate non-revenue water loss.",
          "Insight 03: The Connected Water Infrastructure: IoT sensors, digital twins, and SCADA-linked analytics allow plant engineers to monitor every cubic meter in real time, detecting micro-leaks and anomalous flow drops instantaneously."
        ]
      },
      {
        heading: "Beyond Hardware: Building Connected Flow Ecosystems",
        content: [
          "Historically, plants procured pumps from one vendor, valves from another, and instrumentation from a third. The result was fragmented hardware operating without synchronicity.",
          "The modern standard is an integrated digital ecosystem. Today's smart pumps communicate directly with digital control valves and centralized SCADA platforms. When downstream demand fluctuates, intelligent positioners adjust valve orifices smoothly while pump variable-frequency drives throttle motor RPM to match exact hydraulic requirements."
        ]
      },
      {
        heading: "Connecting to IPVS 2026: Sourcing the Future of Water Technologies",
        content: [
          "At IPVS 2026 in HITEX Hyderabad, the entire water and wastewater technology value chain converges under one roof.",
          "Attendees can evaluate live operational demonstrations of high-pressure RO booster pumps, ceramic membrane filtration skids, non-clogging wastewater chopper pumps, and corrosion-resistant control valves designed for aggressive industrial effluents."
        ],
        callout: "India's industrial future depends on how intelligently we move, treat, reuse, and manage water. Meet the innovators at IPVS 2026."
      }
    ],
    faq: [
      {
        question: "What is Zero Liquid Discharge (ZLD) and why is it mandatory for heavy industries?",
        answer: "Zero Liquid Discharge is an advanced wastewater treatment process where all industrial effluent is purified and recycled, leaving zero liquid discharge into municipal water bodies. It relies on multi-stage RO, evaporators, and crystallizers driven by specialized high-pressure slurry and chemical pumps."
      },
      {
        question: "How do intelligent control valves reduce municipal and industrial water losses?",
        answer: "Smart control valves feature embedded pressure regulators that dynamically stabilize line pressure during low-demand periods. This prevents high-pressure pipe ruptures and reduces pipe leakage volume by up to 40%."
      },
      {
        question: "What water management technologies will be showcased at IPVS 2026?",
        answer: "IPVS 2026 features advanced ZLD recovery systems, self-priming sewage pumps, smart ultrasonic flow meters, digital valve positioners, and cloud-connected SCADA automation for industrial and municipal water plants."
      }
    ],
    ctaType: "visitor"
  },
  {
    id: "blog-3",
    slug: "factories-wait-equipment-fail-predictive-maintenance",
    title: "Factories That Wait for Equipment to Fail Will Soon Fall Behind.",
    subtitle: "Why 'Run-to-Failure' is an intolerable business liability in 2026, and how predictive maintenance telemetry is protecting heavy process plant margins.",
    pullQuote: "In 2026, 'Run-to-Failure' isn't a maintenance strategy. It's a business liability. When a critical process pump or high-pressure valve fails unexpectedly, the line doesn't just stop. Margins bleed. A single hour of unscheduled downtime in heavy industry can cost upwards of $50,000.",
    seoTitle: "Why Run-to-Failure is Dead: Predictive Maintenance in Fluid Handling | IPVS 2026",
    metaDescription: "Unscheduled downtime costs $50,000+ per hour. Learn how vibration telemetry, cavitation sensors, and smart valves eliminate equipment breakdowns at IPVS 2026.",
    excerpt: "In 2026, run-to-failure is no longer acceptable. Discover how forward-thinking plants use AI, cavitation telemetry, and smart valves to predict breakdowns weeks in advance.",
    content: "The cost of industrial inertia has never been higher. For decades, the standard operating procedure for many process plants was simple: run the asset until it breaks, then scramble a maintenance crew to execute emergency repairs. In a hyper-competitive, high-cost global economy with razor-thin production margins, this reactive firefighting approach is no longer sustainable.",
    category: "Predictive Maintenance & Industry 4.0",
    author: "IPVS Smart Factory Working Committee",
    authorRole: "Industry 4.0 & Reliability Engineering Desk",
    authorAvatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    type: "visitor",
    date: "15 Jan 2026",
    readTime: "6 min read",
    image: "/blogs/predictive-maintenance-valves.png",
    tags: ["Predictive Maintenance", "Smart Manufacturing", "Cavitation Detection", "Industrial IoT", "Smart Valves", "Asset Reliability", "IPVS 2026"],
    keyTakeaways: [
      "Reactive 'Run-to-Failure' maintenance destroys production schedules and costs heavy process plants over $50,000 per hour in unscheduled downtime.",
      "Edge-connected sensors monitor tri-axial vibration, bearing temperature, and acoustic cavitation to predict mechanical failure 3 to 6 weeks before breakdown.",
      "International procurement teams now evaluate digital twin readiness and SCADA interoperability when purchasing industrial pumps and control valves.",
      "Plant managers, reliability directors, and EPC heads attend IPVS 2026 to benchmark live predictive telemetry systems on the exhibition floor."
    ],
    sections: [
      {
        heading: "The High Cost of Industrial Inertia",
        content: [
          "When a primary feed pump in a chemical refinery or a high-pressure boiler feed valve in a thermal power plant fails unexpectedly, the fallout is devastating. Production lines grind to a halt, upstream synthesis batches spoil, emergency maintenance crews work overtime under hazardous conditions, and replacement parts must be expedited at exorbitant airfreight rates.",
          "Industry benchmark data demonstrates that unscheduled downtime costs heavy manufacturing plants an average of $50,000 per hour. In petrochemical complexes, the cost can easily exceed $150,000 per hour.",
          "Tomorrow's market leaders treat unscheduled equipment failure as an avoidable failure of operational strategy, not an inevitable cost of doing business."
        ],
        callout: "The future of manufacturing isn't fixing failures—it is predicting them weeks before they occur."
      },
      {
        heading: "From 'Dumb' Iron to Data-Generating Intelligence",
        content: [
          "The transition to Industry 4.0 has turned fluid handling systems—once regarded as static pieces of mechanical hardware—into intelligent, data-generating edge computing nodes.",
          "Leading pump and valve manufacturers are integrating three core sensing technologies directly into their factory assemblies:"
        ],
        bulletPoints: [
          "Tri-Axial Vibration Telemetry: Continuous high-frequency vibration monitoring detects bearing race spalling, shaft misalignment, and loose footings well before thermal heat builds up.",
          "Acoustic Cavitation Detection: High-frequency acoustic sensors identify micro-bubble implosion frequencies inside the pump casing, alerting operators to suction head starvation before impellers suffer pitting erosion.",
          "Smart Digital Valve Positioners: Continuous tracking of stem travel, actuator air pressure, and friction profiles detects packing degradation and seat leakage before flow regulation fails."
        ]
      },
      {
        heading: "Procurement Has Shifted from Hardware to Digital Twins",
        content: [
          "International EPC contractors and plant directors are no longer merely comparing pump head, flow rates, and metallurgies on a spreadsheet. They are evaluating the digital twin capabilities of the equipment.",
          "They need to know: How easily does this valve communicate with our Honeywell, Siemens, or Emerson distributed control system (DCS)? Does the pump supply native MQTT/OPC-UA telemetry? Can anomaly alerts be routed straight to the plant engineer's mobile dashboard?",
          "For manufacturers that have integrated smart sensors into their product lines, this represents a golden commercial opportunity to capture high-margin market share."
        ]
      },
      {
        heading: "Why IPVS 2026 is the Live Epicenter for Predictive Sourcing",
        content: [
          "The Industrial Pumps and Valves Show (IPVS 2026) is curated specifically to bring the decision-makers behind this industrial upgrade under one roof at HITEX Hyderabad.",
          "Plant heads, operational directors, and infrastructure planners attend IPVS with a clear mandate: find technologies that insulate their facilities against unplanned outages.",
          "Exhibiting at IPVS allows smart manufacturers to demonstrate live ROI, show buyers how predictive alerts save millions in averted downtime, and command premium pricing above commoditized competitors."
        ],
        callout: "Are your fluid systems built for the next generation of manufacturing? Stand out as an industry leader at IPVS 2026."
      }
    ],
    faq: [
      {
        question: "What are the earliest warning signs of industrial pump failure?",
        answer: "The earliest warning signs are subtle high-frequency vibration anomalies (indicating bearing micro-pitting) and ultrasonic acoustic emissions (indicating hydraulic cavitation). These signatures manifest up to 6 weeks before noticeable temperature spikes or audible noise occur."
      },
      {
        question: "Can older legacy pumps and valves be retrofitted with predictive sensors?",
        answer: "Yes. Many exhibitors at IPVS 2026 offer non-intrusive wireless IoT vibration pucks, magnetic surface temperature sensors, and smart clamp-on digital positioners that integrate onto existing equipment without line shutdowns."
      },
      {
        question: "Why should plant maintenance teams attend IPVS 2026?",
        answer: "IPVS 2026 allows maintenance directors and reliability engineers to witness live operational demonstrations of predictive telemetry, evaluate SCADA compatibility, and consult directly with factory application specialists."
      }
    ],
    ctaType: "exhibitor"
  },
  {
    id: "blog-4",
    slug: "ethanol-blending-mandate-pumps-valves",
    title: "How India's 20% Ethanol Blending Mandate is Transforming Pump & Valve Selection",
    subtitle: "Navigating abrasive mash slurries, high temperatures, and volatile bio-ethanol handling in grain-based and molasses distilleries.",
    pullQuote: "India's accelerated E20 biofuel mandate is driving multi-crore capital investments across grain distilleries and sugar mills. Handling viscous mash, stillage, and volatile bio-ethanol demands a complete overhaul of conventional metallurgy and seal designs.",
    seoTitle: "India's E20 Ethanol Mandate: Pump & Valve Selection Guide | IPVS 2026",
    metaDescription: "Discover how the 20% ethanol blending mandate in India is creating surging demand for corrosion-resistant slurry pumps, high-nickel alloy valves, and API mechanical seals.",
    excerpt: "Distilleries and ethanol refineries require specialized corrosion-resistant slurry pumps and tight shutoff valves. Learn how OEMs are adapting to the national E20 mandate.",
    content: "The Government of India's accelerated E20 ethanol blending program has spurred massive capital investments across grain-based distilleries and sugar mills. Handling viscous mash, stillage, and high-temperature bio-ethanol demands pumps with hardened mechanical seals and high-nickel alloy valves.",
    category: "Biofuels & Chemical Processing",
    author: "Rupen Vikamsey",
    authorRole: "Managing Director, Orbit Exhibitions",
    authorAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=200&q=80",
    type: "exhibitor",
    date: "10 Jan 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80",
    tags: ["Ethanol", "Slurry Pumps", "Biofuels", "Distilleries", "Process Engineering"],
    keyTakeaways: [
      "India's national E20 target requires doubling domestic distillery production capacity by 2026.",
      "Ethanol fermentation produces highly abrasive grain mash and corrosive stillage requiring hardened metallurgy (Hastelloy, SS316L, duplex).",
      "Fugitive emission control requires double mechanical seals with barrier fluid systems and zero-leakage fire-safe ball and butterfly valves.",
      "IPVS 2026 features dedicated biofuel and ethanol process engineering technology pavilions."
    ],
    sections: [
      {
        heading: "The Engineering Challenges of High-Concentration Biofuel Refining",
        content: [
          "The ambitious push to achieve 20% ethanol blending in automotive petrol across India has unlocked vast capex investments in grain-based distilleries, sugar co-generation units, and biorefineries.",
          "However, moving ethanol mash is a severe fluid mechanics challenge. Grain mash contains abrasive suspended grain particulates, high organic acid concentrations, and operating temperatures that quickly destroy standard centrifugal pump impellers and elastomer gaskets."
        ],
        callout: "E20 ethanol expansion requires pumps engineered for both severe slurry abrasion and volatile organic compound (VOC) containment."
      },
      {
        heading: "Key Metallurgy and Valve Selection Criteria",
        content: [
          "Engineers specifying equipment for modern distilleries prioritize heavy-duty open-impeller slurry pumps with silicon carbide mechanical seal faces and fire-safe quarter-turn valves compliant with API 607 standards."
        ],
        bulletPoints: [
          "Impeller Design: Vortex and semi-open impellers prevent fibrous clogging from fermented corn and broken rice mash.",
          "Metallurgy: CD4MCu, Super Duplex, and high-chromium alloys resist both erosive slurry wear and acidic corrosion.",
          "Valve Automation: Rapid emergency shutdown valves (ESDVs) with pneumatic spring-return actuators safeguard distillation columns."
        ]
      }
    ],
    faq: [
      {
        question: "Why do ethanol distilleries require specialized mechanical seals?",
        answer: "Ethanol vapors are volatile and flammable. Double mechanical seals with pressurized liquid barrier systems prevent flammable vapors from leaking into the atmospheric plant environment, ensuring fire safety and emission compliance."
      }
    ],
    ctaType: "exhibitor"
  }
];


