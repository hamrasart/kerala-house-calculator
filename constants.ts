import { Room, MaterialOption, Quality } from './types';
import { v4 as uuidv4 } from 'uuid';

export const QUALITY_RATES: Record<Quality, number> = {
  Basic: 1600,
  Medium: 1800,
  Premium: 2200,
};

export const MATERIAL_OPTIONS: Record<string, MaterialOption[]> = {
  cement: [
    { name: 'Standard Cement', cost: 0 }, { name: 'ACC Cement', cost: 50000 }, { name: 'UltraTech', cost: 75000 },
    { name: 'Ambuja', cost: 60000 }, { name: 'Birla A1', cost: 65000 }, { name: 'Ramco', cost: 55000 }, { name: 'JSW Cement', cost: 70000 },
  ],
  flooring: [
    { name: 'Standard Tiles', cost: 0 }, { name: 'Marble Flooring', cost: 100000 }, { name: 'Granite Flooring', cost: 150000 },
    { name: 'Vitrified Tiles', cost: 80000 }, { name: 'Italian Marble', cost: 200000 }, { name: 'Ceramic Tiles', cost: 120000 },
    { name: 'Porcelain Tiles', cost: 90000 }, { name: 'Natural Stone', cost: 180000 }, { name: 'Mosaic Tiles', cost: 70000 },
  ],
  kitchen: [
    { name: 'Basic Kitchen', cost: 0 }, { name: 'Modular Kitchen', cost: 150000 }, { name: 'Premium Modular', cost: 300000 },
    { name: 'Luxury Kitchen', cost: 500000 }, { name: 'Semi-Modular', cost: 200000 }, { name: 'Designer Kitchen', cost: 400000 },
    { name: 'Simple Modular', cost: 100000 },
  ],
  wood: [
    { name: 'Standard Wood', cost: 0 }, { name: 'Teak Wood', cost: 100000 }, { name: 'Rosewood', cost: 75000 },
    { name: 'Mahogany', cost: 50000 }, { name: 'Sandalwood', cost: 85000 }, { name: 'Oak Wood', cost: 60000 },
    { name: 'Pine Wood', cost: 40000 }, { name: 'Walnut Wood', cost: 90000 }, { name: 'Rubber Wood', cost: 45000 }, { name: 'Plywood', cost: 35000 },
  ],
  paint: [
    { name: 'Standard Paint', cost: 0 }, { name: 'Asian Paints', cost: 30000 }, { name: 'Berger Premium', cost: 40000 },
    { name: 'Dulux Luxury', cost: 50000 }, { name: 'Nerolac', cost: 35000 }, { name: 'Kansai Nerolac', cost: 45000 },
    { name: 'ICI Paints', cost: 25000 }, { name: 'Nippon Paint', cost: 55000 },
  ],
  roofing: [
    { name: 'Standard Roofing', cost: 0 }, { name: 'Clay Tiles', cost: 80000 }, { name: 'Metal Roofing', cost: 120000 },
    { name: 'Premium Tiles', cost: 150000 }, { name: 'Concrete Tiles', cost: 100000 }, { name: 'Asbestos Sheets', cost: 90000 },
    { name: 'Solar Tiles', cost: 140000 }, { name: 'Slate Tiles', cost: 110000 },
  ],
};

export const FEATURE_RATES = {
  landscaping: {
    'Basic (Grass & Simple Plants)': 200,
    'Standard (Flower Beds & Shrubs)': 300,
    'Premium (Hardscaping & Lighting)': 450,
    'Luxe (Water Features & Design)': 600,
  },
  paving: {
    'Concrete': 150,
    'Asphalt': 200,
    'Interlocking Bricks': 300,
    'Natural Stone Pavers': 450,
    'Cobblestone': 600,
  },
  boundaryWall: {
    'Standard (Concrete Block)': 500,
    'Decorative (Brick & Plaster)': 800,
    'Precast Concrete Panels': 950,
    'Laterite Stone': 1100,
  },
  solar: {
    '1KW System': 60000,
    '3KW System': 150000,
    '5KW System': 250000,
    '7KW System': 350000,
    '10KW System': 400000,
  },
  falseCeiling: 70,
};

export const DEFAULT_ROOMS: Room[] = [
  { id: uuidv4(), name: 'Living Room', type: '🛋️ Living Room', width: 16, length: 20, area: 320, hasFalseCeiling: false, furniture: [], appliances: [], decor: [] },
  { id: uuidv4(), name: 'Master Bedroom', type: '🛏️ Master Bedroom', width: 12, length: 14, area: 168, hasFalseCeiling: false, furniture: [], appliances: [], decor: [] },
  { id: uuidv4(), name: 'Bedroom 2', type: '🛏️ Bedroom', width: 10, length: 12, area: 120, hasFalseCeiling: false, furniture: [], appliances: [], decor: [] },
  { id: uuidv4(), name: 'Kitchen', type: '🍳 Kitchen', width: 8, length: 12, area: 96, hasFalseCeiling: false, furniture: [], appliances: [], decor: [] },
  { id: uuidv4(), name: 'Bathroom 1', type: '🚿 Bathroom', width: 6, length: 8, area: 48, hasFalseCeiling: false, furniture: [], appliances: [], decor: [] },
  { id: uuidv4(), name: 'Bathroom 2', type: '🚿 Bathroom', width: 6, length: 8, area: 48, hasFalseCeiling: false, furniture: [], appliances: [], decor: [] },
];

