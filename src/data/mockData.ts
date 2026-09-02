import { Product, Vehicle, NearbyShop, CustomerQuote, MaintenanceItem } from '../types';

export const VEHICLE_DATABASE: Vehicle[] = [
  // Cars
  {
    id: 'veh-toyota-innova-2022',
    type: 'Car',
    make: 'Toyota',
    model: 'Innova Crysta',
    variant: '2.4 VX 7S',
    year: 2022,
    engine: '2.4L GD Turbo Diesel (2GD-FTV)',
    fuelType: 'Diesel',
    image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600',
    nickname: 'Family Tourer',
    odometerKm: 42500
  },
  {
    id: 'veh-hyundai-i20-2021',
    type: 'Car',
    make: 'Hyundai',
    model: 'i20',
    variant: 'Asta (O) 1.2 Kappa',
    year: 2021,
    engine: '1.2L Kappa Dual VTVT Petrol',
    fuelType: 'Petrol',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    nickname: 'City Commuter',
    odometerKm: 28400
  },
  {
    id: 'veh-toyota-fortuner-2023',
    type: 'Car',
    make: 'Toyota',
    model: 'Fortuner',
    variant: '2.8 4x4 AT',
    year: 2023,
    engine: '2.8L 1GD-FTV Turbo Diesel',
    fuelType: 'Diesel',
    image: 'https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?auto=format&fit=crop&q=80&w=600',
    nickname: 'Offroad Beast',
    odometerKm: 19800
  },
  {
    id: 'veh-tata-nexon-2022',
    type: 'Car',
    make: 'Tata',
    model: 'Nexon',
    variant: 'XZ+ (O) Revotorq',
    year: 2022,
    engine: '1.5L Turbocharged Revotorq Diesel',
    fuelType: 'Diesel',
    image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=600',
    odometerKm: 34100
  },
  {
    id: 'veh-mahindra-xuv700-2023',
    type: 'Car',
    make: 'Mahindra',
    model: 'XUV700',
    variant: 'AX7 Luxury AWD',
    year: 2023,
    engine: '2.2L mHawk CRDe Diesel',
    fuelType: 'Diesel',
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=600',
    odometerKm: 15300
  },
  {
    id: 'veh-honda-city-2020',
    type: 'Car',
    make: 'Honda',
    model: 'City',
    variant: 'ZX 1.5 i-VTEC',
    year: 2020,
    engine: '1.5L i-VTEC DOHC Petrol',
    fuelType: 'Petrol',
    image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80&w=600',
    odometerKm: 48900
  },
  // Motorcycle
  {
    id: 'veh-re-classic-2023',
    type: 'Motorcycle',
    make: 'Royal Enfield',
    model: 'Classic 350',
    variant: 'Chrome Red Dual Channel ABS',
    year: 2023,
    engine: '349cc Single-Cylinder J-Series OHC',
    fuelType: 'Petrol',
    image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=600',
    nickname: 'Bullet Classic',
    odometerKm: 9500
  },
  {
    id: 'veh-yamaha-r15-2022',
    type: 'Motorcycle',
    make: 'Yamaha',
    model: 'R15 V4',
    variant: 'Racing Blue VVA',
    year: 2022,
    engine: '155cc Liquid-cooled 4-valve SOHC',
    fuelType: 'Petrol',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&q=80&w=600',
    odometerKm: 16200
  },
  // Scooter
  {
    id: 'veh-honda-activa-2022',
    type: 'Scooter',
    make: 'Honda',
    model: 'Activa 6G',
    variant: 'Deluxe PGM-FI H-Smart',
    year: 2022,
    engine: '109.51cc eSP Fan-Cooled 4-Stroke',
    fuelType: 'Petrol',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&q=80&w=600',
    odometerKm: 11200
  },
  // Commercial
  {
    id: 'veh-tata-ace-2021',
    type: 'Commercial Vehicle',
    make: 'Tata',
    model: 'Ace Gold',
    variant: 'Plus 2-Cylinder 700cc',
    year: 2021,
    engine: '702cc 2-Cylinder Water-Cooled Diesel',
    fuelType: 'Diesel',
    image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&q=80&w=600',
    odometerKm: 68000
  }
];

