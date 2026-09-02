import React, { useState } from 'react';
import { 
  X, 
  Car, 
  Plus, 
  Trash2, 
  Check, 
  Wrench, 
  AlertTriangle, 
  Clock, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { Vehicle, MaintenanceItem, Product } from '../types';
import { VEHICLE_DATABASE, INITIAL_MAINTENANCE_SCHEDULE } from '../data/mockData';

interface GarageModalProps {
  isOpen: boolean;
  onClose: () => void;
  garageVehicles: Vehicle[];
  activeVehicle: Vehicle | null;
  onSetActiveVehicle: (v: Vehicle) => void;
  onAddVehicle: (v: Vehicle) => void;
  onRemoveVehicle: (id: string) => void;
  onOpenVehicleSelector: () => void;
  onSearchPartForMaintenance: (keyword: string) => void;
}

export const GarageModal: React.FC<GarageModalProps> = ({
  isOpen,
  onClose,
  garageVehicles,
  activeVehicle,
  onSetActiveVehicle,
  onAddVehicle,
  onRemoveVehicle,
  onOpenVehicleSelector,
  onSearchPartForMaintenance
}) => {
  const [maintenanceList, setMaintenanceList] = useState<MaintenanceItem[]>(INITIAL_MAINTENANCE_SCHEDULE);
  const [showAddReminder, setShowAddReminder] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDueInKm, setNewDueInKm] = useState(1000);

  if (!isOpen) return null;

  const handleCreateReminder = () => {
    if (!newTitle) return;
    const newItem: MaintenanceItem = {
      id: `maint-${Date.now()}`,
      title: newTitle,
      intervalKm: 10000,
      dueInKm: Number(newDueInKm),
      category: 'General Service',
      urgency: newDueInKm <= 1000 ? 'high' : 'medium',
      lastReplacedDate: new Date().toISOString().split('T')[0],
      partKeyword: newTitle
    };
    setMaintenanceList([newItem, ...maintenanceList]);
    setNewTitle('');
    setShowAddReminder(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <Car className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">My Garage & Maintenance Tracker</h3>
              <p className="text-xs text-slate-400">Manage saved vehicles and service intervals</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Garage Vehicles Section */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Saved Vehicles</h4>
                <p className="text-xs text-slate-500">Click a vehicle to set it as active for compatibility filtering</p>
              </div>
              <button
                onClick={onOpenVehicleSelector}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-orange-600" />
                <span>Add Vehicle</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {garageVehicles.map((vehicle) => {
                const isActive = activeVehicle?.id === vehicle.id;
                return (
                  <div
                    key={vehicle.id}
                    onClick={() => onSetActiveVehicle(vehicle)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                      isActive
                        ? 'bg-orange-50/50 border-orange-500 ring-2 ring-orange-500/20 shadow-xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase bg-slate-900 text-white px-2 py-0.5 rounded">
                          {vehicle.type}
                        </span>
                        {isActive && (
                          <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded flex items-center gap-1">
                            <Check className="w-3 h-3" /> Active Filter
                          </span>
                        )}
                      </div>

                      {garageVehicles.length > 1 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onRemoveVehicle(vehicle.id);
                          }}
                          className="text-slate-400 hover:text-red-600 p-1 rounded transition-colors"
                          title="Remove from garage"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>

                    <div className="mt-3">
                      <h5 className="text-sm font-bold text-slate-900">{vehicle.make} {vehicle.model}</h5>
                      <p className="text-xs text-slate-600 font-medium">
                        {vehicle.year} • {vehicle.variant} • {vehicle.fuelType}
                      </p>
                      <p className="text-[11px] text-slate-400 font-mono mt-1">{vehicle.engine}</p>
                    </div>

                    <div className="mt-3 pt-2.5 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                      <span>Odometer: {vehicle.odometerKm?.toLocaleString() || '42,000'} km</span>
                      <span className="font-bold text-orange-600 hover:underline">
                        {isActive ? 'Currently Browsing' : 'Switch to This'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Maintenance & Replacement Reminders */}
          <div className="pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Maintenance & Service Reminders
                </h4>
                <p className="text-xs text-slate-500">
                  Track vital components for {activeVehicle ? `${activeVehicle.make} ${activeVehicle.model}` : 'your vehicle'}
                </p>
              </div>

              <button
                onClick={() => setShowAddReminder(!showAddReminder)}
                className="text-xs font-bold text-orange-600 hover:text-orange-700 cursor-pointer"
              >
                {showAddReminder ? 'Cancel' : '+ New Reminder'}
              </button>
            </div>

            {/* Inline Add Reminder Form */}
            {showAddReminder && (
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4 space-y-3">
                <h5 className="text-xs font-bold text-slate-800 uppercase">Set Custom Maintenance Reminder</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Brake Fluid Flush, Transmission Oil"
                    className="bg-white border border-slate-300 rounded px-3 py-1.5 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Due in:</span>
                    <input
                      type="number"
                      value={newDueInKm}
                      onChange={(e) => setNewDueInKm(Number(e.target.value))}
                      className="bg-white border border-slate-300 rounded px-2 py-1.5 text-xs w-24 text-slate-900"
                    />
                    <span className="text-xs text-slate-500">km</span>
                  </div>
                </div>
                <button
                  onClick={handleCreateReminder}
                  className="bg-orange-600 hover:bg-orange-700 text-white px-3 py-1.5 rounded text-xs font-bold cursor-pointer"
                >
                  Save Reminder
                </button>
              </div>
            )}

            {/* Reminders List */}
            <div className="space-y-2.5">
              {maintenanceList.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50/70 transition-colors flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      item.urgency === 'high' ? 'bg-red-100 text-red-700' :
                      item.urgency === 'medium' ? 'bg-amber-100 text-amber-700' :
                      'bg-blue-100 text-blue-700'
                    }`}>
                      <Wrench className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h5 className="text-xs font-bold text-slate-900">{item.title}</h5>
                        {item.urgency === 'high' && (
                          <span className="text-[10px] font-bold bg-red-100 text-red-800 px-1.5 py-0.2 rounded uppercase">
                            Due Soon
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        Replacement due in <strong className="text-slate-900">{item.dueInKm.toLocaleString()} km</strong> • Last serviced: {item.lastReplacedDate}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onSearchPartForMaintenance(item.partKeyword);
                      onClose();
                    }}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shrink-0 transition-colors cursor-pointer"
                  >
                    <span>Find Parts</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
