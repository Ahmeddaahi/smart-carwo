import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Heart, Share2, ShoppingCart } from 'lucide-react';

const ProductDetail = () => {
  const { productId } = useParams();
  const [language] = useState<'en' | 'so'>('en');
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);

  // Mock product data - in real app, this would come from API/database
  const products = [
    {
      id: 1,
      name: 'Premium Khamiis',
      nameEn: 'Premium Khamiis',
      nameSo: 'Khamiis Tayada Sare',
      category: 'khamiis',
      price: 2500,
      images: [
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1583743814966-8936f37cd2b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
      ],
      descriptionEn: 'Elegant traditional Khamiis with intricate embroidery and premium cotton fabric. Perfect for special occasions and daily wear. This piece represents the finest craftsmanship with attention to detail that makes it a standout choice for those who appreciate authentic traditional fashion.',
      descriptionSo: 'Khamiis dhaqameed oo qurux badan oo leh dhar-tolinta ee faahfaahin ah iyo dhar-cadka tayada sare. Ku haboon munaasabado gaar ah iyo xubnaha maalinlaha ah. Qaybtani waxay matelaysaa farsamada ugu fiican ee leh fiiro gaar ah oo ka dhigaysa doorasho gaar ah kuwa qaddarinaya moodada dhaqameedka dhabta ah.',
      material: 'Premium Cotton',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['White', 'Cream', 'Light Blue'],
      features: [
        { en: 'Hand-embroidered details', so: 'Faahfaahin gacan lagu tollay' },
        { en: 'Premium cotton fabric', so: 'Dhar-cadka tayada sare' },
        { en: 'Traditional cut and design', so: 'Gooyga dhaqameedka iyo naqshadeynta' },
        { en: 'Comfortable fit', so: 'Ku-habboon raaxo leh' },
        { en: 'Machine washable', so: 'Lagu maydhi karo mashiinka' }
      ]
    }
  ];

  const product = products.find(p => p.id === parseInt(productId || '1')) || products[0];
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  const handleWhatsAppOrder = () => {
    const message = `Hello! I'm interested in ordering:\n\nProduct: ${product.nameEn}\nSize: ${selectedSize}\nQuantity: ${quantity}\nTotal: ${(product.price * quantity).toLocaleString()} ETB\n\nPlease confirm availability and delivery details.`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/251995817222?text=${encodedMessage}`, '_blank');
  };

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
                src={selectedImage}
                alt={product.nameEn}
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-3 gap-4">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={`aspect-square overflow-hidden rounded-lg ${
                    selectedImage === image ? 'ring-4 ring-carwo-gold' : 'hover:opacity-75'
                  } transition-all duration-300`}
                >
                  <img
                    src={image}
                    alt={`${product.nameEn} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-4xl font-bold text-carwo-black font-montserrat">
                {language === 'en' ? product.nameEn : product.nameSo}
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
              {language === 'en' ? product.descriptionEn : product.descriptionSo}
            </p>

            {/* Size Selection */}
            <div>
              <h3 className="text-lg font-semibold text-carwo-black mb-4">
                {language === 'en' ? 'Size' : 'Cabbirka'}
              </h3>
              <div className="flex flex-wrap gap-3">
                {product.sizes.map((size) => (
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

            {/* Product Features */}
            <div>
              <h3 className="text-lg font-semibold text-carwo-black mb-4">
                {language === 'en' ? 'Features' : 'Astaamaha'}
              </h3>
              <ul className="space-y-3">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-carwo-gold rounded-full mt-2"></div>
                    <span className="text-gray-700">
                      {language === 'en' ? feature.en : feature.so}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Material Info */}
            <div className="bg-carwo-light-gold/20 p-6 rounded-xl">
              <h3 className="text-lg font-semibold text-carwo-black mb-2">
                {language === 'en' ? 'Material & Care' : 'Qalabka & Daryeelka'}
              </h3>
              <p className="text-gray-700 mb-3">
                <strong>{language === 'en' ? 'Material:' : 'Qalabka:'}</strong> {product.material}
              </p>
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