export const CATEGORIES_TREE = [
  {
    id: 'cat-engine',
    name: 'Engine & Drivetrain',
    icon: 'Gauge',
    itemCount: 142,
    subCategories: [
      'Engine Oil',
      'Oil Filter',
      'Air Filter',
      'Fuel Filter',
      'Spark Plug',
      'Timing Belt',
      'Piston',
      'Gasket',
      'Bearings',
      'Radiator Components'
    ]
  },
  {
    id: 'cat-braking',
    name: 'Braking System',
    icon: 'Disc',
    itemCount: 98,
    subCategories: [
      'Brake Pads',
      'Brake Discs',
      'Brake Shoes',
      'Brake Calipers',
      'Brake Master Cylinder',
      'Brake Fluid'
    ]
  },
  {
    id: 'cat-electrical',
    name: 'Electrical & Lighting',
    icon: 'Zap',
    itemCount: 116,
    subCategories: [
      'Battery',
      'Alternator',
      'Starter Motor',
      'Headlights',
      'Tail Lights',
      'Bulbs',
      'Fuses',
      'Sensors',
      'Wiring Components'
    ]
  },
  {
    id: 'cat-suspension',
    name: 'Suspension & Steering',
    icon: 'Activity',
    itemCount: 84,
    subCategories: [
      'Shock Absorbers',
      'Struts',
      'Control Arms',
      'Ball Joints',
      'Tie Rods',
      'Steering Components'
    ]
  },
  {
    id: 'cat-transmission',
    name: 'Transmission & Clutch',
    icon: 'Settings',
    itemCount: 65,
    subCategories: [
      'Clutch',
      'Clutch Plate',
      'Gearbox Components',
      'Transmission Oil',
      'Bearings'
    ]
  },
  {
    id: 'cat-cooling',
    name: 'Cooling & Heating',
    icon: 'Thermometer',
    itemCount: 52,
    subCategories: [
      'Radiator',
      'Water Pump',
      'Thermostat',
      'Cooling Fan',
      'Radiator Hose'
    ]
  },
  {
    id: 'cat-body',
    name: 'Body & Exterior',
    icon: 'Shield',
    itemCount: 77,
    subCategories: [
      'Mirrors',
      'Bumpers',
      'Grilles',
      'Wipers',
      'Door Handles',
      'Body Panels'
    ]
  },
  {
    id: 'cat-interior',
    name: 'Interior & Comfort',
    icon: 'Layers',
    itemCount: 61,
    subCategories: [
      'Seat Covers',
      'Floor Mats',
      'Dashboard Accessories',
      'Interior Switches',
      'Cabin Air Filter'
    ]
  },
  {
    id: 'cat-tyres',
    name: 'Tyres & Wheels',
    icon: 'CircleDot',
    itemCount: 49,
    subCategories: [
      'Tyres',
      'Alloy Wheels',
      'Wheel Bearings',
      'Wheel Accessories',
      'TPMS Sensors'
    ]
  },
  {
    id: 'cat-accessories',
    name: 'Car Care & Accessories',
    icon: 'Wrench',
    itemCount: 93,
    subCategories: [
      'Car Chargers',
      'Dash Cameras',
      'Car Cleaning Products',
      'Air Fresheners',
      'Mobile Holders'
    ]
  }
];

export const POPULAR_BRANDS = [
  { name: 'Toyota Genuine Parts', logo: 'TOYOTA', country: 'Japan', isOem: true },
  { name: 'Bosch Automotive', logo: 'BOSCH', country: 'Germany', isOem: true },
  { name: 'Brembo High Performance', logo: 'BREMBO', country: 'Italy', isOem: true },
  { name: 'NGK Spark Plugs', logo: 'NGK', country: 'Japan', isOem: true },
  { name: 'Mobil 1 / ExxonMobil', logo: 'MOBIL 1', country: 'USA', isOem: false },
  { name: 'Denso Corporation', logo: 'DENSO', country: 'Japan', isOem: true },
  { name: 'Gates Corporation', logo: 'GATES', country: 'USA', isOem: false },
  { name: 'Valeo', logo: 'VALEO', country: 'France', isOem: true },
  { name: 'Monroe Shocks', logo: 'MONROE', country: 'USA', isOem: false },
  { name: 'Castrol', logo: 'CASTROL', country: 'UK', isOem: false }
];

