import heroPhoto from '../assets/hero.jpg'

const photo = (id, width = 1600) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`

const face = (id) => `https://i.pravatar.cc/160?img=${id}`

export const site = {
  name: 'Heritage Auto',
  phone: '(702) 826-0225',
  phoneHref: 'tel:+17028260225',
  email: 'info@heritageautolv.com',
  emailHref: 'mailto:info@heritageautolv.com',
  street: '3082 Sheridan St.',
  city: 'Las Vegas, NV 89102',
  address: '3082 Sheridan St., Las Vegas, NV 89102',
  hoursShort: ['Monday to Friday', '6:00 AM – 3:00 PM'],
  hours: [
    { days: 'Monday – Friday', time: '6:00 AM – 3:00 PM' },
    { days: 'Saturday – Sunday', time: 'Closed' },
  ],
  directions:
    'https://www.google.com/maps/dir/?api=1&destination=3082+Sheridan+St,+Las+Vegas,+NV+89102',
  mapImage:
    'https://staticmap.openstreetmap.de/staticmap.php?center=36.150,-115.170&zoom=15&size=900x480&markers=36.150,-115.170,red-pushpin',
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=-115.192%2C36.136%2C-115.148%2C36.164&layer=mapnik&marker=36.150%2C-115.170',
}

export const images = {
  hero: heroPhoto,
  mechanic: photo('photo-1619642751034-765dfdf7c58e', 1400),
  camaro: photo('photo-1552519507-da3b142c6e3d', 1400),
  shop: photo('photo-1489824904134-891ab64532f1', 1600),
  garage: photo('photo-1486262715619-67b85e0b08d3', 1800),
  desert: photo('photo-1469854523086-cc02fe5d8800', 1600),
  before: photo('photo-1441148345475-03a2e82f9719', 1600),
  after: photo('photo-1494905998402-395d579af36f', 1600),
  routine: photo('photo-1549317661-bd32c8ce0db2', 1200),
  bronco: photo('photo-1533473359331-0135ef1b58bf', 1200),
  classic: photo('photo-1494976388531-d1058494cdd8', 1200),
}

export const nav = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'contact', label: 'Contact' },
]

export const heroFacts = [
  {
    icon: 'pin',
    title: site.street,
    text: site.city,
    href: site.directions,
    link: 'Get Directions',
  },
  { icon: 'clock', title: 'Monday to Friday', text: '6:00 AM – 3:00 PM' },
  { icon: 'shield', title: 'Expert', text: 'Craftsmanship' },
  { icon: 'users', title: 'Family Owned', text: '& Operated' },
  { icon: 'car', title: 'All Makes', text: '& Models' },
  { icon: 'star', title: 'Trusted in', text: 'Las Vegas' },
]

export const values = [
  'Honesty & Integrity',
  'Quality Workmanship',
  'Customer Satisfaction',
  'Continuous Improvement',
]

