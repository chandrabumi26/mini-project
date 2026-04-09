import React from 'react';
import { Search, Plus, Filter, Eye, Edit, Trash2 } from 'lucide-react';
// import { motion } from 'framer-motion';

const ProductList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your inventory and product listings.</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all">
          <Plus size={20} /> Add Product
        </button>
      </div>

      <div className="bg-card border rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 border-b flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2 bg-secondary/50 border-none rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-secondary rounded-lg font-medium hover:bg-secondary/80 transition-all">
              <Filter size={18} /> Filter
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-secondary/30 text-muted-foreground uppercase text-xs font-semibold tracking-wider">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[1, 2, 3, 4, 5].map((item) => (
                <tr key={item} className="hover:bg-secondary/10 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 bg-secondary rounded-lg" />
                      <div>
                        <p className="font-semibold">iPhone 15 Pro</p>
                        <p className="text-xs text-muted-foreground">Apple Inc.</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">Smartphones</td>
                  <td className="px-6 py-4 text-sm font-medium">$999.00</td>
                  <td className="px-6 py-4 text-sm">45</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold bg-emerald-100 text-emerald-700 rounded-full">
                      In Stock
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-primary/10 text-primary rounded-lg" title="View">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 hover:bg-orange-100 text-orange-600 rounded-lg" title="Edit">
                        <Edit size={18} />
                      </button>
                      <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
          <p>Showing 1-10 of 124 products</p>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-secondary rounded hover:bg-secondary/80 disabled:opacity-50">Prev</button>
            <button className="px-3 py-1 bg-secondary rounded hover:bg-secondary/80 active:bg-primary active:text-primary-foreground">1</button>
            <button className="px-3 py-1 bg-secondary rounded hover:bg-secondary/80">2</button>
            <button className="px-3 py-1 bg-secondary rounded hover:bg-secondary/80">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
