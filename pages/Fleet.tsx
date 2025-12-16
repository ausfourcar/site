import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const resolveImageSrc = (src?: string) => {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith('/')) return src;
  return `/${src}`;
};

const fleetData = [
  {
    id: '1',
    name: 'Dacia Logan 2024',
    category: 'Économique',
    price: 250,
    currency: 'MAD',
    image: '/dacia.jpg',
    fuel: 'Diesel',
    transmission: 'Manuelle',
    seats: 5,
    tag: 'Ville'
  },
  {
    id: '2',
    name: 'Renault Clio 5',
    category: 'Citadine',
    price: 350,
    currency: 'MAD',
    image: '/clio24.jpg',
    fuel: 'Diesel',
    transmission: 'Manuelle',
    seats: 5,
    tag: 'Ville'
  },
  {
    id: '12',
    name: 'Renault Clio 5 Auto',
    category: 'Citadine',
    price: 400,
    currency: 'MAD',
    image: '/clio24.jpg',
    fuel: 'Diesel',
    transmission: 'Automatique',
    seats: 5,
    tag: 'Ville'
  },
  {
    id: '3',
    name: 'Peugeot 208',
    category: 'Compacte',
    price: 400,
    currency: 'MAD',
    image: '/208.jpeg',
    fuel: 'Essence',
    transmission: 'Automatique',
    seats: 5,
    tag: 'Ville',
    popular: true
  },
  {
    id: '5',
    name: 'Hyundai Tucson',
    category: 'SUV',
    price: 750,
    currency: 'MAD',
    image: '/tucson.webp',
    fuel: 'Diesel',
    transmission: 'Automatique',
    seats: 5,
    tag: 'SUV'
  },
  {
    id: '15',
    name: 'Volkswagen Tiguan',
    category: 'SUV',
    price: 900,
    currency: 'MAD',
    image: '/tiguan.png',
    fuel: 'Diesel',
    transmission: 'Automatique',
    seats: 5,
    tag: 'SUV'
  },
  {
    id: '13',
    name: 'Dacia Sandero',
    category: 'Économique',
    price: 300,
    currency: 'MAD',
    image: '/dacia.jpg',
    fuel: 'Diesel',
    transmission: 'Manuelle',
    seats: 5,
    tag: 'Ville'
  },
  {
    id: '14',
    name: 'Citroën C3',
    category: 'Citadine',
    price: 350,
    currency: 'MAD',
    image: '/c3.jpg',
    fuel: 'Diesel',
    transmission: 'Manuelle',
    seats: 5,
    tag: 'Ville'
  },
  {
    id: '7',
    name: 'Opel Corsa',
    category: 'Citadine',
    price: 299,
    currency: 'MAD',
    image: '/corsa.png',
    fuel: 'Essence',
    transmission: 'Manuelle',
    seats: 5,
    tag: 'Ville'
  },
  {
    id: '16',
    name: 'Renault Clio 4',
    category: 'Économique',
    price: 250,
    currency: 'MAD',
    image: '/clio4.jpeg',
    fuel: 'Diesel',
    transmission: 'Manuelle',
    seats: 5,
    tag: 'Ville'
  },
  {
    id: '8',
    name: 'Kia Picanto',
    category: 'Économique',
    price: 249,
    currency: 'MAD',
    image: '/kia.jpg',
    fuel: 'Essence',
    transmission: 'Manuelle',
    seats: 4,
    tag: 'Ville'
  },
  {
    id: '9',
    name: 'Hyundai i20',
    category: 'Citadine',
    price: 299,
    currency: 'MAD',
    image: '/i20.jpg',
    fuel: 'Diesel',
    transmission: 'Manuelle',
    seats: 5,
    tag: 'Ville'
  },
  {
    id: '10',
    name: 'Hyundai i10',
    category: 'Citadine',
    price: 299,
    currency: 'MAD',
    image: '/i10.png',
    fuel: 'Essence',
    transmission: 'Manuelle',
    seats: 4,
    tag: 'Ville'
  },
  {
    id: '11',
    name: 'Volkswagen T-Roc',
    category: 'SUV',
    price: 699,
    currency: 'MAD',
    image: '/Trok.jpg',
    fuel: 'Diesel',
    transmission: 'Automatique',
    seats: 5,
    tag: 'SUV'
  }
];