export const services = [
  {
    id: 'maintenance',
    tab: 'Maintenance',
    icon: 'calendar',
    title: 'Maintenance',
    cardTitle: 'Maintenance',
    blurb: 'Keep your engine running strong.',
    kicker: 'Keep your engine running strong.',
    description:
      'Routine maintenance is essential for long-term performance, reliability and safety. We take care of the details so you can focus on the road.',
    image: photo('photo-1487754180451-c456f719a1fc', 1400),
    included: [
      'Oil Change',
      'Filter Replacement',
      'Fluid Check & Top Off',
      'Tire Rotation',
      'Multi-Point Inspection',
    ],
  },
  {
    id: 'brakes',
    tab: 'Brakes',
    icon: 'brake',
    title: 'Brakes & Suspension',
    cardTitle: 'Brakes & Suspension',
    blurb: 'Stop with confidence.',
    kicker: 'Stop with confidence.',
    description:
      'Pads, rotors, fluid, and suspension work so every stop feels sure. We inspect the whole system, then repair only what your vehicle actually needs.',
    image: photo('photo-1618843479313-40f8afb4b4d8', 1400),
    included: [
      'Brake Inspection',
      'Pad Replacement',
      'Rotor Service',
      'Fluid Flush',
      'Alignment Check',
    ],
  },
  {
    id: 'diagnostics',
    tab: 'Diagnostics',
    icon: 'scan',
    title: 'Diagnostics',
    cardTitle: 'Diagnostics',
    blurb: 'Advanced technology. Accurate results.',
    kicker: 'Advanced technology. Accurate results.',
    description:
      'Check-engine lights, electrical faults, and drivability issues traced with modern scan tools. You get a clear explanation before any repair begins.',
    image: photo('photo-1486262715619-67b85e0b08d3', 1400),
    included: [
      'Computer Scan',
      'Electrical Testing',
      'Sensor Diagnosis',
      'Performance Analysis',
      'Written Report',
    ],
  },
  {
    id: 'ac',
    tab: 'A/C & Heat',
    icon: 'snow',
    title: 'A/C & Heat',
    cardTitle: 'A/C & Heat',
    blurb: 'Comfort in every season.',
    kicker: 'Comfort in every season.',
    description:
      'Full air-conditioning diagnostics, recharge, and heating service so the cabin stays comfortable through desert summers and cool desert nights.',
    image: photo('photo-1502877338535-766e1452684a', 1400),
    included: [
      'A/C Performance Test',
      'Refrigerant Recharge',
      'Leak Check',
      'Heater Inspection',
      'Cabin Filter',
    ],
  },
  {
    id: 'collision',
    tab: 'Collision',
    icon: 'car',
    title: 'Collision & Body Repair',
    cardTitle: 'Collision & Body Repair',
    blurb: 'Restore. Rebuild. Drive.',
    kicker: 'Restore. Rebuild. Drive.',
    description:
      'From a parking-lot crease to structural repair, we bring the body and finish back in line. Paint work is matched, paneled, and checked in daylight.',
    image: photo('photo-1544636331-e26879cd4d9b', 1400),
    included: [
      'Damage Estimate',
      'Body Repair',
      'Paint Matching',
      'Panel Alignment',
      'Insurance Coordination',
    ],
  },
  {
    id: 'performance',
    tab: 'Performance',
    icon: 'gauge',
    title: 'Performance & Custom',
    cardTitle: 'Performance & Custom',
    blurb: 'More power. More control.',
    kicker: 'More power. More control.',
    description:
      'Engine, exhaust, suspension, and custom builds for drivers who want more from a car they already love — without losing daily drivability.',
    image: photo('photo-1503376780353-7e6692767b70', 1400),
    included: [
      'Performance Inspection',
      'Engine Upgrades',
      'Exhaust & Intake',
      'Suspension Tuning',
      'Road Test',
    ],
  },
  {
    id: 'fleet',
    tab: 'Fleets',
    icon: 'truck',
    title: 'Fleets',
    cardTitle: 'Fleet Vehicles',
    blurb: 'Keep your business moving.',
    kicker: 'Keep your business moving.',
    description:
      'Maintenance and repair for vans, trucks, and work vehicles. Priority scheduling and straightforward reporting so routes stay on the road.',
    image: photo('photo-1601584115197-04ecc0da31d7', 1400),
    included: [
      'Priority Scheduling',
      'Preventive Maintenance',
      'Fleet Reporting',
      'All Makes & Models',
      'Competitive Fleet Pricing',
    ],
  },
]

export const paths = [
  {
    id: 'routine',
    title: 'Routine Maintenance',
    text: 'Keep your vehicle running at its best.',
    icon: 'wrench',
    image: images.routine,
    serviceId: 'maintenance',
  },
  {
    id: 'builds',
    title: 'Performance & Custom Builds',
    text: 'Upgrade your ride with more power and capability.',
    icon: 'gauge',
    image: images.bronco,
    serviceId: 'performance',
  },
  {
    id: 'restoration',
    title: 'Classic Car Restoration',
    text: 'Preserve automotive history with expert craftsmanship.',
    icon: 'star',
    image: images.classic,
    serviceId: null,
  },
]

export const projectDetails = [
  { icon: 'shield', title: 'Complete Restoration' },
  { icon: 'gauge', title: 'Engine & Performance Upgrades' },
  { icon: 'wrench', title: 'Custom Paint & Body Work' },
  { icon: 'check', title: 'Attention to Every Detail' },
]

export const shopServices = [
  { label: '5W-30 Synthetic Oil Change - 5qt*', serviceId: 'maintenance' },
  { label: '0W-20 Synthetic Oil Change - 5qt*', serviceId: 'maintenance' },
  { label: 'A/C and Heat', serviceId: 'ac' },
  { label: 'A/C Diagnostic*', serviceId: 'ac' },
  { label: 'Auto Body and Paint', serviceId: 'collision' },
  { label: 'Basic Headlight Restoration*', serviceId: 'maintenance' },
  { label: 'Battery Replacement [Interstate]*', serviceId: 'maintenance' },
  { label: 'Blind Spot Monitoring Sensor Calibration*', serviceId: 'diagnostics' },
  { label: 'Brake Service Package*', serviceId: 'brakes' },
  { label: 'Brakes', serviceId: 'brakes' },
  { label: 'Check Engine Light Diagnostic*', serviceId: 'diagnostics' },
  { label: 'Comprehensive Vehicle Inspection*', serviceId: 'maintenance' },
  { label: 'Diagnostic', serviceId: 'diagnostics' },
  { label: 'Four Wheel Alignment*', serviceId: 'brakes' },
  { label: 'Full Vehicle PPF*', serviceId: 'collision' },
  { label: 'General Maintenance', serviceId: 'maintenance' },
  { label: 'Initial Multi-Point Inspection*', serviceId: 'maintenance' },
  { label: 'Insurance Claim Estimate', serviceId: 'collision' },
  { label: 'Lift Kit Installation*', serviceId: 'performance' },
  { label: 'LS Swap', serviceId: 'performance' },
  { label: 'Oil Change', serviceId: 'maintenance' },
  { label: 'Tire Rotation*', serviceId: 'maintenance' },
  { label: 'TPMS Install*', serviceId: 'maintenance' },
  { label: 'Transmission Flush and Filter*', serviceId: 'maintenance' },
]

