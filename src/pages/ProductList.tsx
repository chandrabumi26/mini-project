import React, { useEffect } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Loader2, AlertCircle, Star } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getProducts, setSearchQuery, deleteProduct } from '../features/products/productsSlice';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading, error, searchQuery, preventCallApi } = useAppSelector((state) => state.products);
  const [showFixedModal, setShowFixedModal] = React.useState(false);

  useEffect(() => {
    if (preventCallApi) return;
    const delayDebounceFn = setTimeout(() => {
      dispatch(getProducts({ search: searchQuery }));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, searchQuery, preventCallApi]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const handleDelete = async (id: number | string, title: string) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="space-y-8 pb-12">
      <AnimatePresence>
        {showFixedModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowFixedModal(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-card border rounded-4xl p-8 shadow-2xl text-center space-y-6 overflow-hidden"
            >
              <div className="absolute top-0 right-0 h-32 w-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
              <div className="h-20 w-20 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="text-primary" size={40} />
              </div>
              <h3 className="text-2xl font-black tracking-tight">Local Snapshot Only</h3>
              <p className="text-muted-foreground leading-relaxed font-medium">
                Product ini merupakan product yang di save di state. Karena ini memakai api dummyjson jadi CRUD product tidak realtime. Jadinya data tersimpan di state. Namun, hit API tetap berjalan dan dapat di cek di network.
              </p>
              <button 
                onClick={() => setShowFixedModal(false)}
                className="w-full py-4 bg-primary text-primary-foreground font-black rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all"
              >
                Close
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight">Products</h1>
          <p className="text-muted-foreground mt-2 text-lg">Discover and manage your premium inventory.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full md:w-80 pl-12 pr-4 py-3 bg-card border-2 border-transparent focus:border-primary/20 rounded-2xl outline-none shadow-sm focus:shadow-md transition-all placeholder:text-muted-foreground/60"
            />
            {loading && (
              <div className="absolute right-4 top-1/2 -translate-y-1/2">
                <Loader2 className="animate-spin text-primary" size={18} />
              </div>
            )}
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate('/products/add')}
            className="flex items-center justify-center gap-2 px-6 py-3.5 bg-primary text-primary-foreground font-bold rounded-2xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
          >
            <Plus size={20} /> <span className="hidden sm:inline">Add Product</span>
          </motion.button>
        </div>
      </div>

      {error ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-12 text-center bg-destructive/5 border-2 border-dashed border-destructive/20 rounded-3xl space-y-4"
        >
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive mx-auto">
            <AlertCircle size={32} />
          </div>
          <h3 className="text-xl font-bold">Failed to load products</h3>
          <p className="text-muted-foreground max-w-md mx-auto">{error}</p>
          <button 
            onClick={() => dispatch(getProducts({ search: searchQuery }))}
            className="px-8 py-3 bg-destructive text-white font-bold rounded-2xl hover:bg-destructive/90 transition-all"
          >
            Try Again
          </button>
        </motion.div>
      ) : (
        <>
          {items.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-20 text-center bg-secondary/20 border-2 border-dashed border-border rounded-3xl"
            >
              <p className="text-xl font-bold text-muted-foreground">No products found</p>
              <p className="text-muted-foreground mt-2">Try adjusting your search or add a new product.</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {items.map((product, i) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                    transition={{ delay: i * 0.05, duration: 0.4 }}
                    className="group relative bg-card border rounded-4xl overflow-hidden hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 transition-all duration-500"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-secondary/30">
                      <img 
                        src={product.thumbnail} 
                        alt={product.title} 
                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="absolute bottom-4 left-0 right-0 px-6 flex justify-center gap-3 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                        <button 
                          onClick={() => {
                            if (product.preventEdit) {
                              setShowFixedModal(true);
                              return;
                            }
                            navigate(`/products/${product.id}`)
                          }}
                          className="p-3 bg-white text-black rounded-xl shadow-xl hover:bg-primary hover:text-white transition-all transform hover:scale-110"
                        >
                          <Eye size={20} />
                        </button>
                        <button 
                          onClick={() => {
                            if (product.preventEdit) {
                              setShowFixedModal(true);
                              return;
                            }
                            navigate(`/products/edit/${product.id}`)
                          }}
                          className="p-3 bg-white text-black rounded-xl shadow-xl hover:bg-orange-500 hover:text-white transition-all transform hover:scale-110"
                        >
                          <Edit size={20} />
                        </button>
                        <button 
                          onClick={() => {
                            if (product.preventEdit) {
                              setShowFixedModal(true);
                              return;
                            }
                            handleDelete(product.id, product.title)
                          }}
                          className="p-3 bg-white text-black rounded-xl shadow-xl hover:bg-red-500 hover:text-white transition-all transform hover:scale-110"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>

                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1.5 text-[10px] font-black uppercase rounded-xl backdrop-blur-md ${
                          product.stock > 10 
                            ? 'bg-emerald-500/80 text-white' 
                            : product.stock > 0 
                              ? 'bg-orange-500/80 text-white' 
                              : 'bg-red-500/80 text-white'
                        }`}>
                          {product.availabilityStatus}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[10px] font-bold text-primary uppercase tracking-widest">{product.category}</p>
                          <div className="flex items-center gap-1 text-orange-500 bg-orange-50 px-2 py-0.5 rounded-lg">
                            <Star size={10} fill="currentColor" />
                            <span className="text-[10px] font-black">{product.rating}</span>
                          </div>
                        </div>
                        <h3 className="font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">{product.title}</h3>
                        <p className="text-xs text-muted-foreground">{product.brand}</p>
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <div className="flex flex-col">
                          <p className="text-2xl font-black text-foreground">${product.price.toFixed(2)}</p>
                          {product.discountPercentage > 0 && (
                            <p className="text-[10px] text-emerald-500 font-bold">-{product.discountPercentage}% OFF</p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-tighter">Stock Available</p>
                          <p className="text-sm font-black">{product.stock}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductList;
