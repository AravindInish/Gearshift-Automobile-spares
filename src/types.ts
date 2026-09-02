export type VehicleType = 'Car' | 'Motorcycle' | 'Scooter' | 'Truck' | 'Bus' | 'Commercial Vehicle';

export interface Vehicle {
  id: string;
  type: VehicleType;
  make: string;
  model: string;
  variant: string;
  year: number;
  engine: string;
  fuelType: 'Diesel' | 'Petrol' | 'CNG' | 'Electric' | 'Hybrid';
  image?: string;
  nickname?: string;
  odometerKm?: number;
}

export interface MaintenanceItem {
  id: string;
  title: string;
  intervalKm: number;
  dueInKm: number;
  category: string;
  urgency: 'high' | 'medium' | 'low';
  lastReplacedDate: string;
  partKeyword: string;
}

export interface SellerListing {
  sellerId: string;
  sellerName: string;
  rating: number;
  reviewCount: number;
  price: number;
  mrp: number;
  deliveryDays: number;
  deliveryFee: number;
  warranty: string;
  returnPolicy: string;
  inStock: boolean;
  stockCount: number;
  isVerified: boolean;
  location: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  vehicleModel: string;
  comment: string;
  verifiedPurchase: boolean;
  helpfulCount: number;
}

export interface CompatibilityRule {
  make: string;
  model: string;
  yearFrom: number;
  yearTo: number;
  variants?: string[];
  engine?: string[];
  fitmentNotes?: string;
}

export interface Product {
  id: string;
  name: string;
  partNumber: string;
  oemNumber: string;
  brand: string;
  category: string;
  subCategory: string;
  description: string;
  image: string;
  galleryImages: string[];
  isOem: boolean;
  isPopular?: boolean;
  isBestSeller?: boolean;
  isDeal?: boolean;
  rating: number;
  reviewCount: number;
  specifications: Record<string, string>;
  installationDifficulty: 'Easy' | 'Moderate' | 'Professional Required';
  installationGuideUrl?: string;
  warranty: string;
  compatibleVehicles: CompatibilityRule[];
  sellers: SellerListing[];
  recommendedAddons?: string[]; // IDs of products
  reviews: Review[];
}

export interface CartItem {
  product: Product;
  selectedSeller: SellerListing;
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  status: 'Order Placed' | 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  items: CartItem[];
  shippingAddress: {
    name: string;
    phone: string;
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery';
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  trackingNumber: string;
  courier: string;
  estimatedDelivery: string;
  vehicleContext?: string;
}

export interface NearbyShop {
  id: string;
  name: string;
  type: 'Authorized Dealer' | 'Independent Spares' | 'Service Center & Workshop';
  distanceKm: number;
  address: string;
  rating: number;
  reviewsCount: number;
  isOpen: boolean;
  openingHours: string;
  phone: string;
  brandsHandled: string[];
  inStockPartsCount: number;
  lat: number;
  lng: number;
}

export interface QuotationItem {
  productId: string;
  name: string;
  partNumber: string;
  quantity: number;
  unitPrice: number;
  laborCharge: number;
}

export interface CustomerQuote {
  id: string;
  customerName: string;
  customerPhone: string;
  vehicle: string;
  date: string;
  items: QuotationItem[];
  notes: string;
  status: 'Draft' | 'Sent' | 'Approved' | 'Completed';
}
