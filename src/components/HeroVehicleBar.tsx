import React, { useState } from 'react';
import { 
  Search, 
  Car, 
  ShieldCheck, 
  Truck, 
  Sparkles, 
  RotateCcw, 
  ChevronRight, 
  Wrench,
  CheckCircle2
} from 'lucide-react';
import { Vehicle, VehicleType } from '../types';
import { VEHICLE_DATABASE, CATEGORIES } from '../data/mockData';

interface HeroVehicleBarProps {
  onOpenVehicleModal: () => void;
  activeVehicle: Vehicle | null;
  onSelectVehicle: (v: Vehicle) => void;
  onSelectCategory: (cat: string) => void;
  selectedCategory: string;
  onOpenAiFinder: () => void;
  onOpenNearby: () => void;
}

export const HeroVehicleBar: React.FC<HeroVehicleBarProps> = ({
  onOpenVehicleModal,
  activeVehicle,
  onSelectVehicle,
  onSelectCategory,
  selectedCategory,
  onOpenAiFinder,
  onOpenNearby
}) => {
  const [quickMake, setQuickMake] = useState('Toyota');
  const [quickModel, setQuickModel] = useState('Innova Crysta');
  const [quickYear, setQuickYear] = useState('2022');

  const handleMakeSelect = (make: string) => {
    setQuickMake(make);
    if (make === 'Toyota') setQuickModel('Innova Crysta');
    else if (make === 'Hyundai') setQuickModel('Creta');
    else if (make === 'Honda') setQuickModel('City');
    else if (make === 'Tata') setQuickModel('Nexon');
    else if (make === 'Mahindra') setQuickModel('Scorpio');
    else if (make === 'Maruti Suzuki') setQuickModel('Swift');
    else if (make === 'Royal Enfield') setQuickModel('Classic 350');
    else setQuickModel('Standard Model');
  };

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = VEHICLE_DATABASE.find(
      v => v.make.toLowerCase() === quickMake.toLowerCase() &&
           (v.model.toLowerCase().includes(quickModel.toLowerCase()) || quickModel.toLowerCase().includes(v.model.toLowerCase()))
    );

    if (matched) {
      onSelectVehicle({
        ...matched,
        year: Number(quickYear) || matched.year
      });
    } else {
      const customVehicle: Vehicle = {
        id: `veh-${Date.now()}`,
        type: quickMake === 'Royal Enfield' ? 'Motorcycle' : 'Car',
        make: quickMake,
        model: quickModel,
        variant: 'Standard Spec',
        year: Number(quickYear) || 2022,
        engine: 'Standard Engine',
        fuelType: 'Petrol',
        odometerKm: 30000,
        image: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
      };
      onSelectVehicle(customVehicle);
    }
  };

  return (
    <div className="bg-[#0f172a] text-white pt-8 pb-10 px-4 sm:px-6 lg:px-8 border-b border-slate-800 relative overflow-hidden">
      {/* Subtle automotive background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="dotGrid" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="2" cy="2" r="1.5" fill="#ffffff" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dotGrid)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Top Tagline & Value Props */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-slate-800/80 border border-slate-700 rounded-full px-3 py-1 text-xs text-orange-400 font-semibold mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero-Error Parts Compatibility Guarantee</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Find the Exact Part That Fits Your Vehicle. <span className="text-orange-500">Guaranteed.</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2.5 leading-relaxed">
              Never buy the wrong automotive component again. Filter by vehicle specification, cross-reference OEM part numbers, or let our AI diagnose damaged parts.
            </p>
          </div>

          {/* Quick CTA Buttons */}
          <div className="flex flex-wrap md:flex-col gap-2.5 shrink-0">
            <button
              onClick={onOpenAiFinder}
              className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-md cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI Part Identifier</span>
            </button>
            <button
              onClick={onOpenNearby}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-4 py-2.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Nearby Spare Depots</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Embedded Vehicle Selector Box */}
        <div className="bg-white rounded-xl p-4 sm:p-5 shadow-2xl border border-slate-200 text-slate-900">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3 border-b border-slate-100 pb-2.5">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
              <Car className="w-4 h-4 text-orange-600" />
              <span>Select Vehicle to Filter Parts</span>
            </div>

            {activeVehicle ? (
              <div className="flex items-center gap-2 text-xs bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-md text-emerald-800 font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Active: <strong>{activeVehicle.year} {activeVehicle.make} {activeVehicle.model}</strong></span>
                <button
                  onClick={onOpenVehicleModal}
                  className="text-orange-600 hover:text-orange-700 underline ml-1 font-bold cursor-pointer"
                >
                  Change
                </button>
              </div>
            ) : (
              <span className="text-xs text-slate-500">
                Choose your car or bike to eliminate incompatible results
              </span>
            )}
          </div>

          <form onSubmit={handleHeroSearch} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {/* Make */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Make</label>
              <select
                value={quickMake}
                onChange={(e) => handleMakeSelect(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-orange-500"
              >
                <option value="Toyota">Toyota</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Honda">Honda</option>
                <option value="Tata">Tata Motors</option>
                <option value="Mahindra">Mahindra</option>
                <option value="Maruti Suzuki">Maruti Suzuki</option>
                <option value="Royal Enfield">Royal Enfield</option>
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Model</label>
              <select
                value={quickModel}
                onChange={(e) => setQuickModel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-orange-500"
              >
                {quickMake === 'Toyota' && (
                  <>
                    <option value="Innova Crysta">Innova Crysta</option>
                    <option value="Fortuner">Fortuner</option>
                    <option value="Corolla">Corolla Altis</option>
                  </>
                )}
                {quickMake === 'Hyundai' && (
                  <>
                    <option value="Creta">Creta</option>
                    <option value="i20">i20 (Elite)</option>
                    <option value="Verna">Verna</option>
                  </>
                )}
                {quickMake === 'Honda' && (
                  <>
                    <option value="City">City (5th Gen)</option>
                    <option value="Civic">Civic</option>
                    <option value="Amaze">Amaze</option>
                  </>
                )}
                {quickMake === 'Tata' && (
                  <>
                    <option value="Nexon">Nexon</option>
                    <option value="Safari">Safari</option>
                    <option value="Harrier">Harrier</option>
                  </>
                )}
                {quickMake === 'Mahindra' && (
                  <>
                    <option value="Scorpio">Scorpio-N / Classic</option>
                    <option value="Thar">Thar 4x4</option>
                    <option value="XUV700">XUV700</option>
                  </>
                )}
                {quickMake === 'Maruti Suzuki' && (
                  <>
                    <option value="Swift">Swift</option>
                    <option value="Baleno">Baleno</option>
                    <option value="Brezza">Brezza</option>
                  </>
                )}
                {quickMake === 'Royal Enfield' && (
                  <>
                    <option value="Classic 350">Classic 350</option>
                    <option value="Hunter 350">Hunter 350</option>
                    <option value="Bullet 350">Bullet 350</option>
                  </>
                )}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="text-[11px] font-bold text-slate-500 uppercase block mb-1">Year</label>
              <select
                value={quickYear}
                onChange={(e) => setQuickYear(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-orange-500"
              >
                <option value="2024">2024</option>
                <option value="2023">2023</option>
                <option value="2022">2022</option>
                <option value="2021">2021</option>
                <option value="2020">2020</option>
                <option value="2019">2019</option>
                <option value="2018">2018</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="flex items-end">
              <button
                type="submit"
                className="w-full bg-orange-600 hover:bg-orange-700 text-white p-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
              >
                <Search className="w-4 h-4" />
                <span>Find Compatible Parts</span>
              </button>
            </div>
          </form>

          {/* Quick Trust Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 pt-3 border-t border-slate-100 text-slate-600 text-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>100% Genuine OEM & Tier-1</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-600 shrink-0" />
              <span>Same-Day Depot Dispatch</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-blue-600 shrink-0" />
              <span>Free 15-Day Return Policy</span>
            </div>
            <div className="flex items-center gap-2">
              <Wrench className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Verified Bolt-On Dimensions</span>
            </div>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <button
            onClick={() => onSelectCategory('All')}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-orange-600 text-white shadow-xs'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
            }`}
          >
            All Systems ({CATEGORIES.length})
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold shrink-0 transition-all cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === cat.name
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-slate-400 font-mono">({cat.itemCount})</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
