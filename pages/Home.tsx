import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';

const resolveImageSrc = (src?: string) => {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith('/')) return src;
  return `/${src}`;
};

const featuredCars: Car[] = [
  {
    id: '1',
    name: 'Dacia Logan',
    category: 'Berline Économique',
    price: 250,
    image: '/dacia.jpg',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 5,
    available: true
  },
  {
    id: '2',
    name: 'Renault Clio 5',
    category: 'Citadine',
    price: 350,
    image: '/clio24.jpg',
    transmission: 'Auto',
    fuel: 'Petrol',
    seats: 5,
    available: true
  },
  {
    id: '3',
    name: 'Peugeot 208',
    category: 'Citadine Sport',
    price: 299,
    image: '/208.jpeg',
    transmission: 'Manual',
    fuel: 'Diesel',
    seats: 5,
    available: true
  },
];

const Home: React.FC = () => {
  return (
    <>
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 sm:px-10 lg:px-20 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-100 to-transparent -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-8 text-center lg:text-left z-10">
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-100 shadow-sm w-fit mx-auto lg:mx-0">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Location Premium Maroc</span>
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-text-main font-display">
                Conduisez l'<span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-gold">Extraordinaire
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary opacity-40" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none"></path>
                  </svg>
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-500 font-light max-w-xl mx-auto lg:mx-0 leading-relaxed font-body">
                AUSFOUR CAR offre une réservation rapide, un service professionnel et des véhicules de qualité pour votre voyage à travers le Maroc. Vivez le luxe à chaque kilomètre.
              </p>
            </div>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <Link to="/fleet" className="btn-gold-gradient min-w-[160px] h-14 rounded-full px-8 text-base font-bold text-white shadow-lg shadow-primary/20 flex items-center justify-center gap-2 group font-display">
                Réserver Maintenant
                <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">calendar_month</span>
              </Link>
              <Link to="/fleet" className="min-w-[160px] h-14 rounded-full px-8 text-base font-bold text-text-main bg-white border border-gray-200 hover:border-primary hover:text-primary transition-all shadow-sm flex items-center justify-center gap-2 font-display">
                Voir Nos Voitures
                <span className="material-symbols-outlined">directions_car</span>
              </Link>
            </div>
            {/* Trust Indicators */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-4 opacity-80">
              <div className="flex -space-x-3">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBUflpZJ0Sh_F7nBf9RfzvKCsDG5wX0MkkeacGfgoK8NA8XnQM7KGZFIfIRTcZtBBQP6SwDIZuzEP0GrGuLGc-jmKr6H0EBzt3xRzbiFsc0bX-SnJg8CfXiRcHuCiHzZH4ozmzC603eQhokloo23v15Rg-jIm7DfzOM6_ljNC1xRh9sZJZ2pl3zDPi6pnXQwo4qvDUn04RThFMLoTMuzocVftmFvp1-U-DTH5y8UG4Yf5KJP-XKLDuozuQam3YeqpcycgND-XmLlRs")' }}></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAL26LqBKFn74XJsP7lz10lUr4yAgj4dk8ruAdkG7cEcAixgYatPif6BT88Vurg-LJQkpOGKrWBqlOfv5h1_omYb37zb-7yV_ADz6_FEktZdPNhtASU5DUVCvbCPw9myyhvTuxyKg8PTE2w9il4_fo-D1zj0TDZ6kxat37wKQkTogjcqwl2Hg42AQjQ7zmU_eRi-s4gRFMLBUGeaTE_Vo5LX4XRN1L5oV8hTD4WEEEwITPoH_wG-sSNblk7p2_YA8XQDWmYhTAJ4Og")' }}></div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-400 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDE2but3N3FoyzInoOHyATatJ1VxYW56rDNFeOlO4gwmOAuQEsiq6x07S6irhLk7uV38BQNCnR6Qbfn6O3WtrgtHnQ-5bhad2BgWVDMPx4QhKbtzuaKN3NMmXeDO3AjAKIpwqdOY2Ol7yomDbqDZ4MWn2AfEOyFu5MsKWF6VMdBEl-qxZY9vP14qQ26QiM7uk6bmxWQSoCd-uxVTYnygbBFuXuSBIE0HWB4ZpPgM7kcDJ6GY74OEVnRtjJC0gY9TT49sftE1DU1fI")' }}></div>
              </div>
              <div className="text-sm font-medium text-gray-500 font-body">
                <span className="text-text-main font-bold">1000+</span> Clients Satisfaits
              </div>
            </div>
          </div>
          <div className="relative z-0 mt-10 lg:mt-0 group">
            {/* Abstract geometric shapes behind car */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
            <div className="relative w-full aspect-[4/3] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80"
                alt="Voyage en voiture au Maroc"
                className="object-cover w-full h-full rounded-2xl shadow-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
              />
            </div>
            {/* Floating Badge */}
            <div className="absolute -bottom-4 right-10 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-xl border border-white max-w-[200px] hidden md:block animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-full text-green-600">
                  <span className="material-symbols-outlined text-xl">verified</span>
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium uppercase font-display">État</p>
                  <p className="text-sm font-bold text-text-main font-display">Premium & Vérifié</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white relative">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight font-display">Pourquoi Choisir <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-gold">AUSFOUR</span></h2>
              <p className="text-gray-500 text-lg font-body">Découvrez le meilleur service de location de voitures au Maroc avec nos avantages premium conçus pour votre confort.</p>
            </div>
            <div className="hidden md:block w-32 h-1 bg-gray-100 rounded-full overflow-hidden">
              <div className="w-1/2 h-full bg-primary rounded-full"></div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'sell', title: 'Meilleurs Prix', desc: 'Tarifs compétitifs pour des trajets de luxe sans frais cachés.' },
              { icon: 'bolt', title: 'Retrait Rapide', desc: 'Processus simplifié pour prendre la route en quelques minutes.' },
              { icon: 'support_agent', title: 'Support 24/7', desc: 'Notre équipe dévouée est toujours là quand vous en avez besoin.' },
              { icon: 'car_repair', title: 'Voitures Neuves', desc: 'Sécurité et qualité garanties avec notre flotte entretenue.' }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-background-light border border-gray-100 hover:border-primary/50 transition-colors group">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  <span className="material-symbols-outlined text-3xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2 font-display">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-body">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


    </>
  );
};

export default Home;