export const PRODUCTS_DATABASE: Product[] = [
  {
    id: 'prod-toyota-oil-filter',
    name: 'Genuine Toyota Cartridge Oil Filter Element',
    partNumber: 'OF-TY-4152',
    oemNumber: '04152-YZZA1',
    brand: 'Toyota Genuine Parts',
    category: 'Engine & Drivetrain',
    subCategory: 'Oil Filter',
    description: 'Original factory oil filter designed specifically for Toyota 2GD/1GD GD-series diesel engines. Multi-fiber density media captures 99.2% of harmful engine contaminants down to 20 microns.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1632313627402-463d63328e3b?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: true,
    isPopular: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 1204,
    specifications: {
      'OEM Reference': '04152-YZZA1 / 04152-38010',
      'Filter Media': 'Synthetic Pleated Cellulose',
      'Inner Diameter': '28.5 mm',
      'Outer Diameter': '70 mm',
      'Height': '66.5 mm',
      'Gasket Included': 'Yes (O-ring + Drain Plug Washer)',
      'Service Life': '10,000 km or 12 months'
    },
    installationDifficulty: 'Easy',
    warranty: '6 Months / 10,000 km Manufacturer Warranty',
    compatibleVehicles: [
      {
        make: 'Toyota',
        model: 'Innova Crysta',
        yearFrom: 2016,
        yearTo: 2024,
        engine: ['2.4L GD Turbo Diesel (2GD-FTV)', '2.8L GD Turbo Diesel (1GD-FTV)'],
        fitmentNotes: 'Direct factory replacement for oil housing cartridge'
      },
      {
        make: 'Toyota',
        model: 'Fortuner',
        yearFrom: 2016,
        yearTo: 2024,
        engine: ['2.8L GD Turbo Diesel (1GD-FTV)', '2.7L Petrol (2TR-FE)'],
        fitmentNotes: 'Factory OE fitment'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 12.50,
        mrp: 14.99,
        deliveryDays: 1,
        deliveryFee: 0,
        warranty: '6 Months Official Toyota Warranty',
        returnPolicy: '15-Day Free Hassle-free Returns',
        inStock: true,
        stockCount: 84,
        isVerified: true,
        location: 'Metro Distribution Center, Hub 4'
      },
      {
        sellerId: 'sel-apex-auto',
        sellerName: 'Apex Auto Spares & OEM Depot',
        rating: 4.8,
        reviewCount: 1420,
        price: 11.90,
        mrp: 14.99,
        deliveryDays: 2,
        deliveryFee: 2.50,
        warranty: '6 Months Warranty',
        returnPolicy: '10-Day Return Policy',
        inStock: true,
        stockCount: 32,
        isVerified: true,
        location: 'Westside Logistics Park'
      }
    ],
    recommendedAddons: ['prod-engine-oil-synthetic', 'prod-toyota-air-filter', 'prod-wrench-filter'],
    reviews: [
      {
        id: 'rev-101',
        author: 'Rahul Sengupta',
        rating: 5,
        date: '2026-08-14',
        vehicleModel: 'Toyota Innova Crysta 2022 2.4D',
        comment: '100% genuine Toyota packaging with holographic seal. Replaced during my 40,000 km service. Oil stayed clean and no leaks whatsoever.',
        verifiedPurchase: true,
        helpfulCount: 42
      },
      {
        id: 'rev-102',
        author: 'Arun Prakash (Master Technician)',
        rating: 5,
        date: '2026-07-28',
        vehicleModel: 'Toyota Fortuner 2.8 AT',
        comment: 'Standard cartridge replacement. O-ring is soft nitrile rubber, fits snug into the oil filter housing.',
        verifiedPurchase: true,
        helpfulCount: 18
      }
    ]
  },
  {
    id: 'prod-bosch-brake-pads',
    name: 'BOSCH QuietCast Premium Ceramic Front Brake Pads',
    partNumber: 'BP-BOSCH-7721',
    oemNumber: '04465-0K360',
    brand: 'Bosch Automotive',
    category: 'Braking System',
    subCategory: 'Brake Pads',
    description: 'Bosch QuietCast Ceramic Brake Pads provide whisper-quiet stopping power with ultra-low dust formulation. Features molded pre-attached rubber-core shims for noise dampening and thermal stability up to 650°C.',
    image: 'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: false,
    isPopular: true,
    isDeal: true,
    rating: 4.8,
    reviewCount: 842,
    specifications: {
      'Position': 'Front Axle (Set of 4 pads)',
      'Material': 'Copper-Free Advanced Ceramic',
      'Width': '143.5 mm',
      'Height': '67.8 mm',
      'Thickness': '17.2 mm',
      'Hardware Included': 'Synthetic Lubricant & Abutment Clips',
      'Wear Indicator': 'Acoustic Mechanical Sensor Included'
    },
    installationDifficulty: 'Moderate',
    warranty: '1 Year / 20,000 km Replacement Warranty',
    compatibleVehicles: [
      {
        make: 'Toyota',
        model: 'Innova Crysta',
        yearFrom: 2016,
        yearTo: 2024,
        fitmentNotes: 'Front disc brake calipers (all variants 2.4L / 2.7L / 2.8L)'
      },
      {
        make: 'Toyota',
        model: 'Fortuner',
        yearFrom: 2016,
        yearTo: 2024,
        fitmentNotes: 'Front calipers standard fitment'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 45.99,
        mrp: 58.00,
        deliveryDays: 1,
        deliveryFee: 0,
        warranty: '1 Year Bosch Warranty',
        returnPolicy: '15-Day Return Policy',
        inStock: true,
        stockCount: 46,
        isVerified: true,
        location: 'Metro Distribution Center'
      },
      {
        sellerId: 'sel-speedy-brakes',
        sellerName: 'BrakeForce Pro Spares',
        rating: 4.7,
        reviewCount: 910,
        price: 43.50,
        mrp: 58.00,
        deliveryDays: 3,
        deliveryFee: 3.00,
        warranty: '1 Year Warranty',
        returnPolicy: '7-Day Return Policy',
        inStock: true,
        stockCount: 18,
        isVerified: true,
        location: 'Industrial Auto Zone'
      }
    ],
    recommendedAddons: ['prod-brembo-rotors', 'prod-dot4-brake-fluid'],
    reviews: [
      {
        id: 'rev-201',
        author: 'Vikram Mehta',
        rating: 5,
        date: '2026-08-01',
        vehicleModel: 'Toyota Innova Crysta 2022',
        comment: 'Superb initial bite and literally zero black brake dust on my alloy wheels! Highway stops feel much more controlled compared to factory pads.',
        verifiedPurchase: true,
        helpfulCount: 31
      }
    ]
  },
  {
    id: 'prod-hyundai-brake-pads',
    name: 'Genuine Mobis Front Brake Pad Set (Hyundai i20 / Venue)',
    partNumber: 'BP-HY-58101',
    oemNumber: '58101-1RA00',
    brand: 'Hyundai Genuine Parts',
    category: 'Braking System',
    subCategory: 'Brake Pads',
    description: 'Factory original Hyundai Mobis front brake pad kit. Formulated for optimum pedal feel, low rotor wear, and reliable performance across city stop-and-go conditions.',
    image: 'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: true,
    isPopular: true,
    rating: 4.7,
    reviewCount: 654,
    specifications: {
      'OEM Part Number': '58101-1RA00 / 58101-C8A00',
      'Position': 'Front Left & Right Discs',
      'Compatibility': 'Hyundai i20 (Elite & Gen 3), Venue 1.2 / 1.0T',
      'Compound': 'Semi-Metallic Low Resin'
    },
    installationDifficulty: 'Moderate',
    warranty: '6 Months OE Warranty',
    compatibleVehicles: [
      {
        make: 'Hyundai',
        model: 'i20',
        yearFrom: 2015,
        yearTo: 2024,
        fitmentNotes: 'Front disc brake caliper set'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 28.00,
        mrp: 34.50,
        deliveryDays: 1,
        deliveryFee: 0,
        warranty: '6 Months Genuine Warranty',
        returnPolicy: '15-Day Return Policy',
        inStock: true,
        stockCount: 29,
        isVerified: true,
        location: 'Metro Distribution Center'
      }
    ],
    reviews: []
  },
  {
    id: 'prod-ngk-iridium-spark-plugs',
    name: 'NGK Laser Iridium Spark Plug (Pack of 4) - ILKAR7B11',
    partNumber: 'SP-NGK-93188',
    oemNumber: '90919-01275',
    brand: 'NGK Spark Plugs',
    category: 'Engine & Drivetrain',
    subCategory: 'Spark Plug',
    description: 'Laser welded iridium center electrode tip ensures high durability and greater spark. Platinum disc welded to backside of ground electrode provides long life and anti-fouling performance.',
    image: 'https://images.unsplash.com/photo-1632313627402-463d63328e3b?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1632313627402-463d63328e3b?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 915,
    specifications: {
      'Thread Diameter': '12 mm',
      'Hex Size': '14 mm',
      'Heat Range': '7',
      'Electrode Gap': '1.1 mm (Pre-gapped)',
      'Service Life': '80,000 - 100,000 km'
    },
    installationDifficulty: 'Moderate',
    warranty: '2 Years Manufacturer Warranty',
    compatibleVehicles: [
      {
        make: 'Hyundai',
        model: 'i20',
        yearFrom: 2014,
        yearTo: 2024,
        engine: ['1.2L Kappa Dual VTVT Petrol'],
        fitmentNotes: 'Direct plug-and-play replacement for 1.2L Petrol engines'
      },
      {
        make: 'Honda',
        model: 'City',
        yearFrom: 2014,
        yearTo: 2024,
        engine: ['1.5L i-VTEC DOHC Petrol'],
        fitmentNotes: 'Factory spark plug gap configuration'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 36.00,
        mrp: 44.00,
        deliveryDays: 1,
        deliveryFee: 0,
        warranty: '2 Years NGK Warranty',
        returnPolicy: '15-Day Return Policy',
        inStock: true,
        stockCount: 65,
        isVerified: true,
        location: 'Metro Distribution Center'
      }
    ],
    reviews: []
  },
  {
    id: 'prod-gates-timing-belt',
    name: 'Gates PowerGrip Timing Belt - Reinforced HNBR Composite',
    partNumber: 'TB-GATES-9981',
    oemNumber: '13568-39016',
    brand: 'Gates Corporation',
    category: 'Engine & Drivetrain',
    subCategory: 'Timing Belt',
    description: 'Constructed with premium high-temperature HNBR rubber compounds to resist heat, oil contamination, and tooth shear. Engineered for precise engine camshaft synchronization.',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: false,
    rating: 4.8,
    reviewCount: 215,
    specifications: {
      'Tooth Count': '148 Teeth',
      'Width': '30 mm',
      'Material': 'HNBR Synthetic Elastomer with Aramid Cord',
      'Replacement Interval': '100,000 km'
    },
    installationDifficulty: 'Professional Required',
    warranty: '2 Years / 100,000 km Warranty',
    compatibleVehicles: [
      {
        make: 'Toyota',
        model: 'Innova Crysta',
        yearFrom: 2016,
        yearTo: 2024,
        engine: ['2.4L GD Turbo Diesel (2GD-FTV)'],
        fitmentNotes: 'Primary timing drive belt'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 32.50,
        mrp: 42.00,
        deliveryDays: 1,
        deliveryFee: 0,
        warranty: '2 Years Manufacturer Warranty',
        returnPolicy: '15-Day Return Policy',
        inStock: false,
        stockCount: 0,
        isVerified: true,
        location: 'Metro Distribution Center'
      }
    ],
    reviews: []
  },
  {
    id: 'prod-toyota-air-filter',
    name: 'Genuine Toyota High-Efficiency Engine Air Filter',
    partNumber: 'AF-TY-17801',
    oemNumber: '17801-0L040',
    brand: 'Toyota Genuine Parts',
    category: 'Engine & Drivetrain',
    subCategory: 'Air Filter',
    description: 'Triple-layer non-woven pleated synthetic air cleaner element. Traps fine airborne road silica while maintaining unrestricted airflow to the turbocharger for maximum horsepower and fuel economy.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: true,
    isPopular: true,
    rating: 4.8,
    reviewCount: 480,
    specifications: {
      'Dimensions': '312 x 235 x 54 mm',
      'Frame Seal': 'Flexible Polyurethane Foam Moulding',
      'Filter Efficiency': '99.5% ISO 5011 Certified'
    },
    installationDifficulty: 'Easy',
    warranty: '1 Year / 20,000 km Warranty',
    compatibleVehicles: [
      {
        make: 'Toyota',
        model: 'Innova Crysta',
        yearFrom: 2016,
        yearTo: 2024,
        fitmentNotes: 'Direct drop-in replacement into OEM airbox'
      },
      {
        make: 'Toyota',
        model: 'Fortuner',
        yearFrom: 2016,
        yearTo: 2024,
        fitmentNotes: 'Airbox drop-in'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 18.50,
        mrp: 23.00,
        deliveryDays: 1,
        deliveryFee: 0,
        warranty: '1 Year OE Warranty',
        returnPolicy: '15-Day Return Policy',
        inStock: true,
        stockCount: 52,
        isVerified: true,
        location: 'Metro Distribution Center'
      }
    ],
    reviews: []
  },
  {
    id: 'prod-engine-oil-synthetic',
    name: 'Mobil 1 ESP 5W-30 Fully Synthetic Engine Oil (4 Liters)',
    partNumber: 'OIL-MOB-5W30',
    oemNumber: 'MOBIL-ESP-5W30-4L',
    brand: 'Mobil 1 / ExxonMobil',
    category: 'Engine & Drivetrain',
    subCategory: 'Engine Oil',
    description: 'Advanced full synthetic engine oil formulated for prolonged diesel particulate filter (DPF) and catalytic converter life. Delivers exceptional thermal protection and sludge resistance.',
    image: 'https://images.unsplash.com/photo-1598462047020-d7aa2288fae3?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1598462047020-d7aa2288fae3?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: false,
    isPopular: true,
    isBestSeller: true,
    rating: 4.9,
    reviewCount: 2410,
    specifications: {
      'Viscosity Grade': 'SAE 5W-30',
      'Volume': '4 Liters (Canister)',
      'Standards': 'ACEA C3, API SP/SN Plus',
      'Approvals': 'MB 229.51/229.52, VW 504 00 / 507 00, Porsche C30'
    },
    installationDifficulty: 'Moderate',
    warranty: 'Manufacturer Sealed Quality Assurance',
    compatibleVehicles: [
      {
        make: 'Toyota',
        model: 'Innova Crysta',
        yearFrom: 2016,
        yearTo: 2024,
        fitmentNotes: 'Recommended for 2GD/1GD DPF-equipped engines'
      },
      {
        make: 'Hyundai',
        model: 'i20',
        yearFrom: 2014,
        yearTo: 2024,
        fitmentNotes: 'Full synthetic change spec'
      },
      {
        make: 'Tata',
        model: 'Nexon',
        yearFrom: 2017,
        yearTo: 2024,
        fitmentNotes: 'Diesel & Petrol approved'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 38.00,
        mrp: 46.00,
        deliveryDays: 1,
        deliveryFee: 0,
        warranty: '100% Genuine ExxonMobil Seal',
        returnPolicy: '15-Day Return Policy (Unopened)',
        inStock: true,
        stockCount: 110,
        isVerified: true,
        location: 'Metro Distribution Center'
      }
    ],
    reviews: []
  },
  {
    id: 'prod-monroe-shock-absorbers',
    name: 'Monroe OESpectrum Gas-Charged Front Strut Assembly (Pair)',
    partNumber: 'SA-MON-8812',
    oemNumber: '48510-09Q50',
    brand: 'Monroe Shocks',
    category: 'Suspension & Steering',
    subCategory: 'Shock Absorbers',
    description: 'Twin Technology Active Control System isolates road harshness while delivering precise handling on winding roads. Nitrogen gas pressurized with Teflon banded piston.',
    image: 'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1517524008697-84bbe3c3fd98?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: false,
    rating: 4.7,
    reviewCount: 178,
    specifications: {
      'Type': 'Twin-Tube Nitrogen Gas Strut',
      'Quantity': 'Pair (Left + Right Front)',
      'Shaft Diameter': '22 mm Chrome Plated Rod'
    },
    installationDifficulty: 'Professional Required',
    warranty: '2 Years / 40,000 km Warranty',
    compatibleVehicles: [
      {
        make: 'Toyota',
        model: 'Innova Crysta',
        yearFrom: 2016,
        yearTo: 2024,
        fitmentNotes: 'Front suspension damper pair'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 115.00,
        mrp: 145.00,
        deliveryDays: 2,
        deliveryFee: 0,
        warranty: '2 Years Monroe Official Warranty',
        returnPolicy: '15-Day Return Policy',
        inStock: true,
        stockCount: 14,
        isVerified: true,
        location: 'Westside Logistics Park'
      }
    ],
    reviews: []
  },
  {
    id: 'prod-amaron-battery',
    name: 'Amaron PRO Hi-Life 65Ah Automotive Battery (DIN65R)',
    partNumber: 'BAT-AMR-65',
    oemNumber: '28800-0L330',
    brand: 'Bosch Automotive',
    category: 'Electrical & Lighting',
    subCategory: 'Battery',
    description: 'Zero-maintenance silver alloy automotive battery with Patented Silven X alloy technology. Built to withstand extreme thermal fluctuations and heavy electrical loads.',
    image: 'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: false,
    isPopular: true,
    rating: 4.8,
    reviewCount: 1530,
    specifications: {
      'Capacity': '65 Ah / 12V',
      'Cold Cranking Amps (CCA)': '550 CCA',
      'Warranty Period': '66 Months (36 Free Replacement + 30 Pro-rata)',
      'Dimensions': '242 x 175 x 190 mm'
    },
    installationDifficulty: 'Easy',
    warranty: '66 Months Comprehensive Warranty',
    compatibleVehicles: [
      {
        make: 'Toyota',
        model: 'Innova Crysta',
        yearFrom: 2016,
        yearTo: 2024,
        fitmentNotes: 'Standard battery tray fitment'
      },
      {
        make: 'Hyundai',
        model: 'i20',
        yearFrom: 2014,
        yearTo: 2024,
        fitmentNotes: 'Fits diesel and petrol battery mountings'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 89.00,
        mrp: 110.00,
        deliveryDays: 1,
        deliveryFee: 0,
        warranty: '66 Months Manufacturer Warranty',
        returnPolicy: 'Exchange Available with Scrap Old Battery',
        inStock: true,
        stockCount: 38,
        isVerified: true,
        location: 'Metro Distribution Center'
      }
    ],
    reviews: []
  },
  {
    id: 'prod-re-brake-pad',
    name: 'Brembo Sintered Brake Pads for Royal Enfield Classic 350 / Meteor',
    partNumber: 'BP-RE-350S',
    oemNumber: 'RE-RA50011',
    brand: 'Brembo High Performance',
    category: 'Braking System',
    subCategory: 'Brake Pads',
    description: 'Genuine Brembo sintered road compound front brake pads for Royal Enfield 350 J-Series bikes. Delivers instant bite, high friction coefficient and fade resistance even on steep ghat descents.',
    image: 'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: true,
    isPopular: true,
    rating: 4.9,
    reviewCount: 420,
    specifications: {
      'Compound': 'Sintered Metallic TT2802',
      'Position': 'Front ByBre Caliper',
      'Vehicle Compatibility': 'Royal Enfield Classic 350, Meteor 350, Hunter 350'
    },
    installationDifficulty: 'Easy',
    warranty: '1 Year Warranty',
    compatibleVehicles: [
      {
        make: 'Royal Enfield',
        model: 'Classic 350',
        yearFrom: 2021,
        yearTo: 2024,
        fitmentNotes: 'Front disc brake ByBre assembly'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 19.99,
        mrp: 26.00,
        deliveryDays: 1,
        deliveryFee: 0,
        warranty: '1 Year Brembo Official Warranty',
        returnPolicy: '15-Day Return Policy',
        inStock: true,
        stockCount: 41,
        isVerified: true,
        location: 'Metro Distribution Center'
      }
    ],
    reviews: [
      {
        id: 'rev-re-1',
        author: 'Karan Sharma',
        rating: 5,
        date: '2026-08-10',
        vehicleModel: 'Royal Enfield Classic 350 2023',
        comment: 'Massive upgrade over stock factory pads! Lever feel is so crisp now and zero squeaking sounds.',
        verifiedPurchase: true,
        helpfulCount: 22
      }
    ]
  },
  {
    id: 'prod-honda-activa-belt',
    name: 'Honda Genuine Bando Drive Belt for Activa 6G / 5G / Dio',
    partNumber: 'CVT-HA-23100',
    oemNumber: '23100-KWP-D01',
    brand: 'Gates Corporation',
    category: 'Transmission & Clutch',
    subCategory: 'Clutch',
    description: 'Factory spec CVT drive belt manufactured by Bando for Honda scooters. Reinforced polyester tensile cords resist stretching and provide seamless automatic variable transmission shifts.',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: true,
    rating: 4.8,
    reviewCount: 380,
    specifications: {
      'Belt Type': 'Variable Speed Toothed V-Belt',
      'Life Expectancy': '20,000 km'
    },
    installationDifficulty: 'Moderate',
    warranty: '6 Months Warranty',
    compatibleVehicles: [
      {
        make: 'Honda',
        model: 'Activa 6G',
        yearFrom: 2020,
        yearTo: 2024,
        fitmentNotes: 'CVT transmission compartment'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 9.50,
        mrp: 13.00,
        deliveryDays: 1,
        deliveryFee: 0,
        warranty: '6 Months Warranty',
        returnPolicy: '15-Day Return Policy',
        inStock: true,
        stockCount: 75,
        isVerified: true,
        location: 'Metro Distribution Center'
      }
    ],
    reviews: []
  },
  {
    id: 'prod-bosch-wiper-blades',
    name: 'Bosch Clear Advantage Aerodynamic Frameless Wiper Blades (Set)',
    partNumber: 'WB-BOSCH-CA',
    oemNumber: 'BOSCH-3397011680',
    brand: 'Bosch Automotive',
    category: 'Body & Exterior',
    subCategory: 'Wipers',
    description: 'Aerodynamic steel beam wind-spoiler structure distributes uniform downward pressure across windshield glass for streak-free wiping in monsoon storms.',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: false,
    isDeal: true,
    rating: 4.9,
    reviewCount: 1680,
    specifications: {
      'Sizes': '26" Driver + 16" Passenger (Dual Pack)',
      'Connector': 'Multi-clip J-Hook compatible',
      'Rubber': 'Graphite Coated Natural Rubber'
    },
    installationDifficulty: 'Easy',
    warranty: '1 Year Warranty',
    compatibleVehicles: [
      {
        make: 'Toyota',
        model: 'Innova Crysta',
        yearFrom: 2016,
        yearTo: 2024,
        fitmentNotes: 'Exact wiper arm adapter fitment'
      },
      {
        make: 'Hyundai',
        model: 'i20',
        yearFrom: 2014,
        yearTo: 2024,
        fitmentNotes: '24" + 16" universal connector included'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 16.99,
        mrp: 24.00,
        deliveryDays: 1,
        deliveryFee: 0,
        warranty: '1 Year Bosch Warranty',
        returnPolicy: '15-Day Return Policy',
        inStock: true,
        stockCount: 120,
        isVerified: true,
        location: 'Metro Distribution Center'
      }
    ],
    reviews: []
  },
  {
    id: 'prod-led-headlight-projector',
    name: 'Philips Ultinon Pro9000 H4 LED Headlight Bulbs (+250% Brightness)',
    partNumber: 'HL-PHIL-H4',
    oemNumber: 'PHILIPS-11342U90CWX2',
    brand: 'Valeo',
    category: 'Electrical & Lighting',
    subCategory: 'Headlights',
    description: 'Top-tier automotive grade Lumileds TopContact LEDs with AirBoost thermal management. Delivers 5800K cool white beam with sharp cut-off line that avoids dazzling oncoming drivers.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: false,
    rating: 4.8,
    reviewCount: 540,
    specifications: {
      'Fitting': 'H4 (Hi/Low Dual Beam)',
      'Color Temperature': '5800 Kelvin Cool Daylight',
      'Wattage': '18W per bulb (Energy saving)',
      'Lifetime': 'Up to 5,000 hours'
    },
    installationDifficulty: 'Easy',
    warranty: '5 Years Extended Warranty',
    compatibleVehicles: [
      {
        make: 'Toyota',
        model: 'Innova Crysta',
        yearFrom: 2016,
        yearTo: 2024,
        variants: ['2.4 G', '2.4 GX'],
        fitmentNotes: 'Replaces halogen H4 bulbs directly without splicing'
      },
      {
        make: 'Hyundai',
        model: 'i20',
        yearFrom: 2014,
        yearTo: 2021,
        fitmentNotes: 'Direct plug into factory headlight socket'
      },
      {
        make: 'Royal Enfield',
        model: 'Classic 350',
        yearFrom: 2021,
        yearTo: 2024,
        fitmentNotes: 'Fits round headlight casing'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 68.00,
        mrp: 85.00,
        deliveryDays: 1,
        deliveryFee: 0,
        warranty: '5 Years Warranty',
        returnPolicy: '15-Day Return Policy',
        inStock: true,
        stockCount: 34,
        isVerified: true,
        location: 'Metro Distribution Center'
      }
    ],
    reviews: []
  },
  {
    id: 'prod-4k-dashcam-sony',
    name: 'GearShift DriveGuard 4K Dual Dash Camera with GPS & Night Vision',
    partNumber: 'ACC-CAM-4K',
    oemNumber: 'GS-DG-400',
    brand: 'Valeo',
    category: 'Car Care & Accessories',
    subCategory: 'Dash Cameras',
    description: 'Front 4K UHD + Rear 1080P dual channel recording equipped with Sony STARVIS 2 sensor, built-in GPS logger, 5GHz Wi-Fi app connection, and 24/7 parking surveillance mode.',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600',
    galleryImages: [
      'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=600'
    ],
    isOem: false,
    isPopular: true,
    rating: 4.9,
    reviewCount: 780,
    specifications: {
      'Resolution': '3840x2160 @ 30fps (Front) + 1920x1080 (Rear)',
      'Field of View': '160° Wide Angle',
      'Memory': 'Includes 64GB High Endurance MicroSD Card',
      'Power': 'Type-C with Hardwire Kit Included'
    },
    installationDifficulty: 'Moderate',
    warranty: '2 Years Replacement Warranty',
    compatibleVehicles: [
      {
        make: 'Toyota',
        model: 'Innova Crysta',
        yearFrom: 2016,
        yearTo: 2024,
        fitmentNotes: 'Universal vehicle windshield mount'
      },
      {
        make: 'Hyundai',
        model: 'i20',
        yearFrom: 2014,
        yearTo: 2024,
        fitmentNotes: 'Universal windshield mount'
      },
      {
        make: 'Tata',
        model: 'Nexon',
        yearFrom: 2017,
        yearTo: 2024,
        fitmentNotes: 'Universal vehicle fitment'
      }
    ],
    sellers: [
      {
        sellerId: 'sel-gearshift-direct',
        sellerName: 'GearShift Express Spares',
        rating: 4.9,
        reviewCount: 3840,
        price: 84.99,
        mrp: 119.00,
        deliveryDays: 1,
        deliveryFee: 0,
        warranty: '2 Years GearShift Warranty',
        returnPolicy: '30-Day Return Policy',
        inStock: true,
        stockCount: 45,
        isVerified: true,
        location: 'Metro Distribution Center'
      }
    ],
    reviews: []
  }
];

