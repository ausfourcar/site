import React from 'react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white rounded-t-[3rem] mt-20 pt-20 pb-10" id="contact-footer">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Info */}
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center size-8 rounded-full bg-primary text-white">
                <span className="material-symbols-outlined text-lg">directions_car</span>
              </div>
              <div className="flex flex-col">
                <h2 className="text-lg font-display font-black leading-none">AUSFOUR</h2>
                <span className="text-[0.5rem] font-bold text-primary uppercase tracking-widest">Location de Voiture</span>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed font-body">
              Votre partenaire premium pour explorer le Maroc. Véhicules de luxe, service professionnel et voyages inoubliables.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-xl">thumb_up</span>
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors">
                <span className="material-symbols-outlined text-xl">share</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6 text-white">Liens Rapides</h3>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm font-body">
              <li><Link to="/" className="hover:text-primary transition-colors">Accueil</Link></li>
              <li><Link to="/fleet" className="hover:text-primary transition-colors">Notre Flotte</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contactez-nous</Link></li>
              <li><Link to="/reservation" className="hover:text-primary transition-colors">Réserver</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6 text-white">Contact</h3>
            <ul className="flex flex-col gap-4 text-gray-400 text-sm font-body">
              <li className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary mt-0.5">location_on</span>
                <span>123 Avenue Mohammed V,<br />Casablanca, Maroc</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">call</span>
                <span>+212 612 100 800</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary">mail</span>
                <span>contact@ausfourcar.ma</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-display font-bold mb-6 text-white">Restez Informé</h3>
            <p className="text-gray-400 text-sm mb-4 font-body">Abonnez-vous pour les dernières offres.</p>
            <div className="relative">
              <input
                type="email"
                placeholder="Adresse email"
                className="w-full bg-gray-800 border-none rounded-full py-3 px-5 text-sm text-white placeholder-gray-500 focus:ring-2 focus:ring-primary focus:bg-gray-800"
              />
              <button className="absolute right-1 top-1 h-10 w-10 bg-primary rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                <span className="material-symbols-outlined text-lg">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs font-body">© 2024 AUSFOUR CAR. Tous droits réservés.</p>
          <div className="flex gap-6 text-gray-500 text-xs font-body">
            <a href="#" className="hover:text-white">Politique de Confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;