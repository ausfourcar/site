import React from 'react';

const Contact: React.FC = () => {
  return (
    <div className="pt-36 pb-20 min-h-screen">
      <div className="max-w-[1280px] mx-auto px-6 md:px-10 flex flex-col gap-16">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-border-subtle pb-10">
          <div className="flex flex-col gap-4 max-w-2xl">
            <span className="text-primary-dark font-bold tracking-widest uppercase text-sm font-display">Support 24/7</span>
            <h1 className="text-text-main text-5xl md:text-6xl font-black leading-tight tracking-tighter font-display">
              CONTACTEZ-NOUS
            </h1>
            <p className="text-text-muted text-lg md:text-xl font-medium leading-relaxed max-w-lg font-body">
              Découvrez le summum du voyage de luxe marocain. Que vous ayez besoin d'un devis ou d'une réponse, notre équipe est prête à vous aider.
            </p>
          </div>
          {/* Socials (Top) */}
          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/1CnZwze9FQ/" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center w-12 h-12 rounded-full border border-border-subtle hover:border-primary hover:bg-primary/10 transition-all duration-300">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-text-main group-hover:text-black">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.79-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="https://www.instagram.com/ausfour_car?igsh=Z2ZneW5kb2RxNG5w" target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center w-12 h-12 rounded-full border border-border-subtle hover:border-primary hover:bg-primary/10 transition-all duration-300">
              <svg fill="currentColor" viewBox="0 0 24 24" className="w-5 h-5 text-text-main group-hover:text-black">
                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a href="mailto:ausfourcar@gmail.com" className="group flex items-center justify-center w-12 h-12 rounded-full border border-border-subtle hover:border-primary hover:bg-primary/10 transition-all duration-300">
              <span className="material-symbols-outlined text-text-main group-hover:text-black" style={{ fontSize: '20px' }}>mail</span>
            </a>
          </div>
        </div>

        {/* Content Grid: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left Column: Contact Details & Map */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-8">
              {/* Contact Item: Phone */}
              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-background-light border border-border-subtle flex items-center justify-center group-hover:border-primary transition-colors duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-text-main" style={{ fontSize: '24px' }}>call</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-text-muted text-sm font-bold uppercase tracking-wide font-display">Téléphone</h3>
                  <div className="flex flex-col">
                    <p className="text-text-main text-lg font-bold leading-none hover:text-primary-hover transition-colors cursor-pointer font-display">+212 643 193 316</p>
                    <p className="text-text-main text-lg font-bold leading-none hover:text-primary-hover transition-colors cursor-pointer font-display mt-2">+212 675 010 606</p>
                    <p className="text-text-main text-lg font-bold leading-none hover:text-primary-hover transition-colors cursor-pointer font-display mt-2">+212 612 100 800</p>
                  </div>
                  <p className="text-text-muted text-sm mt-2 font-body">Disponible 24/7 pour les demandes urgentes.</p>
                </div>
              </div>
              {/* Contact Item: Address */}
              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-background-light border border-border-subtle flex items-center justify-center group-hover:border-primary transition-colors duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-text-main" style={{ fontSize: '24px' }}>location_on</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-text-muted text-sm font-bold uppercase tracking-wide font-display">Siège Social</h3>
                  <p className="text-text-main text-xl font-bold leading-tight font-display">Oujda, Maroc</p>
                  <p className="text-text-muted text-sm mt-1 font-body">Nr 366, Lotissement Boustane 2, Oujda 60000</p>
                </div>
              </div>
              {/* Contact Item: Email */}
              <div className="flex gap-5 group">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-background-light border border-border-subtle flex items-center justify-center group-hover:border-primary transition-colors duration-300 shadow-sm">
                  <span className="material-symbols-outlined text-text-main" style={{ fontSize: '24px' }}>alternate_email</span>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-text-muted text-sm font-bold uppercase tracking-wide font-display">Email</h3>
                  <p className="text-text-main text-xl font-bold leading-tight hover:text-primary-hover transition-colors cursor-pointer font-display">ausfourcar@gmail.com</p>
                  <p className="text-text-muted text-sm mt-1 font-body">Nous répondons généralement sous 2 heures.</p>
                </div>
              </div>
            </div>
            {/* Map Iframe */}
            <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden shadow-sm border border-border-subtle mt-4 group">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d410.05296870430266!2d-1.8860544383394267!3d34.6944904977924!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd7863c73d03844f%3A0x7763dc82f276fdd0!2sAusfour%20Car%20Location%20de%20voitures!5e0!3m2!1sfr!2sma!4v1765723683337!5m2!1sfr!2sma" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ausfour Car Location Map"
              ></iframe>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-border-subtle p-8 md:p-12 shadow-[0_2px_40px_-12px_rgba(0,0,0,0.05)]">
              <h2 className="text-2xl font-bold text-text-main mb-8 tracking-tight font-display">Envoyer un Message</h2>
              <form className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <label className="flex flex-col flex-1 group">
                    <span className="text-text-main text-sm font-bold mb-2 ml-1 group-focus-within:text-primary-dark transition-colors font-display">Nom Complet</span>
                    <input type="text" placeholder="ex. Ahmed Benali" className="w-full h-14 px-4 bg-background-light rounded-lg border border-border-subtle text-text-main placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 font-body" />
                  </label>
                  <label className="flex flex-col flex-1 group">
                    <span className="text-text-main text-sm font-bold mb-2 ml-1 group-focus-within:text-primary-dark transition-colors font-display">Adresse Email</span>
                    <input type="email" placeholder="ex. ahmed@exemple.com" className="w-full h-14 px-4 bg-background-light rounded-lg border border-border-subtle text-text-main placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 font-body" />
                  </label>
                </div>
                <label className="flex flex-col w-full group">
                  <span className="text-text-main text-sm font-bold mb-2 ml-1 group-focus-within:text-primary-dark transition-colors font-display">Sujet</span>
                  <div className="relative">
                    <input type="text" placeholder="Demande concernant..." className="w-full h-14 px-4 bg-background-light rounded-lg border border-border-subtle text-text-main placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all duration-300 font-body" />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted pointer-events-none">
                      <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>expand_more</span>
                    </div>
                  </div>
                </label>
                <label className="flex flex-col w-full group">
                  <span className="text-text-main text-sm font-bold mb-2 ml-1 group-focus-within:text-primary-dark transition-colors font-display">Message</span>
                  <textarea placeholder="Parlez-nous des détails de votre voyage ou de vos besoins..." className="w-full h-40 px-4 py-4 bg-background-light rounded-lg border border-border-subtle text-text-main placeholder-text-muted focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none transition-all duration-300 font-body"></textarea>
                </label>
                <div className="pt-4">
                  <button type="button" className="w-full md:w-auto px-10 h-14 rounded-lg bg-gradient-to-r from-primary to-[#ebe705] text-black font-black uppercase tracking-wide text-sm hover:shadow-[0_4px_20px_rgba(249,245,6,0.4)] hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-2 font-display">
                    <span>Envoyer</span>
                    <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;