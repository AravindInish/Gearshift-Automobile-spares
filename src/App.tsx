import React, { useState, useMemo } from 'react';
import { 
  Car, 
  Wrench, 
  ShieldCheck, 
  Check, 
  Filter, 
  SlidersHorizontal, 
  RotateCcw, 
  Sparkles, 
  MapPin, 
  Store, 
  ArrowRight, 
  Tag, 
  CheckCircle2, 
  PhoneCall, 
  Truck,
  Layers,
  ChevronDown
} from 'lucide-react';
import { 
  Vehicle, 
  Product, 
  CartItem, 
  SellerListing, 
  Order 
} from './types';
import { 
  VEHICLE_DATABASE, 
  MOCK_PRODUCTS, 
  CATEGORIES, 
  POPULAR_BRANDS 
} from './data/mockData';
import { checkCompatibility } from './utils/compatibility';

// Component imports
import { Navbar } from './components/Navbar';
import { HeroVehicleBar } from './components/HeroVehicleBar';
import { ProductCard } from './components/ProductCard';
import { VehicleSelectorModal } from './components/VehicleSelectorModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { AiPartFinderModal } from './components/AiPartFinderModal';
import { GarageModal } from './components/GarageModal';
import { NearbyShopsModal } from './components/NearbyShopsModal';
import { WorkshopMode } from './components/WorkshopMode';
import { SellerDashboard } from './components/SellerDashboard';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';

