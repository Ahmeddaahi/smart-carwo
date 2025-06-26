import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, ShoppingCart } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import type { Database } from '../integrations/supabase/types';

const ProductDetail = () => {
  const { productId } = useParams();
  const [language] = useState<'en' | 'so'>('en');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState<Database['public']['Tables']['products']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      if (!productId) {
        setError('No product ID provided.');
        setLoading(false);
        return;
      }
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', productId)
        .single();
      if (error || !data) {
        setError('Product not found.');
        setProduct(null);
      } else {
        setProduct(data);
        setSelectedImage(data.image || null);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [productId]);

  const handleWhatsAppOrder = () => {
    if (!product) return;
    const message = `Hello! I'm interested in ordering:\n\nProduct: ${product.nameen}\nSize: ${selectedSize}\nQuantity: ${quantity}\nTotal: ${(product.price * quantity).toLocaleString()} ETB\n\nPlease confirm availability and delivery details.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/251995817222?text=${encodedMessage}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-gray-600">Loading...</div>
    );
  }
  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-xl text-red-600">{error || 'Product not found.'}</div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <Link 
            to="/products"
            className="flex items-center text-carwo-gold hover:text-carwo-black transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {language === 'en' ? 'Back to Products' : 'Ku Noqo Alaabta'}
          </Link>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={selectedImage || 'https://via.placeholder.com/400x400?text=No+Image'}
                alt={product.nameen}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* No thumbnails since only one image per product in DB, but keep logic for future */}
            {/*
            <div className="grid grid-cols-3 gap-4">
              {[product.image].filter(Boolean).map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image!)}
                  className={`aspect-square overflow-hidden rounded-lg ${
                    selectedImage === image ? 'ring-4 ring-carwo-gold' : 'hover:opacity-75'
                  } transition-all duration-300`}
                >
                  <img
                    src={image!}
                    alt={`${product.nameen} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
            */}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-4xl font-bold text-carwo-black font-montserrat">
                {language === 'en' ? product.nameen : product.nameso}
              </h1>
              <Link
                to="/admin/login"
                className="carwo-btn text-base ml-4 px-4 py-2"
                style={{ whiteSpace: 'nowrap' }}
              >
                {language === 'en' ? 'Edit' : 'Tafatir'}
              </Link>
            </div>
            <p className="text-3xl font-bold text-carwo-gold mb-6">
              {product.price.toLocaleString()} ETB
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              {language === 'en' ? product.descriptionen : product.descriptionso}
            </p>

            {/* Size Selection (optional, static for now) */}
            {/*
            <div>
              <h3 className="text-lg font-semibold text-carwo-black mb-4">
                {language === 'en' ? 'Size' : 'Cabbirka'}
              </h3>
              <div className="flex flex-wrap gap-3">
                {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-lg font-semibold transition-all duration-300 ${
                      selectedSize === size
                        ? 'bg-carwo-gold text-carwo-black scale-110'
                        : 'bg-white border-2 border-gray-300 text-gray-700 hover:border-carwo-gold'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            */}

            {/* Quantity */}
            <div>
              <h3 className="text-lg font-semibold text-carwo-black mb-4">
                {language === 'en' ? 'Quantity' : 'Tirada'}
              </h3>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-semibold"
                >
                  -
                </button>
                <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-lg bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-semibold"
                >
                  +
                </button>
              </div>
            </div>

            {/* Total Price */}
            <div className="bg-gray-50 p-6 rounded-xl">
              <div className="flex justify-between items-center text-xl">
                <span className="font-semibold text-carwo-black">
                  {language === 'en' ? 'Total:' : 'Wadarta:'}
                </span>
                <span className="font-bold text-carwo-gold text-2xl">
                  {(product.price * quantity).toLocaleString()} ETB
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleWhatsAppOrder}
                className="w-full carwo-btn text-lg flex items-center justify-center space-x-3 py-4"
              >
                <ShoppingCart className="h-6 w-6" />
                <span>{language === 'en' ? 'Order via WhatsApp' : 'Ku Dalbo WhatsApp'}</span>
              </button>
              
              <div className="flex gap-4">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`flex-1 px-6 py-3 border-2 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${
                    isFavorite
                      ? 'border-red-500 text-red-500 bg-red-50'
                      : 'border-gray-300 text-gray-700 hover:border-carwo-gold hover:text-carwo-gold'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current' : ''}`} />
                  <span>{language === 'en' ? 'Favorite' : 'Jecel'}</span>
                </button>
                
                <button className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 hover:border-carwo-gold hover:text-carwo-gold rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2">
                  <Share2 className="h-5 w-5" />
                  <span>{language === 'en' ? 'Share' : 'La wadaag'}</span>
                </button>
              </div>
            </div>

            {/* Material Info */}
            <div className="bg-carwo-light-gold/20 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-carwo-black mb-2">
                {language === 'en' ? 'Material & Care' : 'Qalabka & Daryeelka'}
              </h3>
              <p className="text-gray-700 mb-3">
                <strong>{language === 'en' ? 'Material:' : 'Qalabka:'}</strong> {product.material || '-'}
              </p>
              {/* No care instructions in DB, so static text */}
              <p className="text-gray-700">
                {language === 'en' 
                  ? 'Care Instructions: Machine wash cold, hang dry, iron on low heat if needed.'
                  : 'Tilmaamaha Daryeelka: Masiigiinka ku maydh qabow, ku laali qalajiska, ama haddii loo baahdo kulul yar ku dub.'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