export const ROOM_TYPES = [
  '🛋️ Living Room', '🛏️ Master Bedroom', '🛏️ Bedroom', '🍳 Kitchen', '🚿 Bathroom',
  '🍽️ Dining Room', '📚 Study Room', '🏠 Guest Room', '🙏 Pooja Room', '🌿 Balcony', '📦 Store Room'
];

export const FURNITURE_DATABASE: Record<string, number> = {
  'Sofa Set': 45000, 'Coffee Table': 8000, 'Side Tables': 5000, 'Bookshelf': 12000, 'Dining Table': 25000, 'Dining Chairs': 3000, 'King Bed': 35000, 'Queen Bed': 25000, 'Single Bed': 15000, 'Wardrobe': 40000, 'Dressing Table': 15000, 'Study Table': 8000, 'Chair': 4000, 'Office Chair': 8000, 'Kitchen Cabinets': 80000, 'Kitchen Island': 25000, 'Storage Units': 15000, 'Vanity Unit': 20000, 'Storage Cabinet': 12000, 'Towel Rack': 2000, 'Center Table': 6000, 'Shoe Rack': 4000, 'Chest of Drawers': 18000, 'Buffet Unit': 22000, 'Display Cabinet': 28000, 'Serving Trolley': 8000, 'Filing Cabinet': 10000, 'Computer Table': 12000, 'Luggage Rack': 3000, 'Pooja Mandir': 25000, 'Seating Mat': 2000, 'Outdoor Chairs': 6000, 'Small Table': 4000, 'Plant Stands': 2000, 'Storage Box': 3000, 'Storage Racks': 8000, 'Storage Boxes': 2000, 'Shelving Units': 10000, 'Pantry Unit': 20000, 'Medicine Cabinet': 8000, 'TV Stand': 12000, 'Recliner Chair': 25000, 'Bean Bag': 3000, 'Bar Stool': 2500, 'Bench': 4000
};

export const APPLIANCES_DATABASE: Record<string, number> = {
  'AC': 40000, 'Ceiling Fan': 3000, 'Table Lamp': 2000, 'Iron': 2000, 'Refrigerator': 25000, 'Microwave': 8000, 'Mixer Grinder': 4000, 'Induction Cooktop': 5000, 'Chimney': 12000, 'Dishwasher': 35000, 'Geyser': 8000, 'Exhaust Fan': 2000, 'Washing Machine': 20000, 'Floor Lamp': 4000, 'Air Purifier': 15000, 'Hair Dryer': 3000, 'Desk Lamp': 2500, 'Water Purifier': 12000, 'Water Heater': 10000, 'Pendant Lights': 5000, 'Computer': 35000, 'Printer': 8000, 'LED Lights': 1500, 'Outdoor Lights': 3000, 'Television': 30000, 'Sound System': 15000, 'DVD Player': 3000, 'Set Top Box': 2000, 'WiFi Router': 2500, 'Electric Kettle': 1500, 'Toaster': 2000, 'Coffee Maker': 5000, 'Blender': 3000, 'Food Processor': 8000, 'Rice Cooker': 3000, 'Pressure Cooker': 2500, 'Oven': 15000, 'Vacuum Cleaner': 8000, 'Steam Iron': 3000, 'Sewing Machine': 12000, 'Heater': 4000, 'Cooler': 8000, 'Humidifier': 5000, 'Air Fryer': 8000, 'Inverter': 15000
};

export const DECOR_DATABASE: Record<string, number> = {
  'Wall Art': 3000, 'Plants': 1000, 'Cushions': 1500, 'Curtains': 5000, 'Carpet': 8000, 'Lighting': 4000, 'Mirror': 3000, 'Backsplash Tiles': 8000, 'Kitchen Accessories': 3000, 'Bathroom Accessories': 2000, 'Tiles': 10000, 'Vases': 2000, 'Photo Frames': 1500, 'Bedsheets': 3000, 'Pillows': 1000, 'Study Accessories': 2000, 'Storage Containers': 1500, 'Table Runner': 1000, 'Centerpiece': 2500, 'Organizers': 2000, 'Whiteboard': 3000, 'Welcome Mat': 1000, 'Idols': 5000, 'Brass Items': 8000, 'Incense Holders': 500, 'Oil Lamps': 1000, 'Flowers': 500, 'Outdoor Cushions': 2000, 'Wind Chimes': 1500, 'Garden Accessories': 3000, 'Labels': 200, 'Shower Curtain': 1500, 'Wall Clock': 2000, 'Decorative Lights': 3000, 'Candles': 800, 'Artificial Flowers': 1200, 'Rugs': 4000, 'Throw Blankets': 2000, 'Wall Stickers': 500, 'Decorative Bowls': 1500, 'Sculptures': 5000, 'Paintings': 8000, 'Posters': 300, 'Wall Shelves': 2500, 'Decorative Mirrors': 4000
};

export const WHATSAPP_NUMBER = '+917907383944';
export const WHATSAPP_TEAM_MESSAGE = "Hi! I need a free discussion about my house building cost estimation. Please help me with accurate pricing and planning.";
export const WHATSAPP_AD_MESSAGE = "Hello! I saw your ad on the cost calculator and I'm interested in your services for house planning, 3D design, construction, and interior works. Can we discuss further?";
