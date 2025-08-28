'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  MapPin, 
  Users, 
  Bed, 
  Bath, 
  Wifi,
  Car,
  Waves,
  Sun,
  Coffee,
  Dumbbell,
  Wind,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Star,
  Check,
  X
} from 'lucide-react'

interface VillasPageClientProps {
  dictionary: any
  locale: string
}

export default function VillasPageClient({ dictionary, locale }: VillasPageClientProps) {
  const [selectedVilla, setSelectedVilla] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: string]: number }>({
    onaya: 0,
    suyai: 0
  })

  const t = dictionary?.villasPage || {}

  const villas = [
    {
      id: 'onaya',
      name: 'ONAYA Bali Resort',
      tagline: locale === 'es-ES' ? 'Boutique en Acantilado con Vistas Infinitas al Océano' : 'Clifftop Boutique with Infinite Ocean Views',
      description: locale === 'es-ES' ? 
        'Encaramado dramáticamente en los acantilados de Uluwatu, ONAYA Bali Resort ofrece una experiencia boutique incomparable donde el diseño moderno se encuentra con la hospitalidad tradicional balinesa. Este exclusivo santuario en el acantilado cuenta con impresionantes vistas panorámicas del océano, comodidades de clase mundial y acceso directo a una playa privada prístina.' :
        'Perched dramatically on the cliffs of Uluwatu, ONAYA Bali Resort offers an unparalleled boutique experience where modern design meets traditional Balinese hospitality. This exclusive clifftop sanctuary features breathtaking panoramic ocean views, world-class amenities, and direct access to a pristine private beach.',
      longDescription: locale === 'es-ES' ?
        `ONAYA Bali Resort representa el pináculo del alojamiento boutique en Uluwatu. Esta obra maestra arquitectónica se mezcla perfectamente con el paisaje natural del acantilado mientras ofrece espectaculares vistas de 180 grados del Océano Índico.

El resort cuenta con múltiples pabellones conectados por senderos escénicos, cada uno diseñado para maximizar la privacidad mientras celebra los impresionantes alrededores naturales. La piscina infinita parece fusionarse con el horizonte del océano, creando una experiencia visual inolvidable.

Los huéspedes disfrutan de acceso exclusivo a un club de playa privado a través de un dramático ascensor en el acantilado, donde la arena blanca prístina se encuentra con aguas cristalinas. El reconocido restaurante del resort sirve cocina indonesia contemporánea con ingredientes obtenidos de granjas orgánicas locales.` :
        `ONAYA Bali Resort represents the pinnacle of boutique accommodation in Uluwatu. This architectural masterpiece seamlessly blends into the natural cliff landscape while offering spectacular 180-degree views of the Indian Ocean. 

The resort features multiple pavilions connected by scenic walkways, each designed to maximize privacy while celebrating the stunning natural surroundings. The infinity pool appears to merge with the ocean horizon, creating an unforgettable visual experience.

Guests enjoy exclusive access to a private beach club via a dramatic cliff-side elevator, where pristine white sand meets crystal-clear waters. The resort's renowned restaurant serves contemporary Indonesian cuisine with ingredients sourced from local organic farms.`,
      location: 'Jl. Belimbing Sari, Pecatu, Uluwatu',
      coordinates: { lat: -8.8305, lng: 115.0854 },
      pricePerNight: {
        low: 850,
        mid: 1200,
        high: 1800
      },
      maxGuests: 12,
      bedrooms: 5,
      bathrooms: 6,
      size: '850 sqm',
      images: [
        '/images/placeholder.svg',
        '/images/placeholder.svg',
        '/images/placeholder.svg',
        '/images/placeholder.svg',
        '/images/placeholder.svg',
        '/images/placeholder.svg',
      ],
      amenities: [
        { icon: Waves, label: locale === 'es-ES' ? 'Acceso a Playa Privada' : 'Private Beach Access' },
        { icon: Sun, label: locale === 'es-ES' ? 'Piscina Infinita' : 'Infinity Pool' },
        { icon: Coffee, label: locale === 'es-ES' ? 'Chef Privado' : 'Private Chef' },
        { icon: Dumbbell, label: locale === 'es-ES' ? 'Centro de Fitness' : 'Fitness Center' },
        { icon: Wifi, label: locale === 'es-ES' ? 'WiFi de Alta Velocidad' : 'High-Speed WiFi' },
        { icon: Car, label: locale === 'es-ES' ? 'Traslado al Aeropuerto' : 'Airport Transfer' },
        { icon: Wind, label: locale === 'es-ES' ? 'AC en Todas las Habitaciones' : 'AC in All Rooms' },
      ],
      highlights: locale === 'es-ES' ? [
        'Ubicación dramática en acantilado con vistas al océano de 180°',
        'Club de playa privado con acceso por ascensor',
        'Arquitectura y diseño galardonados',
        'Spa de servicio completo con vista al océano',
        'Servicio de mayordomo y conserje personal',
        'Sesiones de yoga diarias al amanecer',
        'Puntos de surf de clase mundial cerca',
        'A minutos del Templo de Uluwatu'
      ] : [
        'Dramatic clifftop location with 180° ocean views',
        'Private beach club with elevator access',
        'Award-winning architecture and design',
        'Full-service spa overlooking the ocean',
        'Personal butler and concierge service',
        'Daily yoga sessions at sunrise',
        'World-class surfing spots nearby',
        'Minutes from Uluwatu Temple'
      ],
      reviews: {
        average: 4.9,
        count: 127,
        featured: {
          author: 'Emma Thompson',
          date: locale === 'es-ES' ? 'Octubre 2024' : 'October 2024',
          rating: 5,
          text: locale === 'es-ES' ? 
            'ONAYA superó todas las expectativas. El entorno del acantilado es impresionante, el servicio impecable y la playa privada es el paraíso. Así es como debe hacerse el boutique en Bali.' :
            'ONAYA exceeded every expectation. The clifftop setting is breathtaking, the service impeccable, and the private beach is paradise. This is how boutique should be done in Bali.'
        }
      }
    },
    {
      id: 'suyai',
      name: 'SUYAI Villa Bali',
      tagline: locale === 'es-ES' ? 'Refugio Boutique Íntimo Sobre las Olas' : 'Intimate Boutique Haven Above the Waves',
      description: locale === 'es-ES' ?
        'SUYAI Villa ofrece una experiencia boutique íntima con amplias vistas al océano y diseño balinés contemporáneo. Esta villa privada combina el confort moderno con la artesanía tradicional, creando un santuario sereno perfecto para escapadas románticas o retiros familiares pequeños.' :
        'SUYAI Villa offers an intimate boutique experience with sweeping ocean views and contemporary Balinese design. This private villa combines modern comfort with traditional craftsmanship, creating a serene sanctuary perfect for romantic getaways or small family retreats.',
      longDescription: locale === 'es-ES' ?
        `SUYAI Villa Bali es una joya escondida anidada en los dramáticos acantilados de Uluwatu, ofreciendo un refugio exclusivo para viajeros exigentes. Esta villa boutique muestra arquitectura tropical contemporánea con acentos balineses tradicionales, creando una mezcla armoniosa de boutique y autenticidad.

La villa cuenta con espacios de vida de planta abierta que fluyen sin problemas hacia amplias terrazas, donde el límite entre la vida interior y exterior se disuelve. La impresionante piscina infinita de 15 metros domina el océano, proporcionando el punto de vista perfecto para los legendarios atardeceres de Bali.

Cada habitación es un santuario privado con vistas al océano, ropa de cama boutique y baños inspirados en spa. El equipo dedicado de la villa, incluido un chef privado y un gerente de villa, garantiza que cada detalle de su estadía sea perfecto.` :
        `SUYAI Villa Bali is a hidden gem nestled on the dramatic cliffs of Uluwatu, offering an exclusive retreat for discerning travelers. This boutique villa showcases contemporary tropical architecture with traditional Balinese accents, creating a harmonious blend of boutique and authenticity.

The villa features open-plan living spaces that flow seamlessly onto expansive terraces, where the boundary between indoor and outdoor living dissolves. The stunning 15-meter infinity pool overlooks the ocean, providing the perfect vantage point for Bali's legendary sunsets.

Each bedroom is a private sanctuary with ocean views, boutique linens, and spa-inspired bathrooms. The villa's dedicated team, including a private chef and villa manager, ensures every detail of your stay is perfect.`,
      location: 'Jl. Goa Lempeh, Pecatu, Uluwatu',
      coordinates: { lat: -8.8412, lng: 115.0867 },
      pricePerNight: {
        low: 450,
        mid: 650,
        high: 950
      },
      maxGuests: 6,
      bedrooms: 3,
      bathrooms: 3,
      size: '420 sqm',
      images: [
        '/images/placeholder.svg',
        '/images/placeholder.svg',
        '/images/placeholder.svg',
        '/images/placeholder.svg',
        '/images/placeholder.svg',
        '/images/placeholder.svg',
      ],
      amenities: [
        { icon: Sun, label: locale === 'es-ES' ? 'Piscina Infinita' : 'Infinity Pool' },
        { icon: Coffee, label: locale === 'es-ES' ? 'Chef Privado' : 'Private Chef' },
        { icon: Wifi, label: locale === 'es-ES' ? 'WiFi de Fibra' : 'Fiber WiFi' },
        { icon: Car, label: locale === 'es-ES' ? 'Estacionamiento Gratuito' : 'Free Parking' },
        { icon: Wind, label: locale === 'es-ES' ? 'Aire Acondicionado' : 'Air Conditioning' },
        { icon: Waves, label: locale === 'es-ES' ? 'Vistas al Océano' : 'Ocean Views' },
      ],
      highlights: locale === 'es-ES' ? [
        'Espectacular ubicación en acantilado con vistas al océano',
        'Piscina infinita de 15 metros con vista al mar',
        'Diseño contemporáneo con toques balineses',
        'Chef privado para todas las comidas',
        'Servicio diario de limpieza y mayordomo',
        'A poca distancia de las playas',
        'Cerca de los mejores restaurantes de Uluwatu',
        '10 minutos del Templo de Uluwatu'
      ] : [
        'Spectacular clifftop location with ocean views',
        '15-meter infinity pool overlooking the sea',
        'Contemporary design with Balinese touches',
        'Private chef for all meals',
        'Daily housekeeping and butler service',
        'Walking distance to beaches',
        'Close to Uluwatu\'s best restaurants',
        '10 minutes from Uluwatu Temple'
      ],
      reviews: {
        average: 4.8,
        count: 89,
        featured: {
          author: 'Michael Chen',
          date: locale === 'es-ES' ? 'Noviembre 2024' : 'November 2024',
          rating: 5,
          text: locale === 'es-ES' ?
            'SUYAI Villa es la perfección. La ubicación es inmejorable, la villa es impresionante y el personal hizo todo lo posible. Nos sentimos como de la realeza durante toda nuestra estadía.' :
            'SUYAI Villa is perfection. The location is unbeatable, the villa is stunning, and the staff went above and beyond. We felt like royalty throughout our stay.'
        }
      }
    }
  ]

  const nextImage = (villaId: string, imagesLength: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [villaId]: (prev[villaId] + 1) % imagesLength
    }))
  }

  const prevImage = (villaId: string, imagesLength: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [villaId]: prev[villaId] === 0 ? imagesLength - 1 : prev[villaId] - 1
    }))
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-sand-light flex items-center justify-center overflow-hidden">
        <div className="relative z-20 text-center text-deep-green max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl mb-4">
            {t.hero?.title || 'Our Villas'}
          </h1>
          <p className="text-xl sm:text-2xl text-deep-green/80">
            {t.hero?.subtitle || 'Where Dramatic Cliffs Meet Boutique Living'}
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-deep-green/80">
            <MapPin className="w-5 h-5" />
            <span>{t.hero?.location || 'Uluwatu, Bali'}</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-deep-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6">
              {t.introduction?.title || 'Discover Our Finest Villas'}
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              {t.introduction?.description || "Perched on limestone cliffs overlooking the Indian Ocean, our villas offer some of Bali's most spectacular villa experiences. From world-class surf breaks to ancient temples, boutique beach clubs to dramatic sunsets, this is where adventure meets absolute boutique."}
            </p>
          </div>
        </div>
      </section>

      {/* Villa Listings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-24">
            {villas.map((villa, index) => (
              <div key={villa.id} className={`${index % 2 === 1 ? 'lg:flex-row-reverse' : ''} lg:flex gap-12 items-center`}>
                {/* Image Gallery */}
                <div className="lg:w-1/2 mb-8 lg:mb-0">
                  <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group">
                    <Image
                      src={villa.images[currentImageIndex[villa.id] || 0]}
                      alt={`${villa.name} - Image ${currentImageIndex[villa.id] + 1}`}
                      fill
                      className="object-cover"
                    />
                    
                    {/* Navigation Arrows */}
                    <button
                      onClick={() => prevImage(villa.id, villa.images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronLeft className="w-6 h-6 text-deep-green" />
                    </button>
                    <button
                      onClick={() => nextImage(villa.id, villa.images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <ChevronRight className="w-6 h-6 text-deep-green" />
                    </button>

                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {villa.images.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrentImageIndex(prev => ({ ...prev, [villa.id]: idx }))}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === (currentImageIndex[villa.id] || 0)
                              ? 'bg-white w-8'
                              : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur px-4 py-2 rounded-full">
                      <div className="text-deep-green">
                        <span className="text-sm">{t.villaDetails?.from || 'From'}</span>
                        <span className="text-xl font-bold ml-1">${villa.pricePerNight.low}</span>
                        <span className="text-sm">{t.villaDetails?.perNight || '/night'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Villa Details */}
                <div className="lg:w-1/2">
                  <div className="mb-6">
                    <h3 className="font-serif text-3xl text-deep-green mb-2">{villa.name}</h3>
                    <p className="text-terracotta font-medium">{villa.tagline}</p>
                  </div>

                  <p className="text-deep-green/80 mb-6 leading-relaxed">
                    {villa.description}
                  </p>

                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                    <div className="flex items-center gap-2 text-deep-green">
                      <Users className="w-5 h-5 text-terracotta" />
                      <span className="text-sm">{villa.maxGuests} {t.villaDetails?.guests || 'Guests'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-deep-green">
                      <Bed className="w-5 h-5 text-terracotta" />
                      <span className="text-sm">{villa.bedrooms} {t.villaDetails?.bedrooms || 'Bedrooms'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-deep-green">
                      <Bath className="w-5 h-5 text-terracotta" />
                      <span className="text-sm">{villa.bathrooms} {t.villaDetails?.bathrooms || 'Bathrooms'}</span>
                    </div>
                    <div className="flex items-center gap-2 text-deep-green">
                      <MapPin className="w-5 h-5 text-terracotta" />
                      <span className="text-sm">{villa.size}</span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-deep-green mb-3">{t.villaDetails?.premiumAmenities || 'Premium Amenities'}</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {villa.amenities.map((amenity, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-deep-green/70">
                          <amenity.icon className="w-4 h-4 text-terracotta" />
                          <span className="text-sm">{amenity.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Review */}
                  <div className="bg-sand-light rounded-xl p-4 mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${
                            i < Math.floor(villa.reviews.average) 
                              ? 'fill-terracotta text-terracotta' 
                              : 'text-sand'
                          }`} />
                        ))}
                      </div>
                      <span className="text-sm text-deep-green">
                        {villa.reviews.average} ({villa.reviews.count} {t.villaDetails?.reviews || 'reviews'})
                      </span>
                    </div>
                    <p className="text-sm text-deep-green/70 italic">
                      &ldquo;{villa.reviews.featured.text}&rdquo;
                    </p>
                    <p className="text-xs text-deep-green/60 mt-2">
                      — {villa.reviews.featured.author}, {villa.reviews.featured.date}
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => setSelectedVilla(villa.id)}
                      className="px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-all duration-300 transform hover:scale-105"
                    >
                      {t.villaDetails?.viewDetails || 'View Details'}
                    </button>
                    <button className="px-6 py-3 border-2 border-terracotta text-terracotta rounded-full font-medium hover:bg-terracotta hover:text-white transition-all duration-300">
                      {t.villaDetails?.checkAvailability || 'Check Availability'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Villa Detail Modal */}
      {selectedVilla && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-6 border-b border-sand flex justify-between items-center">
              <h3 className="font-serif text-2xl text-deep-green">
                {villas.find(v => v.id === selectedVilla)?.name}
              </h3>
              <button
                onClick={() => setSelectedVilla(null)}
                className="p-2 hover:bg-sand-light rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-deep-green" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="prose prose-lg text-deep-green/80 mb-8">
                {villas.find(v => v.id === selectedVilla)?.longDescription.split('\n').map((paragraph, idx) => (
                  <p key={idx} className="mb-4">{paragraph}</p>
                ))}
              </div>

              <div className="mb-8">
                <h4 className="font-serif text-xl text-deep-green mb-4">{t.villaDetails?.propertyHighlights || 'Property Highlights'}</h4>
                <div className="grid sm:grid-cols-2 gap-3">
                  {villas.find(v => v.id === selectedVilla)?.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-terracotta mt-0.5 flex-shrink-0" />
                      <span className="text-deep-green/80">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h4 className="font-serif text-xl text-deep-green mb-4">{t.villaDetails?.seasonalPricing || 'Seasonal Pricing'}</h4>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-sand-light rounded-xl p-4 text-center">
                    <div className="text-sm text-deep-green/60 mb-1">{t.villaDetails?.lowSeason || 'Low Season'}</div>
                    <div className="text-2xl font-bold text-deep-green">
                      ${villas.find(v => v.id === selectedVilla)?.pricePerNight.low}
                    </div>
                    <div className="text-sm text-deep-green/60">{t.villaDetails?.perNight?.replace('/', '') || 'per night'}</div>
                  </div>
                  <div className="bg-sand-light rounded-xl p-4 text-center">
                    <div className="text-sm text-deep-green/60 mb-1">{t.villaDetails?.midSeason || 'Mid Season'}</div>
                    <div className="text-2xl font-bold text-deep-green">
                      ${villas.find(v => v.id === selectedVilla)?.pricePerNight.mid}
                    </div>
                    <div className="text-sm text-deep-green/60">{t.villaDetails?.perNight?.replace('/', '') || 'per night'}</div>
                  </div>
                  <div className="bg-sand-light rounded-xl p-4 text-center">
                    <div className="text-sm text-deep-green/60 mb-1">{t.villaDetails?.highSeason || 'High Season'}</div>
                    <div className="text-2xl font-bold text-deep-green">
                      ${villas.find(v => v.id === selectedVilla)?.pricePerNight.high}
                    </div>
                    <div className="text-sm text-deep-green/60">{t.villaDetails?.perNight?.replace('/', '') || 'per night'}</div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-6 py-3 bg-terracotta text-white rounded-full font-medium hover:bg-terracotta-dark transition-all duration-300">
                  {t.villaDetails?.bookNow || 'Book Now'}
                </button>
                <button className="flex-1 px-6 py-3 border-2 border-deep-green text-deep-green rounded-full font-medium hover:bg-deep-green hover:text-white transition-all duration-300">
                  <Calendar className="w-5 h-5 inline mr-2" />
                  {t.villaDetails?.checkAvailability || 'Check Availability'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Area Information */}
      <section className="py-20 bg-sand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl text-deep-green mb-4">
              {t.areaInfo?.title || 'Experience Uluwatu'}
            </h2>
            <p className="text-lg text-deep-green/80 max-w-3xl mx-auto">
              {t.areaInfo?.subtitle || 'Beyond our boutique villas, Uluwatu offers endless adventures and cultural experiences'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-terracotta/10 rounded-lg flex items-center justify-center mb-4">
                <Waves className="w-6 h-6 text-terracotta" />
              </div>
              <h3 className="font-serif text-xl text-deep-green mb-2">{t.areaInfo?.surfing?.title || 'World-Class Surfing'}</h3>
              <p className="text-deep-green/70">
                {t.areaInfo?.surfing?.description || "Home to legendary breaks like Padang Padang and Bingin, Uluwatu is a surfer's paradise with consistent waves year-round."}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-terracotta/10 rounded-lg flex items-center justify-center mb-4">
                <Sun className="w-6 h-6 text-terracotta" />
              </div>
              <h3 className="font-serif text-xl text-deep-green mb-2">{t.areaInfo?.beachClubs?.title || 'Beach Clubs'}</h3>
              <p className="text-deep-green/70">
                {t.areaInfo?.beachClubs?.description || 'Experience boutique beach clubs like Sundays, Single Fin, and Ulu Cliffhouse, each offering stunning views and world-class dining.'}
              </p>
            </div>
            <div className="bg-white rounded-xl p-6">
              <div className="w-12 h-12 bg-terracotta/10 rounded-lg flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-terracotta" />
              </div>
              <h3 className="font-serif text-xl text-deep-green mb-2">{t.areaInfo?.culturalSites?.title || 'Cultural Sites'}</h3>
              <p className="text-deep-green/70">
                {t.areaInfo?.culturalSites?.description || 'Visit the iconic Uluwatu Temple perched on a cliff, witness traditional Kecak fire dances, and explore hidden beaches.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-terracotta to-terracotta-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-3xl sm:text-4xl mb-4">
            {t.cta?.title || 'Ready for Your Bali Escape?'}
          </h2>
          <p className="text-xl text-sand-light mb-8">
            {t.cta?.subtitle || 'Let us help you find the perfect villa for your Bali adventure'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${locale}/contact`}
              className="px-8 py-3 bg-white text-terracotta rounded-full font-medium hover:bg-sand-light transition-all duration-300 transform hover:scale-105"
            >
              {t.cta?.inquireNow || 'Inquire Now'}
            </Link>
            <Link
              href={`/${locale}/property-management`}
              className="px-8 py-3 bg-white/10 backdrop-blur text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/30"
            >
              {t.cta?.listProperty || 'List Your Property'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}