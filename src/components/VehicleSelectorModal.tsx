import React, { useState, useMemo } from 'react';
import { X, Check, Car, ChevronRight, RotateCcw, Sparkles } from 'lucide-react';
import { Vehicle, VehicleType } from '../types';
import { VEHICLE_DATABASE } from '../data/mockData';

interface VehicleSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  currentVehicle: Vehicle | null;
}

const VEHICLE_TYPES: VehicleType[] = [
  'Car',
  'Motorcycle',
  'Scooter',
  'Truck',
  'Commercial Vehicle'
];

export const VehicleSelectorModal: React.FC<VehicleSelectorModalProps> = ({
  isOpen,
  onClose,
  onSelectVehicle,
  currentVehicle
}) => {
  const [selectedType, setSelectedType] = useState<VehicleType>('Car');
  const [selectedMake, setSelectedMake] = useState<string>('');
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedVariant, setSelectedVariant] = useState<string>('');
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Available makes for selected type
  const availableMakes = useMemo(() => {
    const vehiclesOfType = VEHICLE_DATABASE.filter(v => v.type === selectedType);
    const makes = Array.from(new Set(vehiclesOfType.map(v => v.make)));
    return makes.length > 0 ? makes : ['Toyota', 'Hyundai', 'Honda', 'Tata', 'Mahindra', 'Maruti Suzuki'];
  }, [selectedType]);

  // Available models for selected make
  const availableModels = useMemo(() => {
    if (!selectedMake) return [];
    const models = VEHICLE_DATABASE
      .filter(v => v.type === selectedType && v.make.toLowerCase() === selectedMake.toLowerCase())
      .map(v => v.model);
    return Array.from(new Set(models));
  }, [selectedType, selectedMake]);

  // Available variants / years
  const availableVariants = useMemo(() => {
    if (!selectedMake || !selectedModel) return [];
    const matched = VEHICLE_DATABASE.filter(
      v => v.type === selectedType && 
           v.make.toLowerCase() === selectedMake.toLowerCase() && 
           v.model.toLowerCase() === selectedModel.toLowerCase()
    );
    return matched;
  }, [selectedType, selectedMake, selectedModel]);

  const handleQuickPreset = (presetVehicle: Vehicle) => {
    onSelectVehicle(presetVehicle);
    onClose();
  };

  const handleConfirmCustom = () => {
    if (!selectedMake || !selectedModel) return;

    // Find closest or create custom vehicle
    const matched = availableVariants[0];
    const newVehicle: Vehicle = {
      id: matched?.id || `veh-custom-${Date.now()}`,
      type: selectedType,
      make: selectedMake,
      model: selectedModel,
      variant: selectedVariant || matched?.variant || 'Standard Spec',
      year: selectedYear || matched?.year || 2022,
      engine: matched?.engine || '2.0L Standard Injection',
      fuelType: matched?.fuelType || 'Diesel',
      odometerKm: 25000,
      image: matched?.image || 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=600'
    };

    onSelectVehicle(newVehicle);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-orange-600 flex items-center justify-center text-white">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">Select Your Vehicle</h3>
              <p className="text-xs text-slate-400">Lock in 100% verified compatibility for your parts</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Quick Popular Presets */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Popular Vehicles (Instant 1-Click Select)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {VEHICLE_DATABASE.slice(0, 3).map((v) => (
                <button
                  key={v.id}
                  onClick={() => handleQuickPreset(v)}
                  className={`p-3 rounded-lg border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    currentVehicle?.id === v.id
                      ? 'border-orange-500 bg-orange-50/70 ring-1 ring-orange-500'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-orange-700 bg-orange-100 px-1.5 py-0.5 rounded">
                        {v.type}
                      </span>
                      {currentVehicle?.id === v.id && (
                        <Check className="w-3.5 h-3.5 text-orange-600" />
                      )}
                    </div>
                    <p className="text-sm font-bold text-slate-900 mt-1">{v.make} {v.model}</p>
                    <p className="text-xs text-slate-500">{v.year} • {v.fuelType}</p>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono mt-2 truncate">{v.engine}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-slate-200 w-full"></div>
            <span className="bg-white px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-widest absolute">
              Or Customize Fitment
            </span>
          </div>

          {/* Vehicle Type Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-2">1. Select Vehicle Type</label>
            <div className="flex flex-wrap gap-2">
              {VEHICLE_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => {
                    setSelectedType(type);
                    setSelectedMake('');
                    setSelectedModel('');
                    setSelectedVariant('');
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
                    selectedType === type
                      ? 'bg-[#0f172a] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Step Form */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Manufacturer */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">2. Manufacturer</label>
              <select
                value={selectedMake}
                onChange={(e) => {
                  setSelectedMake(e.target.value);
                  setSelectedModel('');
                }}
                className="w-full bg-slate-50 border border-slate-300 rounded-md py-2 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Choose Manufacturer...</option>
                {availableMakes.map((make) => (
                  <option key={make} value={make}>{make}</option>
                ))}
              </select>
            </div>

            {/* Model */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">3. Model</label>
              <select
                disabled={!selectedMake}
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-md py-2 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">{selectedMake ? 'Choose Model...' : 'Select Make First'}</option>
                {availableModels.map((model) => (
                  <option key={model} value={model}>{model}</option>
                ))}
              </select>
            </div>

            {/* Year */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">4. Model Year</label>
              <select
                value={selectedYear || ''}
                onChange={(e) => setSelectedYear(Number(e.target.value))}
                className="w-full bg-slate-50 border border-slate-300 rounded-md py-2 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">Select Year...</option>
                {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015].map((year) => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>

            {/* Variant / Engine */}
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1.5">5. Engine & Variant</label>
              <select
                disabled={!selectedModel}
                value={selectedVariant}
                onChange={(e) => setSelectedVariant(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-md py-2 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="">Choose Variant...</option>
                {availableVariants.map((v) => (
                  <option key={v.id} value={v.variant}>
                    {v.variant} ({v.engine})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selected Summary Card */}
          {selectedMake && selectedModel && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-emerald-800 uppercase tracking-wide">Configured Vehicle</p>
                  <p className="text-sm font-bold text-slate-900">
                    {selectedMake} {selectedModel} {selectedYear ? `(${selectedYear})` : ''}
                  </p>
                  <p className="text-xs text-slate-600">{selectedVariant || 'Standard Fitment'}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <button
            onClick={() => {
              setSelectedMake('');
              setSelectedModel('');
              setSelectedVariant('');
            }}
            className="flex items-center gap-1.5 text-xs text-slate-600 hover:text-slate-900 font-semibold cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Selections</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-slate-300 text-slate-700 rounded-md text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmCustom}
              disabled={!selectedMake || !selectedModel}
              className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white px-5 py-2 rounded-md text-xs font-bold transition-all shadow-sm cursor-pointer"
            >
              Apply Compatibility Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
