import React from 'react';

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative pt-40 pb-20 px-4 sm:px-10 lg:px-20 overflow-hidden">
        {/* Background Decor */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-gray-50 to-transparent -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-accent-gold/5 rounded-full blur-3xl -z-10"></div>

        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-display font-black text-gray-900 mb-4">
              AUSFOUR CAR
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              L'excellence de la location automobile au Maroc
            </p>
          </div>

      {/* Mission Section */}
      <section className="max-w-4xl mx-auto mb-20">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 flex items-center">
          <span className="w-8 h-1 bg-amber-500 mr-4"></span>
          Notre Mission
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed mb-8">
          Chez AUSFOUR CAR, nous avons pour ambition d'offrir bien plus qu'un simple service de location.
          Nous créons une expérience de mobilité raffinée, alliant confort absolu, sécurité optimale et service sur-mesure. 
          Chaque véhicule est sélectionné avec exigence afin de répondre aux standards les plus élevés et de vous accompagner 
          avec élégance dans tous vos déplacements à travers le Maroc.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-12 flex items-center">
          <span className="w-8 h-1 bg-amber-500 mr-4"></span>
          Notre Vision
        </h2>
        <p className="text-gray-700 text-lg leading-relaxed">
          Être la référence premium de la location automobile au Maroc, reconnue pour son professionnalisme, sa fiabilité et son sens du détail.
          AUSFOUR CAR s'inscrit dans une démarche d'excellence continue, en proposant une flotte moderne et performante, 
          tout en cultivant une relation de confiance durable avec ses clients.
        </p>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Pourquoi choisir AUSFOUR CAR ?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Une flotte d'exception</h3>
              <p className="text-gray-600">
                Des véhicules haut de gamme, récents et méticuleusement entretenus pour votre confort et votre sécurité.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Flexibilité optimale</h3>
              <p className="text-gray-600">
                Des solutions de location flexibles et personnalisées adaptées à tous vos besoins de déplacement.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Service Premium 24/7</h3>
              <p className="text-gray-600">
                Un service client discret, réactif et disponible 24h/24 – 7j/7 pour une assistance optimale.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Transparence absolue</h3>
              <p className="text-gray-600">
                Une politique tarifaire claire, transparente et sans mauvaise surprise pour une location en toute sérénité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Benefits */}
      <section className="max-w-4xl mx-auto mt-20 mb-16">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8 text-center">
          Nos avantages exclusifs
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-amber-100 p-2 rounded-lg">
              <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Siège bébé offert</h3>
              <p className="mt-1 text-gray-600">Pour un confort familial optimal et des trajets en toute sécurité.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 bg-amber-100 p-2 rounded-lg">
              <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Assistance 24/7</h3>
              <p className="mt-1 text-gray-600">Dépannage immédiat, partout et à tout moment sur simple appel.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 bg-amber-100 p-2 rounded-lg">
              <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Assurance Tous Risques</h3>
              <p className="mt-1 text-gray-600">Incluse pour une sérénité totale lors de votre location.</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="flex-shrink-0 bg-amber-100 p-2 rounded-lg">
              <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-medium text-gray-900">Conseils personnalisés</h3>
              <p className="mt-1 text-gray-600">Un accompagnement sur mesure pour un voyage d'exception.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <div className="text-center mt-12">
        <p className="text-2xl font-bold text-gray-900 mb-6">
          ✨ AUSFOUR CAR, l'élégance du mouvement, la sérénité en plus
        </p>
        <a
          href="/fleet"
          className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-amber-600 hover:bg-amber-700 md:py-4 md:text-lg md:px-10 transition-colors duration-200"
        >
          Découvrir notre flotte
          <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
        </div>
      </div>
    </div>
  );
};

export default About;
