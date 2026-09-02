import React, { useState, useEffect } from 'react';
import { 
  X, 
  Check, 
  AlertTriangle, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Star, 
  Wrench, 
  ShoppingCart, 
  ExternalLink,
  ChevronRight,
  Store
} from 'lucide-react';
import { Product, Vehicle, SellerListing } from '../types';
import { checkCompatibility } from '../utils/compatibility';

interface ProductDetailModalProps {
  product: Product | null;
  activeVehicle: Vehicle | null;
  onClose: () => void;
  onAddToCart: (product: Product, seller?: SellerListing) => void;
  onBuyNow: (product: Product, seller?: SellerListing) => void;
  onSelectVehicle: () => void;
  allProducts: Product[];
  onSelectProduct: (p: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  activeVehicle,
  onClose,
  onAddToCart,
  onBuyNow,
  onSelectVehicle,
  allProducts,
  onSelectProduct
}) => {
  if (!product) return null;

  const fallbackSeller: SellerListing = {
    sellerId: 'sel-default',
    sellerName: 'GearShift Verified Hub',
    rating: 4.8,
    reviewCount: 95,
    price: product.sellers?.[0]?.price || 49.99,
    mrp: product.sellers?.[0]?.mrp || 59.99,
    deliveryDays: 1,
    deliveryFee: 0,
    warranty: '1 Year Full Warranty',
    returnPolicy: '15-Day Free Returns',
    inStock: true,
    stockCount: 10,
    isVerified: true,
    location: 'Central Depot'
  };

  const [selectedSeller, setSelectedSeller] = useState<SellerListing>(product.sellers?.[0] || fallbackSeller);
  const [activeTab, setActiveTab] = useState<'specs' | 'fitment' | 'sellers' | 'reviews'>('specs');

  useEffect(() => {
    if (product && product.sellers && product.sellers.length > 0) {
      setSelectedSeller(product.sellers[0]);
    } else {
      setSelectedSeller(fallbackSeller);
    }
  }, [product?.id]);

  const activeSeller = selectedSeller || product.sellers?.[0] || fallbackSeller;
  const compatibility = checkCompatibility(product, activeVehicle);

  // Recommended Addons
  const recommendedItems = product.recommendedAddons
    ? allProducts.filter(p => product.recommendedAddons?.includes(p.id))
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/75 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#0f172a] text-white px-6 py-3.5 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">{product.category}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300 font-semibold">{product.subCategory}</span>
            <span className="text-slate-600">/</span>
            <span className="text-orange-400 font-mono">#{product.partNumber}</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-md transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scroll Content */}
        <div className="overflow-y-auto p-6 space-y-6">
          {/* Main Top Grid: Image + Core Details */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left: Product Image */}
            <div className="md:col-span-5 flex flex-col gap-3">
              <div className="h-64 bg-slate-50 border border-slate-200 rounded-xl p-4 relative flex items-center justify-center">
                {product.isOem ? (
                  <span className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    OEM GENUINE
                  </span>
                ) : (
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    PREMIUM AFTERMARKET
                  </span>
                )}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Gallery Thumbnails */}
              {product.galleryImages.length > 1 && (
                <div className="flex gap-2">
                  {product.galleryImages.map((img, idx) => (
                    <div key={idx} className="w-16 h-16 border border-slate-200 rounded-lg p-1 bg-slate-50 cursor-pointer">
                      <img src={img} alt="thumbnail" className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Right: Title, Compatibility, Price */}
            <div className="md:col-span-7 flex flex-col">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{product.brand}</span>
                <span className="text-slate-300">•</span>
                <span className="text-xs font-mono text-slate-600">OEM: {product.oemNumber}</span>
              </div>

              <h2 className="text-xl font-bold text-slate-900 leading-snug mb-2">
                {product.name}
              </h2>

              {/* Ratings and Reviews */}
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-amber-400">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm font-bold text-slate-800">{product.rating}</span>
                <span className="text-xs text-slate-500">({product.reviewCount} customer reviews)</span>
                <span className="text-slate-300">|</span>
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                  ✓ Verified Fitment Guaranteed
                </span>
              </div>

              {/* High Profile Compatibility Check Box */}
              <div className={`p-3.5 rounded-xl border mb-4 ${compatibility.badgeClass}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-2.5">
                    {compatibility.status === 'Compatible' ? (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3.5 h-3.5" />
                      </div>
                    ) : (
                      <div className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </div>
                    )}
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wider">
                        {compatibility.status === 'Compatible' ? '✓ 100% Compatible with Your Vehicle' : '⚠ Compatibility Notice'}
                      </p>
                      <p className="text-xs mt-0.5 leading-relaxed font-medium">
                        {compatibility.message}
                      </p>
                      {compatibility.matchedRuleNotes && (
                        <p className="text-[11px] mt-1 text-slate-600 italic">
                          Fitment note: {compatibility.matchedRuleNotes}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={onSelectVehicle}
                    className="text-[11px] font-bold text-blue-700 hover:text-blue-900 underline shrink-0 cursor-pointer"
                  >
                    Change Vehicle
                  </button>
                </div>
              </div>

              {/* Price & Primary Seller */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-4">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-2xl font-black text-slate-900">
                    ${activeSeller.price.toFixed(2)}
                  </span>
                  {activeSeller.mrp > activeSeller.price && (
                    <>
                      <span className="text-sm text-slate-400 line-through">
                        ${activeSeller.mrp.toFixed(2)}
                      </span>
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Save ${(activeSeller.mrp - activeSeller.price).toFixed(2)}
                      </span>
                    </>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1">
                  <Store className="w-3.5 h-3.5 text-slate-500" />
                  <span>Sold by:</span>
                  <span className="font-bold text-slate-900">{activeSeller.sellerName}</span>
                  {activeSeller.isVerified && (
                    <span className="bg-blue-100 text-blue-800 text-[10px] font-bold px-1.5 rounded">Verified Seller</span>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-slate-400" />
                    <span>Delivered in {activeSeller.deliveryDays} business day(s)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{activeSeller.warranty}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeSeller.returnPolicy}</span>
                  </div>
                </div>
              </div>

              {/* Add to Cart & Buy Buttons */}
              <div className="flex items-center gap-3 mt-auto">
                <button
                  onClick={() => onAddToCart(product, activeSeller)}
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-sm cursor-pointer"
                >
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={() => onBuyNow(product, activeSeller)}
                  className="flex-1 bg-[#0f172a] hover:bg-slate-800 text-white py-3 px-4 rounded-lg font-bold text-sm transition-all shadow-sm cursor-pointer"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="border-b border-slate-200">
            <nav className="flex space-x-6 text-sm">
              <button
                onClick={() => setActiveTab('specs')}
                className={`py-3 font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'specs'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Specifications
              </button>
              <button
                onClick={() => setActiveTab('fitment')}
                className={`py-3 font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'fitment'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Compatible Vehicles ({product.compatibleVehicles.length})
              </button>
              <button
                onClick={() => setActiveTab('sellers')}
                className={`py-3 font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'sellers'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Compare Sellers ({product.sellers.length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-3 font-bold border-b-2 transition-colors cursor-pointer ${
                  activeTab === 'reviews'
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Customer Reviews ({product.reviews.length})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'specs' && (
              <div className="space-y-4">
                <p className="text-sm text-slate-700 leading-relaxed">{product.description}</p>

                <div className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <tbody className="divide-y divide-slate-200">
                      <tr className="bg-white">
                        <td className="py-2.5 px-4 font-bold text-slate-600 w-1/3">Part Number</td>
                        <td className="py-2.5 px-4 font-mono font-bold text-slate-900">{product.partNumber}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-slate-600">OEM Cross-Reference</td>
                        <td className="py-2.5 px-4 font-mono text-slate-900">{product.oemNumber}</td>
                      </tr>
                      <tr className="bg-white">
                        <td className="py-2.5 px-4 font-bold text-slate-600">Brand / Manufacturer</td>
                        <td className="py-2.5 px-4 text-slate-900">{product.brand}</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-slate-600">Installation Difficulty</td>
                        <td className="py-2.5 px-4">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                            product.installationDifficulty === 'Easy' ? 'bg-emerald-100 text-emerald-800' :
                            product.installationDifficulty === 'Moderate' ? 'bg-amber-100 text-amber-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {product.installationDifficulty}
                          </span>
                        </td>
                      </tr>
                      {Object.entries(product.specifications).map(([key, val]) => (
                        <tr key={key} className="bg-white">
                          <td className="py-2.5 px-4 font-bold text-slate-600">{key}</td>
                          <td className="py-2.5 px-4 text-slate-900">{val}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'fitment' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  The following vehicle models have been verified by catalog technicians for direct bolt-on fitment:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {product.compatibleVehicles.map((rule, idx) => (
                    <div key={idx} className="p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-slate-900">{rule.make} {rule.model}</span>
                        <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded font-mono">
                          {rule.yearFrom} – {rule.yearTo}
                        </span>
                      </div>
                      {rule.engine && (
                        <p className="text-xs text-slate-600 mt-1">
                          <span className="font-semibold">Engine:</span> {rule.engine.join(', ')}
                        </p>
                      )}
                      {rule.fitmentNotes && (
                        <p className="text-[11px] text-slate-500 italic mt-1">{rule.fitmentNotes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'sellers' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-500">
                  Multiple verified spare parts merchants carry this component. Compare prices, shipping speeds, and ratings:
                </p>
                <div className="divide-y divide-slate-200 border border-slate-200 rounded-xl overflow-hidden">
                  {product.sellers.map((seller) => (
                    <div
                      key={seller.sellerId}
                      className={`p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                        activeSeller.sellerId === seller.sellerId ? 'bg-orange-50/50' : 'bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{seller.sellerName}</span>
                          {seller.isVerified && (
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-1.5 py-0.2 rounded">
                              Verified Merchant
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-1">
                          <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                            <Star className="w-3.5 h-3.5 fill-current" /> {seller.rating}
                          </span>
                          <span>({seller.reviewCount} orders)</span>
                          <span>•</span>
                          <span>{seller.location}</span>
                        </div>
                        <p className="text-xs text-slate-600 mt-1">
                          Delivery: <strong className="text-slate-800">{seller.deliveryDays} business day(s)</strong> • Warranty: {seller.warranty}
                        </p>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                        <div className="text-right">
                          <span className="text-xl font-bold text-slate-900">${seller.price.toFixed(2)}</span>
                          <p className="text-[10px] text-slate-400">
                            {seller.deliveryFee === 0 ? 'Free Shipping' : `+$${seller.deliveryFee} shipping`}
                          </p>
                        </div>
                        <button
                          onClick={() => setSelectedSeller(seller)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                            activeSeller.sellerId === seller.sellerId
                              ? 'bg-orange-600 text-white'
                              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                          }`}
                        >
                          {activeSeller.sellerId === seller.sellerId ? 'Selected' : 'Select Seller'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-4">
                {product.reviews.length > 0 ? (
                  product.reviews.map((rev) => (
                    <div key={rev.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{rev.author}</span>
                          {rev.verifiedPurchase && (
                            <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                              ✓ Verified Purchase
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-amber-400">
                        {[...Array(rev.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs font-semibold text-slate-600">
                        Installed on: <span className="text-slate-900">{rev.vehicleModel}</span>
                      </p>
                      <p className="text-xs text-slate-700 leading-relaxed">{rev.comment}</p>
                    </div>
                  ))
                ) : (
                  <div className="p-8 text-center text-sm text-slate-500 bg-slate-50 rounded-xl">
                    No customer reviews written for this exact SKU yet. Be the first verified buyer to leave a review!
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Recommended Addon Spares */}
          {recommendedItems.length > 0 && (
            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
                Often Purchased Together for Full Service
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {recommendedItems.map((addon) => (
                  <div
                    key={addon.id}
                    onClick={() => onSelectProduct(addon)}
                    className="p-3 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:shadow-xs transition-all cursor-pointer flex items-center gap-3"
                  >
                    <img src={addon.image} alt={addon.name} className="w-12 h-12 object-contain bg-white rounded p-1" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-900 truncate">{addon.name}</p>
                      <p className="text-xs font-bold text-orange-600 mt-0.5">${addon.sellers[0]?.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
