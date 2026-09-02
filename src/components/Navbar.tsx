import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  ShoppingCart, 
  Car, 
  Wrench, 
  MapPin, 
  Sparkles, 
  ShieldCheck, 
  Mic, 
  MicOff, 
  Store, 
  CheckCircle2, 
  ChevronDown,
  Bell,
  SlidersHorizontal,
  X,
  Package
} from 'lucide-react';
import { Vehicle, Product } from '../types';

interface NavbarProps {
  activeVehicle: Vehicle | null;
  onOpenVehicleSelector?: () => void;
  onOpenVehicleModal?: () => void;
  onOpenGarage?: () => void;
  onOpenGarageModal?: () => void;
  onOpenAiFinder?: () => void;
  onOpenAiFinderModal?: () => void;
  onOpenNearbyShops?: () => void;
  onOpenNearbyShopsModal?: () => void;
  onOpenOrders?: () => void;
  onOpenCart: () => void;
  onToggleWorkshopMode?: () => void;
  onOpenWorkshopMode?: () => void;
  isWorkshopMode?: boolean;
  onOpenSellerDashboard?: () => void;
  onOpenSellerPortal?: () => void;
  cartCount: number;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  allProducts: Product[];
  onSelectProduct: (product: Product) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeVehicle,
  onOpenVehicleSelector,
  onOpenVehicleModal,
  onOpenGarage,
  onOpenGarageModal,
  onOpenAiFinder,
  onOpenAiFinderModal,
  onOpenNearbyShops,
  onOpenNearbyShopsModal,
  onOpenOrders,
  onOpenCart,
  onToggleWorkshopMode,
  onOpenWorkshopMode,
  isWorkshopMode = false,
  onOpenSellerDashboard,
  onOpenSellerPortal,
  cartCount,
  searchQuery,
  onSearchChange,
  allProducts,
  onSelectProduct
}) => {
  const [isListening, setIsListening] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [voiceNotice, setVoiceNotice] = useState<string | null>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  // Safe handler resolution
  const handleOpenVehicle = onOpenVehicleSelector || onOpenVehicleModal || (() => {});
  const handleOpenGarage = onOpenGarage || onOpenGarageModal || (() => {});
  const handleOpenAiFinder = onOpenAiFinder || onOpenAiFinderModal || (() => {});
  const handleOpenNearby = onOpenNearbyShops || onOpenNearbyShopsModal || (() => {});
  const handleToggleWorkshop = onToggleWorkshopMode || onOpenWorkshopMode || (() => {});
  const handleOpenSeller = onOpenSellerDashboard || onOpenSellerPortal || (() => {});

  // Auto-suggested results
  const searchResults = searchQuery.trim().length > 1
    ? allProducts.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.partNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.oemNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.compatibleVehicles.some(cv => 
          cv.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
          cv.model.toLowerCase().includes(searchQuery.toLowerCase())
        )
      ).slice(0, 5)
    : [];

  const handleVoiceSearch = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setVoiceNotice('Voice search is not supported in this browser. Please type your search.');
      setTimeout(() => setVoiceNotice(null), 3500);
      return;
    }

    try {
      // @ts-ignore
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
      };

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        onSearchChange(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognition.start();
    } catch {
      setIsListening(false);
    }
  };

  return (
    <header className="bg-[#0f172a] text-white shrink-0 border-b border-slate-700 sticky top-0 z-40">
      {voiceNotice && (
        <div className="bg-amber-500 text-slate-950 px-4 py-1.5 text-xs font-semibold flex items-center justify-between">
          <span>{voiceNotice}</span>
          <button onClick={() => setVoiceNotice(null)} className="font-bold text-sm px-2 cursor-pointer">✕</button>
        </div>
      )}
      {/* Top Utility Bar */}
      <div className="border-b border-slate-800 px-4 lg:px-8 py-1.5 flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 text-emerald-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>100% Genuine OEM & Tier-1 Spares</span>
          </div>
          <button 
            onClick={handleOpenNearby}
            className="hidden sm:flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
          >
            <MapPin className="w-3.5 h-3.5 text-orange-400" />
            <span>Spare Parts Near Me (3 Local Hubs)</span>
          </button>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleToggleWorkshop}
            className={`px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
              isWorkshopMode 
                ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300' 
                : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
            }`}
          >
            <Wrench className="w-3 h-3" />
            <span>{isWorkshopMode ? 'Mechanic Mode Active' : 'Mechanic / Workshop Mode'}</span>
          </button>

          <button 
            onClick={handleOpenSeller}
            className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            <Store className="w-3.5 h-3.5 text-slate-400" />
            <span className="hidden md:inline">Seller Portal</span>
          </button>

          {onOpenOrders && (
            <button 
              onClick={onOpenOrders}
              className="hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
              title="Track Active Shipment"
            >
              <Package className="w-3.5 h-3.5 text-orange-400" />
              <span className="hidden sm:inline">Track Order</span>
            </button>
          )}

          <div className="hidden lg:flex items-center gap-1 text-slate-400">
            <span>Support:</span>
            <span className="font-semibold text-white">1-800-GEAR-UP</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3 cursor-pointer select-none" onClick={() => onSearchChange('')}>
          <div className="w-10 h-10 bg-orange-600 rounded flex items-center justify-center font-black text-xl italic text-white shadow-md shadow-orange-950/40">
            GS
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white leading-none">
              GEARSHIFT<span className="text-orange-500">SPARES</span>
            </span>
            <span className="text-[10px] tracking-widest text-slate-400 uppercase font-semibold mt-0.5">
              Automotive Parts & Compatibility
            </span>
          </div>
        </div>

        {/* Search Bar with AI & Auto-Suggest */}
        <div className="flex-1 max-w-2xl relative" ref={searchContainerRef}>
          <div className="relative flex items-center">
            <div className="absolute left-3.5 text-slate-400 pointer-events-none">
              <Search className="w-4 h-4" />
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Search by part name, OEM number (e.g. 04152-YZZA1), brand, vehicle..."
              className="w-full py-2.5 pl-10 pr-24 rounded-md bg-slate-800/90 border border-slate-600 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all shadow-inner"
            />

            <div className="absolute right-2 flex items-center gap-1.5">
              {searchQuery && (
                <button 
                  onClick={() => onSearchChange('')}
                  className="p-1 text-slate-400 hover:text-white rounded"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
              <button
                type="button"
                onClick={handleVoiceSearch}
                title="Voice Search"
                className={`p-1.5 rounded transition-colors ${
                  isListening ? 'bg-red-500 text-white animate-pulse' : 'text-slate-400 hover:text-orange-400'
                }`}
              >
                {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>
              <button
                type="button"
                onClick={handleOpenAiFinder}
                title="AI Part Finder (Upload Photo)"
                className="flex items-center gap-1 bg-orange-500/20 hover:bg-orange-500/30 text-orange-400 border border-orange-500/30 px-2 py-1 rounded text-xs font-semibold cursor-pointer transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Scan Part</span>
              </button>
            </div>
          </div>

          {/* Quick Suggestions Dropdown */}
          {isSearchFocused && searchQuery.trim().length > 1 && (
            <div className="absolute top-full left-0 right-0 mt-1.5 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50">
              <div className="p-2 border-b border-slate-800 text-[11px] text-slate-400 uppercase font-bold flex justify-between">
                <span>Matching Catalog Results</span>
                <span>{searchResults.length} found</span>
              </div>
              {searchResults.length > 0 ? (
                <div className="divide-y divide-slate-800/60 max-h-72 overflow-y-auto">
                  {searchResults.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => {
                        onSelectProduct(item);
                        setIsSearchFocused(false);
                      }}
                      className="p-3 hover:bg-slate-800 cursor-pointer flex items-center justify-between gap-3 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-10 h-10 object-contain rounded bg-white p-1" />
                        <div>
                          <p className="text-sm font-semibold text-white leading-tight">{item.name}</p>
                          <p className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                            <span className="text-orange-400 font-mono">OEM: {item.oemNumber}</span>
                            <span>•</span>
                            <span>{item.brand}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-white">${item.sellers[0]?.price.toFixed(2)}</p>
                        <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800 px-1.5 py-0.5 rounded">In Stock</span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-4 text-center text-sm text-slate-400">
                  No exact matches for &quot;{searchQuery}&quot;. Try searching by OEM code like &quot;04152-YZZA1&quot; or part name.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right Navigation & Vehicle Selector */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Mobile Vehicle Button */}
          <button
            onClick={activeVehicle ? handleOpenGarage : handleOpenVehicle}
            className="md:hidden p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-orange-400 transition-colors cursor-pointer border border-slate-700 flex items-center gap-1 text-xs"
            title="Select Vehicle"
          >
            <Car className="w-4 h-4" />
            <span className="max-w-[80px] truncate">{activeVehicle ? activeVehicle.model : 'Vehicle'}</span>
          </button>

          {/* Active Vehicle Chip (Desktop) */}
          <div 
            onClick={handleOpenGarage}
            className="hidden md:flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-600 px-3 py-1.5 rounded-lg cursor-pointer transition-all max-w-[220px]"
            title="Manage My Garage & Vehicles"
          >
            <div className="w-8 h-8 rounded bg-orange-600/20 text-orange-400 flex items-center justify-center shrink-0">
              <Car className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Active Garage</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-xs font-bold text-white truncate leading-tight">
                {activeVehicle ? `${activeVehicle.make} ${activeVehicle.model}` : 'Select Vehicle'}
              </p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          </div>

          {/* Cart Icon */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors cursor-pointer border border-slate-700"
            title="Shopping Cart"
          >
            <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-orange-600 text-white text-[11px] font-black rounded-full w-5 h-5 flex items-center justify-center ring-2 ring-[#0f172a]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
