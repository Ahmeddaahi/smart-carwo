import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, ShoppingBag, Award, Truck } from 'lucide-react';
import { supabase } from '../integrations/supabase/client';
import type { Database } from '../integrations/supabase/types';

const Home = () => {
  const [language] = useState<'en' | 'so'>('en');
  const [customerCount, setCustomerCount] = useState(0);
  const [isCounterVisible, setIsCounterVisible] = useState(false);
  const [categories, setCategories] = useState<Database['public']['Tables']['categories']['Row'][]>([]);
  const [categoryImages, setCategoryImages] = useState<Record<string, string>>({});

  const features = [
    {
      icon: <Users className="h-8 w-8 text-carwo-gold" />,
      titleEn: "5000+ Happy Customers",
      titleSo: "5000+ Macmiil Faraxsan",
      descEn: "Trusted by thousands across Ethiopia",
      descSo: "Waxaa nagu kalsoon kumaan Itoobiya"
    },
    {
      icon: <ShoppingBag className="h-8 w-8 text-carwo-gold" />,
      titleEn: "Premium Quality",
      titleSo: "Tayada Sare",
      descEn: "Finest materials and craftsmanship",
      descSo: "Qalabka ugu fiican iyo farsamada"
    },
    {
      icon: <Award className="h-8 w-8 text-carwo-gold" />,
      titleEn: "Traditional & Modern",
      titleSo: "Dhaqameed & Casri",
      descEn: "Perfect blend of culture and style",
      descSo: "Isku dhafka dhaqanka iyo quruxda"
    },
    {
      icon: <Truck className="h-8 w-8 text-carwo-gold" />,
      titleEn: "Fast Delivery",
      titleSo: "Dhoofin Degdeg",
      descEn: "Quick and reliable shipping",
      descSo: "Dhoofin degdeg ah oo la isku halayn karo"
    }
  ];

  // Counter animation effect
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isCounterVisible) {
          setIsCounterVisible(true);
          const timer = setInterval(() => {
            setCustomerCount(prev => {
              if (prev >= 5000) {
                clearInterval(timer);
                return 5000;
              }
              return prev + 50;
            });
          }, 20);
        }
      },
      { threshold: 0.5 }
    );

    const counterElement = document.getElementById('customer-counter');
    if (counterElement) {
      observer.observe(counterElement);
    }

    return () => observer.disconnect();
  }, [isCounterVisible]);

  useEffect(() => {
    // Fetch categories and their first product image
    const fetchCategoriesAndImages = async () => {
      const { data: catData } = await supabase.from('categories').select('*');
      setCategories(catData || []);
      if (catData && catData.length > 0) {
        // For each category, fetch the first product image
        const images: Record<string, string> = {};
        for (const cat of catData) {
          const { data: prodData } = await supabase
            .from('products')
            .select('image')
            .eq('category', cat.id)
            .not('image', 'is', null)
            .limit(1)
            .single();
          images[cat.id] = prodData?.image || 'https://via.placeholder.com/400x300?text=No+Image';
        }
        setCategoryImages(images);
      }
    };
    fetchCategoriesAndImages();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center bg-dark-gradient overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url(/lovable-uploads/66e8a64f-d720-44ec-82a2-aee7ae5b8efe.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold font-montserrat mb-6 animate-fade-in">
            <span className="text-gradient">Asc Kusoo Dhawoow Carwo Smart</span>
            <br />
            <span className="text-white"></span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-gray-200 animate-slide-in">
            {language === 'en' 
              ? "Ku soo dhawoow Carwo Smart, halka aad ka heli karto khamiisyo, shaadhadh, surwaalo, cadaro, sacado, jaakado, suits, garamaan iyo macawisyo tayo sare leh"
              : "Gurigaaga Khamarada Quruxda badan & Dharka Dhaqameedka"}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-scale-in">
            <Link 
              to="/products"
              className="carwo-btn text-lg flex items-center justify-center space-x-2 animate-float"
            >
              <span>{language === 'en' ? 'Shop Now' : 'Daawo Alaabta'}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <Link 
              to="/about"
              className="px-6 py-3 border-2 border-carwo-gold text-carwo-gold hover:bg-carwo-gold hover:text-carwo-black font-semibold rounded-lg transition-all duration-300"
            >
              {language === 'en' ? 'Learn More' : 'Wax Badan Ogow'}
            </Link>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-carwo-gold rounded-full flex justify-center">
            <div className="w-1 h-3 bg-carwo-gold rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Customer Counter Section */}
      <section className="py-16 bg-carwo-black text-white">
        <div className="container mx-auto px-4 text-center">
          <div id="customer-counter" className="animate-fade-in">
            <h2 className="text-5xl md:text-7xl font-bold text-gradient mb-4 font-montserrat">
              {customerCount.toLocaleString()}+
            </h2>
            <p className="text-2xl md:text-3xl">
              {language === 'en' ? 'Happy Customers' : 'Macmiil Faraxsan'}
            </p>
            <p className="text-gray-400 mt-2">
              {language === 'en' 
                ? 'Join thousands who trust Carwo Smart for their fashion needs'
                : 'Ku biir kumaanyaalka ku kalsoon Carwo Smart baahidooda dhar-ga'}
            </p>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-carwo-black mb-4 font-montserrat">
              {language === 'en' ? 'Featured Categories' : 'Noocyada Caanka ah'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'en' 
                ? "Discover our premium collection of traditional and modern fashion"
                : "Baaro ururinta tayada sare ee dharka dhaqameedka iyo casriga ah"}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="carwo-card group overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <div className="aspect-[4/3] overflow-hidden bg-white flex items-center justify-center">
                  <img 
                    src={categoryImages[category.id] || 'https://via.placeholder.com/400x300?text=No+Image'}
                    alt={language === 'en' ? category.nameen : category.nameso}
                    className="w-full h-full object-contain object-center group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-carwo-black mb-2">
                    {language === 'en' ? category.nameen : category.nameso}
                  </h3>
                  <div className="flex items-center text-carwo-gold group-hover:translate-x-2 transition-transform duration-300">
                    <span className="font-medium">
                      {language === 'en' ? 'Shop Now' : 'Daawo Alaabta'}
                    </span>
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-carwo-black mb-4 font-montserrat">
              {language === 'en' ? 'Why Choose Carwo Smart?' : 'Maxay Carwo Smart Kaa Duwanaysaa?'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'en' 
                ? "Experience the perfect blend of traditional elegance and modern style"
                : "La kulmo isku dhafka quruxda dhaqameedka iyo qaabka casriga ah"}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 carwo-card hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-carwo-black mb-2">
                  {language === 'en' ? feature.titleEn : feature.titleSo}
                </h3>
                <p className="text-gray-600">
                  {language === 'en' ? feature.descEn : feature.descSo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-dark-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-montserrat">
            {language === 'en' ? 'Ready to Elevate Your Style?' : 'Diyaar u tahay in aad kor u qaaddid qaabakaaga?'}
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            {language === 'en' 
              ? "Browse our exclusive collection and find the perfect outfit for every occasion"
              : "Baaro ururinta gaar ah ee nala leh oo hel dharka ku habboon xaflad kasta"}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/products"
              className="carwo-btn text-lg flex items-center justify-center space-x-2"
            >
              <span>{language === 'en' ? 'Explore Products' : 'Baaro Alaabta'}</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
            
            <a 
              href="https://wa.me/251995817222"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border-2 border-carwo-gold text-carwo-gold hover:bg-carwo-gold hover:text-carwo-black font-semibold rounded-lg transition-all duration-300"
            >
              {language === 'en' ? 'Contact Us' : 'Nala Soo Xiriir'}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
