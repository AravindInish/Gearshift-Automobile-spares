import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingCart, 
  ArrowRight, 
  Tag, 
  ShieldCheck, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { CartItem, Vehicle } from '../types';
import { checkCompatibility } from '../utils/compatibility';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedToCheckout: () => void;
  activeVehicle: Vehicle | null;
  couponCode: string;
  onApplyCoupon: (code: string) => void;
  discountRate: number;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  activeVehicle,
  couponCode,
  onApplyCoupon,
  discountRate
}) => {
  const [couponInput, setCouponInput] = useState(couponCode);
  const [couponMessage, setCouponMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, it) => {
    const itemPrice = it.selectedSeller?.price ?? it.product?.sellers?.[0]?.price ?? 29.99;
    return acc + itemPrice * (it.quantity || 1);
  }, 0);
  const discountAmount = subtotal * discountRate;
  const shippingFee = subtotal > 40 || subtotal === 0 ? 0 : 5.00;
  const taxAmount = (subtotal - discountAmount) * 0.08; // 8% sales tax
  const grandTotal = subtotal - discountAmount + shippingFee + taxAmount;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = couponInput.trim().toUpperCase();
    if (cleanCode === 'GEARSHIFT10') {
      onApplyCoupon('GEARSHIFT10');
      setCouponMessage('10% Automotive Savings Applied!');
    } else if (cleanCode === 'WORKSHOP20') {
      onApplyCoupon('WORKSHOP20');
      setCouponMessage('20% Trade Workshop Discount Applied!');
    } else {
      setCouponMessage('Invalid coupon code. Try GEARSHIFT10');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-950/70 backdrop-blur-xs">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between">
        {/* Header */}
        <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5 text-orange-500" />
            <h3 className="text-base font-bold">Shopping Cart ({cartItems.length})</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h4 className="text-base font-bold text-slate-800">Your cart is empty</h4>
              <p className="text-xs text-slate-500 mt-1 max-w-xs">
                Select your vehicle and add compatible spare parts to proceed.
              </p>
            </div>
          ) : (
            cartItems.map((item) => {
              const comp = checkCompatibility(item.product, activeVehicle);
              const seller = item.selectedSeller || item.product?.sellers?.[0] || { sellerName: 'GearShift Depot', price: 29.99 };
              const itemPrice = seller.price ?? 29.99;
              return (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 flex gap-3 relative"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 object-contain bg-white rounded-lg p-1 border border-slate-200 shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-slate-900 leading-snug line-clamp-1">
                      {item.product.name}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                      OEM: {item.product.oemNumber} • Sold by: {seller.sellerName}
                    </p>

                    {/* Compatibility verification chip */}
                    <div className="mt-1">
                      {comp.status === 'Compatible' ? (
                        <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded font-semibold flex items-center gap-1 w-fit">
                          <Check className="w-2.5 h-2.5" /> Fits your vehicle
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-800 bg-amber-100 px-1.5 py-0.2 rounded font-semibold flex items-center gap-1 w-fit">
                          <AlertCircle className="w-2.5 h-2.5" /> Verify OEM code
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center border border-slate-300 rounded bg-white">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 rounded-l cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2.5 text-xs font-bold text-slate-800">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 rounded-r cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-slate-900">
                          ${(itemPrice * item.quantity).toFixed(2)}
                        </span>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer & Order Summary */}
        {cartItems.length > 0 && (
          <div className="bg-slate-50 border-t border-slate-200 p-6 space-y-4 shrink-0">
            {/* Coupon input */}
            <form onSubmit={handleApplyCoupon} className="flex gap-2">
              <input
                type="text"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                placeholder="Coupon (e.g. GEARSHIFT10)"
                className="flex-1 bg-white border border-slate-300 rounded-md py-1.5 px-3 text-xs text-slate-900 uppercase font-mono"
              />
              <button
                type="submit"
                className="bg-slate-900 text-white px-3 py-1.5 rounded-md text-xs font-bold hover:bg-slate-800 cursor-pointer"
              >
                Apply
              </button>
            </form>
            {couponMessage && (
              <p className="text-[11px] text-emerald-700 font-semibold">{couponMessage}</p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold text-slate-900">${subtotal.toFixed(2)}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Coupon Discount:</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span>{shippingFee === 0 ? <strong className="text-emerald-700">FREE</strong> : `$${shippingFee.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Taxes (8%):</span>
                <span>${taxAmount.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-200 pt-2 flex justify-between text-base font-bold text-slate-900">
                <span>Total:</span>
                <span className="text-orange-600 font-black">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onProceedToCheckout();
              }}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
