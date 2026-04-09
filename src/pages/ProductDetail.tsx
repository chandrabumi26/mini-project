import React from 'react';
import { ArrowLeft, Star, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductDetail: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft size={18} /> Back to Products
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-card border rounded-3xl p-8 shadow-sm">
        <div className="aspect-square bg-secondary/50 rounded-2xl overflow-hidden flex items-center justify-center">
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Product Image Placeholder
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wider">
              Smartphones
            </span>
            <h1 className="text-4xl font-bold mt-4">iPhone 15 Pro Max</h1>
            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center text-orange-400">
                <Star size={18} fill="currentColor" />
                <span className="ml-1 font-bold text-foreground">4.8</span>
                <span className="ml-1 text-muted-foreground">(124 Reviews)</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="text-emerald-600 font-semibold">In Stock (45 available)</div>
            </div>
          </div>

          <div className="text-3xl font-bold text-primary">$1,199.00</div>

          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-bold">Description</h3>
            <p className="text-muted-foreground leading-relaxed">
              The iPhone 15 Pro Max features a durable and lightweight aerospace-grade titanium design. 
              The most advanced triple-camera system on iPhone. An incredible Super Retina XDR display with ProMotion.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <div className="p-4 bg-secondary/30 rounded-xl flex items-center gap-3">
              <ShieldCheck className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Warranty</p>
                <p className="text-sm font-semibold">1 Year Apple</p>
              </div>
            </div>
            <div className="p-4 bg-secondary/30 rounded-xl flex items-center gap-3">
              <Truck className="text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Shipping</p>
                <p className="text-sm font-semibold">Free Delivery</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 pt-6">
            <button className="flex-1 py-4 bg-primary text-primary-foreground font-bold rounded-2xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
              <ShoppingCart size={20} /> Add to Cart
            </button>
            <button className="px-6 py-4 bg-secondary text-foreground font-bold rounded-2xl hover:bg-secondary/80 transition-all">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
