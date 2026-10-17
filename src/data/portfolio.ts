export interface Project { id: string; title: string; category: string; description: string; location: string; tags: string[]; visual: 'building'; images?: { src: string; alt?: string }[]; }
export interface TimelineEntry { title:string; organization:string; startDate:string; endDate?:string; location?:string; description:string; achievements:string[]; }
export const navigation = [
  { label: 'Home', id: 'home' }, { label: 'About', id: 'about' },
  { label: 'Projects', id: 'projects' }, { label: 'Expertise', id: 'expertise' },
  { label: 'Experience', id: 'experience' }, { label: 'Contact', id: 'contact' },
];
export const profile = {
  "seoDescription": "Hossein Esmaeili: electrical design, Phase 2, execution and as-built drawings, and supervision for residential, commercial and office buildings in Tehran.",
  "socialImageAlt": "Hossein Esmaeili, electrical engineer in Tehran, over a conceptual illustration of building electrical drawings.",
  "name": "Hossein Esmaeili",
  "title": "Electrical Engineer",
  "introduction": "I’m Hossein Esmaeili, an electrical engineer in Tehran with 7 years of experience in building electrical design and supervision. Send your drawings and project brief to start a conversation.",
  "biography": {
    "specialization": "Building electrical design & supervision",
    "location": "Tehran, Iran · Projects across Iran",
    "currentRole": "Electrical designer & supervisor",
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
    "text": "Detailed design. Clear execution."
  },
  {
    "title": "Project supervision",
    "text": "Residential. Commercial. Office."
  },
  {
    "title": "Technical consultation",
    "text": "Lighting, cabling & fire alarm."
  }
];
export const projects: Project[] = [
  {
    "id": "kaveh",
    "title": "Kaveh Residential · Shahr Bank",
    "category": "Residential",
    "visual": "building",
    "location": "Tehran · District 18",
    "description": "Tehran · District 18",
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
    "description": "Tehran · District 21",
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
    "description": "Tehran · District 18",
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
    "title": "Electrical design & Phase 2 drawings",
    "short": "Detailed plans for building projects.",
    "detail": "Specialist electrical drawings and detailed Phase 2 design for building projects."
  },
  {
    "title": "Execution & as-built drawings",
    "short": "From construction drawings to as-built records.",
    "detail": "Preparation of electrical execution drawings and as-built documentation based on the installed systems."
  },
  {
    "title": "Electrical supervision",
    "short": "Residential, commercial and office projects.",
    "detail": "Electrical supervision for residential, commercial and office buildings. Travel outside Tehran is available for supervision and execution drawings."
  },
  {
    "title": "Technical advice",
    "short": "Lighting, cabling, fire alarm and low-current systems.",
    "detail": "Technical consultation on lighting, cabling, fire alarm and low-current systems. Remote collaboration is available."
  }
];
export const process = [
  {
    "title": "Share your brief",
    "text": "Send the drawings, location, building use and project requirements by email or Telegram."
  },
  {
    "title": "Discuss the scope",
    "text": "Discuss the design, execution drawings or supervision your project needs."
  },
  {
    "title": "Agree the deliverables",
    "text": "Confirm the scope, deliverables and schedule before starting."
  },
  {
    "title": "Start the collaboration",
    "text": "Proceed with the agreed electrical engineering services."
  }
];
export const experience: {title:string; empty:string; entries:TimelineEntry[]}[] = [
  {
    "title": "Professional experience",
    "empty": "",
    "entries": [
      {
        "title": "7 years of professional experience",
        "organization": "Arsh Eskan Mahestan · Arg Sazeh",
        "description": "Electrical design and supervision, with experience across residential, office and commercial buildings.",
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