export const searchItems = [
  ...shopServices.map((service) => ({
    label: service.label,
    hint: 'Service',
    target: 'services',
    serviceId: service.serviceId,
  })),
  ...services.map((service) => ({
    label: service.tab,
    hint: 'Service',
    target: service.id === 'fleet' ? 'fleet' : 'services',
    serviceId: service.id,
  })),
  {
    label: 'Fleets',
    hint: 'Service',
    target: 'fleet',
    serviceId: 'fleet',
  },
  ...paths.map((path) => ({
    label: path.title,
    hint: 'Project',
    target: 'projects',
    serviceId: path.serviceId,
  })),
  {
    label: 'Featured restoration',
    hint: 'Project',
    target: 'featured',
    serviceId: null,
  },
]

export const ratingSummary = {
  score: '4.9',
  count: 'Based on 200+ reviews',
  platforms: [
    { name: 'Google', score: '4.9', icon: 'google' },
    { name: 'Facebook', score: '4.8', icon: 'facebook' },
    { name: 'Yelp', score: '4.9', icon: 'yelp' },
  ],
}

export const spotlightReviews = [
  {
    name: 'Emily R.',
    place: 'Las Vegas, NV',
    score: '5.0',
    stars: 5,
    source: 'Google',
    icon: 'google',
    date: 'Oct 12, 2024',
    photo: face(47),
    quote:
      'Amazing service! The team at Heritage Auto is professional, honest and truly cares about their customers. My car runs like new!',
  },
  {
    name: 'Michael T.',
    place: 'Las Vegas, NV',
    score: '5.0',
    stars: 5,
    source: 'Google',
    icon: 'google',
    date: 'Sep 2, 2024',
    photo: face(11),
    quote:
      'Professional, knowledgeable and easy to work with. Highly recommend for any repair or restoration project.',
  },
  {
    name: 'Sarah L.',
    place: 'Henderson, NV',
    score: '5.0',
    stars: 5,
    source: 'Yelp',
    icon: 'yelp',
    date: 'Aug 18, 2024',
    photo: face(5),
    quote:
      'The team at Heritage Auto did an incredible job on my classic car. Attention to detail and quality work.',
  },
  {
    name: 'Jason M.',
    place: 'Las Vegas, NV',
    score: '4.9',
    stars: 5,
    source: 'Facebook',
    icon: 'facebook',
    date: 'Jul 9, 2024',
    photo: face(33),
    quote:
      'Best auto shop in Las Vegas. Honest, fast and professional. I would not take my vehicles anywhere else.',
  },
]

export const moreReviews = [
  {
    name: 'Robert T.',
    place: 'Henderson, NV',
    score: '5.0',
    stars: 5,
    icon: 'google',
    photo: face(12),
    quote:
      'Great work and fair pricing. I’ll definitely be coming back for all my maintenance needs.',
  },
  {
    name: 'Lisa M.',
    place: 'Las Vegas, NV',
    score: '4.8',
    stars: 5,
    icon: 'facebook',
    photo: face(44),
    quote:
      'Very professional and kept me updated throughout the entire process.',
  },
  {
    name: 'Kevin S.',
    place: 'North Las Vegas, NV',
    score: '5.0',
    stars: 5,
    icon: 'yelp',
    photo: face(15),
    quote:
      'The best auto shop in town! Highly recommend them to everyone.',
  },
]

export const bookingSteps = [
  { icon: 'wrench', title: 'Select service', text: 'Choose what you need.' },
  { icon: 'calendar', title: 'Pick Date & Time', text: 'See available slots.' },
  { icon: 'car', title: 'Add vehicle info', text: 'Help us prepare for your visit.' },
]

export const timeSlots = [
  '6:00 AM',
  '6:30 AM',
  '7:00 AM',
  '7:30 AM',
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
  '11:30 AM',
  '12:00 PM',
  '12:30 PM',
  '1:00 PM',
  '1:30 PM',
  '2:00 PM',
  '2:30 PM',
]

export const vehicles = [
  'Sedan',
  'Coupe',
  'SUV',
  'Truck',
  'Van',
  'Classic / Muscle',
  'Performance',
  'Fleet vehicle',
  'Other',
]
