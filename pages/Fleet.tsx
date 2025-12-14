import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const fleetData = [
  {
    id: '1',
    name: 'Dacia Logan 2024',
    category: 'Économique',
    price: 250,
    currency: 'MAD',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuARS3EHXYoViWSHapJYi4iHK1nL-RxTaPcHz-B-8eSHR_IcQMK-avNsR9BXj2h9U0AHNiiM-bZegp27YRl0MqrwlF8Ch_AxCr61aE6WDzeOXqlWU6rthi6YZ_pEnfgoW_OB0RFovYfPqtet7Kf2OhDamby9Zx04Q_s8_IZ0_JCumE96PvDE9adjmZa6H6g1hTG3ajHFn-tdRJ0q95I3xvHvmVcIaDUrp9zHYrpOfcYjToei26g23wVwrTSbUrJPUiITWPPjuWHsfnw',
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
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtOxLmFWFJKVipCf5mTtV0dB9GK2uTp0imGDNOGMS1O_aXbRQx45ZZXn-RW_m4WE_thybu96bDBDn9YmFa401AMfp7hfTe8Was07fJVz9BwRluPzPs0WzjOkCDmEce1bWlELY0w4SE48yvujuiEulFzVMlQ_pFUJOtOom_N0eIfkbo_4_THhR9oe-tBusZZMdJ6GAtvo_qyywxSxS9KdJEzSkl0l5NpPQ9U5yPkNnBOcwar1E8sTVDr6OTz6ZcYUwX4KPLUgLsu4w',
    fuel: 'Diesel',
    transmission: 'Manuelle',
    seats: 5,
    tag: 'Ville'
  },
  {
    id: '3',
    name: 'Peugeot 208',
    category: 'Compacte',
    price: 400,
    currency: 'MAD',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfb_bBlJ8TTjsUfAR2GLSQodsajEeqxwBEaWWsSDg-DezjGOYPxEp4vST2_IHq0hG524pJ6njgTGmEkS0e3H2JhN8-W0SEahMN3gUeKcbLR2R3gpJ8wUa842hEFptTg82lvVI0E_Co2CTzHT5aZCJSZ8LYUYDaqmXmufOfrH7RpN9rFBbpzwzMbvu0dQ6YejhkKWKAvJ6zh21Ro-P93hWcaQyH-4CSCeufFwSpbQW2o9sS8OTCvNzm0KX2r_x_cW_UeUnU4WeKKDk',
    fuel: 'Essence',
    transmission: 'Automatique',
    seats: 5,
    tag: 'Ville',
    popular: true
  },
  {
    id: '4',
    name: 'Range Rover Evoque',
    category: 'Luxe',
    price: 1200,
    currency: 'MAD',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqwWekZ5yiw8tKMrEf0iXdkBVCOmL75JG3AIqi3gNnS5Td1iq7xkS3QMhHGtWQMC8UjnR228UcBDb6Sr15SrUbHTg9fBiUNcbaQXGCchngxxRmy8f-0osuTA5h3xsoOKBE8n1ILXQlNY-78BschvQ542-fIdaeehEOEUs9CbEELIQ2QP-GuGqo0BLKNyNFE0nQdXAxgVFVWQizjl5ltKIZZX7_nWSdxrwZqdVc63BKSw8EF9QmWG_e7ewFo3pdaIrHjjSHzVeCxcY',
    fuel: 'Diesel',
    transmission: 'Automatique',
    seats: 5,
    tag: 'Luxe'
  },
  {
    id: '5',
    name: 'Hyundai Tucson',
    category: 'SUV',
    price: 750,
    currency: 'MAD',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDfwH_vuOTLkbLinXeOLKFrRxv1EvqEb75E37HVnv85cjpz7OGo4-7nnm2yFCs0yOzTkCRZWmdWZZ9s2yLj2qmWr5j-EHDqLp2vei9Bg_BuCbh7FhFntRgGebModp5GRl7Gtx3VHOMhwCNnY0L7txPnF67t9DMzx2Wux51kbd2XBAIocdPw7V-VzD_2Lam4a9jjpg7vXCKtEqNyMzBoOX57I__azYE24zgLKchRPgTLxGuQOQes7EF1lbR9JgVSSTile0JwjsRYmVo',
    fuel: 'Diesel',
    transmission: 'Automatique',
    seats: 5,
    tag: 'SUV'
  },
  {
    id: '6',
    name: 'Jeep Renegade',
    category: 'SUV',
    price: 600,
    currency: 'MAD',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAeqpfjkK0a_67vu0C_yPXY4JApxg752zIeiWISSL_4BpLW3QTO71QQkkb664kkwdGVZi1QM-IQov1ZMaT8TB48jve2x8c_Y_v3V7crLEMkMGa2WkHkSoA2Q09Qo-Vl0OiqTP1PokkK7F8i0yKW24WzQ6k9dK37RVCLKDwiZL-6b9rtYmOUQFV6f6OevEok67y6LhbyzT_eT9eeiv1nkcRK7jjH2wFu7xU1TKZuqYNZIsietdsS9hdwpc7-kTTg95CW-GNRn8OC2zg',
    fuel: 'Diesel',
    transmission: 'Manuelle',
    seats: 5,
    tag: 'SUV'
  },
  {
    id: '7',
    name: 'Opel Corsa',
    category: 'Citadine',
    price: 299,
    currency: 'MAD',
    image: 'https://images.unsplash.com/photo-1609520505218-74218447d2c3?auto=format&fit=crop&w=800&q=80',
    fuel: 'Essence',
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
    image: 'https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=800&q=80',
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
    image: 'https://images.unsplash.com/photo-1627454819213-f77f3076fc8c?auto=format&fit=crop&w=800&q=80',
    fuel: 'Diesel',
    transmission: 'Automatique',
    seats: 5,
    tag: 'SUV'
  }
];

