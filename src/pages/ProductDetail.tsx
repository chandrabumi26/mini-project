import React, { useEffect, useState } from 'react';
import { ArrowLeft, Star, ShieldCheck, Loader2, AlertCircle, BadgeCheck } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getProductById, clearSelectedProduct } from '../features/products/productsSlice';
import { motion, AnimatePresence } from 'framer-motion';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedProduct: product, loading, error } = useAppSelector((state) => state.products);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id));
    }
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (product) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setActiveImage(product.thumbnail);
    }
  }, [product]);

  if (loading && !product) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="animate-spin text-primary" size={48} />
        <p className="text-muted-foreground font-medium animate-pulse">Loading product details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-[70vh] flex flex-col items-center justify-center space-y-4">
        <div className="h-16 w-16 bg-destructive/10 text-destructive rounded-2xl flex items-center justify-center">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-2xl font-bold">Error</h2>
        <p className="text-muted-foreground">{error}</p>
        <button 
          onClick={() => id && dispatch(getProductById(id))}
          className="px-6 py-2 bg-primary text-white font-bold rounded-xl"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="space-y-8 pb-12">
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/products')}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground hover:gap-3 transition-all font-medium"
      >
        <ArrowLeft size={18} /> Back to Products
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-card border rounded-4xl p-8 lg:p-12 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 h-64 w-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 h-64 w-64 bg-secondary/20 rounded-full blur-3xl -ml-32 -mb-32" />

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 z-10"
        >
          <div className="aspect-square bg-secondary/30 rounded-4xl overflow-hidden flex items-center justify-center border-2 border-transparent hover:border-primary/10 transition-colors group">
            <AnimatePresence mode="wait">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                src={activeImage || ''} 
                alt={product.title} 
                className="h-full w-full object-contain p-8 group-hover:scale-105 transition-transform duration-700"
              />
            </AnimatePresence>
          </div>
          
          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`aspect-square rounded-2xl overflow-hidden border-2 transition-all ${
                  activeImage === img ? 'border-primary ring-4 ring-primary/10 scale-95' : 'border-transparent hover:border-secondary-foreground/20'
                }`}
              >
                <img src={img} alt={`${product.title} view ${idx}`} className="h-full w-full object-cover" />
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-8 z-10"
        >
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-4 py-1.5 bg-primary/10 text-primary text-[10px] font-black uppercase rounded-full tracking-widest">
                {product.category}
              </span>
            </div>
            
            <h1 className="text-5xl font-black tracking-tight leading-tight">{product.title}</h1>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center text-orange-400 bg-orange-50 px-3 py-1.5 rounded-xl font-bold">
                <Star size={18} fill="currentColor" className="mr-2" />
                <span className="text-foreground">{product.rating}</span>
                <span className="ml-2 text-muted-foreground/60 text-xs font-medium">({product.reviews.length} Reviews)</span>
              </div>
              <div className="h-6 w-px bg-border" />
              <div className={`flex items-center font-bold ${product.stock > 0 ? 'text-emerald-600' : 'text-red-500'}`}>
                {product.stock > 0 ? <BadgeCheck size={18} className="mr-2" /> : <AlertCircle size={18} className="mr-2" />}
                {product.availabilityStatus} ({product.stock} in stock)
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <div className="text-5xl font-black text-primary flex items-baseline gap-2">
              ${product.price.toFixed(2)}
              {product.discountPercentage > 0 && (
                <span className="text-lg text-emerald-500 font-bold bg-emerald-50 px-3 py-1 rounded-xl">
                  -{product.discountPercentage}%
                </span>
              )}
            </div>
          </div>

          <div className="space-y-4 p-6 bg-secondary/20 rounded-3xl border border-secondary/50">
            <h3 className="font-extrabold text-lg flex items-center gap-2">
              Description
            </h3>
            <p className="text-muted-foreground leading-relaxed text-base">
              {product.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 bg-card border rounded-3xl flex items-center gap-4 hover:shadow-lg transition-shadow">
              <div className="h-12 w-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <ShieldCheck size={24} />
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">Warranty</p>
                <p className="text-sm font-bold">{product.warrantyInformation}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-3xl font-black">Customer Reviews</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {product.reviews.map((review, i) => (
            <div key={i} className="p-6 bg-card border rounded-4xl space-y-4 hover:border-primary/20 transition-all shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-orange-400">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={14} fill={idx < review.rating ? "currentColor" : "none"} stroke="currentColor" />
                  ))}
                </div>
                <span className="text-[10px] text-muted-foreground font-bold">{new Date(review.date).toLocaleDateString()}</span>
              </div>
              <p className="text-sm leading-relaxed italic">"{review.comment}"</p>
              <div className="pt-2 border-t flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center font-black text-xs">
                  {review.reviewerName.charAt(0)}
                </div>
                <div>
                  <p className="text-xs font-black">{review.reviewerName}</p>
                  <p className="text-[10px] text-muted-foreground">{review.reviewerEmail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default ProductDetail;