export default function App() {
  // Active Vehicle & Garage
  const [activeVehicle, setActiveVehicle] = useState<Vehicle | null>(VEHICLE_DATABASE[0]);
  const [garageVehicles, setGarageVehicles] = useState<Vehicle[]>(VEHICLE_DATABASE.slice(0, 3));

  // Catalog Products
  const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);

  // Cart & Orders
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: MOCK_PRODUCTS[0],
      quantity: 1,
      selectedSeller: MOCK_PRODUCTS[0].sellers[0]
    }
  ]);
  const [couponCode, setCouponCode] = useState<string>('');
  const [discountRate, setDiscountRate] = useState<number>(0);
  const [lastPlacedOrder, setLastPlacedOrder] = useState<Order | null>(null);

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedBrand, setSelectedBrand] = useState<string>('All');
  const [onlyCompatible, setOnlyCompatible] = useState<boolean>(false);
  const [partTypeFilter, setPartTypeFilter] = useState<'all' | 'oem' | 'aftermarket'>('all');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Modals Visibility
  const [isVehicleSelectorOpen, setIsVehicleSelectorOpen] = useState(false);
  const [isGarageOpen, setIsGarageOpen] = useState(false);
  const [isAiFinderOpen, setIsAiFinderOpen] = useState(false);
  const [isNearbyOpen, setIsNearbyOpen] = useState(false);
  const [isWorkshopOpen, setIsWorkshopOpen] = useState(false);
  const [isSellerOpen, setIsSellerOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderTrackingOpen, setIsOrderTrackingOpen] = useState(false);
  const [selectedProductDetail, setSelectedProductDetail] = useState<Product | null>(null);

  // Cart Handlers
  const handleAddToCart = (product: Product, seller?: SellerListing, event?: React.MouseEvent) => {
    if (event) event.stopPropagation();
    const fallbackSeller: SellerListing = {
      sellerId: 'sel-default',
      sellerName: 'GearShift Verified Depot',
      rating: 4.8,
      reviewCount: 50,
      price: 29.99,
      mrp: 39.99,
      deliveryDays: 1,
      deliveryFee: 0,
      warranty: '1 Year Warranty',
      returnPolicy: '15-Day Free Returns',
      inStock: true,
      stockCount: 10,
      isVerified: true,
      location: 'Central Hub'
    };
    const effectiveSeller = seller || product.sellers?.[0] || fallbackSeller;

    setCart(prevCart => {
      const existing = prevCart.find(it => it.product.id === product.id);
      if (existing) {
        return prevCart.map(it =>
          it.product.id === product.id ? { ...it, quantity: it.quantity + 1 } : it
        );
      }
      return [...prevCart, { product, quantity: 1, selectedSeller: effectiveSeller }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (product: Product, seller?: SellerListing) => {
    handleAddToCart(product, seller);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveFromCart(productId);
    } else {
      setCart(prev => prev.map(it => it.product.id === productId ? { ...it, quantity } : it));
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prev => prev.filter(it => it.product.id !== productId));
  };

  const handleApplyCoupon = (code: string) => {
    setCouponCode(code);
    if (code === 'GEARSHIFT10') {
      setDiscountRate(0.10);
    } else if (code === 'WORKSHOP20') {
      setDiscountRate(0.20);
    }
  };

  const handleOrderPlaced = (newOrder: Order) => {
    setLastPlacedOrder(newOrder);
    setCart([]);
    setIsOrderTrackingOpen(true);
  };

  // Garage Handlers
  const handleAddVehicleToGarage = (vehicle: Vehicle) => {
    if (!garageVehicles.find(v => v.id === vehicle.id)) {
      setGarageVehicles([vehicle, ...garageVehicles]);
    }
    setActiveVehicle(vehicle);
  };

  const handleRemoveVehicleFromGarage = (id: string) => {
    const updated = garageVehicles.filter(v => v.id !== id);
    setGarageVehicles(updated);
    if (activeVehicle?.id === id) {
      setActiveVehicle(updated[0] || null);
    }
  };

  const handleAddNewProduct = (newProdData: Partial<Product>) => {
    setProducts([newProdData as Product, ...products]);
  };

  // Filtered Products Calculation
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Search query check
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesPartNum = product.partNumber.toLowerCase().includes(query);
        const matchesOem = product.oemNumber.toLowerCase().includes(query);
        const matchesBrand = product.brand.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesVehicleRule = product.compatibleVehicles.some(
          v => v.make.toLowerCase().includes(query) || v.model.toLowerCase().includes(query)
        );

        if (!matchesName && !matchesPartNum && !matchesOem && !matchesBrand && !matchesCategory && !matchesVehicleRule) {
          return false;
        }
      }

      // Category filter
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrand !== 'All' && product.brand !== selectedBrand) {
        return false;
      }

      // OEM vs Aftermarket
      if (partTypeFilter === 'oem' && !product.isOem) return false;
      if (partTypeFilter === 'aftermarket' && product.isOem) return false;

      // In stock only
      if (inStockOnly && (!product.sellers[0] || !product.sellers[0].inStock)) {
        return false;
      }

      // Only compatible with active vehicle
      if (onlyCompatible && activeVehicle) {
        const comp = checkCompatibility(product, activeVehicle);
        if (comp.status !== 'Compatible') {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') {
        return (a.sellers[0]?.price || 0) - (b.sellers[0]?.price || 0);
      }
      if (sortBy === 'price-desc') {
        return (b.sellers[0]?.price || 0) - (a.sellers[0]?.price || 0);
      }
      if (sortBy === 'rating') {
        return b.rating - a.rating;
      }
      return 0; // featured default
    });
  }, [products, searchQuery, selectedCategory, selectedBrand, partTypeFilter, inStockOnly, onlyCompatible, activeVehicle, sortBy]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans flex flex-col antialiased">
      {/* Top Value / Hotline Bar */}
      <div className="bg-[#0b1120] text-slate-300 text-[11px] font-medium py-1.5 px-4 sm:px-8 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            100% Guaranteed Fitment or Instant Free Return
          </span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">
            Free Express Shipping on Orders Over $40
          </span>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsNearbyOpen(true)}
            className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <MapPin className="w-3 h-3 text-orange-500" />
            <span>Store Locator (Nearby Depots)</span>
          </button>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-1 text-slate-400">
            <PhoneCall className="w-3 h-3 text-slate-400" />
            <span>Fitment Hotline: <strong>1-800-GEAR-SHIFT</strong></span>
          </div>
        </div>
      </div>

      {/* Main Professional Navbar */}
      <Navbar
        activeVehicle={activeVehicle}
        onOpenVehicleModal={() => setIsVehicleSelectorOpen(true)}
        onOpenGarageModal={() => setIsGarageOpen(true)}
        onOpenAiFinderModal={() => setIsAiFinderOpen(true)}
        onOpenNearbyShopsModal={() => setIsNearbyOpen(true)}
        onOpenWorkshopMode={() => setIsWorkshopOpen(true)}
        onOpenSellerPortal={() => setIsSellerOpen(true)}
        onOpenOrders={() => setIsOrderTrackingOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cart.reduce((acc, it) => acc + it.quantity, 0)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        allProducts={products}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
      />

      {/* Hero & Embedded Vehicle Bar */}
      <HeroVehicleBar
        onOpenVehicleModal={() => setIsVehicleSelectorOpen(true)}
        activeVehicle={activeVehicle}
        onSelectVehicle={(v) => {
          handleAddVehicleToGarage(v);
        }}
        onSelectCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        onOpenAiFinder={() => setIsAiFinderOpen(true)}
        onOpenNearby={() => setIsNearbyOpen(true)}
      />

      {/* Active Vehicle Context Strip */}
      {activeVehicle && (
        <div className="bg-white border-b border-slate-200 px-4 sm:px-8 py-3 shadow-xs">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center font-bold shrink-0">
                <Car className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Browsing Parts For:</span>
                  <span className="text-sm font-extrabold text-slate-900">
                    {activeVehicle.year} {activeVehicle.make} {activeVehicle.model} ({activeVehicle.variant})
                  </span>
                  <span className="text-[11px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-medium">
                    {activeVehicle.engine}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  Fuel: {activeVehicle.fuelType} • Odometer: {activeVehicle.odometerKm?.toLocaleString() || '42,000'} km
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 bg-emerald-50 border border-emerald-300 px-3 py-1.5 rounded-lg text-xs font-bold text-emerald-900 cursor-pointer hover:bg-emerald-100/70 transition-colors">
                <input
                  type="checkbox"
                  checked={onlyCompatible}
                  onChange={(e) => setOnlyCompatible(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-3.5 h-3.5"
                />
                <span>Only show guaranteed compatible parts ({activeVehicle.model})</span>
              </label>

              <button
                onClick={() => setIsGarageOpen(true)}
                className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Wrench className="w-3.5 h-3.5 text-orange-600" />
                <span>Service Schedule</span>
              </button>

              <button
                onClick={() => setIsVehicleSelectorOpen(true)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer"
              >
                Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar Filters */}
          <aside className="lg:col-span-3 space-y-6">
            {/* Filter Card */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-orange-600" />
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Filters</h3>
                </div>
                {(selectedCategory !== 'All' || selectedBrand !== 'All' || partTypeFilter !== 'all' || onlyCompatible || inStockOnly) && (
                  <button
                    onClick={() => {
                      setSelectedCategory('All');
                      setSelectedBrand('All');
                      setPartTypeFilter('all');
                      setOnlyCompatible(false);
                      setInStockOnly(false);
                      setSearchQuery('');
                    }}
                    className="text-[11px] font-bold text-orange-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset All</span>
                  </button>
                )}
              </div>

              {/* Vehicle Compatibility Filter Check */}
              {activeVehicle && (
                <div className="bg-slate-50 border border-slate-200 rounded-lg p-3">
                  <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                    Vehicle Fitment Filter
                  </span>
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={onlyCompatible}
                      onChange={(e) => setOnlyCompatible(e.target.checked)}
                      className="mt-0.5 rounded text-orange-600 focus:ring-orange-500"
                    />
                    <span className="text-xs text-slate-700 font-medium leading-tight">
                      Hide incompatible parts for <strong>{activeVehicle.make} {activeVehicle.model}</strong>
                    </span>
                  </label>
                </div>
              )}

              {/* Systems / Categories */}
              <div>
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Vehicle Systems
                </label>
                <div className="space-y-1 text-xs">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`w-full text-left px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex justify-between ${
                      selectedCategory === 'All' ? 'bg-orange-50 text-orange-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <span>All Systems</span>
                    <span className="text-slate-400 font-mono">{products.length}</span>
                  </button>
                  {CATEGORIES.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.name)}
                      className={`w-full text-left px-2.5 py-1.5 rounded-md font-medium transition-colors cursor-pointer flex justify-between ${
                        selectedCategory === cat.name ? 'bg-orange-50 text-orange-700 font-bold' : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span className="text-slate-400 font-mono">{cat.itemCount}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Part Type: OEM vs Aftermarket */}
              <div className="border-t border-slate-100 pt-4">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Part Grade & Certification
                </label>
                <div className="flex flex-col gap-1.5 text-xs text-slate-700">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="partType"
                      checked={partTypeFilter === 'all'}
                      onChange={() => setPartTypeFilter('all')}
                      className="text-orange-600"
                    />
                    <span>All Specifications</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="partType"
                      checked={partTypeFilter === 'oem'}
                      onChange={() => setPartTypeFilter('oem')}
                      className="text-orange-600"
                    />
                    <span className="font-semibold text-slate-900">OEM Genuine Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="partType"
                      checked={partTypeFilter === 'aftermarket'}
                      onChange={() => setPartTypeFilter('aftermarket')}
                      className="text-orange-600"
                    />
                    <span>Certified Aftermarket</span>
                  </label>
                </div>
              </div>

              {/* Popular Brands */}
              <div className="border-t border-slate-100 pt-4">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2">
                  Manufacturer / Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md py-1.5 px-2.5 text-xs text-slate-900"
                >
                  <option value="All">All Tier-1 Brands</option>
                  {POPULAR_BRANDS.map(brand => (
                    <option key={brand.name} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Availability */}
              <div className="border-t border-slate-100 pt-4">
                <label className="flex items-center gap-2 text-xs text-slate-700 font-semibold cursor-pointer">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="rounded text-orange-600"
                  />
                  <span>In-Stock Ready for Same-Day Dispatch</span>
                </label>
              </div>
            </div>

            {/* AI Diagnostics CTA Mini-Banner */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-xl p-5 shadow-sm border border-slate-800 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-orange-400">AI Part Identifier</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Have a worn-out or damaged part? Upload a photo and let our Gemini Vision model identify the OEM code and price.
              </p>
              <button
                onClick={() => setIsAiFinderOpen(true)}
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Upload Part Photo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Verified Merchant Trust Widget */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 text-xs space-y-2.5">
              <span className="font-bold text-slate-500 uppercase text-[10px] block">Commercial Guarantees</span>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>100% Tax Invoicing for Workshops</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <Truck className="w-4 h-4 text-orange-600 shrink-0" />
                <span>Express courier pickup twice daily</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
                <span>Full manufacturer warranty valid</span>
              </div>
            </div>
          </aside>

          {/* Right Main Catalog Grid */}
          <div className="lg:col-span-9 space-y-6">
            {/* Catalog Control Bar */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-base font-bold text-slate-900 leading-tight">
                  {selectedCategory === 'All' ? 'All Automotive Components' : selectedCategory}
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Showing <strong className="text-slate-800">{filteredProducts.length}</strong> verified parts
                  {activeVehicle ? ` for ${activeVehicle.make} ${activeVehicle.model}` : ''}
                </p>
              </div>

              {/* Sort selector */}
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-500 font-medium">Sort By:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-slate-50 border border-slate-300 rounded-lg py-1.5 px-3 text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="featured">Featured & Best Matches</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Customer Rating</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-xl border border-slate-200 p-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mx-auto">
                  <Car className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-800">No matching spare parts found</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  We could not find parts matching your active vehicle and filters. Try clearing the compatibility filter or broadening your search terms.
                </p>
                <button
                  onClick={() => {
                    setOnlyCompatible(false);
                    setSelectedCategory('All');
                    setSelectedBrand('All');
                    setSearchQuery('');
                  }}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    activeVehicle={activeVehicle}
                    onSelect={(p) => setSelectedProductDetail(p)}
                    onAddToCart={(p, e) => handleAddToCart(p, undefined, e)}
                    onCheckFitment={(p, e) => {
                      e.stopPropagation();
                      setSelectedProductDetail(p);
                    }}
                  />
                ))}
              </div>
            )}

            {/* Popular Automobile Brands Showcase Section */}
            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-xs mt-8">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                Authorized Manufacturer Brands & Direct Depots
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {POPULAR_BRANDS.map(brand => (
                  <div
                    key={brand.name}
                    onClick={() => {
                      setSelectedBrand(brand.name);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-orange-50/50 hover:border-orange-300 transition-all text-center cursor-pointer flex flex-col items-center justify-center"
                  >
                    <span className="text-xs font-bold text-slate-900">{brand.name}</span>
                    <span className="text-[10px] text-slate-500 mt-0.5">{brand.country} • {brand.isOem ? 'OEM Genuine' : 'Tier-1'}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Banner: Workshop & Mechanic Trade */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#0f172a] rounded-xl p-6 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border border-slate-800">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 px-2 py-0.5 rounded">
                  Commercial Fleet & Workshop Tier
                </span>
                <h3 className="text-lg font-bold text-white mt-1.5">
                  Are You an Independent Garage or Mechanic?
                </h3>
                <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                  Access wholesale tier-1 pricing, generate customer job estimates with customized labor rates, and receive scheduled multi-box deliveries directly to your service bays.
                </p>
              </div>

              <button
                onClick={() => setIsWorkshopOpen(true)}
                className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2.5 rounded-lg text-xs font-bold whitespace-nowrap flex items-center gap-2 transition-all shadow-md cursor-pointer shrink-0"
              >
                <Wrench className="w-4 h-4" />
                <span>Open Workshop Console</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0b1120] text-slate-400 text-xs border-t border-slate-800 mt-16 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <div className="flex items-center gap-2 text-white font-black text-lg mb-3">
              <div className="w-7 h-7 rounded bg-orange-600 flex items-center justify-center text-white">
                <Wrench className="w-4 h-4" />
              </div>
              <span>GEARSHIFT<span className="text-orange-500">SPARES</span></span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              The premier automotive spare parts marketplace with verified vehicle fitment logic, instant OEM cross-referencing, and nationwide depot logistics.
            </p>
            <p className="text-[11px] text-slate-500">
              © 2026 GearShift Spares Inc. All trademarks and brand names are property of their respective vehicle manufacturers.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Vehicle Systems</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 5).map(cat => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategory(cat.name);
                      window.scrollTo({ top: 300, behavior: 'smooth' });
                    }}
                    className="hover:text-white transition-colors cursor-pointer"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Popular Vehicle Makes</h4>
            <ul className="space-y-2">
              {['Toyota Innova & Fortuner', 'Hyundai Creta & i20', 'Honda City & Civic', 'Tata Nexon & Safari', 'Mahindra Scorpio & Thar', 'Royal Enfield Classic 350'].map((make, idx) => (
                <li key={idx}>
                  <span className="hover:text-white cursor-pointer">{make}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-3">Customer & Workshop Care</h4>
            <ul className="space-y-2">
              <li><button onClick={() => setIsOrderTrackingOpen(true)} className="hover:text-white cursor-pointer">Track My Order</button></li>
              <li><button onClick={() => setIsNearbyOpen(true)} className="hover:text-white cursor-pointer">Depot Pickup Locations</button></li>
              <li><button onClick={() => setIsWorkshopOpen(true)} className="hover:text-white cursor-pointer">Mechanic B2B Quotations</button></li>
              <li><button onClick={() => setIsSellerOpen(true)} className="hover:text-white cursor-pointer">Merchant & Dealer Portal</button></li>
              <li><button onClick={() => setIsAiFinderOpen(true)} className="hover:text-white cursor-pointer">AI Part Diagnostic Tool</button></li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <span>GearShift Spares E-Commerce Engine • Built with React, TypeScript & Tailwind CSS</span>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Return Guarantee Policy</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {/* 1. Vehicle Selector Modal */}
      <VehicleSelectorModal
        isOpen={isVehicleSelectorOpen}
        onClose={() => setIsVehicleSelectorOpen(false)}
        onSelectVehicle={handleAddVehicleToGarage}
        currentVehicle={activeVehicle}
      />

      {/* 2. Product Detail Modal */}
      <ProductDetailModal
        product={selectedProductDetail}
        activeVehicle={activeVehicle}
        onClose={() => setSelectedProductDetail(null)}
        onAddToCart={(p, s) => handleAddToCart(p, s)}
        onBuyNow={(p, s) => handleBuyNow(p, s)}
        onSelectVehicle={() => {
          setSelectedProductDetail(null);
          setIsVehicleSelectorOpen(true);
        }}
        allProducts={products}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
      />

      {/* 3. AI Part Finder Modal */}
      <AiPartFinderModal
        isOpen={isAiFinderOpen}
        onClose={() => setIsAiFinderOpen(false)}
        activeVehicle={activeVehicle}
        allProducts={products}
        onSelectProduct={(p) => setSelectedProductDetail(p)}
      />

      {/* 4. My Garage & Maintenance Schedule Modal */}
      <GarageModal
        isOpen={isGarageOpen}
        onClose={() => setIsGarageOpen(false)}
        garageVehicles={garageVehicles}
        activeVehicle={activeVehicle}
        onSetActiveVehicle={setActiveVehicle}
        onAddVehicle={handleAddVehicleToGarage}
        onRemoveVehicle={handleRemoveVehicleFromGarage}
        onOpenVehicleSelector={() => {
          setIsGarageOpen(false);
          setIsVehicleSelectorOpen(true);
        }}
        onSearchPartForMaintenance={(keyword) => {
          setSearchQuery(keyword);
          window.scrollTo({ top: 350, behavior: 'smooth' });
        }}
      />

      {/* 5. Nearby Shops Modal */}
      <NearbyShopsModal
        isOpen={isNearbyOpen}
        onClose={() => setIsNearbyOpen(false)}
      />

      {/* 6. Workshop / Mechanic Console Modal */}
      <WorkshopMode
        isOpen={isWorkshopOpen}
        onClose={() => setIsWorkshopOpen(false)}
        allProducts={products}
        onBulkOrder={(bulkItems) => {
          bulkItems.forEach(it => {
            handleAddToCart(it.product);
          });
          setIsWorkshopOpen(false);
          setIsCartOpen(true);
        }}
      />

      {/* 7. Seller / Dealer Dashboard Modal */}
      <SellerDashboard
        isOpen={isSellerOpen}
        onClose={() => setIsSellerOpen(false)}
        products={products}
        onAddProduct={handleAddNewProduct}
      />

      {/* 8. Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        activeVehicle={activeVehicle}
        couponCode={couponCode}
        onApplyCoupon={handleApplyCoupon}
        discountRate={discountRate}
      />

      {/* 9. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        activeVehicle={activeVehicle}
        discountRate={discountRate}
        onOrderPlaced={handleOrderPlaced}
      />

      {/* 10. Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isOrderTrackingOpen}
        order={lastPlacedOrder || {
          id: 'GS-891240',
          date: '2026-09-02',
          items: cart.length > 0 ? cart : (products[0] ? [{
            product: products[0],
            quantity: 1,
            selectedSeller: products[0].sellers?.[0] || {
              sellerId: 'sel-default',
              sellerName: 'GearShift Verified Hub',
              rating: 4.8,
              reviewCount: 45,
              price: 45.00,
              mrp: 55.00,
              deliveryDays: 2,
              deliveryFee: 0,
              warranty: '1 Year Warranty',
              returnPolicy: '15-Day Free Returns',
              inStock: true,
              stockCount: 10,
              isVerified: true,
              location: 'Depot A'
            }
          }] : []),
          subtotal: 45.00,
          shipping: 0,
          discount: 0,
          tax: 3.50,
          total: 48.50,
          shippingAddress: {
            name: 'Alex Henderson',
            phone: '+1 (555) 234-5678',
            street: '742 Evergreen Terrace, Suite 4B',
            city: 'Metro City',
            state: 'CA',
            pincode: '94103'
          },
          paymentMethod: 'Credit/Debit Card',
          vehicleContext: activeVehicle ? `${activeVehicle.year} ${activeVehicle.make} ${activeVehicle.model} (${activeVehicle.engine})` : undefined,
          status: 'Confirmed',
          courier: 'FedEx Automotive Express',
          trackingNumber: 'TRK-EXPRESS-99214081',
          estimatedDelivery: 'Tomorrow, 4:00 PM'
        }}
        onClose={() => setIsOrderTrackingOpen(false)}
      />
    </div>
  );
}