const Fleet: React.FC = () => {
  const [filter, setFilter] = useState('Tout');

  // Find the featured car for the highlight section (Peugeot 208, ID 3)
  const featuredCar = fleetData.find(car => car.id === '3');

  const filteredFleet = filter === 'Tout' 
    ? fleetData 
    : fleetData.filter(car => car.tag === filter);

  const filters = ['Tout', 'Ville', 'SUV', 'Luxe'];

  return (
    <div className="relative flex flex-col items-center w-full min-h-screen pt-32 pb-20 px-4 md:px-10 lg:px-20 gap-16">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-[#fbfbe4] to-transparent -z-10"></div>
      
      {/* Highlight Section */}
      <div className="w-full max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8 items-center bg-white rounded-2xl p-6 lg:p-10 shadow-float border border-white relative overflow-hidden group">
          <div className="flex-1 z-10 flex flex-col gap-6 items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-text-main text-xs font-bold uppercase tracking-wider">
              <span className="material-symbols-outlined text-sm">verified</span>
              Nouvel Arrivage
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold tracking-tight text-text-main leading-[1.1]">
              Conduisez le Futur <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-orange to-primary bg-[length:200%_auto] animate-pulse">Peugeot 208 GT</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-lg leading-relaxed font-body">
              Découvrez le mélange parfait d'élégance marocaine et d'ingénierie moderne. La toute nouvelle Peugeot 208 est maintenant disponible pour votre voyage.
            </p>
            <div className="flex gap-4 pt-2">
              <Link to="/reservation" state={{ car: featuredCar }} className="h-12 px-8 rounded-full bg-primary text-text-main font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                Réserver cette Voiture
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[300px] lg:h-[400px] flex items-center justify-center z-10">
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-background-light to-white rounded-full border border-white shadow-inner"></div>
            <div 
              className="w-full h-full bg-contain bg-center bg-no-repeat drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out z-20" 
              style={{ backgroundImage: `url("${resolveImageSrc(featuredCar?.image)}")` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-24 z-40 w-full max-w-7xl">
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-float border border-white/50 p-2 md:p-4 flex flex-col md:flex-row gap-4 items-center justify-center">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide pb-2 md:pb-0 px-2 justify-center">
            {filters.map(f => (
               <button 
                key={f}
                onClick={() => setFilter(f)}
                className={`flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-full px-5 transition-all active:scale-95 border ${
                  filter === f 
                    ? 'bg-text-main text-white shadow-md border-transparent' 
                    : 'bg-background-light text-text-main border-transparent hover:border-primary/50 hover:bg-white'
                }`}
              >
                {f === 'Tout' ? null : <span className="material-symbols-outlined text-lg">{f === 'Ville' ? 'directions_car' : f === 'SUV' ? 'airport_shuttle' : 'diamond'}</span>}
                <p className="text-sm font-bold">{f === 'Tout' ? 'Toutes les Voitures' : f}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
        {filteredFleet.map((car) => (
          <div key={car.id} className="bg-white rounded-2xl p-6 flex flex-col gap-5 shadow-soft hover:shadow-float transition-all duration-300 group border border-transparent hover:border-primary/20 relative">
            <div className="absolute top-4 right-4 z-10">
              <button className="size-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-text-secondary hover:text-red-500 transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[18px]">favorite</span>
              </button>
            </div>
            {car.popular && (
              <div className="absolute top-4 left-4 z-10">
                <span className="bg-accent-orange text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-sm font-display">POPULAIRE</span>
              </div>
            )}
            <div className="w-full aspect-[16/10] rounded-xl bg-background-light overflow-hidden relative">
              <div 
                className="w-full h-full bg-contain bg-center bg-no-repeat group-hover:scale-105 transition-transform duration-500" 
                style={{ backgroundImage: `url("${resolveImageSrc(car.image)}")` }}
              ></div>
            </div>
            <div className="flex flex-col gap-4 px-2 pb-2">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-text-secondary text-xs font-bold uppercase tracking-wider font-display">{car.category}</p>
                  <h3 className="text-text-main text-xl font-bold font-display">{car.name}</h3>
                </div>
                <div className="text-right">
                  <p className="text-text-main text-lg font-bold font-display">{car.price} {car.currency}</p>
                  <p className="text-text-secondary text-xs font-body">par jour</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 py-3 border-y border-dashed border-border-subtle">
                <div className="flex flex-col items-center gap-1">
                  <span className="material-symbols-outlined text-text-secondary text-lg">local_gas_station</span>
                  <span className="text-xs text-text-secondary font-medium font-body">{car.fuel}</span>
                </div>
                <div className="flex flex-col items-center gap-1 border-l border-border-subtle">
                  <span className="material-symbols-outlined text-text-secondary text-lg">settings</span>
                  <span className="text-xs text-text-secondary font-medium font-body">{car.transmission}</span>
                </div>
                <div className="flex flex-col items-center gap-1 border-l border-border-subtle">
                  <span className="material-symbols-outlined text-text-secondary text-lg">airline_seat_recline_normal</span>
                  <span className="text-xs text-text-secondary font-medium font-body">{car.seats} Places</span>
                </div>
              </div>
              <Link to="/reservation" state={{ car }} className="w-full mt-1 h-11 rounded-full border-2 border-primary text-text-main font-bold text-sm hover:bg-primary transition-colors flex items-center justify-center gap-2 font-display">
                Réserver
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {filteredFleet.length === 0 && (
         <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-text-main">Aucune voiture trouvée</h3>
            <p className="text-text-secondary">Essayez de changer votre filtre.</p>
         </div>
      )}

      <div className="flex justify-center w-full">
        <button className="h-12 px-10 rounded-full bg-white border border-border-subtle text-text-main font-bold text-sm shadow-soft hover:shadow-float hover:border-primary/50 transition-all flex items-center gap-2 font-display">
          Charger Plus
          <span className="material-symbols-outlined text-lg">expand_more</span>
        </button>
      </div>
    </div>
  );
};

export default Fleet;