export const NEARBY_SHOPS_DATA: NearbyShop[] = [
  {
    id: 'shop-1',
    name: 'Toyota Authorized Spares & Service Depot',
    type: 'Authorized Dealer',
    distanceKm: 1.4,
    address: 'Plot 42, Outer Ring Road, Automotive Cluster',
    rating: 4.9,
    reviewsCount: 820,
    isOpen: true,
    openingHours: '8:30 AM – 7:30 PM (Mon-Sat)',
    phone: '+1 (800) 432-7744',
    brandsHandled: ['Toyota Genuine Parts', 'Denso', 'Mobil 1'],
    inStockPartsCount: 1420,
    lat: 12.9716,
    lng: 77.5946
  },
  {
    id: 'shop-2',
    name: 'National Spares Hub & Diesel Injection Workshop',
    type: 'Independent Spares',
    distanceKm: 2.8,
    address: 'Shop 18, Commercial Auto Market, Phase 2',
    rating: 4.7,
    reviewsCount: 412,
    isOpen: true,
    openingHours: '9:00 AM – 8:30 PM (Open Today)',
    phone: '+1 (800) 998-1122',
    brandsHandled: ['Bosch', 'Brembo', 'Gates', 'Monroe', 'Valeo', 'NGK'],
    inStockPartsCount: 3890,
    lat: 12.9822,
    lng: 77.6015
  },
  {
    id: 'shop-3',
    name: 'Apex Precision Multibrand Garage & Parts Counter',
    type: 'Service Center & Workshop',
    distanceKm: 3.5,
    address: 'Sector 5, Industrial Estate, South Lane',
    rating: 4.8,
    reviewsCount: 650,
    isOpen: true,
    openingHours: '8:00 AM – 9:00 PM (Daily)',
    phone: '+1 (800) 776-5544',
    brandsHandled: ['Hyundai Genuine', 'Toyota Genuine', 'Bosch', 'Brembo'],
    inStockPartsCount: 2150,
    lat: 12.9645,
    lng: 77.6189
  },
  {
    id: 'shop-4',
    name: 'Two-Wheeler & Enfield Specialist Spares Center',
    type: 'Independent Spares',
    distanceKm: 4.2,
    address: 'Biker Alley, Old Station Road, Block B',
    rating: 4.6,
    reviewsCount: 310,
    isOpen: false,
    openingHours: 'Opens tomorrow at 9:30 AM',
    phone: '+1 (800) 554-3321',
    brandsHandled: ['Royal Enfield Genuine', 'Brembo', 'NGK', 'Castrol'],
    inStockPartsCount: 890,
    lat: 12.9510,
    lng: 77.5850
  }
];

