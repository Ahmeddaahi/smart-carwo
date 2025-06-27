import { Award, Users, Globe, Heart } from 'lucide-react';

interface AboutProps {
  language: 'en' | 'so';
}

const About = ({ language }: AboutProps) => {
  const values = [
    {
      icon: <Award className="h-8 w-8 text-carwo-gold" />,
      titleEn: "Quality Excellence",
      titleSo: "Tayada Fiican",
      descEn: "We source only the finest materials and employ skilled artisans to create exceptional garments.",
      descSo: "Waxaan ka helnaa oo keliya agabka ugu fiican waxaana naqashataa farsamayaal xirfadleh si aan u abuurno dhar gaar ah."
    },
    {
      icon: <Users className="h-8 w-8 text-carwo-gold" />,
      titleEn: "Community Focus",
      titleSo: "Xog-tihiya Bulshada",
      descEn: "Supporting local communities and preserving traditional craftsmanship is at our core.",
      descSo: "Taageerada bulshada maxalliga ah iyo ilaalinta farsamada dhaqameedka ayaa ah xididka naga dhexeeya."
    },
    {
      icon: <Globe className="h-8 w-8 text-carwo-gold" />,
      titleEn: "Cultural Heritage",
      titleSo: "Dhaxalka Dhaqameedka",
      descEn: "We celebrate and preserve Somali and Ethiopian cultural traditions through fashion.",
      descSo: "Waxaan dabaaldegnaa oo ilaalinaa dhaqannada Soomaalida iyo Itoobiya iyagoo loo marayo moodada."
    },
    {
      icon: <Heart className="h-8 w-8 text-carwo-gold" />,
      titleEn: "Customer Care",
      titleSo: "Daryeelka Macmiilka",
      descEn: "Every customer is treated like family, with personalized service and attention to detail.",
      descSo: "Macmiil kasta waxaa loo arkaa sidii qoys, oo leh adeeg shakhsi ah iyo fiiro gaar ah oo faah faahsan."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-dark-gradient text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 font-montserrat">
              {language === 'en' ? 'About Carwo Smart' : 'Waa Maxay Carwo Smart'}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              {language === 'en' 
                ? "Where tradition meets elegance, and every thread tells a story of cultural heritage and modern sophistication."
                : "Meesha dhaqanku la kulmo quruxda, iyo dunta kasta oo sheegaysa sheeko dhaxal dhaqameed iyo casrinimo casri ah."}
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-carwo-black mb-6 font-montserrat">
                {language === 'en' ? 'Our Story' : 'Sheekooyinkayaga'}
              </h2>
              
              {language === 'en' ? (
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Founded in the heart of Jigjiga, Carwo Smart began as a vision to bridge 
                    the gap between traditional Somali fashion and contemporary style. 
                    Our journey started with a deep appreciation for the rich cultural heritage of our region.
                  </p>
                  <p>
                    What sets us apart is our commitment to preserving traditional craftsmanship while 
                    embracing modern design sensibilities. Each piece in our collection is carefully 
                    curated to reflect the elegance and dignity that traditional garments represent.
                  </p>
                  <p>
                    Today, we proudly serve over 5,000 customers and beyond, 
                    each seeking authentic, high-quality traditional and modern fashion that 
                    honors their heritage while embracing contemporary style.
                  </p>
                </div>
              ) : (
                <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                  <p>
                    Waxaa la aasaasay wadnaha Jigjiga, Carwo Smart waxay bilowday aragti ah 
                    oo ka kooban buuxinta farqiga u dhexeeya dharka dhaqameedka Soomaalida 
                    iyo qaabka casriga ah. Socdaalkaygii wuxuu ku bilaabmay qadarin qoto dheer oo ku saabsan 
                    dhaxalka dhaqanka ee qani ah ee gobolkaaga.
                  </p>
                  <p>
                    Waxa naga kala duwan waa ballanqaadkaaga ah in aanu ilaalino farsamada dhaqameedka 
                    iyada oo aan la qabsanayno dareenka naqshadaynta casriga ah. Qayb kasta oo ku jirta 
                    ururinta ayaa si taxadar leh loogu soo ururiyay si ay u muujiso quruxda iyo 
                    sharafta ay dharka dhaqameedku matalo.
                  </p>
                  <p>
                    Maanta, waxaan si faakhir leh ugu adeegnaa in ka badan 5,000 macmiil ah oo ku nool 
                    meelo ka baxsan, mid kastaa oo raadinaya dhab ah, tayo sare leh dhaqameed 
                    iyo moodada casriga ah oo xurmeynaya dhaxalkooda iyagoo soo dhaweynaya qaabka casriga ah.
                  </p>
                </div>
              )}
            </div>
            
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                alt="Traditional craftsmanship"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-carwo-gold text-carwo-black p-6 rounded-xl shadow-lg">
                <div className="text-3xl font-bold">2019</div>
                <div className="text-sm font-medium">
                  {language === 'en' ? 'Founded' : 'La Aasaasay'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-carwo-black mb-4 font-montserrat">
              {language === 'en' ? 'Our Core Values' : 'Qiyamkayaga Aasaasiga ah'}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {language === 'en' 
                ? "These principles guide everything we do, from design to customer service"
                : "Mabaadi'dan ayaa haga jiho wax kasta oo aan qabno, laga bilaabo naqshadeynta ilaa adeegga macamilka"}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center p-8 carwo-card hover:scale-105 transition-transform duration-300">
                <div className="flex justify-center mb-6">
                  {value.icon}
                </div>
                <h3 className="text-xl font-semibold text-carwo-black mb-4">
                  {language === 'en' ? value.titleEn : value.titleSo}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'en' ? value.descEn : value.descSo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-carwo-black text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold mb-6 text-gradient font-montserrat">
                {language === 'en' ? 'Our Mission' : 'Ujeedadayada'}
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                {language === 'en' 
                  ? "To preserve and celebrate the rich cultural heritage of Somali fashion while providing modern, elegant, and high-quality clothing that empowers individuals to express their identity with pride and confidence."
                  : "In aan ilaalino oo aan dabaaldegno dhaxalka dhaqanka qani ah ee moodada Soomaalida iyagoo bixinaya dhar casri ah, qurux badan, iyo tayo sare oo u sahla shakhsiyaadka inay u muujiyaan aqoonsigooda faanka iyo kalsoonida."}
              </p>
            </div>
            
            <div className="text-center lg:text-left">
              <h2 className="text-4xl font-bold mb-6 text-gradient font-montserrat">
                {language === 'en' ? 'Our Vision' : 'Aragtidayada'}
              </h2>
              <p className="text-xl text-gray-300 leading-relaxed">
                {language === 'en' 
                  ? "To become the leading destination for authentic, premium traditional and contemporary fashion in the Horn of Africa, inspiring a new generation to embrace their cultural roots while stepping confidently into the future."
                  : "In aan noqono meeshe ugu horraysa ee la tago dhab ah, tayo sare leh dhaqameed iyo moodada casriga ah Geeska Afrika, dhiirrigelinta jiil cusub inay soo dhaweeyaan xididada dhaqankooda iyagoo si kalsoon ugu socda mustaqbalka."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team/Location Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-carwo-black mb-4 font-montserrat">
              {language === 'en' ? 'Visit Our Store' : 'Booqo Dukaankaaga'}
            </h2>
            <p className="text-xl text-gray-600">
              {language === 'en' 
                ? "Experience our collection in person at our flagship store in Jigjiga"
                : "La kulmo ururinta si aan dadka ula arko dukaankaaga weyn ee Jigjiga"}
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-semibold text-carwo-black mb-6">
                  {language === 'en' ? 'Store Information' : 'Macluumaadka Dukaanka'}
                </h3>
                <div className="space-y-4 text-lg text-gray-700">
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-carwo-gold rounded-full mt-3"></div>
                    <div>
                      <strong>{language === 'en' ? 'Location:' : 'Goobta:'}</strong>
                      <br />Jigjiga
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-carwo-gold rounded-full mt-3"></div>
                    <div>
                      <strong>{language === 'en' ? 'Phone:' : 'Telefon:'}</strong>
                      <br />+251995817222
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-carwo-gold rounded-full mt-3"></div>
                    <div>
                      <strong>{language === 'en' ? 'Email:' : 'Iimayl:'}</strong>
                      <br />carwosmart@gmail.com
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-carwo-gold rounded-full mt-3"></div>
                    <div>
                      <strong>{language === 'en' ? 'Hours:' : 'Saacadaha:'}</strong>
                      <br />{language === 'en' ? 'Daily 8:00 AM - 8:00 PM' : 'Maalin kasta 8:00 AM - 8:00 PM'}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Store front"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-carwo-black/50 to-transparent rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
