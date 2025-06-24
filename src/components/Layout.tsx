import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Globe, Menu, X } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<'en' | 'so'>('en');
  const location = useLocation();

  const navigation = [
    { name: 'Home', nameEn: 'Home', nameSo: 'Guriga', href: '/' },
    { name: 'About Us', nameEn: 'About Us', nameSo: 'Waa Maxay', href: '/about' },
    { name: 'Products', nameEn: 'Products', nameSo: 'Alaabta', href: '/products' },
    { name: 'Contact Us', nameEn: 'Contact Us', nameSo: 'Nala Soo Xiriir', href: '/contact' },
  ];

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'so' : 'en');
  };

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-carwo-black text-white sticky top-0 z-50 shadow-lg">
        <nav className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <img 
                src="/lovable-uploads/270e9b62-27a2-430e-b6fa-1df701be3627.png" 
                alt="Carwo Smart Logo" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`text-white hover:text-carwo-gold transition-colors duration-300 font-medium ${
                    location.pathname === item.href ? 'text-carwo-gold' : ''
                  }`}
                >
                  {language === 'en' ? item.nameEn : item.nameSo}
                </Link>
              ))}
              
              {/* Language Toggle */}
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-carwo-gold text-carwo-gold hover:bg-carwo-gold hover:text-carwo-black transition-all duration-300"
              >
                <Globe className="h-4 w-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <button
                onClick={toggleLanguage}
                className="flex items-center space-x-1 px-2 py-1 rounded text-carwo-gold"
              >
                <Globe className="h-4 w-4" />
                <span className="text-xs">{language.toUpperCase()}</span>
              </button>
              
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-carwo-gold transition-colors"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-gray-700">
              <div className="flex flex-col space-y-4 mt-4">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setIsMenuOpen(false)}
                    className={`text-white hover:text-carwo-gold transition-colors duration-300 font-medium ${
                      location.pathname === item.href ? 'text-carwo-gold' : ''
                    }`}
                  >
                    {language === 'en' ? item.nameEn : item.nameSo}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* WhatsApp Float Button */}
      <a
        href="https://wa.me/251995817222"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-lg hover:bg-green-600 hover:scale-110 transition-all duration-300 z-50"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.569-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
        </svg>
      </a>

      {/* Footer */}
      <footer className="bg-carwo-black text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <img 
                src="/lovable-uploads/270e9b62-27a2-430e-b6fa-1df701be3627.png" 
                alt="Carwo Smart Logo" 
                className="h-12 w-auto mb-4"
              />
              <p className="text-gray-400">
                {language === 'en' 
                  ? "Your home for elegant traditional and modern fashion."
                  : "Gurigaaga dhar-dhaqameedka iyo casriga ah."}
              </p>
            </div>
            
            <div>
              <h3 className="text-carwo-gold font-semibold mb-4">
                {language === 'en' ? 'Quick Links' : 'Xidhiidhyo Degdeg ah'}
              </h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link 
                      to={item.href}
                      className="text-gray-400 hover:text-carwo-gold transition-colors"
                    >
                      {language === 'en' ? item.nameEn : item.nameSo}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-carwo-gold font-semibold mb-4">
                {language === 'en' ? 'Contact Info' : 'Macluumaadka Xiriirka'}
              </h3>
              <div className="space-y-2 text-gray-400">
                <p>Jigjiga, Ethiopia</p>
                <p>+251995817222</p>
                <p>carwosmart@gmail.com</p>
              </div>
            </div>
            
            <div>
              <h3 className="text-carwo-gold font-semibold mb-4">
                {language === 'en' ? 'Follow Us' : 'Nala Soco'}
              </h3>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-carwo-gold transition-colors">
                  Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-carwo-gold transition-colors">
                  Instagram
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Carwo Smart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
