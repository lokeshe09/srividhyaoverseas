// MBBS-abroad destinations. Route: /mbbs-in-{slug}
// Fees are indicative tuition ranges for planning. Exact fees differ by university and year —
// always confirm current fees, NMC compliance and recognition before admission.

export const mbbsEligibility = [
  'NEET-UG qualified (score valid as per current NMC rules)',
  'Minimum 50% aggregate in Physics, Chemistry and Biology in 12th (40% for SC/ST/OBC, 45% for PwD)',
  'English as a subject in 12th',
  'Minimum 17 years of age by 31st December of the admission year',
  'Valid passport (or applied for one)',
];

export const nmcRules = [
  'Course duration of at least 54 months (4.5 years) of study',
  'Internship of at least 12 months in the same foreign university / country',
  'Entire course taught in English',
  'Degree must allow you to be licensed to practise medicine in that country',
  'Clear the NMC licensing exam (FMGE / NExT as applicable) after returning to India',
  'Complete the mandatory internship (CRMI) in India as directed by NMC',
];

export const mbbsAdmissionSteps = [
  { title: 'Free counselling', text: 'We understand your NEET score, budget and preferences and explain the options honestly.' },
  { title: 'University shortlisting', text: 'Compare NMC-compliant universities by fees, clinical exposure, climate, food and safety.' },
  { title: 'Application & admission letter', text: 'Submit documents and receive the university admission / invitation letter.' },
  { title: 'Visa & documentation', text: 'Apostille, translations, visa filing and medical tests — we guide every step.' },
  { title: 'Travel & arrival', text: 'Flight guidance, pre-departure briefing and arrival / hostel coordination.' },
  { title: 'Support during the course', text: 'Stay in touch for academics, FMGE / NExT preparation guidance and return to India.' },
];

export const mbbsDocuments = [
  '10th and 12th mark sheets and certificates',
  'NEET-UG score card and admit card',
  'Valid passport (minimum 18 months validity recommended)',
  'Passport-size photographs (white background)',
  'Birth certificate',
  'Medical fitness certificate and HIV test report (as required)',
  'Admission / invitation letter from the university',
  'Bank / sponsor documents where required',
];

