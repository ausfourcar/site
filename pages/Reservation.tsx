import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const extrasData = [
  { id: 'insurance', icon: 'verified_user', title: 'Couverture Complète', subtitle: 'Zéro franchise', price: 250 },
  { id: 'child_seat', icon: 'child_care', title: 'Siège Enfant', subtitle: 'Certifié sécurité', price: 100 },
  { id: 'wifi', icon: 'wifi', title: 'Wi-Fi 4G', subtitle: 'Données illimitées', price: 80 },
  { id: 'driver', icon: 'person_add', title: 'Conducteur Supplémentaire', subtitle: 'Partagez le volant', price: 150 }
];

const Reservation: React.FC = () => {
  const location = useLocation();
  const car = location.state?.car;

  // Refs for programmatic trigger to ensure robust Calendar opening
  const pickupDateRef = useRef<HTMLInputElement>(null);
  const pickupTimeRef = useRef<HTMLInputElement>(null);
  const dropoffDateRef = useRef<HTMLInputElement>(null);
  const dropoffTimeRef = useRef<HTMLInputElement>(null);

  // Initialize Dates (YYYY-MM-DD) and Times (HH:mm)
  const [pickupDate, setPickupDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState("10:00");

  const [dropoffDate, setDropoffDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 4);
    return d.toISOString().split('T')[0];
  });
  const [dropoffTime, setDropoffTime] = useState("10:00");

  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [days, setDays] = useState(3);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'tpe'>('cash');
  
  // Driver Info State
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  
  // Calculate days based on both date and time
  useEffect(() => {
    const start = new Date(`${pickupDate}T${pickupTime}`).getTime();
    const end = new Date(`${dropoffDate}T${dropoffTime}`).getTime();
    
    if (start && end && end > start) {
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
      setDays(diffDays > 0 ? diffDays : 1);
    } else {
      setDays(1);
    }
  }, [pickupDate, pickupTime, dropoffDate, dropoffTime]);

  // Handle Pickup Date Change: Auto-adjust dropoff
  const handlePickupDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    setPickupDate(newDate);
    if (newDate >= dropoffDate) {
        const d = new Date(newDate);
        d.setDate(d.getDate() + 3);
        setDropoffDate(d.toISOString().split('T')[0]);
    }
  };

  const toggleExtra = (id: string) => {
    setSelectedExtras(prev => 
      prev.includes(id) ? prev.filter(e => e !== id) : [...prev, id]
    );
  };

  // Helper to open native pickers
  const openPicker = (ref: React.RefObject<HTMLInputElement>) => {
    if (ref.current) {
        try {
            if ('showPicker' in HTMLInputElement.prototype) {
                ref.current.showPicker();
            } else {
                ref.current.focus();
                ref.current.click();
            }
        } catch (error) {
            console.log("Picker failed to open", error);
        }
    }
  };

  const handleConfirmReservation = () => {
    // Construct WhatsApp Message
    const phoneNumber = "212643193316";
    const extrasText = selectedExtras.length > 0 
        ? selectedExtras.map(id => extrasData.find(e => e.id === id)?.title).join(', ') 
        : "Aucun";
    
    // Calculations for the message
    const basePrice = car.price * days;
    const extrasDailyTotal = extrasData
      .filter(e => selectedExtras.includes(e.id))
      .reduce((sum, e) => sum + e.price, 0);
    const extrasTotal = extrasDailyTotal * days;
    const taxes = (basePrice + extrasTotal) * 0.20;
    const grandTotal = basePrice + extrasTotal + taxes;

    const message = `
*Nouvelle Réservation - Site Web*
---------------------------
🚗 *Voiture*: ${car.name}
📅 *Départ*: ${pickupDate} à ${pickupTime}
📅 *Retour*: ${dropoffDate} à ${dropoffTime}
⏳ *Durée*: ${days} Jours
---------------------------
👤 *Conducteur*: ${driverName}
📱 *Tél*: ${driverPhone}
---------------------------
➕ *Options*: ${extrasText}
💳 *Paiement*: ${paymentMethod === 'cash' ? 'Espèces' : 'TPE/Carte'}
💰 *Total*: ${grandTotal.toFixed(2)} MAD
---------------------------
Merci de confirmer la disponibilité.
    `.trim();

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, '_blank');
  };

  if (!car) {
    return <Navigate to="/fleet" replace />;
  }

  // Display Formatters
  const formatDateDisplay = (dateStr: string) => {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' }).format(date);
  };

  // Calculations for display
  const basePrice = car.price * days;
  const extrasDailyTotal = extrasData
    .filter(e => selectedExtras.includes(e.id))
    .reduce((sum, e) => sum + e.price, 0);
  const extrasTotal = extrasDailyTotal * days;
  const taxes = (basePrice + extrasTotal) * 0.20; // 20% VAT
  const grandTotal = basePrice + extrasTotal + taxes;

  return (
    <div className="min-h-screen bg-background-light pt-24 pb-20">
      {/* Page Header */}
      <div className="bg-white border-b border-border-color py-10">
        <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12">
          <h1 className="text-3xl md:text-4xl font-black text-text-main tracking-tight mb-2 font-display">Finalisez Votre Réservation</h1>
          <p className="text-text-muted text-base font-body">Vous n'êtes qu'à quelques pas de votre expérience de luxe.</p>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 py-10">
        <div className="flex flex-col lg:flex-row gap-10 xl:gap-16">
          {/* Left Column: Steps */}
          <div className="flex-1 flex flex-col gap-12">
            {/* Step 1: Pick-up & Drop-off */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="size-10 rounded-full bg-primary flex items-center justify-center font-bold text-text-main shadow-soft">1</div>
                <h2 className="text-xl font-bold text-text-main font-display">Détails de l'Itinéraire</h2>
              </div>
              
              {/* Airbnb-style Unified Form */}
              <div className="flex flex-col gap-4">
                
                {/* Location Row */}
                <div className="bg-white rounded-2xl border border-border-color shadow-soft divide-y md:divide-y-0 md:divide-x divide-border-color flex flex-col md:flex-row overflow-hidden">
                    <div className="relative flex-1 p-4 hover:bg-gray-50 transition-colors">
                        <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-1">Lieu de Prise en Charge</label>
                        <input 
                            type="text" 
                            placeholder="Aéroport Marrakech (RAK)" 
                            className="w-full bg-transparent border-none p-0 text-text-main font-bold placeholder:font-normal placeholder:text-gray-400 focus:ring-0 text-lg font-display"
                        />
                    </div>
                    <div className="relative flex-1 p-4 hover:bg-gray-50 transition-colors">
                        <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-1">Lieu de Restitution</label>
                        <input 
                            type="text" 
                            placeholder="Même que prise en charge" 
                            className="w-full bg-transparent border-none p-0 text-text-main font-bold placeholder:font-normal placeholder:text-gray-400 focus:ring-0 text-lg font-display"
                        />
                    </div>
                </div>

                {/* Date & Time Row - Split for robust interaction */}
                <div className="bg-white rounded-2xl border border-border-color shadow-soft divide-y md:divide-y-0 md:divide-x divide-border-color flex flex-col md:flex-row overflow-hidden">
                  
                  {/* Departure Box */}
                  <div className="flex-1 flex flex-col">
                      <div 
                        className="relative p-4 hover:bg-gray-50 transition-colors cursor-pointer group flex-1"
                        onClick={() => openPicker(pickupDateRef)}
                      >
                          <div className="flex items-center justify-between pointer-events-none">
                              <div className="flex flex-col gap-1">
                                  <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Départ</span>
                                  <span className="text-text-main font-bold font-display text-lg truncate">
                                      {formatDateDisplay(pickupDate)}
                                  </span>
                              </div>
                              <span className="material-symbols-outlined text-black text-2xl">calendar_today</span>
                          </div>
                          <input 
                              ref={pickupDateRef}
                              type="date" 
                              value={pickupDate}
                              min={new Date().toISOString().split('T')[0]}
                              onChange={handlePickupDateChange}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                      </div>
                      {/* Time Selector - Subtle separate click area */}
                      <div 
                        className="px-4 pb-3 cursor-pointer hover:bg-gray-50 transition-colors relative border-t border-dashed border-gray-100"
                        onClick={() => openPicker(pickupTimeRef)}
                      >
                         <div className="flex items-center justify-between mt-1">
                             <div className="flex items-center gap-2">
                                <span className="text-text-muted text-xs font-medium">Heure:</span>
                                <span className="text-text-main text-sm font-bold font-display bg-gray-100 px-2 py-0.5 rounded-md">{pickupTime}</span>
                             </div>
                             <span className="material-symbols-outlined text-black text-lg">schedule</span>
                         </div>
                         <input
                            ref={pickupTimeRef}
                            type="time"
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                         />
                      </div>
                  </div>

                  {/* Return Box */}
                  <div className="flex-1 flex flex-col">
                      <div 
                        className="relative p-4 hover:bg-gray-50 transition-colors cursor-pointer group flex-1"
                        onClick={() => openPicker(dropoffDateRef)}
                      >
                          <div className="flex items-center justify-between pointer-events-none">
                              <div className="flex flex-col gap-1">
                                  <span className="text-[10px] font-extrabold text-text-muted uppercase tracking-wider">Retour</span>
                                  <span className="text-text-main font-bold font-display text-lg truncate">
                                      {formatDateDisplay(dropoffDate)}
                                  </span>
                              </div>
                              <span className="material-symbols-outlined text-black text-2xl">calendar_today</span>
                          </div>
                          <input 
                              ref={dropoffDateRef}
                              type="date" 
                              value={dropoffDate}
                              min={pickupDate}
                              onChange={(e) => setDropoffDate(e.target.value)}
                              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                          />
                      </div>
                      {/* Time Selector */}
                      <div 
                        className="px-4 pb-3 cursor-pointer hover:bg-gray-50 transition-colors relative border-t border-dashed border-gray-100"
                        onClick={() => openPicker(dropoffTimeRef)}
                      >
                         <div className="flex items-center justify-between mt-1">
                             <div className="flex items-center gap-2">
                                <span className="text-text-muted text-xs font-medium">Heure:</span>
                                <span className="text-text-main text-sm font-bold font-display bg-gray-100 px-2 py-0.5 rounded-md">{dropoffTime}</span>
                             </div>
                             <span className="material-symbols-outlined text-black text-lg">schedule</span>
                         </div>
                         <input
                            ref={dropoffTimeRef}
                            type="time"
                            value={dropoffTime}
                            onChange={(e) => setDropoffTime(e.target.value)}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                         />
                      </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Step 2: Extras */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="size-10 rounded-full bg-white border border-border-color flex items-center justify-center font-bold text-text-muted shadow-sm">2</div>
                <h2 className="text-xl font-bold text-text-main font-display">Améliorez Votre Voyage</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {extrasData.map((extra) => (
                  <div 
                    key={extra.id} 
                    onClick={() => toggleExtra(extra.id)}
                    className={`group relative flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer shadow-soft ${selectedExtras.includes(extra.id) ? 'border-primary bg-primary/5' : 'border-border-color bg-white hover:border-primary/50'}`}
                  >
                    <div className={`size-12 rounded-lg flex items-center justify-center transition-colors ${selectedExtras.includes(extra.id) ? 'bg-primary text-white' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-text-main'}`}>
                      <span className="material-symbols-outlined">{extra.icon}</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-text-main font-display">{extra.title}</h3>
                      <p className="text-xs text-text-muted font-body">{extra.subtitle}</p>
                    </div>
                    <div className="text-right pr-2">
                      <p className="font-bold text-text-main font-display">{extra.price} MAD<span className="text-xs font-normal text-text-muted">/j</span></p>
                    </div>
                    <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedExtras.includes(extra.id) ? 'border-primary bg-primary' : 'border-border-color'}`}>
                      {selectedExtras.includes(extra.id) && <span className="material-symbols-outlined text-white text-sm">check</span>}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Step 3: Driver & Payment */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="size-10 rounded-full bg-white border border-border-color flex items-center justify-center font-bold text-text-muted shadow-sm">3</div>
                <h2 className="text-xl font-bold text-text-main font-display">Conducteur & Paiement</h2>
              </div>
              <div className="bg-white rounded-xl p-6 md:p-8 border border-border-color shadow-soft">
                <h3 className="text-lg font-bold mb-4 font-display">Informations du Conducteur</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <input 
                    type="text" 
                    placeholder="Nom" 
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="h-14 px-4 rounded-xl border border-border-color bg-background-light focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text-main outline-none font-body" 
                  />
                  <input 
                    type="tel" 
                    placeholder="Numéro de Téléphone" 
                    value={driverPhone}
                    onChange={(e) => setDriverPhone(e.target.value)}
                    className="h-14 px-4 rounded-xl border border-border-color bg-background-light focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text-main outline-none font-body" 
                  />
                </div>
                
                <div className="border-t border-border-color my-8"></div>
                
                <h3 className="text-lg font-bold mb-4 font-display">Options de Paiement</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Cash Option */}
                  <div 
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'cash' ? 'border-primary bg-primary/5 shadow-md' : 'border-border-color bg-white hover:border-primary/30 hover:shadow-sm'}`}
                  >
                    <div className={`size-12 rounded-full flex items-center justify-center transition-colors ${paymentMethod === 'cash' ? 'bg-primary text-white' : 'bg-background-light text-text-muted'}`}>
                        <span className="material-symbols-outlined text-2xl">payments</span>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-text-main font-display text-lg">Espèces</p>
                        <p className="text-xs text-text-muted font-body">Payer à l'arrivée</p>
                    </div>
                    {paymentMethod === 'cash' && (
                        <div className="text-primary animate-in zoom-in duration-200">
                            <span className="material-symbols-outlined text-2xl">check_circle</span>
                        </div>
                    )}
                  </div>

                  {/* TPE Option */}
                  <div 
                    onClick={() => setPaymentMethod('tpe')}
                    className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${paymentMethod === 'tpe' ? 'border-primary bg-primary/5 shadow-md' : 'border-border-color bg-white hover:border-primary/30 hover:shadow-sm'}`}
                  >
                    {/* Fee Badge with Tooltip */}
                    <div className="absolute top-2 right-2 group/badge z-10">
                        <div className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-sm flex items-center justify-center cursor-help">
                            2.83%
                        </div>
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 hidden group-hover/badge:block w-max px-2 py-1 bg-gray-900 text-white text-[10px] rounded shadow-lg animate-in fade-in zoom-in duration-200">
                            Frais TPE = 2.83%
                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                    </div>

                    <div className={`size-12 rounded-full flex items-center justify-center transition-colors ${paymentMethod === 'tpe' ? 'bg-primary text-white' : 'bg-background-light text-text-muted'}`}>
                        <span className="material-symbols-outlined text-2xl">credit_card</span>
                    </div>
                    <div className="flex-1">
                        <p className="font-bold text-text-main font-display text-lg">TPE / Carte</p>
                        <p className="text-xs text-text-muted font-body">Terminal mobile</p>
                    </div>
                    {paymentMethod === 'tpe' && (
                        <div className="text-primary animate-in zoom-in duration-200">
                            <span className="material-symbols-outlined text-2xl">check_circle</span>
                        </div>
                    )}
                  </div>
                </div>
                
                <div className="bg-background-light p-4 rounded-xl border border-border-color mt-6 flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary mt-0.5">info</span>
                  <p className="text-sm text-text-muted font-body">
                    {paymentMethod === 'cash' 
                        ? "Vous paierez le montant total en espèces lors de la prise en charge du véhicule. Veuillez prévoir l'appoint si possible." 
                        : "Un agent vous apportera un terminal de paiement électronique (TPE) lors de la livraison du véhicule. Les cartes Visa et Mastercard sont acceptées."}
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Summary Sticky */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="sticky top-24 flex flex-col gap-6">
              {/* Reservation Card */}
              <div className="bg-white rounded-xl overflow-hidden border border-border-color shadow-float">
                <div className="relative h-48 w-full bg-background-light overflow-hidden group">
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: `url("${car.image}")` }}></div>
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="inline-block px-3 py-1 bg-primary text-text-main text-xs font-bold rounded-full mb-1 uppercase">{car.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-text-main leading-tight font-display">{car.name}</h3>
                      <p className="text-text-muted text-sm mt-1 font-body">{car.transmission} • {car.fuel}</p>
                    </div>
                    <div className="flex gap-1 text-primary">
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span className="material-symbols-outlined text-sm">star</span>
                      <span className="material-symbols-outlined text-sm">star</span>
                    </div>
                  </div>
                  <div className="border-t border-dashed border-border-color my-4"></div>
                  <div className="space-y-3 text-sm font-body">
                    <div className="flex justify-between">
                      <span className="text-text-muted">Durée de Location</span>
                      <span className="font-bold text-text-main">{days} Jours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Tarif par jour</span>
                      <span className="font-bold text-text-main">{car.price} MAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Total Options</span>
                      <span className="font-bold text-text-main">{extrasTotal.toFixed(2)} MAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Taxes & Frais (20%)</span>
                      <span className="font-bold text-text-main">{taxes.toFixed(2)} MAD</span>
                    </div>
                  </div>
                  <div className="border-t border-border-color my-4 pt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-base font-bold text-text-main font-display">Prix Total</span>
                      <span className="text-2xl font-black text-text-main font-display">{grandTotal.toFixed(2)} <span className="text-sm font-medium">MAD</span></span>
                    </div>
                  </div>
                  <button 
                    onClick={handleConfirmReservation}
                    className="w-full mt-4 h-14 bg-gradient-to-r from-primary to-yellow-400 rounded-full text-text-main font-bold text-lg shadow-soft hover:shadow-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 font-display"
                  >
                    Confirmer la Réservation
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </button>
                  <p className="text-xs text-center text-text-muted mt-3 font-body">En cliquant, vous acceptez nos conditions.</p>
                </div>
              </div>

              {/* Help Widget */}
              <div className="bg-background-dark text-white rounded-xl p-6 shadow-soft relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <span className="material-symbols-outlined text-6xl">support_agent</span>
                </div>
                <h4 className="font-bold text-lg mb-2 relative z-10 font-display">Besoin d'Aide ?</h4>
                <p className="text-gray-400 text-sm mb-4 relative z-10 font-body">Notre équipe de conciergerie de luxe est disponible 24/7 pour vous aider.</p>
                <div className="flex flex-col gap-3 relative z-10">
                  <a href="tel:+212612100800" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                    <div className="size-8 rounded-full bg-primary flex items-center justify-center text-text-main">
                      <span className="material-symbols-outlined text-sm">call</span>
                    </div>
                    <span className="font-bold text-sm">+212 612 100 800</span>
                  </a>
                  <a href="https://wa.me/212643193316" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10">
                    <div className="size-8 rounded-full bg-[#25D366] flex items-center justify-center text-white">
                      <span className="material-symbols-outlined text-sm">chat</span>
                    </div>
                    <span className="font-bold text-sm">Discuter sur WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;