export const INITIAL_MAINTENANCE_SCHEDULE: MaintenanceItem[] = [
  {
    id: 'maint-1',
    title: 'Engine Oil & Filter Change',
    intervalKm: 10000,
    dueInKm: 500,
    category: 'Engine & Drivetrain',
    urgency: 'high',
    lastReplacedDate: '2026-03-10',
    partKeyword: 'Oil Filter'
  },
  {
    id: 'maint-2',
    title: 'Front Brake Pads Inspection / Replacement',
    intervalKm: 25000,
    dueInKm: 2400,
    category: 'Braking System',
    urgency: 'medium',
    lastReplacedDate: '2025-11-15',
    partKeyword: 'Brake Pads'
  },
  {
    id: 'maint-3',
    title: 'Engine Air Cleaner Filter',
    intervalKm: 15000,
    dueInKm: 1200,
    category: 'Engine & Drivetrain',
    urgency: 'medium',
    lastReplacedDate: '2026-01-20',
    partKeyword: 'Air Filter'
  },
  {
    id: 'maint-4',
    title: 'Battery Health & Terminal Check',
    intervalKm: 30000,
    dueInKm: 7500,
    category: 'Electrical & Lighting',
    urgency: 'low',
    lastReplacedDate: '2025-08-04',
    partKeyword: 'Battery'
  }
];

