import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  CheckCircle, 
  MapPin, 
  Zap, 
  Lock,
  ArrowRight,
  Car
} from 'lucide-react';
import { CartItem, Vehicle, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  activeVehicle: Vehicle | null;
  discountRate: number;
  onOrderPlaced: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  activeVehicle,
  discountRate,
  onOrderPlaced
}) => {
  const [name, setName] = useState('Alex Henderson');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [address, setAddress] = useState('742 Evergreen Terrace, Suite 4B');
  const [city, setCity] = useState('Metro City');
  const [postalCode, setPostalCode] = useState('94103');
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, it) => {
    const itemPrice = it.selectedSeller?.price ?? it.product?.sellers?.[0]?.price ?? 29.99;
    return acc + itemPrice * (it.quantity || 1);
  }, 0);
  const discountAmount = subtotal * discountRate;
  const shippingFee = shippingMethod === 'express' ? 7.50 : (subtotal > 40 ? 0 : 5.00);
  const taxAmount = (subtotal - discountAmount) * 0.08;
  const grandTotal = subtotal - discountAmount + shippingFee + taxAmount;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      const newOrder: Order = {
        id: `GS-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toISOString().split('T')[0],
        items: [...cartItems],
        subtotal,
        discount: discountAmount,
        shipping: shippingFee,
        tax: taxAmount,
        total: grandTotal,
        shippingAddress: {
          name,
          phone,
          street: address,
          city,
          state: 'CA',
          pincode: postalCode
        },
        paymentMethod: paymentMethod === 'card' ? 'Credit/Debit Card' : paymentMethod === 'upi' ? 'UPI' : 'Cash on Delivery',
        vehicleContext: activeVehicle ? `${activeVehicle.year} ${activeVehicle.make} ${activeVehicle.model} (${activeVehicle.engine})` : undefined,
        status: 'Confirmed',
        courier: 'FedEx Automotive Express',
        trackingNumber: `TRK-EXPRESS-${Math.floor(10000000 + Math.random() * 90000000)}`,
        estimatedDelivery: shippingMethod === 'express' ? 'Tomorrow, 4:00 PM' : 'In 2 Business Days'
      };

      setIsProcessing(false);
      onOrderPlaced(newOrder);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-3xl w-full max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <h3 className="text-base font-bold text-white leading-tight">Secure 256-bit Checkout</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handlePlaceOrder} className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Fitment Guarantee Banner */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3.5 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="text-xs">
              <span className="font-bold text-emerald-900 uppercase">Guaranteed Fitment Protection:</span>
              <p className="text-emerald-800 mt-0.5">
                All ordered parts are validated against your active vehicle ({activeVehicle ? `${activeVehicle.make} ${activeVehicle.model}` : 'universal fitment'}). If any component fails to bolt on, return shipping is 100% free with instant refunds.
              </p>
            </div>
          </div>

          {/* Shipping Address */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-orange-600" />
              <span>1. Delivery Destination</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Contact Phone</label>
                <input
                  type="text"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-slate-700 font-semibold block mb-1">Street Address & Workshop Suite</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">City / Hub</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:ring-2 focus:ring-orange-500"
                />
              </div>
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Postal / ZIP Code</label>
                <input
                  type="text"
                  required
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded p-2 text-slate-900 focus:ring-2 focus:ring-orange-500"
                />
              </div>
            </div>
          </div>

          {/* Shipping Speed */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-600" />
              <span>2. Delivery Speed</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setShippingMethod('standard')}
                className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'standard'
                    ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <span className="text-xs font-bold text-slate-900 block">Standard Logistics Dispatch</span>
                  <span className="text-[11px] text-slate-500">Delivered within 2-3 business days</span>
                </div>
                <span className="text-xs font-bold text-slate-800">
                  {subtotal > 40 ? 'FREE' : '$5.00'}
                </span>
              </label>

              <label
                onClick={() => setShippingMethod('express')}
                className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                  shippingMethod === 'express'
                    ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Zap className="w-4 h-4 text-orange-600 shrink-0" />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">Same-Day Priority Express</span>
                    <span className="text-[11px] text-slate-500">Depot runner to your bay by tomorrow</span>
                  </div>
                </div>
                <span className="text-xs font-bold text-slate-800">$7.50</span>
              </label>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-3 flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-orange-600" />
              <span>3. Payment Method</span>
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {(['card', 'upi', 'cod'] as const).map((method) => (
                <button
                  type="button"
                  key={method}
                  onClick={() => setPaymentMethod(method)}
                  className={`p-3 rounded-lg border text-left cursor-pointer transition-all ${
                    paymentMethod === method
                      ? 'border-orange-500 bg-orange-50/50 ring-1 ring-orange-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <span className="text-xs font-bold text-slate-900 block capitalize">
                    {method === 'card' ? 'Credit / Debit Card' : method === 'upi' ? 'UPI / Google Pay' : 'Cash on Delivery'}
                  </span>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    {method === 'card' ? 'Visa, MC, Amex' : method === 'upi' ? 'Instant QR / App' : 'Pay when parts arrive'}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Order Summary Recap */}
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 text-xs space-y-1.5">
            <div className="flex justify-between text-slate-600">
              <span>Items Total ({cartItems.length}):</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-semibold">
                <span>Promotional Discount:</span>
                <span>-${discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600">
              <span>Shipping Charge:</span>
              <span>{shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>Tax (8%):</span>
              <span>${taxAmount.toFixed(2)}</span>
            </div>
            <div className="border-t border-slate-200 pt-2 flex justify-between text-sm font-bold text-slate-900">
              <span>Total Payable:</span>
              <span className="text-orange-600 font-black">${grandTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isProcessing}
            className="w-full bg-orange-600 hover:bg-orange-700 disabled:opacity-50 text-white py-3.5 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
          >
            {isProcessing ? (
              <span>Confirming Vehicle Fitment & Routing Order...</span>
            ) : (
              <>
                <span>Confirm Order & Pay ${grandTotal.toFixed(2)}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
