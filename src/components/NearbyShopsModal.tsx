import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  Phone, 
  Clock, 
  Star, 
  Navigation, 
  CheckCircle, 
  Store,
  Layers,
  Search
} from 'lucide-react';
import { NearbyShop } from '../types';
import { NEARBY_SHOPS_DATA } from '../data/mockData';

interface NearbyShopsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NearbyShopsModal: React.FC<NearbyShopsModalProps> = ({ isOpen, onClose }) => {
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'Authorized Dealer' | 'Independent Spares' | 'Service Center & Workshop'>('All');
  const [activeShop, setActiveShop] = useState<NearbyShop>(NEARBY_SHOPS_DATA[0]);

  if (!isOpen) return null;

  const filteredShops = selectedFilter === 'All'
    ? NEARBY_SHOPS_DATA
    : NEARBY_SHOPS_DATA.filter(s => s.type === selectedFilter);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <MapPin className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">Spare Parts Near Me</h3>
              <p className="text-xs text-slate-400">Locate authorized inventory depots and partnered workshops in your area</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filters Bar */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-1.5">
            {(['All', 'Authorized Dealer', 'Independent Spares', 'Service Center & Workshop'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                  selectedFilter === filter
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Real-time local stock visibility</span>
          </div>
        </div>

        {/* Content Body: Left List + Right Interactive Map Layout */}
        <div className="flex-1 overflow-hidden grid grid-cols-1 md:grid-cols-12">
          {/* Left List of Stores */}
          <div className="md:col-span-5 border-r border-slate-200 overflow-y-auto p-4 space-y-3 bg-white">
            {filteredShops.map((shop) => {
              const isSelected = activeShop.id === shop.id;
              return (
                <div
                  key={shop.id}
                  onClick={() => setActiveShop(shop)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'border-orange-500 bg-orange-50/40 ring-1 ring-orange-500/30'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                      {shop.type}
                    </span>
                    <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                      <Navigation className="w-3 h-3" /> {shop.distanceKm} km away
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug">{shop.name}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{shop.address}</p>

                  <div className="flex items-center gap-3 text-xs text-slate-600 mt-2">
                    <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" /> {shop.rating}
                    </span>
                    <span>({shop.reviewsCount} reviews)</span>
                    <span>•</span>
                    <span className={shop.isOpen ? 'text-emerald-600 font-bold' : 'text-red-500'}>
                      {shop.isOpen ? 'Open Now' : 'Closed'}
                    </span>
                  </div>

                  <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      {shop.inStockPartsCount.toLocaleString()} parts in stock
                    </span>
                    <a
                      href={`tel:${shop.phone}`}
                      onClick={(e) => e.stopPropagation()}
                      className="text-slate-700 hover:text-orange-600 font-bold flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" /> Call Depot
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Map Layout Simulator */}
          <div className="md:col-span-7 bg-slate-100 relative flex flex-col items-center justify-center p-6 overflow-hidden">
            {/* Styled Map Canvas Visual */}
            <div className="w-full h-full rounded-xl bg-[#e2e8f0] relative border border-slate-300 overflow-hidden flex flex-col justify-between p-4 shadow-inner">
              {/* Simulated Map Grid Lines & Roads */}
              <div className="absolute inset-0 opacity-25 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                  <path d="M 0 120 Q 180 80 400 240 T 800 300" fill="none" stroke="#f97316" strokeWidth="6" opacity="0.7" />
                  <path d="M 120 0 L 220 500" fill="none" stroke="#cbd5e1" strokeWidth="8" />
                  <path d="M 450 0 L 400 500" fill="none" stroke="#cbd5e1" strokeWidth="8" />
                </svg>
              </div>

              {/* Map Pins */}
              <div className="absolute top-1/4 left-1/3 z-20 flex flex-col items-center animate-bounce">
                <div className="bg-orange-600 text-white p-2 rounded-full shadow-lg ring-4 ring-orange-400/40">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded shadow mt-1 whitespace-nowrap">
                  {activeShop.name}
                </span>
              </div>

              <div className="absolute bottom-1/3 right-1/4 z-10 flex flex-col items-center opacity-80">
                <div className="bg-slate-700 text-white p-1.5 rounded-full shadow">
                  <Store className="w-4 h-4" />
                </div>
              </div>

              {/* Top Map Control Overlay */}
              <div className="relative z-30 flex items-center justify-between">
                <div className="bg-white/95 backdrop-blur-xs border border-slate-300 rounded-lg p-2.5 shadow-sm">
                  <span className="text-[10px] font-bold uppercase text-slate-500 block">Current Search Radius</span>
                  <span className="text-xs font-bold text-slate-900">Within 5.0 km • Metro Hub Zone</span>
                </div>
                <div className="bg-white/95 backdrop-blur-xs border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-700 shadow-sm">
                  GPS Centered
                </div>
              </div>

              {/* Bottom Active Shop Detail Card */}
              <div className="relative z-30 bg-white/95 backdrop-blur-xs border border-slate-200 rounded-xl p-4 shadow-lg">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{activeShop.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{activeShop.address}</p>
                    <p className="text-xs text-slate-600 mt-1 flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{activeShop.openingHours}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded">
                      {activeShop.distanceKm} km away
                    </span>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="text-xs text-slate-600">
                    Brands: <strong className="text-slate-800">{activeShop.brandsHandled.join(', ')}</strong>
                  </div>
                  <button
                    onClick={() => alert(`Navigating to ${activeShop.name} via directions route.`)}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