export const INITIAL_CUSTOMER_QUOTES: CustomerQuote[] = [
  {
    id: 'QT-2026-081',
    customerName: 'Vikram Mehta',
    customerPhone: '+1 555-019-2831',
    vehicle: 'Toyota Innova Crysta (2022) 2.4D',
    date: '2026-09-01',
    notes: 'Major 40,000 km routine service + front brake shudder overhaul',
    status: 'Approved',
    items: [
      {
        productId: 'prod-toyota-oil-filter',
        name: 'Genuine Toyota Cartridge Oil Filter Element',
        partNumber: '04152-YZZA1',
        quantity: 1,
        unitPrice: 12.50,
        laborCharge: 8.00
      },
      {
        productId: 'prod-engine-oil-synthetic',
        name: 'Mobil 1 ESP 5W-30 Fully Synthetic Engine Oil (4L)',
        partNumber: 'OIL-MOB-5W30',
        quantity: 2,
        unitPrice: 38.00,
        laborCharge: 12.00
      },
      {
        productId: 'prod-bosch-brake-pads',
        name: 'BOSCH QuietCast Premium Ceramic Front Brake Pads',
        partNumber: '04465-0K360',
        quantity: 1,
        unitPrice: 45.99,
        laborCharge: 25.00
      }
    ]
  },
  {
    id: 'QT-2026-082',
    customerName: 'Sarah Jenkins',
    customerPhone: '+1 555-442-9901',
    vehicle: 'Hyundai i20 (2021) 1.2 Petrol',
    date: '2026-08-29',
    notes: 'Spark plugs misfire check & wiper replacement before rainy season',
    status: 'Sent',
    items: [
      {
        productId: 'prod-ngk-iridium-spark-plugs',
        name: 'NGK Laser Iridium Spark Plug (Pack of 4)',
        partNumber: '90919-01275',
        quantity: 1,
        unitPrice: 36.00,
        laborCharge: 18.00
      },
      {
        productId: 'prod-bosch-wiper-blades',
        name: 'Bosch Clear Advantage Aerodynamic Frameless Wiper Blades',
        partNumber: 'WB-BOSCH-CA',
        quantity: 1,
        unitPrice: 16.99,
        laborCharge: 5.00
      }
    ]
  }
];

