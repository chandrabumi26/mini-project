import React, { useEffect } from 'react';
import { Search, Plus, Eye, Edit, Trash2, Loader2, AlertCircle } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getProducts, setSearchQuery } from '../features/products/productsSlice';
import { useNavigate } from 'react-router-dom';

const ProductList: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, loading, error, searchQuery } = useAppSelector((state) => state.products);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      dispatch(getProducts({ search: searchQuery }));
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [dispatch, searchQuery]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground mt-1">Manage your inventory and product listings.</p>
        </div>
        <button 
          onClick={() => navigate('/products/add')}
          className="flex items-center justify-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all"
        >
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
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-secondary/50 border-none rounded-lg outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>
          {loading && <Loader2 className="animate-spin text-primary" size={20} />}
        </div>

        {error ? (
          <div className="p-8 text-center space-y-4">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-destructive/10 text-destructive mx-auto">
              <AlertCircle size={24} />
            </div>
            <p className="text-muted-foreground">{error}</p>
            <button 
              onClick={() => dispatch(getProducts({ search: searchQuery }))}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg"
            >
              Try Again
            </button>
          </div>
        ) : (
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
                {items.length === 0 && !loading ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  items.map((product) => (
                    <tr key={product.id} className="hover:bg-secondary/10 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-secondary rounded-lg overflow-hidden flex items-center justify-center border">
                            <img src={product.thumbnail} alt={product.title} className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm line-clamp-1">{product.title}</p>
                            <p className="text-xs text-muted-foreground">{product.brand}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm capitalize">{product.category}</td>
                      <td className="px-6 py-4 text-sm font-medium">${product.price.toFixed(2)}</td>
                      <td className="px-6 py-4 text-sm">{product.stock}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 text-[10px] font-bold uppercase rounded-full ${
                          product.stock > 10 
                            ? 'bg-emerald-100 text-emerald-700' 
                            : product.stock > 0 
                              ? 'bg-orange-100 text-orange-700' 
                              : 'bg-red-100 text-red-700'
                        }`}>
                          {product.availabilityStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button 
                            onClick={() => navigate(`/products/${product.id}`)}
                            className="p-2 hover:bg-primary/10 text-primary rounded-lg" 
                            title="View"
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => navigate(`/products/edit/${product.id}`)}
                            className="p-2 hover:bg-orange-100 text-orange-600 rounded-lg" 
                            title="Edit"
                          >
                            <Edit size={18} />
                          </button>
                          <button className="p-2 hover:bg-red-100 text-red-600 rounded-lg" title="Delete">
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {!error && items.length > 0 && (
          <div className="p-4 border-t flex items-center justify-between text-sm text-muted-foreground">
            <p>Showing {items.length} products</p>
            <div className="flex gap-2">
              <button disabled className="px-3 py-1 bg-secondary rounded hover:bg-secondary/80 disabled:opacity-50">Prev</button>
              <button className="px-3 py-1 bg-primary text-primary-foreground rounded">1</button>
              <button disabled className="px-3 py-1 bg-secondary rounded hover:bg-secondary/80 disabled:opacity-50">Next</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
