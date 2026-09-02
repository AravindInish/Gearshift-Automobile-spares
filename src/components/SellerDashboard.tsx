import React, { useState } from 'react';
import { 
  X, 
  Store, 
  DollarSign, 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  Plus, 
  Edit, 
  CheckCircle,
  Truck,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { Product } from '../types';

interface SellerDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (newProduct: Partial<Product>) => void;
}

export const SellerDashboard: React.FC<SellerDashboardProps> = ({
  isOpen,
  onClose,
  products,
  onAddProduct
}) => {
  const [activeTab, setActiveTab] = useState<'inventory' | 'orders' | 'analytics' | 'add-part'>('inventory');

  // New Part Form
  const [newPartName, setNewPartName] = useState('');
  const [newPartOem, setNewPartOem] = useState('');
  const [newPartBrand, setNewPartBrand] = useState('Bosch Automotive');
  const [newPartCategory, setNewPartCategory] = useState('Braking System');
  const [newPartPrice, setNewPartPrice] = useState(49.99);
  const [newPartStock, setNewPartStock] = useState(25);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  if (!isOpen) return null;

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPartName.trim() || !newPartOem.trim()) {
      showFeedback('error', 'Please fill out part name and OEM code before publishing.');
      return;
    }

    onAddProduct({
      id: `prod-custom-${Date.now()}`,
      name: newPartName,
      partNumber: `SP-${Math.floor(1000 + Math.random() * 9000)}`,
      oemNumber: newPartOem,
      brand: newPartBrand,
      category: newPartCategory,
      subCategory: 'Replacement Part',
      description: 'High-performance automotive spare component verified for OEM tolerances.',
      image: 'https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&q=80&w=600',
      galleryImages: ['https://images.unsplash.com/photo-1600793575654-910699b5e4d4?auto=format&fit=crop&q=80&w=600'],
      isOem: false,
      rating: 5.0,
      reviewCount: 1,
      specifications: { 'OEM Reference': newPartOem },
      installationDifficulty: 'Moderate',
      warranty: '1 Year Manufacturer Warranty',
      compatibleVehicles: [
        {
          make: 'Toyota',
          model: 'Innova Crysta',
          yearFrom: 2016,
          yearTo: 2024,
          fitmentNotes: 'Verified bolt-on'
        }
      ],
      sellers: [
        {
          sellerId: 'sel-user-merchant',
          sellerName: 'My Auto Spares Store',
          rating: 4.9,
          reviewCount: 120,
          price: Number(newPartPrice),
          mrp: Number(newPartPrice) * 1.25,
          deliveryDays: 1,
          deliveryFee: 0,
          warranty: '1 Year Warranty',
          returnPolicy: '15-Day Returns',
          inStock: true,
          stockCount: Number(newPartStock),
          isVerified: true,
          location: 'Main Commercial Warehouse'
        }
      ],
      reviews: []
    });

    showFeedback('success', `New part "${newPartName}" successfully published to the live marketplace catalog!`);
    setActiveTab('inventory');
    setNewPartName('');
    setNewPartOem('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold">
              <Store className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white leading-tight">Seller & Dealer Hub</h3>
                <span className="bg-emerald-500 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded">
                  Verified Merchant
                </span>
              </div>
              <p className="text-xs text-slate-400">Inventory control, order fulfillment & revenue tracking</p>
            </div>
          </div>

          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded transition-colors cursor-pointer">
            <X className="w-5 h-5" />
          </button>
        </div>

        {feedback && (
          <div className={`px-6 py-2 text-xs font-bold flex items-center justify-between ${
            feedback.type === 'success' ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
          }`}>
            <span>{feedback.message}</span>
            <button onClick={() => setFeedback(null)} className="font-bold text-sm px-1 cursor-pointer">✕</button>
          </div>
        )}

        {/* Top Metric Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-200 border-b border-slate-200 bg-slate-50 text-xs shrink-0">
          <div className="p-3.5">
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Monthly Revenue</span>
            <span className="text-lg font-bold text-slate-900 mt-0.5 block">$18,420.50</span>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
              <TrendingUp className="w-3 h-3" /> +14.2% vs last mo
            </span>
          </div>
          <div className="p-3.5">
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Active Orders</span>
            <span className="text-lg font-bold text-slate-900 mt-0.5 block">24 Orders</span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">6 awaiting pickup</span>
          </div>
          <div className="p-3.5">
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Catalog SKUs</span>
            <span className="text-lg font-bold text-slate-900 mt-0.5 block">{products.length} Parts</span>
            <span className="text-[11px] text-emerald-600 mt-0.5 block">100% Verified fitment</span>
          </div>
          <div className="p-3.5">
            <span className="text-slate-400 font-bold uppercase block text-[10px]">Low Stock Warnings</span>
            <span className="text-lg font-bold text-red-600 mt-0.5 block">1 Item</span>
            <span className="text-[11px] text-red-500 font-semibold mt-0.5 block">Restock recommended</span>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b border-slate-200 px-6 py-2 flex items-center gap-4 text-xs font-bold text-slate-600 shrink-0">
          <button
            onClick={() => setActiveTab('inventory')}
            className={`py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
              activeTab === 'inventory' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            Inventory Management
          </button>
          <button
            onClick={() => setActiveTab('add-part')}
            className={`py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
              activeTab === 'add-part' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            + List New Spare Part
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
              activeTab === 'orders' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            Fulfillment Orders
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
              activeTab === 'analytics' ? 'bg-slate-900 text-white' : 'hover:bg-slate-100 text-slate-700'
            }`}
          >
            Sales Analytics
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'inventory' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 uppercase">Current Marketplace Listings</h4>
                <button
                  onClick={() => setActiveTab('add-part')}
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> List New Part
                </button>
              </div>

              <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-4">Part & Specification</th>
                      <th className="py-2.5 px-3">OEM / SKU</th>
                      <th className="py-2.5 px-3">Brand</th>
                      <th className="py-2.5 px-3">Listed Price</th>
                      <th className="py-2.5 px-3">Stock Units</th>
                      <th className="py-2.5 px-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {products.map((prod) => {
                      const stock = prod.sellers[0]?.stockCount ?? 0;
                      return (
                        <tr key={prod.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-4 font-semibold text-slate-900 max-w-xs">
                            <div className="flex items-center gap-2">
                              <img src={prod.image} alt={prod.name} className="w-8 h-8 object-contain rounded bg-slate-100 p-0.5" />
                              <span className="truncate">{prod.name}</span>
                            </div>
                          </td>
                          <td className="py-2.5 px-3 font-mono text-slate-600">{prod.oemNumber}</td>
                          <td className="py-2.5 px-3 text-slate-700">{prod.brand}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-900">
                            ${prod.sellers[0]?.price.toFixed(2)}
                          </td>
                          <td className="py-2.5 px-3 font-semibold text-slate-800">
                            {stock > 0 ? `${stock} in stock` : <span className="text-red-600 font-bold">0 (Out)</span>}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              stock > 10 ? 'bg-emerald-100 text-emerald-800' :
                              stock > 0 ? 'bg-amber-100 text-amber-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {stock > 10 ? 'Active' : stock > 0 ? 'Low Stock' : 'Restock'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'add-part' && (
            <form onSubmit={handleCreateProduct} className="max-w-2xl mx-auto space-y-4 bg-slate-50 p-6 rounded-xl border border-slate-200">
              <h4 className="text-sm font-bold text-slate-900 uppercase">List a New Automobile Spare Part</h4>
              <p className="text-xs text-slate-500">Add genuine OEM or aftermarket components to the nationwide catalog</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-slate-700 block mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={newPartName}
                    onChange={(e) => setNewPartName(e.target.value)}
                    placeholder="e.g. Brembo Front Brake Disc Rotor Set (Pair)"
                    className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">OEM / Manufacturer Code</label>
                  <input
                    type="text"
                    required
                    value={newPartOem}
                    onChange={(e) => setNewPartOem(e.target.value)}
                    placeholder="e.g. 43512-0K090"
                    className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500 font-mono"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Brand</label>
                  <select
                    value={newPartBrand}
                    onChange={(e) => setNewPartBrand(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-xs text-slate-900"
                  >
                    <option value="Bosch Automotive">Bosch Automotive</option>
                    <option value="Brembo High Performance">Brembo High Performance</option>
                    <option value="Toyota Genuine Parts">Toyota Genuine Parts</option>
                    <option value="NGK Spark Plugs">NGK Spark Plugs</option>
                    <option value="Mobil 1 / ExxonMobil">Mobil 1 / ExxonMobil</option>
                    <option value="Gates Corporation">Gates Corporation</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Selling Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={newPartPrice}
                    onChange={(e) => setNewPartPrice(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-xs text-slate-900"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Inventory Quantity</label>
                  <input
                    type="number"
                    required
                    value={newPartStock}
                    onChange={(e) => setNewPartStock(Number(e.target.value))}
                    className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-xs text-slate-900"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setActiveTab('inventory')}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded-md hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 text-xs font-bold rounded-md shadow-sm cursor-pointer"
                >
                  Publish Part Listing
                </button>
              </div>
            </form>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-3">
              <h4 className="text-sm font-bold text-slate-900 uppercase">Incoming Fulfillment Orders</h4>
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-orange-600">ORD-2026-9912</span>
                    <span className="text-xs font-bold text-slate-900">David Lee</span>
                    <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded">
                      Ready for Courier Pickup
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">
                    2x Genuine Toyota Cartridge Oil Filter Element (04152-YZZA1)
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-sm font-bold text-slate-900">$25.00</span>
                  <button
                    onClick={() => alert('Courier dispatch manifest generated.')}
                    className="mt-1 block text-xs font-bold text-orange-600 hover:underline"
                  >
                    Print Shipping Label
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-slate-900 uppercase">Marketplace Performance & Fast Movers</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-xs font-bold text-slate-500 uppercase">Top Moving Category</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">Braking System (38% of sales)</p>
                  <p className="text-xs text-slate-500 mt-0.5">High demand during monsoon maintenance</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-xs font-bold text-slate-500 uppercase">Return Rate</span>
                  <p className="text-sm font-bold text-emerald-600 mt-1">&lt; 0.4% (Industry Low)</p>
                  <p className="text-xs text-slate-500 mt-0.5">Driven by vehicle compatibility checker</p>
                </div>
                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-xs font-bold text-slate-500 uppercase">Avg Delivery Time</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">1.4 Business Days</p>
                  <p className="text-xs text-slate-500 mt-0.5">Direct express fulfillment active</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