export const SAMPLE_AI_PRESETS = [
  {
    id: 'sample-brake-pad',
    title: 'Worn Disc Brake Pad with Wear Sensor',
    image: 'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&q=80&w=500',
    description: 'Front caliper friction pad showing ~2mm friction lining remaining with heat scoring on backplate.'
  },
  {
    id: 'sample-oil-filter',
    title: 'Clogged Cartridge Oil Filter with O-Ring',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&q=80&w=500',
    description: 'Pleated cylindrical cellulose oil filter element coated in dark engine carbon sludge.'
  },
  {
    id: 'sample-spark-plug',
    title: 'Carbon-Fouled Iridium Spark Plug',
    image: 'https://images.unsplash.com/photo-1632313627402-463d63328e3b?auto=format&fit=crop&q=80&w=500',
    description: 'Threaded high-voltage ignition plug with eroded ceramic insulator and electrode erosion.'
  },
  {
    id: 'sample-timing-belt',
    title: 'Cracked Toothed Timing / Serpentine Belt',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&q=80&w=500',
    description: 'Toothed rubber composite camshaft drive belt showing micro-cracks between cog teeth.'
  }
];

export const CATEGORIES = [
  { id: 'cat-engine', name: 'Engine & Drivetrain', icon: 'Wrench', itemCount: 1420 },
  { id: 'cat-braking', name: 'Braking System', icon: 'Disc', itemCount: 980 },
  { id: 'cat-suspension', name: 'Suspension & Steering', icon: 'Crosshair', itemCount: 750 },
  { id: 'cat-electrical', name: 'Electrical & Lighting', icon: 'Zap', itemCount: 1120 },
  { id: 'cat-filters', name: 'Filters & Service Kits', icon: 'Filter', itemCount: 630 },
  { id: 'cat-transmission', name: 'Clutch & Transmission', icon: 'Cog', itemCount: 510 },
  { id: 'cat-cooling', name: 'Cooling & Heating', icon: 'Thermometer', itemCount: 440 },
  { id: 'cat-body', name: 'Body Parts & Mirrors', icon: 'Car', itemCount: 890 }
];

export const MOCK_PRODUCTS = PRODUCTS_DATABASE;
