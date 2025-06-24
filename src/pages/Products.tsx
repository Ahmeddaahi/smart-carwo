import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, Grid, List } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import { Database } from '../integrations/supabase/types';

// Types from Supabase
// Category and Product
// Category: id, nameen, nameso
// Product: id, name, nameen, nameso, category, price, image, description, descriptionen, descriptionso

type Category = Database['public']['Tables']['categories']['Row'];
type Product = Database['public']['Tables']['products']['Row'];

const Products = () => {
  const [language] = useState<'en' | 'so'>('en');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories and products from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      const [{ data: catData, error: catError }, { data: prodData, error: prodError }] = await Promise.all([
        supabase.from('categories').select('*'),
        supabase.from('products').select('*'),
      ]);
      if (catError) setError(catError.message);
      else setCategories(catData || []);
      if (prodError) setError(prodError.message);
      else setProducts(prodData || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  // Add "All" category for filtering
  const allCategory: Category = { id: 'all', nameen: 'All Products', nameso: 'Dhammaan Alaabta' };
  const displayCategories = [allCategory, ...categories];

  // Filtering and searching
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = (product.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.nameen || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.nameso || '').toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-dark-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 font-montserrat">
            {language === 'en' ? 'Our Products' : 'Alaabteena'}
          </h1>
          <p className="text-xl text-gray-300">
            {language === 'en' 
              ? 'Discover our premium collection of traditional and modern fashion'
              : 'Baaro ururinta tayada sare ee dharka dhaqameedka iyo casriga ah'}
          </p>
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder={language === 'en' ? 'Search products...' : 'Raadi alaabta...'}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carwo-gold focus:border-transparent"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              {displayCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-carwo-gold text-carwo-black'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {language === 'en' ? category.nameen : category.nameso}
                </button>
              ))}
            </div>

            {/* View Toggle */}
            <div className="flex bg-white rounded-lg border border-gray-300 p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-carwo-gold text-carwo-black' : 'text-gray-600'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-carwo-gold text-carwo-black' : 'text-gray-600'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">Loading...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-xl text-red-600">{error}</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600">
                {language === 'en' ? 'No products found.' : 'Alaab la ma helin.'}
              </p>
            </div>
          ) : (
            <div className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}>
              {filteredProducts.map((product) => (
                <Link
                  key={product.id}
                  to={`/product/${product.id}`}
                  className={`carwo-card group hover:scale-105 transition-all duration-300 ${
                    viewMode === 'list' ? 'flex gap-6' : ''
                  }`}
                >
                  <div className={`${viewMode === 'list' ? 'w-1/3' : 'aspect-[4/3]'} overflow-hidden`}>
                    <img
                      src={product.image || 'https://via.placeholder.com/300x225?text=No+Image'}
                      alt={product.nameen || product.name || ''}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="text-xl font-semibold text-carwo-black mb-2">
                      {language === 'en' ? product.nameen : product.nameso}
                    </h3>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {language === 'en' ? product.descriptionen : product.descriptionso}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-carwo-gold">
                        {product.price?.toLocaleString()} ETB
                      </span>
                      
                      <span className="text-sm bg-carwo-gold/10 text-carwo-gold px-3 py-1 rounded-full font-medium">
                        {displayCategories.find(c => c.id === product.category)?.[language === 'en' ? 'nameen' : 'nameso']}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Products;
