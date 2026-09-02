import React, { useState } from 'react';
import { 
  X, 
  Wrench, 
  FileText, 
  Users, 
  Plus, 
  Trash2, 
  Printer, 
  Send, 
  CheckCircle, 
  ShoppingCart, 
  Percent,
  Search,
  Car
} from 'lucide-react';
import { CustomerQuote, QuotationItem, Product, Vehicle } from '../types';
import { INITIAL_CUSTOMER_QUOTES } from '../data/mockData';

interface WorkshopModeProps {
  isOpen: boolean;
  onClose: () => void;
  allProducts: Product[];
  onBulkOrder: (items: { product: Product; quantity: number }[]) => void;
}

export const WorkshopMode: React.FC<WorkshopModeProps> = ({
  isOpen,
  onClose,
  allProducts,
  onBulkOrder
}) => {
  const [quotes, setQuotes] = useState<CustomerQuote[]>(INITIAL_CUSTOMER_QUOTES);
  const [activeTab, setActiveTab] = useState<'quotes' | 'new-quote' | 'bulk-order'>('quotes');

  // New Quote State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerVehicle, setCustomerVehicle] = useState('Toyota Innova Crysta (2022) 2.4D');
  const [quoteItems, setQuoteItems] = useState<QuotationItem[]>([
    {
      productId: 'prod-toyota-oil-filter',
      name: 'Genuine Toyota Cartridge Oil Filter Element',
      partNumber: '04152-YZZA1',
      quantity: 1,
      unitPrice: 12.50,
      laborCharge: 8.00
    }
  ]);
  const [notes, setNotes] = useState('40,000 km routine service');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Selected product to add to current quote
  const [selectedProductId, setSelectedProductId] = useState(allProducts[0]?.id || '');
  const [laborChargeInput, setLaborChargeInput] = useState(15.00);

  if (!isOpen) return null;

  const showFeedback = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleAddItemToQuote = () => {
    const prod = allProducts.find(p => p.id === selectedProductId);
    if (!prod) return;

    const newItem: QuotationItem = {
      productId: prod.id,
      name: prod.name,
      partNumber: prod.partNumber,
      quantity: 1,
      unitPrice: prod.sellers[0]?.price || 20,
      laborCharge: laborChargeInput
    };
    setQuoteItems([...quoteItems, newItem]);
    showFeedback('success', `Added ${prod.name} to job quotation`);
  };

  const handleRemoveItem = (index: number) => {
    setQuoteItems(quoteItems.filter((_, i) => i !== index));
  };

  const handleSaveQuote = () => {
    if (!customerName.trim() || quoteItems.length === 0) {
      showFeedback('error', 'Please provide customer name and at least one item before saving');
      return;
    }

    const newQuote: CustomerQuote = {
      id: `QT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      customerName,
      customerPhone,
      vehicle: customerVehicle,
      date: new Date().toISOString().split('T')[0],
      items: quoteItems,
      notes,
      status: 'Sent'
    };

    setQuotes([newQuote, ...quotes]);
    setActiveTab('quotes');
    setCustomerName('');
    setCustomerPhone('');
    showFeedback('success', 'Quotation generated and saved successfully');
  };

  // Calculations for active quotation
  const quotePartsTotal = quoteItems.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);
  const quoteLaborTotal = quoteItems.reduce((acc, it) => acc + it.laborCharge, 0);
  const workshopTradeDiscount = quotePartsTotal * 0.15; // 15% wholesale discount
  const grandTotal = quotePartsTotal - workshopTradeDiscount + quoteLaborTotal;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-xs">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-5xl w-full max-h-[92vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-[#0f172a] text-white px-6 py-4 flex items-center justify-between border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-black">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white leading-tight">Workshop & Technician Console</h3>
                <span className="bg-amber-400 text-slate-950 text-[10px] font-black uppercase px-2 py-0.5 rounded">
                  B2B Trade Tier
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage customer vehicles, prepare job estimates & order at 15-20% wholesale margins</p>
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

        {/* Navigation Tabs */}
        <div className="bg-slate-50 border-b border-slate-200 px-6 py-2 flex items-center gap-4 text-xs font-bold text-slate-600 shrink-0">
          <button
            onClick={() => setActiveTab('quotes')}
            className={`py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
              activeTab === 'quotes' ? 'bg-slate-900 text-white' : 'hover:bg-slate-200 text-slate-700'
            }`}
          >
            Customer Quotations ({quotes.length})
          </button>
          <button
            onClick={() => setActiveTab('new-quote')}
            className={`py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
              activeTab === 'new-quote' ? 'bg-slate-900 text-white' : 'hover:bg-slate-200 text-slate-700'
            }`}
          >
            + Create New Quotation
          </button>
          <button
            onClick={() => setActiveTab('bulk-order')}
            className={`py-1.5 px-3 rounded-md transition-colors cursor-pointer ${
              activeTab === 'bulk-order' ? 'bg-slate-900 text-white' : 'hover:bg-slate-200 text-slate-700'
            }`}
          >
            Bulk Trade Ordering
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 'quotes' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide">Saved Job Estimates</h4>
                <button
                  onClick={() => setActiveTab('new-quote')}
                  className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Customer Estimate</span>
                </button>
              </div>

              <div className="space-y-3">
                {quotes.map((q) => {
                  const partsTotal = q.items.reduce((acc, it) => acc + it.unitPrice * it.quantity, 0);
                  const laborTotal = q.items.reduce((acc, it) => acc + it.laborCharge, 0);
                  return (
                    <div key={q.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white transition-all">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-orange-600">{q.id}</span>
                            <span className="font-bold text-slate-900 text-sm">{q.customerName}</span>
                            <span className="text-xs text-slate-500">({q.customerPhone})</span>
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              q.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                            }`}>
                              {q.status}
                            </span>
                          </div>
                          <p className="text-xs text-slate-600 mt-0.5 flex items-center gap-1.5">
                            <Car className="w-3.5 h-3.5 text-slate-400" />
                            <span>{q.vehicle}</span>
                          </p>
                        </div>

                        <div className="text-right">
                          <span className="text-lg font-bold text-slate-900">
                            ${(partsTotal + laborTotal).toFixed(2)}
                          </span>
                          <p className="text-[10px] text-slate-400">Includes Parts + Labor</p>
                        </div>
                      </div>

                      <div className="py-3 text-xs space-y-1.5">
                        {q.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between text-slate-700">
                            <span>
                              {it.quantity}x {it.name} <span className="font-mono text-slate-400">({it.partNumber})</span>
                            </span>
                            <span className="font-semibold">${(it.unitPrice * it.quantity + it.laborCharge).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                        <span className="text-xs text-slate-500 italic">Job Notes: {q.notes}</span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => window.print()}
                            className="bg-white border border-slate-300 text-slate-700 px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 hover:bg-slate-100 cursor-pointer"
                          >
                            <Printer className="w-3 h-3" /> Print PDF
                          </button>
                          <button
                            onClick={() => alert(`Quotation ${q.id} sent to ${q.customerPhone} via SMS/WhatsApp!`)}
                            className="bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Send className="w-3 h-3" /> Send to Customer
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'new-quote' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="e.g. Ramesh Sharma"
                    className="w-full bg-slate-50 border border-slate-300 rounded-md py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="e.g. +1 (555) 019-2831"
                    className="w-full bg-slate-50 border border-slate-300 rounded-md py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Customer Vehicle</label>
                  <input
                    type="text"
                    value={customerVehicle}
                    onChange={(e) => setCustomerVehicle(e.target.value)}
                    placeholder="e.g. Toyota Innova Crysta (2022)"
                    className="w-full bg-slate-50 border border-slate-300 rounded-md py-2 px-3 text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Add Items Table */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                <h5 className="text-xs font-bold text-slate-800 uppercase mb-3">Add Parts & Labor to Job Sheet</h5>
                <div className="flex flex-col sm:flex-row items-end gap-3 mb-4">
                  <div className="flex-1 w-full">
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Select Catalog Part</label>
                    <select
                      value={selectedProductId}
                      onChange={(e) => setSelectedProductId(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-xs text-slate-900"
                    >
                      {allProducts.map(p => (
                        <option key={p.id} value={p.id}>
                          {p.name} ({p.brand}) - ${p.sellers[0]?.price.toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="w-36">
                    <label className="text-xs font-semibold text-slate-600 block mb-1">Labor / Fitting ($)</label>
                    <input
                      type="number"
                      value={laborChargeInput}
                      onChange={(e) => setLaborChargeInput(Number(e.target.value))}
                      className="w-full bg-white border border-slate-300 rounded-md py-2 px-3 text-xs text-slate-900"
                    />
                  </div>

                  <button
                    onClick={handleAddItemToQuote}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-md text-xs font-bold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add Item
                  </button>
                </div>

                {/* Items List */}
                <div className="border border-slate-200 rounded-lg overflow-hidden bg-white">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                      <tr>
                        <th className="py-2.5 px-4">Item & Part Code</th>
                        <th className="py-2.5 px-3">Qty</th>
                        <th className="py-2.5 px-3">Trade Unit Price</th>
                        <th className="py-2.5 px-3">Labor Charge</th>
                        <th className="py-2.5 px-3">Line Total</th>
                        <th className="py-2.5 px-2"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                      {quoteItems.map((it, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5 px-4 font-semibold text-slate-900">
                            {it.name} <span className="font-mono text-slate-400 text-[11px]">({it.partNumber})</span>
                          </td>
                          <td className="py-2.5 px-3">{it.quantity}</td>
                          <td className="py-2.5 px-3">${it.unitPrice.toFixed(2)}</td>
                          <td className="py-2.5 px-3">${it.laborCharge.toFixed(2)}</td>
                          <td className="py-2.5 px-3 font-bold text-slate-900">
                            ${(it.unitPrice * it.quantity + it.laborCharge).toFixed(2)}
                          </td>
                          <td className="py-2.5 px-2">
                            <button
                              onClick={() => handleRemoveItem(idx)}
                              className="text-slate-400 hover:text-red-600 p-1"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Quotation Summary */}
                <div className="mt-4 flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div className="flex-1">
                    <label className="text-xs font-bold text-slate-700 block mb-1">Mechanic Notes / Job Scope</label>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      className="w-full bg-white border border-slate-300 rounded-md p-2 text-xs text-slate-900"
                    />
                  </div>

                  <div className="w-72 bg-slate-100 rounded-lg p-3 text-xs space-y-1.5">
                    <div className="flex justify-between text-slate-600">
                      <span>Parts Subtotal:</span>
                      <span>${quotePartsTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-emerald-700 font-semibold">
                      <span>Workshop Trade Discount (15%):</span>
                      <span>-${workshopTradeDiscount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-600">
                      <span>Labor & Fitting:</span>
                      <span>${quoteLaborTotal.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-slate-300 pt-1.5 flex justify-between font-bold text-sm text-slate-900">
                      <span>Customer Estimate:</span>
                      <span className="text-orange-600">${grandTotal.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex justify-end gap-3">
                  <button
                    onClick={() => setActiveTab('quotes')}
                    className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-bold rounded-md hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveQuote}
                    className="bg-orange-600 hover:bg-orange-700 text-white px-5 py-2 text-xs font-bold rounded-md shadow-sm"
                  >
                    Save & Generate Quotation
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bulk-order' && (
            <div className="space-y-4">
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-amber-900 uppercase">Workshop Fast Bulk Dispatch</h4>
                  <p className="text-xs text-amber-800 mt-0.5">
                    Tier-1 commercial discounts automatically apply on orders of 5+ units per SKU.
                  </p>
                </div>
                <span className="bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded">
                  18% Trade Margin
                </span>
              </div>

              <div className="space-y-2">
                {allProducts.slice(0, 4).map((prod) => {
                  const basePrice = prod.sellers?.[0]?.price ?? 29.99;
                  const tradePrice = basePrice * 0.82;
                  return (
                    <div key={prod.id} className="p-3 border border-slate-200 rounded-xl flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={prod.image} alt={prod.name} className="w-12 h-12 object-contain bg-slate-50 p-1 rounded" />
                        <div>
                          <p className="text-xs font-bold text-slate-900">{prod.name}</p>
                          <p className="text-[11px] text-slate-500 font-mono">OEM: {prod.oemNumber} • Brand: {prod.brand}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <span className="text-sm font-bold text-slate-900">
                            ${tradePrice.toFixed(2)}
                          </span>
                          <span className="text-xs text-slate-400 line-through block">
                            ${basePrice.toFixed(2)}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            onBulkOrder([{ product: prod, quantity: 5 }]);
                            showFeedback('success', `Added 5x ${prod.name} with 18% wholesale trade discount to cart!`);
                          }}
                          className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-md text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                        >
                          <ShoppingCart className="w-3.5 h-3.5 text-orange-400" />
                          <span>Add 5 Units (Box)</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
