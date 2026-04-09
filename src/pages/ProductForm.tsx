import React from 'react';
import { ArrowLeft, Save, Upload } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
          <p className="text-muted-foreground mt-1 text-sm">
            {isEdit ? 'Update existing product details.' : 'Fill in the information to create a new product.'}
          </p>
        </div>
        <button className="flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all">
          <Save size={18} /> Save Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-card border rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-bold border-b pb-4 mb-4">General Information</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Product Title</label>
              <input
                type="text"
                placeholder="Enter product name"
                className="w-full px-4 py-2.5 bg-background border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Category</label>
                <select className="w-full px-4 py-2.5 bg-background border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all">
                  <option>Select Category</option>
                  <option>Smartphones</option>
                  <option>Laptops</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Brand</label>
                <input
                  type="text"
                  placeholder="Enter brand name"
                  className="w-full px-4 py-2.5 bg-background border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <textarea
                placeholder="Enter product description"
                rows={5}
                className="w-full px-4 py-2.5 bg-background border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
              />
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-bold border-b pb-4 mb-4">Pricing & Inventory</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Price ($)</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-2.5 bg-background border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Stock</label>
                <input
                  type="number"
                  placeholder="0"
                  className="w-full px-4 py-2.5 bg-background border rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col items-center justify-center text-center space-y-4">
            <h3 className="font-bold w-full text-left border-b pb-4 mb-2">Product Image</h3>
            <div className="h-48 w-full bg-secondary/50 rounded-xl border-2 border-dashed border-muted-foreground/20 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-secondary/80 transition-all">
              <Upload className="text-muted-foreground" size={32} />
              <p className="text-xs text-muted-foreground">Click to upload or drag & drop</p>
            </div>
            <p className="text-[10px] text-muted-foreground">Maximum file size 2MB. Format: JPG, PNG, WEBP.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