export const mbbsCountries = [
  {
    slug: 'russia',
    name: 'Russia',
    code: 'ru',
    featured: true,
    tagline: 'Long-established medical universities with strong clinical training.',
    intro:
      'Russia has been one of the most popular MBBS destinations for Indian students for decades, with large, government medical universities, modern hospitals and a big Indian student community.',
    duration: '6 years (including internship)',
    medium: 'English (Russian language taught for patient interaction)',
    tuition: '₹3.5 – 7 lakh / year',
    totalCost: '₹22 – 45 lakh (tuition, full course)',
    hostel: '₹40,000 – 1 lakh / year',
    facts: { capital: 'Moscow', language: 'Russian', currency: 'Rouble (RUB)', climate: '-25°C to 30°C' },
    why: [
      'Government universities with decades of experience teaching international students',
      'Large teaching hospitals and strong clinical exposure',
      'Affordable fees compared to private medical colleges in India',
      'Large Indian student community and Indian food in many cities',
      'Degree recognised by WHO-listed medical universities',
    ],
    universities: ['Kazan Federal University', 'Bashkir State Medical University', 'Kursk State Medical University', 'Perm State Medical University', 'Orenburg State Medical University', 'Tver State Medical University'],
    life: 'Cold winters, especially in central Russia. Universities provide heated hostels; Indian mess facilities are common in popular universities.',
    faqs: [
      { q: 'Is MBBS in Russia valid in India?', a: 'Yes, if the university and the course meet NMC’s Foreign Medical Graduate Licentiate Regulations (duration, internship, English medium, licence eligibility) and you clear the NMC licensing exam after returning.' },
      { q: 'Do I need to learn Russian?', a: 'The course is taught in English, but basic Russian is taught alongside because you will talk to patients during clinical years.' },
      { q: 'What is the total cost of MBBS in Russia?', a: 'Tuition typically ranges from ₹22 to ₹45 lakh for the full course depending on the university, plus hostel, food and travel. We give a university-wise cost sheet during counselling.' },
    ],
  },
  {
    slug: 'kyrgyzstan',
    name: 'Kyrgyzstan',
    code: 'kg',
    featured: true,
    tagline: 'One of the most affordable MBBS destinations for Indian students.',
    intro:
      'Kyrgyzstan is popular for its affordable fees, simple admission process and English-medium medical programmes, with many Indian students in Bishkek, Osh and Jalal-Abad.',
    duration: '6 years (including internship)',
    medium: 'English',
    tuition: '₹3 – 5 lakh / year',
    totalCost: '₹18 – 30 lakh (tuition, full course)',
    hostel: '₹40,000 – 80,000 / year',
    facts: { capital: 'Bishkek', language: 'Kyrgyz, Russian', currency: 'Som (KGS)', climate: '-10°C to 35°C' },
    why: [
      'Low tuition and low cost of living',
      'No donation or capitation fee',
      'English-medium programmes with many Indian faculty and students',
      'Indian food available in most university hostels',
      'Direct and connecting flights from Indian cities',
    ],
    universities: ['Osh State University', 'Kyrgyz State Medical Academy', 'International School of Medicine', 'Jalal-Abad State University', 'Asian Medical Institute', 'International Higher School of Medicine'],
    life: 'Continental climate with cold winters. Living costs are among the lowest of all MBBS destinations.',
    faqs: [
      { q: 'What are the MBBS fees in Kyrgyzstan?', a: 'Tuition generally ranges from ₹3 to ₹5 lakh per year. Hostel and food are additional. Fees vary by university.' },
      { q: 'Is Kyrgyzstan safe for Indian students?', a: 'Universities have large Indian student communities and hostel security. As with any country, we brief students and parents on safety during pre-departure.' },
      { q: 'What is the admission process?', a: 'Eligibility check (NEET + 50% PCB) → application → admission letter → invitation & visa → travel. The process usually takes 4–8 weeks.' },
    ],
  },
  {
    slug: 'kazakhstan',
    name: 'Kazakhstan',
    code: 'kz',
    tagline: 'Modern medical universities with good infrastructure and affordable fees.',
    intro:
      'Kazakhstan offers modern medical universities, good infrastructure and moderate fees, with English-medium programmes designed for international students.',
    duration: '5 – 6 years (including internship as per NMC rules)',
    medium: 'English',
    tuition: '₹3.5 – 6 lakh / year',
    totalCost: '₹22 – 35 lakh (tuition, full course)',
    hostel: '₹50,000 – 1 lakh / year',
    facts: { capital: 'Astana', language: 'Kazakh, Russian', currency: 'Tenge (KZT)', climate: '-30°C to 35°C' },
    why: [
      'Modern campuses and simulation labs',
      'Moderate tuition and living costs',
      'English-medium curriculum for international students',
      'Stable, developing country with good connectivity',
      'Growing Indian student community',
    ],
    universities: ['Asfendiyarov Kazakh National Medical University', 'Astana Medical University', 'Semey Medical University', 'South Kazakhstan Medical Academy', 'Al-Farabi Kazakh National University', 'Karaganda Medical University'],
    life: 'Cold winters and warm summers. Indian food is available in many university cities.',
    faqs: [
      { q: 'Is the MBBS course in Kazakhstan NMC-compliant?', a: 'Several universities have aligned their duration and internship to NMC rules. We check each university’s current programme structure before recommending it.' },
    ],
  },
  {
    slug: 'georgia',
    name: 'Georgia',
    code: 'ge',
    featured: true,
    tagline: 'European-style medical education with a pleasant climate.',
    intro:
      'Georgia offers European-standard medical education, a mild climate and a safe environment, making it a preferred choice for students who want a European study experience.',
    duration: '6 years (including internship)',
    medium: 'English',
    tuition: '₹5 – 8 lakh / year',
    totalCost: '₹35 – 50 lakh (tuition, full course)',
    hostel: '₹1 – 2 lakh / year',
    facts: { capital: 'Tbilisi', language: 'Georgian', currency: 'Lari (GEL)', climate: '-2°C to 32°C' },
    why: [
      'European-style curriculum (ECTS credit system)',
      'Pleasant climate compared to other CIS countries',
      'Safe and friendly country',
      'English-medium programmes with modern teaching methods',
      'Opportunities to prepare for international licensing exams',
    ],
    universities: ['Tbilisi State Medical University', 'David Tvildiani Medical University', 'Batumi Shota Rustaveli State University', 'European University', 'University of Georgia', 'New Vision University'],
    life: 'Mild climate, friendly people and a relatively higher cost of living than Central Asia. Private apartments are common.',
    faqs: [
      { q: 'Why is MBBS in Georgia more expensive?', a: 'Georgian universities follow a European curriculum and many are private, so fees and living costs are higher than in Central Asian countries.' },
    ],
  },
  {
    slug: 'uzbekistan',
    name: 'Uzbekistan',
    code: 'uz',
    tagline: 'Government medical institutes with affordable fees and growing popularity.',
    intro:
      'Uzbekistan’s government medical universities have opened English-medium MBBS programmes for international students, with affordable fees and a culture familiar to Indian students.',
    duration: '6 years (including internship)',
    medium: 'English',
    tuition: '₹3 – 4.5 lakh / year',
    totalCost: '₹20 – 30 lakh (tuition, full course)',
    hostel: '₹40,000 – 80,000 / year',
    facts: { capital: 'Tashkent', language: 'Uzbek, Russian', currency: 'Som (UZS)', climate: '-5°C to 40°C' },
    why: [
      'Government medical universities',
      'Affordable fees and low cost of living',
      'Historic cities with cultural similarity to India',
      'Growing number of English-medium programmes',
      'Short flight duration from India',
    ],
    universities: ['Tashkent Medical Academy', 'Samarkand State Medical University', 'Bukhara State Medical Institute', 'Andijan State Medical Institute', 'Fergana Medical Institute of Public Health'],
    life: 'Hot summers and mild winters. Indian food and vegetarian options are available in major cities.',
    faqs: [
      { q: 'Is Uzbekistan good for MBBS?', a: 'It is an emerging destination with government universities and moderate fees. As programmes are newer, we verify the English-medium structure and internship details carefully.' },
    ],
  },
  {
    slug: 'china',
    name: 'China',
    code: 'cn',
    tagline: 'Large hospitals and advanced infrastructure at selected listed universities.',
    intro:
      'China has large teaching hospitals and advanced infrastructure. Only universities approved by China’s Ministry of Education to teach MBBS in English should be considered.',
    duration: '6 years (5 years + 1 year internship)',
    medium: 'English (Chinese language taught for clinical work)',
    tuition: '₹3 – 7 lakh / year',
    totalCost: '₹25 – 45 lakh (tuition, full course)',
    hostel: '₹50,000 – 1.5 lakh / year',
    facts: { capital: 'Beijing', language: 'Mandarin Chinese', currency: 'Yuan (CNY)', climate: '-10°C to 35°C' },
    why: [
      'Large, modern teaching hospitals',
      'Advanced research and infrastructure',
      'Moderate fees at listed universities',
      'Close to India with good flight connectivity',
      'Structured curriculum with strong basic sciences',
    ],
    universities: ['China Medical University', 'Nanjing Medical University', 'Jiangsu University', 'Tianjin Medical University', 'Zhejiang University', 'Harbin Medical University'],
    life: 'Learning Chinese is required for patient interaction. Climate and food vary widely by city.',
    faqs: [
      { q: 'Which Chinese universities are allowed?', a: 'Only universities listed by China’s Ministry of Education for English-medium MBBS should be considered, and the course must meet NMC rules, including the internship in China.' },
    ],
  },
  {
    slug: 'nepal',
    name: 'Nepal',
    code: 'np',
    tagline: 'A curriculum and disease profile similar to India, close to home.',
    intro:
      'Nepal’s medical colleges follow a curriculum and disease profile similar to India, with no language barrier and an easy journey home.',
    duration: '5.5 years (4.5 years + 1 year internship)',
    medium: 'English',
    tuition: 'Varies widely by college',
    totalCost: '₹45 – 75 lakh (approx., full course)',
    hostel: '₹60,000 – 1.2 lakh / year',
    facts: { capital: 'Kathmandu', language: 'Nepali (English widely used)', currency: 'Rupee (NPR)', climate: '0°C to 30°C' },
    why: [
      'Curriculum and disease patterns similar to India',
      'No visa needed for Indian citizens',
      'Indian food and culture',
      'Easy travel by road or air',
      'Many Indian faculty members',
    ],
    universities: ['Kathmandu University (affiliated colleges)', 'B.P. Koirala Institute of Health Sciences', 'Tribhuvan University – Institute of Medicine', 'Manipal College of Medical Sciences, Pokhara'],
    life: 'Similar food, culture and language comfort. Fees are higher than Central Asian countries.',
    faqs: [
      { q: 'Do Indian students need a visa for Nepal?', a: 'No, Indian citizens do not need a visa, but you still need valid identity documents and must meet NMC rules for foreign medical graduates.' },
    ],
  },
  {
    slug: 'italy',
    name: 'Italy',
    code: 'it',
    tagline: 'Public European universities with income-based tuition through the IMAT exam.',
    intro:
      'Italy offers English-taught medicine at public universities with income-based fees and regional scholarships. Admission is competitive and based on an entrance exam.',
    duration: '6 years',
    medium: 'English (selected programmes)',
    tuition: 'Income-based at public universities (often a few hundred to a few thousand € / year)',
    totalCost: 'Varies — public universities are affordable; living costs are higher',
    hostel: '€4,000 – €8,000 / year',
    facts: { capital: 'Rome', language: 'Italian', currency: 'Euro (EUR)', climate: '0°C to 35°C' },
    why: [
      'Public European universities with global recognition',
      'Income-based tuition and regional (DSU) scholarships',
      'Schengen residence while studying',
      'Rich culture and student life',
      'Strong clinical and research training',
    ],
    universities: ['University of Pavia', 'University of Milan', 'Sapienza University of Rome', 'University of Bologna', 'University of Padua', 'University of Naples Federico II'],
    life: 'Learning Italian is important for clinical rotations. Living costs vary by city.',
    faqs: [
      { q: 'Is there an entrance exam for MBBS in Italy?', a: 'Yes. English-taught medicine programmes at public universities have a competitive entrance exam (IMAT or the format currently in use). Students must also meet NEET and NMC requirements.' },
    ],
  },
];

export const getMbbsCountry = (slug) => mbbsCountries.find((c) => c.slug === slug);
