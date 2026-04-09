import React, { useState, useEffect } from 'react';
import { ArrowLeft, Save, Loader2, AlertCircle, PackageCheck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addProduct, updateProduct, getProductById, clearSelectedProduct } from '../features/products/productsSlice';
import { motion } from 'framer-motion';

const ProductForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const { selectedProduct, loading, error } = useAppSelector((state) => state.products);
  const isEdit = !!id;

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    brand: '',
    description: '',
    price: '',
    stock: '',
  });

  useEffect(() => {
    if (isEdit && id) {
      dispatch(getProductById(id));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, isEdit, dispatch]);

  useEffect(() => {
    if (isEdit && selectedProduct && formData.title === '') {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData({
        title: selectedProduct.title,
        category: selectedProduct.category,
        brand: selectedProduct.brand,
        description: selectedProduct.description,
        price: selectedProduct.price.toString(),
        stock: selectedProduct.stock.toString(),
      });
    }
  }, [isEdit, selectedProduct, formData.title]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
    };

    if (isEdit && id) {
      const result = await dispatch(updateProduct({ id, data: payload }));
      if (updateProduct.fulfilled.match(result)) {
        navigate('/products');
      }
    } else {
      const result = await dispatch(addProduct(payload));
      if (addProduct.fulfilled.match(result)) {
        navigate('/products');
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-12">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/products')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-medium"
      >
        <ArrowLeft size={18} /> Back to Inventory
      </motion.button>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">
            {isEdit ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isEdit ? 'Update product details in the system.' : 'Register a new masterpiece to your inventory.'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-3xl flex items-center gap-3">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          <div className="bg-card border rounded-4xl p-8 space-y-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 h-32 w-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16" />
            
            <div className="relative space-y-6">
              <h3 className="text-xl font-black flex items-center gap-2">
                <div className="h-8 w-1 bg-primary rounded-full" />
                General Information
              </h3>
              
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest ml-1">Product Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. BMW Pencil Limited Edition"
                  className="w-full px-5 py-3.5 bg-background border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none shadow-sm focus:shadow-md transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1">Category</label>
                  <select 
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-5 py-3.5 bg-background border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none shadow-sm focus:shadow-md transition-all appearance-none"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="beauty">Beauty</option>
                    <option value="fragrances">Fragrances</option>
                    <option value="furniture">Furniture</option>
                    <option value="groceries">Groceries</option>
                    <option value="smartphones">Smartphones</option>
                    <option value="laptops">Laptops</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest ml-1">Brand</label>
                  <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder="e.g. BMW"
                    className="w-full px-5 py-3.5 bg-background border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none shadow-sm focus:shadow-md transition-all"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest ml-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about the craftsmanship..."
                  rows={5}
                  className="w-full px-5 py-3.5 bg-background border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none shadow-sm focus:shadow-md transition-all resize-none"
                  required
                />
              </div>
            </div>
          </div>

          <div className="bg-card border rounded-4xl p-8 space-y-8 shadow-sm relative overflow-hidden">
            <div className="absolute bottom-0 right-0 h-32 w-32 bg-emerald-500/5 rounded-full blur-2xl -mr-16 -mb-16" />
            <h3 className="text-xl font-black flex items-center gap-2">
              <div className="h-8 w-1 bg-emerald-500 rounded-full" />
              Pricing & Inventory
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest ml-1">Price ($)</label>
                <input
                  type="number"
                  name="price"
                  step="0.01"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full px-5 py-3.5 bg-background border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none shadow-sm focus:shadow-md transition-all"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest ml-1">Stock Amount</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="0"
                  className="w-full px-5 py-3.5 bg-background border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none shadow-sm focus:shadow-md transition-all"
                  required
                />
              </div>
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="flex-1 py-5 bg-primary text-primary-foreground font-black text-lg rounded-3xl shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all flex items-center justify-center gap-3 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="animate-spin" size={24} />
            ) : (
              <>
                <Save size={24} />
                {isEdit ? 'Update Product' : 'Save Product'}
              </>
            )}
          </motion.button>
          
          {!isEdit && (
            <div className="flex-1 p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl flex items-center gap-3">
              <PackageCheck className="text-emerald-500 shrink-0" size={20} />
              <p className="text-[10px] text-emerald-700 font-bold leading-relaxed">
                TIP: Adding detailed categories helps in better indexing and search visibility.
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
