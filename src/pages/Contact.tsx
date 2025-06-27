import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

interface ContactProps {
  language: 'en' | 'so';
}

const Contact = ({ language }: ContactProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      alert(language === 'en' ? 'Thank you for your message! We will contact you soon.' : 'Waad ku mahadsan tahay fariintaada! Waanu kula soo xiriir doonnaa dhawaan.');
      setFormData({ name: '', phone: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6 text-carwo-gold" />,
      titleEn: "Visit Our Store",
      titleSo: "Booqo Dukaankaaga",
      detailEn: "Jigjiga",
      detailSo: "Jigjiga",
      subDetailEn: "Open daily 8:00 AM - 8:00 PM",
      subDetailSo: "Furan maalin kasta 8:00 AM - 8:00 PM"
    },
    {
      icon: <Phone className="h-6 w-6 text-carwo-gold" />,
      titleEn: "Call Us",
      titleSo: "Noo Soo Wac",
      detailEn: "+251 93 537 6020",
      detailSo: "+251 93 537 6020",
      subDetailEn: "Available for WhatsApp",
      subDetailSo: "Loo heli karaa WhatsApp"
    },
    {
      icon: <Mail className="h-6 w-6 text-carwo-gold" />,
      titleEn: "Email Us",
      titleSo: "Noo Dir Iimaylka",
      detailEn: "carwosmart@gmail.com",
      detailSo: "carwosmart@gmail.com",
      subDetailEn: "We respond within 24 hours",
      subDetailSo: "Waxaan jawaab-celinno 24 saacadood gudahood"
    },
    {
      icon: <Clock className="h-6 w-6 text-carwo-gold" />,
      titleEn: "Business Hours",
      titleSo: "Saacadaha Ganacsiga",
      detailEn: "8:00 AM - 8:00 PM",
      detailSo: "8:00 AM - 8:00 PM",
      subDetailEn: "Monday to Sunday",
      subDetailSo: "Isniin ilaa Axad"
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="py-16 bg-dark-gradient text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 font-montserrat">
            {language === 'en' ? 'Contact Us' : 'Nala Soo Xiriir'}
          </h1>
          <p className="text-xl text-gray-300">
            {language === 'en' 
              ? "Get in touch with us - we're here to help with all your fashion needs"
              : "Nala soo xiriir - waanu halkan u joognaa si aanu ugu caawino dhammaan baahiyahaaga moodada"}
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <div key={index} className="carwo-card text-center p-8 hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-4">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-carwo-black mb-3">
                  {language === 'en' ? info.titleEn : info.titleSo}
                </h3>
                <p className="text-lg font-medium text-gray-800 mb-2">
                  {language === 'en' ? info.detailEn : info.detailSo}
                </p>
                <p className="text-sm text-gray-600">
                  {language === 'en' ? info.subDetailEn : info.subDetailSo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-carwo-black mb-8 font-montserrat">
                {language === 'en' ? 'Send us a Message' : 'Noo Dir Fariinta'}
              </h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Full Name' : 'Magaca Oo Dhan'}
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carwo-gold focus:border-transparent transition-all duration-300"
                    placeholder={language === 'en' ? 'Enter your full name' : 'Gali magacaaga dhamaystiran'}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Phone Number' : 'Lambarka Telefoon'}
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carwo-gold focus:border-transparent transition-all duration-300"
                    placeholder={language === 'en' ? 'Enter your phone number' : 'Gali lambarka telefoonkaaga'}
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Email Address (Optional)' : 'Ciwaanka Iimaylka (Ikhtiyaari)'}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carwo-gold focus:border-transparent transition-all duration-300"
                    placeholder={language === 'en' ? 'Enter your email address' : 'Gali ciwaanka iimaylkaaga'}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    {language === 'en' ? 'Message' : 'Fariinta'}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-carwo-gold focus:border-transparent transition-all duration-300 resize-none"
                    placeholder={language === 'en' ? 'Tell us how we can help you...' : 'Noo sheeg sida aan kuu caawin karno...'}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full carwo-btn text-lg flex items-center justify-center space-x-3 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-carwo-black"></div>
                  ) : (
                    <>
                      <Send className="h-5 w-5" />
                      <span>{language === 'en' ? 'Send Message' : 'Dir Fariinta'}</span>
                    </>
                  )}
                </button>
              </form>

              {/* Quick Contact Options */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-carwo-black mb-4">
                  {language === 'en' ? 'Quick Contact' : 'Xiriir Degdeg ah'}
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://wa.me/251995817222"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-3 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors duration-300"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.569-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                  
                  <a
                    href="tel:+251935376020"
                    className="flex items-center justify-center space-x-3 px-6 py-3 bg-carwo-gold text-carwo-black rounded-lg hover:bg-yellow-400 transition-colors duration-300"
                  >
                    <Phone className="h-5 w-5" />
                    <span>{language === 'en' ? 'Call Now' : 'Wac Hadda'}</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Map */}
            <div>
              <h2 className="text-3xl font-bold text-carwo-black mb-8 font-montserrat">
                {language === 'en' ? 'Find Our Store' : 'Hel Dukaankaaga'}
              </h2>
              
              <div className="bg-gray-200 rounded-2xl overflow-hidden shadow-lg h-96 mb-8">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126191.64674374835!2d42.79472687421872!3d9.351967694482456!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1631bf2b2f97d295%3A0x3a652d5b1a0b8e8a!2sJijiga!5e0!3m2!1sen!2sus!4v1647958233123!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>

              {/* Store Info */}
              <div className="bg-carwo-light-gold/20 p-6 rounded-xl">
                <h3 className="text-xl font-semibold text-carwo-black mb-4">
                  {language === 'en' ? 'Store Information' : 'Macluumaadka Dukaanka'}
                </h3>
                <div className="space-y-3 text-gray-700">
                  <p>
                    <strong>{language === 'en' ? 'Address:' : 'Ciwaanka:'}</strong>
                    <br />Jigjiga, {language === 'en' ? '' : ''}
                  </p>
                  <p>
                    <strong>{language === 'en' ? 'Parking:' : 'Baabuurka dhigida:'}</strong>
                    <br />{language === 'en' ? 'Free parking available' : 'Baabuur bilaash ah oo la heli karo'}
                  </p>
                  <p>
                    <strong>{language === 'en' ? 'Public Transport:' : 'Gaadiidka Dadweynaha:'}</strong>
                    <br />{language === 'en' ? 'Accessible by local buses and taxis' : 'Waxaa lagu gaari karaa baasaska maxalliga ah iyo taakisiyada'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Media & Additional Info */}
      <section className="py-16 bg-carwo-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 font-montserrat">
              {language === 'en' ? 'Stay Connected' : 'La Xidhiidh'}
            </h2>
            <p className="text-xl text-gray-300">
              {language === 'en' 
                ? "Follow us on social media for the latest updates and fashion trends"
                : "Nala soco shabakadaha bulshada si aad u hesho warkii ugu dambeeyay iyo isbeddelada moodada"}
            </p>
          </div>
          
          <div className="flex justify-center space-x-8">
            <a
              href="#"
              className="flex items-center space-x-3 px-6 py-3 border-2 border-carwo-gold text-carwo-gold hover:bg-carwo-gold hover:text-carwo-black rounded-lg transition-all duration-300"
            >
              <span>Facebook</span>
            </a>
            <a
              href="#"
              className="flex items-center space-x-3 px-6 py-3 border-2 border-carwo-gold text-carwo-gold hover:bg-carwo-gold hover:text-carwo-black rounded-lg transition-all duration-300"
            >
              <span>Instagram</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
