export interface Project { id: string; title: string; category: string; description: string; location: string; tags: string[]; visual: 'building'; images?: { src: string; alt?: string }[]; }
export interface TimelineEntry { title:string; organization:string; startDate:string; endDate?:string; location?:string; description:string; achievements:string[]; }
export const navigation = [
  { label: 'Home', id: 'home' }, { label: 'Projects', id: 'projects' },
  { label: 'About', id: 'about' }, { label: 'Expertise', id: 'expertise' },
  { label: 'Experience', id: 'experience' }, { label: 'Contact', id: 'contact' },
];
export const profile = {
  "seoDescription": "Hossein Esmaeili, senior electrical engineer in Tehran. 7+ years across 300,000+ m² of projects. Phase 2, execution and as-built drawings, and site supervision.",
  "socialImageAlt": "Hossein Esmaeili, electrical engineer in Tehran, over a conceptual illustration of building electrical drawings.",
  "name": "Hossein Esmaeili",
  "title": "Senior Electrical Engineer",
  "introduction": "I’m Hossein Esmaeili. I help developers, architects and building owners turn project requirements into coordinated electrical drawings and practical site decisions—from concept to construction.",
  "biography": {
    "specialization": "Building electrical design & supervision",
    "location": "Tehran, Iran · Projects across Iran",
    "currentRole": "Senior electrical engineer · Design & supervision",
    "interests": "Residential, commercial & office buildings"
  },
  "resumeUrl": "",
  "contact": {
    "email": "h.esmaeili1213@gmail.com",
    "phone": "09190219729",
    "phoneUrl": "tel:+989190219729",
    "endpoint": "",
    "socials": [
      {
        "label": "Instagram",
        "url": ""
      },
      {
        "label": "LinkedIn",
        "url": "https://www.linkedin.com/in/hossein-esmaeili-3935672b1/"
      },
      {
        "label": "Telegram",
        "url": "https://t.me/Hosseines1213"
      }
    ]
  },
  "heroImage": "/images/hero.webp"
};
export const themes = [
  {
    "title": "Electrical drawings",
    "text": "Drawings your construction team can work from"
  },
  {
    "title": "Project supervision",
    "text": "Technical continuity from plans to site"
  },
  {
    "title": "Technical consultation",
    "text": "Define the right scope before work begins"
  }
];
export const projects: Project[] = [
  {
    "id": "kaveh",
    "title": "Kaveh Residential · Shahr Bank",
    "category": "Residential",
    "visual": "building",
    "location": "Tehran · District 18",
    "description": "A 196-unit residential development across 18 blocks in Tehran’s District 18.",
    "tags": [
      "36,000 m²",
      "196 units · 18 blocks"
    ]
  },
  {
    "id": "municipality",
    "title": "District 21 Municipal Office",
    "category": "Office",
    "visual": "building",
    "location": "Tehran · District 21",
    "description": "A 36,000 m² municipal office building in Tehran’s District 21.",
    "tags": [
      "36,000 m²"
    ]
  },
  {
    "id": "alghadir",
    "title": "Al-Ghadir Residential Complex",
    "category": "Residential",
    "visual": "building",
    "location": "Tehran · District 18",
    "description": "A 200-unit residential complex spanning 30,000 m² in Tehran’s District 18.",
    "tags": [
      "30,000 m²",
      "200 units"
    ]
  },
  {
    "id": "mofarah",
    "title": "Mofarah Endowment Complex",
    "category": "Office & retail",
    "visual": "building",
    "location": "Tehran · District 19",
    "description": "Tehran · District 19",
    "tags": [
      "24,000 m²"
    ]
  },
  {
    "id": "bahar",
    "title": "Bahar · Execution of Imam Khomeini’s Order",
    "category": "Residential",
    "visual": "building",
    "location": "Tehran · District 5",
    "description": "Tehran · District 5",
    "tags": [
      "21,000 m²",
      "96 units"
    ]
  },
  {
    "id": "poolad",
    "title": "Poolad Plastic Injection Office",
    "category": "Office",
    "visual": "building",
    "location": "Tehran · District 13",
    "description": "Tehran · District 13",
    "tags": [
      "21,000 m²"
    ]
  },
  {
    "id": "residential21",
    "title": "District 21 Residential Complex",
    "category": "Residential",
    "visual": "building",
    "location": "Tehran · District 21",
    "description": "Tehran · District 21",
    "tags": [
      "18,000 m²",
      "112 units"
    ]
  },
  {
    "id": "mixed18",
    "title": "District 18 Mixed-use Complex",
    "category": "Residential & retail",
    "visual": "building",
    "location": "Tehran · District 18",
    "description": "Tehran · District 18",
    "tags": [
      "10,000 m²",
      "51 units"
    ]
  },
  {
    "id": "residential4",
    "title": "District 4 Residential Complex",
    "category": "Residential",
    "visual": "building",
    "location": "Tehran · District 4",
    "description": "Tehran · District 4",
    "tags": [
      "10,000 m²",
      "32 units"
    ]
  },
  {
    "id": "medical",
    "title": "District 3 Medical Building",
    "category": "Medical building",
    "visual": "building",
    "location": "Tehran · District 3",
    "description": "Tehran · District 3",
    "tags": [
      "10,000 m²"
    ]
  },
  {
    "id": "simorgh",
    "title": "Simorgh · Ministry of Interior Housing Cooperative",
    "category": "Residential",
    "visual": "building",
    "location": "Eslamshahr",
    "description": "Eslamshahr",
    "tags": [
      "12,000 m²"
    ]
  },
  {
    "id": "mixed6",
    "title": "District 6 Office & Retail Complex",
    "category": "Office & retail",
    "visual": "building",
    "location": "Tehran · District 6",
    "description": "Tehran · District 6",
    "tags": [
      "11,000 m²"
    ]
  },
  {
    "id": "molavi",
    "title": "Molavi Retail Complex",
    "category": "Retail",
    "visual": "building",
    "location": "Tehran · District 12",
    "description": "Tehran · District 12",
    "tags": [
      "9,000 m²",
      "96 units"
    ]
  },
  {
    "id": "office6",
    "title": "District 6 Office Complex",
    "category": "Office",
    "visual": "building",
    "location": "Tehran · District 6",
    "description": "Tehran · District 6",
    "tags": [
      "9,000 m²"
    ]
  },
  {
    "id": "mixed7",
    "title": "District 7 Office & Retail Complex",
    "category": "Office & retail",
    "visual": "building",
    "location": "Tehran · District 7",
    "description": "Tehran · District 7",
    "tags": [
      "8,000 m²"
    ]
  },
  {
    "id": "karbala",
    "title": "Karbala Apartment Hotel",
    "category": "Hospitality",
    "visual": "building",
    "location": "Karbala, Iraq",
    "description": "Karbala, Iraq",
    "tags": [
      "2,000 m²",
      "12 floors"
    ]
  },
];
export const capabilities = [
  {
    "title": "Phase 1 & 2 electrical design",
    "short": "From concept layouts to construction documentation.",
    "detail": "Develop electrical layouts from the architectural brief, then prepare detailed Phase 2 drawings for lighting, power distribution and cable routes. Coordinate the design with the building layout and other disciplines."
  },
  {
    "title": "Execution & as-built drawings",
    "short": "Clear drawings for installation and handover.",
    "detail": "Prepare execution drawings for the site team and update as-built records to reflect installed systems and documented site changes. Keep construction and handover information aligned."
  },
  {
    "title": "Low-voltage & low-current systems",
    "short": "Coordinate power, communication and building systems.",
    "detail": "Plan power and low-current systems around the building’s use, equipment and infrastructure requirements. Coordinate routes and installation interfaces early in the design."
  },
  {
    "title": "Fire alarm systems",
    "short": "System layouts informed by specialist training.",
    "detail": "Develop fire alarm layouts and advise on device placement, cabling and coordination with the building design. Scope the work around project requirements and the applicable local approval process."
  },
  {
    "title": "Switchboard design & calculations",
    "short": "Turn electrical loads into a defined distribution scheme.",
    "detail": "Prepare load calculations, distribution schedules and switchboard design documentation. Review equipment requirements and circuit arrangements as part of the agreed design scope."
  },
  {
    "title": "Site supervision & technical consultation",
    "short": "Support installation decisions with engineering oversight.",
    "detail": "Review electrical installation work against the project drawings, identify coordination issues and discuss technical questions with the site team. Based in Tehran, with travel for supervision and remote design collaboration available."
  }
];
export const process = [
  {
    "title": "Share your brief",
    "text": "Send your architectural plans, location, building use, approximate area and current project stage by email or Telegram."
  },
  {
    "title": "Discuss the scope",
    "text": "Identify the required systems, available drawings, site constraints and the design or supervision support you need."
  },
  {
    "title": "Agree the deliverables",
    "text": "Agree the drawing package, supervision scope, coordination responsibilities, fee and schedule before work begins."
  },
  {
    "title": "Coordinate through delivery",
    "text": "Review the work at agreed milestones and resolve technical questions with your design or construction team."
  }
];
export const experience: {title:string; empty:string; entries:TimelineEntry[]}[] = [
  {
    "title": "Professional experience",
    "empty": "",
    "entries": [
      {
        "title": "7+ years in building electrical engineering",
        "organization": "Arsh Eskan Mahestan · Arg Sazeh",
        "description": "Design and supervision experience across 300,000+ m² of building projects, including residential developments, municipal offices and commercial complexes.",
        "startDate": "",
        "achievements": []
      }
    ]
  },
  {
    "title": "Education",
    "empty": "",
    "entries": [
      {
        "title": "Bachelor’s degree in Electrical Engineering",
        "organization": "Arak University of Technology (Science & Technology)",
        "description": "",
        "startDate": "",
        "achievements": []
      }
    ]
  },
  {
    "title": "Certifications & training",
    "empty": "",
    "entries": [
      {
        "title": "Tehran Engineering Organization licence",
        "organization": "Engineering Organization membership",
        "description": "",
        "startDate": "",
        "achievements": []
      },
      {
        "title": "Fire alarm systems certificate",
        "organization": "Tehran Fire Department",
        "description": "",
        "startDate": "",
        "achievements": []
      },
      {
        "title": "Electrical panel design & calculations",
        "organization": "Pouria Sasanfar",
        "description": "",
        "startDate": "Tir 1400 (Solar Hijri)",
        "achievements": []
      },
      {
        "title": "Building electrical installation supervision",
        "organization": "Mehdi Vafaeinejad",
        "description": "",
        "startDate": "Esfand 1401 (Solar Hijri)",
        "achievements": []
      }
    ]
  }
];
export const skills = [
  {
    "category": "Engineering software",
    "tools": ["AutoCAD", "DIALux"]
  },
  {
    "category": "Design documentation",
    "tools": [
      "Phase 2 drawings",
      "Execution drawings",
      "As-built documentation"
    ]
  },
  {
    "category": "Consultation areas",
    "tools": [
      "Lighting",
      "Cabling",
      "Fire alarm",
      "Low-current systems"
    ]
  }
];
