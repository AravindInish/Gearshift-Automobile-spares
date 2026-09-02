import React from 'react';
import { 
  X, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileText, 
  Printer, 
  Download,
  Car
} from 'lucide-react';
import { Order } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  order: Order | null;
  onClose: () => void;
}

const STEPS = [
  { key: 'placed', label: 'Order Placed' },
  { key: 'confirmed', label: 'Fitment Confirmed' },
  { key: 'packed', label: 'Depot Packed' },
  { key: 'shipped', label: 'Dispatched (In Transit)' },
  { key: 'out', label: 'Out for Delivery' },
  { key: 'delivered', label: 'Delivered' }
];

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({ isOpen, order, onClose }) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !order) return null;

  const currentStepIndex = 3; // 'Dispatched'

  const handlePrint = () => {
    try {
      window.print();
    } catch {
      // ignore in iframe
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-orange-600 flex items-center justify-center text-white">
              <Package className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white leading-tight">Order #{order.id}</h3>
              <p className="text-xs text-slate-400">Placed on {order.date} • Courier Express</p>
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer"
            aria-label="Close Order Modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Status Tracker Bar */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Current Status</span>
                <h4 className="text-base font-bold text-slate-900 mt-0.5">Dispatched & In Transit</h4>
                <p className="text-xs text-slate-500">Estimated delivery by: <strong className="text-slate-800">{order.estimatedDelivery}</strong></p>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-slate-800 bg-white border border-slate-300 px-2 py-1 rounded">
                  {order.trackingNumber}
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">{order.courier}</span>
              </div>
            </div>

            {/* Stepper */}
            <div className="relative flex items-center justify-between mt-6">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-slate-200 w-full z-0" />
              <div 
                className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-orange-600 z-0 transition-all"
                style={{ width: `${(currentStepIndex / (STEPS.length - 1)) * 100}%` }}
              />

              {STEPS.map((step, idx) => {
                const isPassed = idx <= currentStepIndex;
                const isCurrent = idx === currentStepIndex;
                return (
                  <div key={step.key} className="relative z-10 flex flex-col items-center">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isPassed
                          ? 'bg-orange-600 text-white shadow-xs'
                          : 'bg-white border-2 border-slate-300 text-slate-400'
                      } ${isCurrent ? 'ring-4 ring-orange-200' : ''}`}
                    >
                      {isPassed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                    </div>
                    <span className="text-[10px] font-bold text-slate-600 mt-2 text-center max-w-[65px] leading-tight">
                      {step.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Vehicle Match Confirmation */}
          {order.vehicleContext && (
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <Car className="w-4 h-4" />
              </div>
              <div className="text-xs">
                <span className="font-bold text-emerald-900 uppercase">Fitment Tagged Vehicle:</span>
                <p className="text-emerald-800 font-medium">
                  {order.vehicleContext}
                </p>
              </div>
            </div>
          )}

          {/* Ordered Items List */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">Items in Shipment</h4>
            <div className="space-y-2 border border-slate-200 rounded-xl divide-y divide-slate-100 overflow-hidden">
              {order.items.map((item, idx) => (
                <div key={idx} className="p-3.5 flex items-center justify-between gap-4 bg-white">
                  <div className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 object-contain bg-slate-50 p-1 rounded" />
                    <div>
                      <p className="text-xs font-bold text-slate-900">{item.product.name}</p>
                      <p className="text-[11px] text-slate-500 font-mono">
                        OEM: {item.product.oemNumber} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-slate-900">
                    ${(item.selectedSeller.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Delivery & Tax Invoice details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Shipping Destination</span>
              <p className="text-slate-800 font-semibold">{order.shippingAddress.name} ({order.shippingAddress.phone})</p>
              <p className="text-slate-600 mt-0.5">{order.shippingAddress.street}, {order.shippingAddress.city} {order.shippingAddress.pincode}</p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5">
              <span className="font-bold text-slate-500 uppercase text-[10px] block mb-1">Total Paid (Tax Invoice)</span>
              <p className="text-base font-bold text-slate-900">${order.total.toFixed(2)}</p>
              <span className="text-[10px] text-emerald-600 font-semibold">Payment Method: {order.paymentMethod} • 100% Tax Invoiced</span>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-slate-900 font-semibold cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Invoice & Packing Slip</span>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-md text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