const Fleet: React.FC = () => {
  const [filter, setFilter] = useState('Tout');

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
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight text-text-main leading-[1.1]">
              Conduisez le Futur <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent-orange to-primary bg-[length:200%_auto] animate-pulse">Peugeot 208 GT</span>
            </h1>
            <p className="text-text-secondary text-lg max-w-lg leading-relaxed font-body">
              Découvrez le mélange parfait d'élégance marocaine et d'ingénierie moderne. La toute nouvelle Peugeot 208 est maintenant disponible pour votre voyage.
            </p>
            <div className="flex gap-4 pt-2">
              <Link to="/reservation" className="h-12 px-8 rounded-full bg-primary text-text-main font-bold text-sm shadow-lg shadow-primary/30 hover:shadow-primary/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                Réserver cette Voiture
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </Link>
            </div>
          </div>
          <div className="flex-1 relative w-full h-[300px] lg:h-[400px] flex items-center justify-center z-10">
            <div className="absolute w-[80%] h-[80%] bg-gradient-to-tr from-background-light to-white rounded-full border border-white shadow-inner"></div>
            <div 
              className="w-full h-full bg-contain bg-center bg-no-repeat drop-shadow-2xl hover:scale-105 transition-transform duration-500 ease-out z-20" 
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCcOoUwE97qgfUUtFvEMwJ_mA0-ArE-dTIgaLrQuXg4cuikhiH9MMauUC4ocSNTDKaHRwha8qYCwA982ucQqDtjJJWwZFEWcXhD-Hlz8bx0pX5NPtSQvo7yIfNkcLwFOk2RIx-Vdt0-t67ThFZjijwLQzyutQtbz0ZYc9CPosJM0Y5RXovL4jprgtuoqZDmnXGpcoQ6RdcPBgqoOHTq98nbxqHEz8VThn4SzQEPdPaXbUqBICGx55643SRO6NRRI2-p3hMP_5fgPxc")' }}
            ></div>
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="sticky top-24 z-40 w-full max-w-7xl">
        <div className="bg-white/80 backdrop-blur-md rounded-xl shadow-float border border-white/50 p-2 md:p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto scrollbar-hide pb-2 md:pb-0 px-2">
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
          <div className="flex items-center gap-4 w-full md:w-auto border-t md:border-t-0 border-border-subtle pt-3 md:pt-0 px-2">
            <div className="flex flex-col w-full md:w-48 gap-1">
              <div className="flex justify-between text-xs text-text-secondary font-medium">
                <span>Fourchette de Prix</span>
                <span>MAD/jour</span>
              </div>
              <div className="relative h-1.5 w-full bg-background-light rounded-full overflow-hidden">
                <div className="absolute top-0 left-0 h-full bg-primary w-2/3 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredFleet.map((car) => (
          <div key={car.id} className="bg-white rounded-2xl p-4 flex flex-col gap-4 shadow-soft hover:shadow-float transition-all duration-300 group border border-transparent hover:border-primary/20 relative">
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
            <div className="w-full aspect-[4/3] rounded-xl bg-background-light overflow-hidden relative">
              <div 
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500" 
                style={{ backgroundImage: `url("${car.image}")` }}
              ></div>
            </div>
            <div className="flex flex-col gap-3 px-2 pb-2">
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