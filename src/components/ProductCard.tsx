import React from 'react';
import { Star, Plus, Check, AlertCircle, ShoppingCart } from 'lucide-react';
import { Product, Vehicle } from '../types';
import { checkCompatibility } from '../utils/compatibility';

interface ProductCardProps {
  product: Product;
  activeVehicle: Vehicle | null;
  onSelect: (product: Product) => void;
  onAddToCart: (product: Product, event: React.MouseEvent) => void;
  onCheckFitment: (product: Product, event: React.MouseEvent) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  activeVehicle,
  onSelect,
  onAddToCart,
  onCheckFitment
}) => {
  const [isNotified, setIsNotified] = React.useState(false);
  const compatibility = checkCompatibility(product, activeVehicle);
  const primarySeller = product.sellers?.[0];
  const isOutOfStock = !primarySeller || !primarySeller.inStock;
  const price = primarySeller?.price ?? 29.99;
  const mrp = primarySeller?.mrp;

  return (
    <div
      onClick={() => onSelect(product)}
      className={`bg-white rounded-xl border border-slate-200 overflow-hidden flex flex-col shadow-xs hover:shadow-md transition-all cursor-pointer group relative ${
        isOutOfStock ? 'opacity-85' : ''
      }`}
    >
      {/* Top Image Container */}
      <div className="h-44 bg-slate-50/80 p-4 relative flex items-center justify-center border-b border-slate-100 overflow-hidden">
        {/* OEM / Badge */}
        <div className="absolute top-2.5 left-2.5 z-10 flex flex-col gap-1 items-start">
          {product.isOem ? (
            <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              OEM GENUINE
            </span>
          ) : (
            <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              PREMIUM AFTERMARKET
            </span>
          )}

          {isOutOfStock && (
            <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
              Out of Stock
            </span>
          )}
        </div>

        {/* Brand Watermark Badge */}
        <div className="absolute top-2.5 right-2.5 z-10 text-[10px] font-bold text-slate-400 bg-white/90 border border-slate-200 px-1.5 py-0.5 rounded">
          {product.brand}
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col">
        {/* Compatibility Bar */}
        <div className="mb-2">
          {activeVehicle ? (
            <div 
              onClick={(e) => onCheckFitment(product, e)}
              className={`text-[11px] font-semibold px-2 py-1 rounded flex items-center gap-1.5 border ${compatibility.badgeClass}`}
            >
              {compatibility.status === 'Compatible' ? (
                <>
                  <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span className="truncate">Fits {activeVehicle.make} {activeVehicle.model}</span>
                </>
              ) : compatibility.status === 'Possible Match' ? (
                <>
                  <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
                  <span className="truncate">Check fitment ({activeVehicle.model})</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-3 h-3 text-rose-600 shrink-0" />
                  <span className="truncate">Does not match your garage vehicle</span>
                </>
              )}
            </div>
          ) : (
            <div 
              onClick={(e) => onCheckFitment(product, e)}
              className="text-[11px] text-slate-500 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 px-2 py-1 rounded flex items-center justify-between transition-colors"
            >
              <span>Will this fit my vehicle?</span>
              <span className="text-[10px] font-bold text-orange-600 uppercase">Check</span>
            </div>
          )}
        </div>

        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-0.5">
          {product.subCategory} • <span className="font-mono text-slate-600 font-normal">#{product.partNumber}</span>
        </p>

        <h4 className="text-sm font-bold text-slate-900 leading-snug mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {product.name}
        </h4>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center text-amber-400">
            <Star className="w-3.5 h-3.5 fill-current" />
          </div>
          <span className="text-xs font-bold text-slate-800">{product.rating}</span>
          <span className="text-[11px] text-slate-400 font-medium">({product.reviewCount} reviews)</span>
        </div>

        {/* OEM Cross Reference Snippet */}
        <div className="text-[11px] text-slate-500 font-mono mb-2 truncate">
          <span className="text-slate-400">OEM:</span> {product.oemNumber}
        </div>

        {/* Footer & Price */}
        <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
          <div className="flex flex-col">
            {mrp && mrp > price && (
              <span className="text-xs text-slate-400 line-through leading-none">
                ${mrp.toFixed(2)}
              </span>
            )}
            <span className="text-lg font-bold text-slate-900 leading-tight">
              ${price.toFixed(2)}
            </span>
          </div>

          {isOutOfStock ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsNotified(true);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                isNotified ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 hover:bg-slate-300 text-slate-700'
              }`}
            >
              {isNotified ? '✓ Subscribed' : 'Notify Me'}
            </button>
          ) : (
            <button
              onClick={(e) => onAddToCart(product, e)}
              className="bg-orange-600 hover:bg-orange-700 text-white p-2 rounded-lg transition-colors shadow-xs hover:shadow cursor-pointer flex items-center justify-center"
              title="Add to Shopping Cart"
            >
              <Plus className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
