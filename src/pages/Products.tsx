import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, Grid, List } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  nameEn: string;
  nameSo: string;
  category: string;
  price: number;
  image: string;
  description: string;
  descriptionEn: string;
  descriptionSo: string;
}

const Products = () => {
  const [language] = useState<'en' | 'so'>('en');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { productId } = useParams();

  const categories = [
    { id: 'all', nameEn: 'All Products', nameSo: 'Dhammaan Alaabta' },
    { id: 'khamiis', nameEn: 'Khamiis', nameSo: 'Khamiis' },
    { id: 'shaadh', nameEn: 'Shaadh', nameSo: 'Shaadh' },
    { id: 'surwaalo', nameEn: 'Surwaalo', nameSo: 'Surwaalo' },
    { id: 'cadaro', nameEn: 'Cadaro', nameSo: 'Cadaro' },
    { id: 'sacado', nameEn: 'Sacado', nameSo: 'Sacado' },
    { id: 'suits', nameEn: 'Suits', nameSo: 'Suudhyo' },
    { id: 'jacket', nameEn: 'Single Coat', nameSo: 'Jaakad Keli ah' },
    { id: 'jackets', nameEn: 'Jackets', nameSo: 'Jaakado' },
    { id: 'garaman', nameEn: 'Garaman', nameSo: 'Garaman' },
    { id: 'macawiso', nameEn: 'Macawiso', nameSo: 'Macawiso' },
    { id: 'sandals', nameEn: 'Sandals', nameSo: 'Kabooyin' }
  ];

  const products: Product[] = [
    {
      id: 1,
      name: 'Premium Khamiis',
      nameEn: 'Premium Khamiis',
      nameSo: 'Khamiis Tayada Sare',
      category: 'khamiis',
      price: 2500,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Elegant traditional Khamiis with intricate embroidery',
      descriptionEn: 'Elegant traditional Khamiis with intricate embroidery and premium cotton fabric. Perfect for special occasions and daily wear.',
      descriptionSo: 'Khamiis dhaqameed oo qurux badan oo leh dhar-tolinta ee faahfaahin ah iyo dhar-cadka tayada sare. Ku haboon munaasabado gaar ah iyo xubnaha maalinlaha ah.'
    },
    {
      id: 2,
      name: 'Classic Suit',
      nameEn: 'Classic Suit',
      nameSo: 'Suudh Caadi ah',
      category: 'suits',
      price: 4500,
      image: 'https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Professional business suit for modern gentlemen',
      descriptionEn: 'Professional business suit tailored for the modern gentleman. Made with high-quality wool blend for comfort and durability.',
      descriptionSo: 'Suudh ganacsiga xirfadeed loo sameeyay ninka casriga ah. Waxaa laga sameeyay dhogor-isku-dhafka tayada sare ee raaxada iyo adkaysiga.'
    },
    {
      id: 3,
      name: 'Traditional Macawis',
      nameEn: 'Traditional Macawis',
      nameSo: 'Macawis Dhaqameed',
      category: 'macawiso',
      price: 800,
      image: 'https://images.unsplash.com/photo-1506629905707-50d7279eb7e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Comfortable traditional Macawis in various colors',
      descriptionEn: 'Comfortable traditional Macawis made from breathable cotton. Available in various colors and patterns to suit your style.',
      descriptionSo: 'Macawis dhaqameed oo raaxo badan oo laga sameeyay dhar-cadka neefta sii daaya. Waxaa la helaa midabyo kala duwan iyo qaabab ku habboon qaabkaaga.'
    },
    {
      id: 4,
      name: 'Leather Sandals',
      nameEn: 'Leather Sandals',
      nameSo: 'Kabooyin Hargaha',
      category: 'sandals',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Handcrafted leather sandals for comfort and style',
      descriptionEn: 'Handcrafted genuine leather sandals designed for maximum comfort and timeless style. Perfect for both casual and formal wear.',
      descriptionSo: 'Kabooyin haraga dhabta ah oo gacan lagu sameeyay oo loogu talagalay raaxada ugu badan iyo qaabka aan weligii dhamin. Ku haboon labada xubnaha caadiga ah iyo kuwa rasmi ah.'
    },
    {
      id: 5,
      name: 'Elegant Cadaro',
      nameEn: 'Elegant Cadaro',
      nameSo: 'Cadaro Qurux badan',
      category: 'cadaro',
      price: 1800,
      image: 'https://images.unsplash.com/photo-1544967882-6abaa5b2b007?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Beautiful traditional head covering with intricate patterns',
      descriptionEn: 'Beautiful traditional head covering with intricate embroidered patterns. Made from fine silk material for a luxurious feel.',
      descriptionSo: 'Madax-dabool dhaqameed oo qurux badan oo leh qaabab faahfaahin ah oo dhar-tolinta ah. Waxaa laga sameeyay haraga hareeraha fiican si loo helo dareemo raaxo ah.'
    },
    {
      id: 6,
      name: 'Modern Jacket',
      nameEn: 'Modern Jacket',
      nameSo: 'Jaakad Casri ah',
      category: 'jackets',
      price: 3200,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      description: 'Stylish jacket perfect for any weather',
      descriptionEn: 'Stylish modern jacket with weather-resistant fabric. Features multiple pockets and a comfortable fit for daily wear.',
      descriptionSo: 'Jaakad casri ah oo qurux leh oo leh dhar ka-hor-imaanaya cimilada. Waxay leedahay jeebab badan iyo ku-habboon raaxo ah oo loogu talagalay maalmaha caadiga ah.'
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.nameEn.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.nameSo.toLowerCase().includes(searchTerm.toLowerCase());
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
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'bg-carwo-gold text-carwo-black'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {language === 'en' ? category.nameEn : category.nameSo}
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
          {filteredProducts.length === 0 ? (
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
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <h3 className="text-xl font-semibold text-carwo-black mb-2">
                      {language === 'en' ? product.nameEn : product.nameSo}
                    </h3>
                    
                    <p className="text-gray-600 mb-3 line-clamp-2">
                      {language === 'en' ? product.descriptionEn : product.descriptionSo}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-carwo-gold">
                        {product.price.toLocaleString()} ETB
                      </span>
                      
                      <span className="text-sm bg-carwo-gold/10 text-carwo-gold px-3 py-1 rounded-full font-medium">
                        {categories.find(c => c.id === product.category)?.[language === 'en' ? 'nameEn' : 'nameSo']}
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
