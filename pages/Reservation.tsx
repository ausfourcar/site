import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { fleetData } from './Fleet';

const resolveImageSrc = (src?: string) => {
  if (!src) return '';
  if (/^https?:\/\//i.test(src)) return src;
  if (src.startsWith('/')) return src;
  return `/${src}`;
};

const extrasData = [
  { id: 'child_seat', icon: 'child_care', title: 'Siège Enfant', subtitle: 'Certifié sécurité', price: 100, isPerDay: false },
  { id: 'driver', icon: 'person_add', title: 'Conducteur Supplémentaire', subtitle: 'Partagez le volant', price: 150, isPerDay: true }
];

const Reservation: React.FC = () => {
  const location = useLocation();
  const [car, setCar] = useState(location.state?.car);

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
  const [pickupTime, setPickupTime] = useState("10:00 AM");

  const [dropoffDate, setDropoffDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  });
  const [dropoffTime, setDropoffTime] = useState("10:00 AM");

  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);
  const [days, setDays] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'tpe'>('cash');

  // Driver Info State
  const [driverName, setDriverName] = useState("");
  const [driverPhone, setDriverPhone] = useState("");
  const [driverId, setDriverId] = useState("");
  const [secondDriverName, setSecondDriverName] = useState("");
  const [secondDriverPhone, setSecondDriverPhone] = useState("");
  const [secondDriverId, setSecondDriverId] = useState("");

  // Location State
  const [pickupLocation, setPickupLocation] = useState("Aéroport Oujda-Angads");
  const [customPickupLocation, setCustomPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("Aéroport Oujda-Angads");
  const [customDropoffLocation, setCustomDropoffLocation] = useState("");
  const [mileageType, setMileageType] = useState<'limited' | 'unlimited'>('limited');
  const [selectedTransmission, setSelectedTransmission] = useState(car?.transmission);
  const [protectionPlan, setProtectionPlan] = useState<'basique' | 'moyen'>('basique');

  const isConfigurableCar = car?.name.includes("Clio 5") || car?.name.includes("Picanto");

  // Logic to switch the actual car object based on transmission selection
  const handleTransmissionSwitch = (newTransmission: string) => {
    setSelectedTransmission(newTransmission);

    // 1. Try to find a direct model match in fleetData (e.g. Clio 5 vs Clio 5 Auto)
    // We look for cars with the same name root but different transmission
    const carNameRoot = car?.name.includes("Clio 5") ? "Clio 5" : car?.name;

    const match = fleetData.find(f =>
      f.name.includes(carNameRoot) &&
      f.transmission === newTransmission
    );

    if (match) {
      setCar(match);
    }
  };

  const timeOptions = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 30) {
      const hour = h % 12 || 12;
      const ampm = h < 12 ? 'AM' : 'PM';
      timeOptions.push(`${hour}:${m === 0 ? '00' : '30'} ${ampm}`);
    }
  }

  const convert12to24 = (time12h: string) => {
    const [time, modifier] = time12h.split(' ');
    let [hours, minutes] = time.split(':');
    if (hours === '12') hours = '00';
    if (modifier === 'PM') hours = String(parseInt(hours, 10) + 12);
    return `${hours.padStart(2, '0')}:${minutes}`;
  };

  // Calculate days based on both date and time
  useEffect(() => {
    const start24 = convert12to24(pickupTime);
    const end24 = convert12to24(dropoffTime);
    const start = new Date(`${pickupDate}T${start24}`).getTime();
    const end = new Date(`${dropoffDate}T${end24}`).getTime();

    if (start && end && end > start) {
      const diffMs = end - start;
      const diffHours = diffMs / (1000 * 60 * 60);
      let calculatedDays = Math.floor(diffHours / 24);
      const extraHours = diffHours % 24;

      // Rule: if return hour is 2 hours or more past the pickup time cycle, count an extra day
      if (extraHours >= 2) {
        calculatedDays += 1;
      }

      // Ensure at least 0 days
      setDays(calculatedDays);
    } else {
      setDays(0);
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

  const handleConfirmReservation = async () => {
    // Construct WhatsApp Message
    const phoneNumber = "212643193316";
    const extrasText = selectedExtras.length > 0
      ? selectedExtras.map(id => extrasData.find(e => e.id === id)?.title).join(', ')
      : "Aucun";

    // Calculate total price
    const transmissionExtra = (isConfigurableCar && selectedTransmission === 'Automatique' && car.transmission === 'Manuelle') ? 50 : 0;
    const protectionPlanDailyPrice = protectionPlan === 'moyen' ? 144 : 0;
    const basePrice = (car.price + transmissionExtra + protectionPlanDailyPrice) * days;
    const extrasTotal = extrasData
      .filter(e => selectedExtras.includes(e.id))
      .reduce((sum, e) => sum + (e.isPerDay ? e.price * days : e.price), 0);
    const taxes = (basePrice + extrasTotal) * 0.20;
    const grandTotal = basePrice + extrasTotal + taxes;

    const finalPickupLocation = pickupLocation === 'autre' ? customPickupLocation : pickupLocation;
    const finalDropoffLocation = dropoffLocation === 'autre' ? customDropoffLocation : dropoffLocation;

    const reservationDetails = {
      car: car.name,
      transmission: selectedTransmission,
      pickupLocation: finalPickupLocation,
      pickupDate,
      pickupTime,
      dropoffLocation: finalDropoffLocation,
      dropoffDate,
      dropoffTime,
      days,
      mileageType: mileageType === 'limited' ? 'Limité (250 km/j)' : 'Illimité',
      driverName,
      driverPhone,
      extras: extrasText,
      protectionPlan: protectionPlan === 'moyen' ? 'Moyen (+144 MAD/j)' : 'Basique',
      paymentMethod: paymentMethod === 'cash' ? 'Espèces' : 'TPE/Carte',
      total: grandTotal.toFixed(2),
      date: new Date().toLocaleString()
    };

    // Send email using EmailJS
    try {
      await emailjs.send(
        'service_h54w5w8', // EmailJS service ID
        'template_q75zuwj', // EmailJS template ID
        reservationDetails,
        'T4sCGl31u89i7RhK3' // EmailJS public key
      );
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Failed to send email:', error);
    }

    const message = `
*Nouvelle Réservation - Site Web*
----------------------------
🚗 *Voiture*: ${reservationDetails.car}
⚙️ *Vitesse*: ${reservationDetails.transmission}
📍 *Lieu Départ*: ${reservationDetails.pickupLocation}
📅 *Départ*: ${reservationDetails.pickupDate} à ${reservationDetails.pickupTime}
📍 *Lieu Retour*: ${reservationDetails.dropoffLocation}
📅 *Retour*: ${reservationDetails.dropoffDate} à ${reservationDetails.dropoffTime}
⏳ *Durée*: ${reservationDetails.days} Jours
🛣️ *Kilométrage*: ${reservationDetails.mileageType}
----------------------------
👤 *Conducteur*: ${reservationDetails.driverName}
📱 *Tél*: ${reservationDetails.driverPhone}
----------------------------
➕ *Options*: ${reservationDetails.extras}
🛡️ *Protection*: ${reservationDetails.protectionPlan}
💳 *Paiement*: ${reservationDetails.paymentMethod}
💰 *Total*: ${reservationDetails.total} MAD
----------------------------
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
  const transmissionExtra = (isConfigurableCar && selectedTransmission === 'Automatique' && car.transmission === 'Manuelle') ? 50 : 0;
  const protectionPlanDailyPrice = protectionPlan === 'moyen' ? 144 : 0;
  const basePrice = (car.price + transmissionExtra + protectionPlanDailyPrice) * days;
  const extrasTotal = extrasData
    .filter(e => selectedExtras.includes(e.id))
    .reduce((sum, e) => sum + (e.isPerDay ? e.price * days : e.price), 0);
  const taxes = (basePrice + extrasTotal) * 0.20; // 20% VAT
  const grandTotal = basePrice + extrasTotal + taxes;

  return (
    <div className="min-h-screen bg-background-light pt-28 md:pt-36 pb-20">
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
                <div className="flex flex-col gap-4">
                  <div className="bg-white rounded-2xl border border-border-color shadow-soft divide-y md:divide-y-0 md:divide-x divide-border-color flex flex-col md:flex-row overflow-hidden">
                    <div className="relative flex-1 p-4 hover:bg-gray-50 transition-colors group">
                      <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-1">Lieu de Prise en Charge</label>
                      <div className="relative flex items-center">
                        <select
                          value={pickupLocation}
                          onChange={(e) => setPickupLocation(e.target.value)}
                          className="w-full bg-transparent border-none p-0 text-text-main font-bold focus:ring-0 text-lg font-display appearance-none !bg-none cursor-pointer pr-10 hover:text-primary transition-colors relative z-10"
                        >
                          <option value="Aéroport Oujda-Angads">Aéroport Oujda-Angads (OUD)</option>
                          <option value="Aéroport Nador-El Aroui">Aéroport Nador-El Aroui (NDR)</option>
                          <option value="Aéroport Fès-Saïss">Aéroport Fès-Saïss (FEZ)</option>
                          <option value="autre">Autre emplacement...</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-0 text-primary pointer-events-none text-2xl z-0">expand_more</span>
                      </div>
                      {pickupLocation === 'autre' && (
                        <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                          <input
                            type="text"
                            placeholder="Précisez le lieu de prise en charge..."
                            value={customPickupLocation}
                            onChange={(e) => setCustomPickupLocation(e.target.value)}
                            className="w-full bg-white border border-border-color rounded-xl px-4 py-3 text-sm font-body focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-sm transition-all"
                          />
                        </div>
                      )}
                    </div>
                    <div className="relative flex-1 p-4 hover:bg-gray-50/50 transition-colors group">
                      <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-1">Lieu de Restitution</label>
                      <div className="relative flex items-center">
                        <select
                          value={dropoffLocation}
                          onChange={(e) => setDropoffLocation(e.target.value)}
                          className="w-full bg-transparent border-none p-0 text-text-main font-bold focus:ring-0 text-lg font-display appearance-none !bg-none cursor-pointer pr-10 hover:text-primary transition-colors relative z-10"
                        >
                          <option value="Aéroport Oujda-Angads">Aéroport Oujda-Angads (OUD)</option>
                          <option value="Aéroport Nador-El Aroui">Aéroport Nador-El Aroui (NDR)</option>
                          <option value="Aéroport Fès-Saïss">Aéroport Fès-Saïss (FEZ)</option>
                          <option value="autre">Autre emplacement...</option>
                        </select>
                        <span className="material-symbols-outlined absolute right-0 text-primary pointer-events-none text-2xl z-0">expand_more</span>
                      </div>
                      {dropoffLocation === 'autre' && (
                        <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-300">
                          <input
                            type="text"
                            placeholder="Précisez le lieu de restitution..."
                            value={customDropoffLocation}
                            onChange={(e) => setCustomDropoffLocation(e.target.value)}
                            className="w-full bg-white border border-border-color rounded-xl px-4 py-3 text-sm font-body focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none shadow-sm transition-all"
                          />
                        </div>
                      )}
                    </div>
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
                    {/* Time Selector - Custom Dropdown for AM/PM */}
                    <div
                      className="px-4 pb-3 hover:bg-gray-50 transition-colors relative border-t border-dashed border-gray-100"
                    >
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-text-muted text-xs font-medium">Heure:</span>
                          <select
                            value={pickupTime}
                            onChange={(e) => setPickupTime(e.target.value)}
                            className="bg-transparent border-none p-0 text-text-main text-sm font-bold font-display cursor-pointer focus:ring-0 appearance-none flex-1"
                          >
                            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <span className="material-symbols-outlined text-black text-lg pointer-events-none">schedule</span>
                      </div>
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
                      className="px-4 pb-3 hover:bg-gray-50 transition-colors relative border-t border-dashed border-gray-100"
                    >
                      <div className="flex items-center justify-between mt-1">
                        <div className="flex items-center gap-2 flex-1">
                          <span className="text-text-muted text-xs font-medium">Heure:</span>
                          <select
                            value={dropoffTime}
                            onChange={(e) => setDropoffTime(e.target.value)}
                            className="bg-transparent border-none p-0 text-text-main text-sm font-bold font-display cursor-pointer focus:ring-0 appearance-none flex-1"
                          >
                            {timeOptions.map(t => <option key={t} value={t}>{t}</option>)}
                          </select>
                        </div>
                        <span className="material-symbols-outlined text-black text-lg pointer-events-none">schedule</span>
                      </div>
                    </div>
                  </div>

                  {/* Optional Transmission Toggle for specific cars */}
                  {isConfigurableCar && (
                    <div className="mt-4 animate-in fade-in slide-in-from-top-2 duration-300">
                      <label className="block text-[10px] font-extrabold text-text-muted uppercase tracking-wider mb-2">Boîte de vitesse souhaitée</label>
                      <div className="flex gap-3">
                        {['Manuelle', 'Automatique'].map((t) => (
                          <button
                            key={t}
                            onClick={() => handleTransmissionSwitch(t)}
                            className={`flex-1 py-3 px-4 rounded-xl border-2 font-bold font-display transition-all flex items-center justify-center gap-2 ${selectedTransmission === t
                              ? 'border-primary bg-primary/5 text-text-main shadow-sm'
                              : 'border-border-color bg-white text-text-muted hover:border-primary/50'
                              }`}
                          >
                            <span className="material-symbols-outlined text-lg">
                              {t === 'Manuelle' ? 'settings' : 'smart_toy'}
                            </span>
                            <span className="text-sm">{t}</span>
                            {t === 'Automatique' && car.transmission === 'Manuelle' && (
                              <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded-full ml-1">+50 MAD/j</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* New Section: Full Vehicle Details */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="size-10 rounded-full bg-white border border-border-color flex items-center justify-center font-bold text-text-muted shadow-sm">
                  <span className="material-symbols-outlined text-sm">info</span>
                </div>
                <h2 className="text-xl font-bold text-text-main font-display">Détails complets du véhicule</h2>
              </div>

              <div className="bg-white rounded-2xl p-6 md:p-8 border border-border-color shadow-soft">
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-y-8 gap-x-4">
                  {/* Seats */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-text-muted">
                      <span className="material-symbols-outlined text-xl">group</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Personnes</span>
                    </div>
                    <p className="text-text-main font-bold font-display">{car.seats} personnes</p>
                  </div>

                  {/* Doors */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-text-muted">
                      <span className="material-symbols-outlined text-xl">sensor_door</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Portes</span>
                    </div>
                    <p className="text-text-main font-bold font-display">{car.doors || 5} portes</p>
                  </div>

                  {/* AC */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-text-muted">
                      <span className="material-symbols-outlined text-xl">ac_unit</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Confort</span>
                    </div>
                    <p className="text-text-main font-bold font-display">{car.airConditioning !== false ? 'Climatisation' : 'Standard'}</p>
                  </div>

                  {/* Transmission */}
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2 text-text-muted">
                      <span className="material-symbols-outlined text-xl">settings</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Vitesse</span>
                    </div>
                    <p className="text-text-main font-bold font-display">{selectedTransmission}</p>
                  </div>

                  {/* Min Age */}
                  <div className="flex flex-col gap-2 col-span-2 sm:col-span-2">
                    <div className="flex items-center gap-2 text-text-muted">
                      <span className="material-symbols-outlined text-xl">person_add</span>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider">Condition</span>
                    </div>
                    <p className="text-text-main font-bold font-display">Âge minimum pour conduire : {car.minAge || 21} ans</p>
                  </div>
                </div>

                {/* Base Protection Info */}
                <div className="mt-10 pt-10 border-t border-dashed border-border-color">
                  <span className="text-[10px] font-black text-red-600 uppercase tracking-[0.2em] mb-2 block">Compris</span>
                  <h3 className="text-2xl font-black text-text-main font-display mb-1">Protection de base</h3>
                  <p className="text-text-main font-bold font-display text-lg mb-6">Excédent : 10 000,00 MAD</p>

                  <div className="flex flex-col gap-3 mb-8">
                    <div className="flex items-center gap-3 text-text-main font-bold font-display text-sm">
                      <span className="material-symbols-outlined text-green-600 text-xl font-bold">check</span>
                      Protection contre les dommages causés par une collision
                    </div>
                    <div className="flex items-center gap-3 text-text-main font-bold font-display text-sm">
                      <span className="material-symbols-outlined text-green-600 text-xl font-bold">check</span>
                      Protection contre le vol
                    </div>
                    <div className="flex items-center gap-3 text-red-600 font-bold font-display text-sm">
                      <span className="material-symbols-outlined text-red-600 text-xl font-bold">warning</span>
                      En cas d'accident fautif : 10 000 MAD
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl border border-border-color/50 text-xs text-text-muted font-medium">
                    <span className="material-symbols-outlined text-text-muted text-lg">info</span>
                    Vous pourrez améliorer votre protection après avoir sélectionné ce véhicule.
                  </div>
                </div>
              </div>
            </section>

            {/* New Section: Kilométrage */}
            <section>
              <div className="flex items-center gap-4 mb-6">
                <div className="size-10 rounded-full bg-white border border-border-color flex items-center justify-center font-bold text-text-muted shadow-sm">
                  <span className="material-symbols-outlined text-sm">speed</span>
                </div>
                <h2 className="text-xl font-bold text-text-main font-display">Kilométrage</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div
                  onClick={() => setMileageType('limited')}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer shadow-soft group ${mileageType === 'limited' ? 'border-primary bg-primary/5' : 'border-border-color bg-white hover:border-primary/30'}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-lg flex items-center justify-center transition-colors ${mileageType === 'limited' ? 'bg-primary text-white' : 'bg-gray-100 text-text-muted group-hover:bg-primary/10 group-hover:text-primary'}`}>
                        <span className="material-symbols-outlined">distance</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-text-main font-display">Limité</h3>
                        <p className="text-xs text-text-muted font-bold font-display">250 km / jour</p>
                      </div>
                    </div>
                    <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-colors ${mileageType === 'limited' ? 'border-primary bg-primary' : 'border-border-color'}`}>
                      {mileageType === 'limited' && <div className="size-2 rounded-full bg-white" />}
                    </div>
                  </div>
                  <div className="p-3 bg-white/50 rounded-xl border border-border-color/30 text-[10px] font-bold text-text-muted uppercase tracking-tight">
                    Inclus gratuitement (Standard)
                  </div>
                </div>

                <div
                  onClick={() => setMileageType('unlimited')}
                  className={`p-6 rounded-2xl border transition-all cursor-pointer shadow-soft group ${mileageType === 'unlimited' ? 'border-primary bg-primary/5' : 'border-border-color bg-white hover:border-primary/30'}`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`size-10 rounded-lg flex items-center justify-center transition-colors ${mileageType === 'unlimited' ? 'bg-primary text-white' : 'bg-gray-100 text-text-muted group-hover:bg-primary/10 group-hover:text-primary'}`}>
                        <span className="material-symbols-outlined">all_inclusive</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-text-main font-display">Illimité</h3>
                        <p className="text-xs text-text-muted font-bold font-display">Liberté Totale</p>
                      </div>
                    </div>
                    <div className={`size-6 rounded-full border-2 flex items-center justify-center transition-colors ${mileageType === 'unlimited' ? 'border-primary bg-primary' : 'border-border-color'}`}>
                      {mileageType === 'unlimited' && <div className="size-2 rounded-full bg-white" />}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-red-50 rounded-xl border border-red-100 animate-pulse text-[9px] font-black text-red-600 uppercase tracking-tight">
                    <span className="material-symbols-outlined text-xs">info</span>
                    Note: +1 MAD pour chaque km supérieur à 250 km
                  </div>
                </div>
              </div>
            </section>


            {/* Protection Plans Section */}
            <section>
              <div className="flex flex-col gap-2 mb-6">
                <h2 className="text-2xl font-bold text-text-main font-display">Choisissez votre protection et vos options supplémentaires</h2>
                <p className="text-lg font-bold text-text-main font-display">Plans de protection</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Basique Plan */}
                <div
                  onClick={() => setProtectionPlan('basique')}
                  className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer shadow-soft ${protectionPlan === 'basique' ? 'border-green-600 bg-green-50/30' : 'border-border-color bg-white hover:border-primary/30'}`}
                >
                  {protectionPlan === 'basique' && (
                    <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Choisi
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-black text-text-main font-display">Basique</h3>
                      <span className="text-primary text-lg">★</span>
                    </div>
                    <p className="text-sm font-bold text-text-main">Excédent : 10 000,00 MAD</p>
                  </div>

                  <div className="mb-6">
                    <span className="inline-block text-xs font-black text-green-700 uppercase tracking-wider bg-green-100 px-2 py-1 rounded">Compris</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">check</span>
                      <p className="text-sm text-text-main font-medium">Protection contre les dommages en cas de collision et le vol</p>
                    </div>
                    <div className="flex items-start gap-2 opacity-40">
                      <span className="material-symbols-outlined text-gray-400 text-lg mt-0.5">close</span>
                      <p className="text-sm text-gray-400 font-medium line-through">Protection du pare-brise, des vitres, des phares et des pneus</p>
                    </div>
                    <div className="flex items-start gap-2 opacity-40">
                      <span className="material-symbols-outlined text-gray-400 text-lg mt-0.5">close</span>
                      <p className="text-sm text-gray-400 font-medium line-through">Protection contre les accidents corporels</p>
                    </div>
                    <div className="flex items-start gap-2 opacity-40">
                      <span className="material-symbols-outlined text-gray-400 text-lg mt-0.5">close</span>
                      <p className="text-sm text-gray-400 font-medium line-through">Protection des effets personnels</p>
                    </div>
                  </div>

                  <button
                    className={`w-full py-3 rounded-xl font-bold transition-all ${protectionPlan === 'basique'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-white border-2 border-border-color text-text-main hover:border-primary'
                      }`}
                    disabled={protectionPlan === 'basique'}
                  >
                    {protectionPlan === 'basique' ? 'Sélectionné' : 'Choisir'}
                  </button>
                </div>

                {/* Moyen Plan */}
                <div
                  onClick={() => setProtectionPlan('moyen')}
                  className={`relative p-6 rounded-2xl border-2 transition-all cursor-pointer shadow-soft ${protectionPlan === 'moyen' ? 'border-green-600 bg-green-50/30' : 'border-border-color bg-white hover:border-primary/30'}`}
                >
                  {protectionPlan === 'moyen' && (
                    <div className="absolute top-4 right-4 bg-green-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase">
                      Choisi
                    </div>
                  )}

                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-black text-text-main font-display">Moyen</h3>
                      <span className="text-primary text-lg">★★</span>
                    </div>
                    <p className="text-sm font-bold text-text-main">Excédent : 6 000,00 MAD</p>
                  </div>

                  <div className="mb-6">
                    <p className="text-2xl font-black text-text-main font-display">144,00 MAD<span className="text-sm font-normal">/jour</span></p>
                    <p className="text-xs text-text-muted font-bold">TOTAL {(144 * days).toFixed(2)} MAD</p>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">check</span>
                      <p className="text-sm text-text-main font-medium">Protection contre les dommages en cas de collision et le vol</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">check</span>
                      <p className="text-sm text-text-main font-medium">Protection du pare-brise, des vitres, des phares et des pneus</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-green-600 text-lg mt-0.5">check</span>
                      <p className="text-sm text-text-main font-medium">Protection contre les accidents corporels</p>
                    </div>
                    <div className="flex items-start gap-2 opacity-40">
                      <span className="material-symbols-outlined text-gray-400 text-lg mt-0.5">close</span>
                      <p className="text-sm text-gray-400 font-medium line-through">Protection des effets personnels</p>
                    </div>
                  </div>

                  <button
                    className={`w-full py-3 rounded-xl font-bold transition-all ${protectionPlan === 'moyen'
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-primary text-text-main hover:shadow-lg'
                      }`}
                  >
                    {protectionPlan === 'moyen' ? 'Sélectionné' : 'Sélectionner'}
                  </button>
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
                      <p className="font-bold text-text-main font-display">
                        {extra.price} MAD
                        {extra.isPerDay && <span className="text-xs font-normal text-text-muted">/j</span>}
                      </p>
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
                    placeholder="Nom Complet"
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
                  <input
                    type="text"
                    placeholder="CIN / Passeport"
                    value={driverId}
                    onChange={(e) => setDriverId(e.target.value)}
                    className="h-14 px-4 rounded-xl border border-border-color bg-background-light focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text-main outline-none font-body md:col-span-2"
                  />
                </div>

                {selectedExtras.includes('driver') && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                    <h3 className="text-lg font-bold mb-4 font-display flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary">person_add</span>
                      Informations du 2ème Conducteur
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                      <input
                        type="text"
                        placeholder="Nom Complet (2ème Conducteur)"
                        value={secondDriverName}
                        onChange={(e) => setSecondDriverName(e.target.value)}
                        className="h-14 px-4 rounded-xl border border-border-color bg-background-light focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text-main outline-none font-body"
                      />
                      <input
                        type="tel"
                        placeholder="Téléphone (2ème Conducteur)"
                        value={secondDriverPhone}
                        onChange={(e) => setSecondDriverPhone(e.target.value)}
                        className="h-14 px-4 rounded-xl border border-border-color bg-background-light focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text-main outline-none font-body"
                      />
                      <input
                        type="text"
                        placeholder="CIN / Passeport (2ème Conducteur)"
                        value={secondDriverId}
                        onChange={(e) => setSecondDriverId(e.target.value)}
                        className="h-14 px-4 rounded-xl border border-border-color bg-background-light focus:ring-2 focus:ring-primary focus:border-primary transition-all text-text-main outline-none font-body md:col-span-2"
                      />
                    </div>
                  </div>
                )}

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
                  <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105" style={{ backgroundImage: `url("${resolveImageSrc(car.image)}")` }}></div>
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/60 to-transparent p-4">
                    <span className="inline-block px-3 py-1 bg-primary text-text-main text-xs font-bold rounded-full mb-1 uppercase">{car.category}</span>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-text-main leading-tight font-display">{car.name}</h3>
                      <p className="text-text-muted text-sm mt-1 font-body">{selectedTransmission} • {car.fuel}</p>
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
                      <span className="font-bold text-text-main">{car.price + transmissionExtra + protectionPlanDailyPrice} MAD</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-text-muted">Protection ({protectionPlan === 'moyen' ? 'Moyen' : 'Basique'})</span>
                      <span className="font-bold text-text-main">{(protectionPlanDailyPrice * days).toFixed(2)} MAD</span>
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