'use client'

import Image from 'next/image'
import Link from 'next/link'
import { 
  Heart, 
  Globe, 
  Users, 
  Award,
  Sparkles,
  TreePalm,
  Shield,
  Zap
} from 'lucide-react'

interface AboutPageClientProps {
  dictionary: any
  locale: string
}

export default function AboutPageClient({ dictionary, locale }: AboutPageClientProps) {
  const t = dictionary?.aboutPage || {}
  const values = [
    {
      icon: Heart,
      title: t.values?.authenticHospitality?.title || 'Authentic Hospitality',
      description: t.values?.authenticHospitality?.description || 'We blend traditional Balinese warmth with world-class service standards.'
    },
    {
      icon: Globe,
      title: t.values?.culturalRespect?.title || 'Cultural Respect',
      description: t.values?.culturalRespect?.description || 'Deep reverence for Bali\'s culture, traditions, and natural beauty guides everything we do.'
    },
    {
      icon: Shield,
      title: t.values?.trustTransparency?.title || 'Trust & Transparency',
      description: t.values?.trustTransparency?.description || 'Clear communication, honest pricing, and reliable service build lasting relationships.'
    },
    {
      icon: Sparkles,
      title: t.values?.innovationExcellence?.title || 'Innovation Excellence',
      description: t.values?.innovationExcellence?.description || 'Pioneering AI technology enhances rather than replaces the human touch.'
    }
  ]



  const stats = [
    { number: '100+', label: 'Boutique Villas' },
    { number: '95%', label: 'Occupancy Rate' },
    { number: '50K+', label: 'Happy Guests' },
    { number: '4.9★', label: 'Average Rating' }
  ]

  return (
    <main>
      {/* Hero Section */}
      <section className="relative h-[60vh] bg-sand-light flex items-center justify-center overflow-hidden">
        <div className="relative z-20 text-center text-deep-green max-w-4xl mx-auto px-4">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl mb-4">
            {t.hero?.title || 'Every Villa Has a Story,'}
            <span className="block text-terracotta mt-2">{t.hero?.titleHighlight || 'Ours Began in Bali'}</span>
          </h1>
          <p className="text-xl sm:text-2xl text-deep-green/80">
            {t.hero?.subtitle || 'Where Ancient Balinese Wisdom Meets Modern Innovation'}
          </p>
          <div className="mt-8 flex items-center justify-center gap-2 text-deep-green/80">
            <TreePalm className="w-5 h-5" />
            <span>{t.hero?.since || 'Since'} 2018</span>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-deep-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-6">
              {t.introduction?.title || 'Redefining Boutique Villa Management'}
            </h2>
            <p className="text-lg text-white/90 leading-relaxed">
              {t.introduction?.content || 'AURA combines the warmth of traditional Balinese hospitality with cutting-edge AI technology to deliver exceptional experiences for guests and maximized returns for property owners. Our story is one of innovation, respect for culture, and unwavering commitment to excellence.'}
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl text-deep-green mb-6">
                {t.story?.title || 'Our Story'}
              </h2>
              <div className="space-y-4 text-deep-green/80">
                {locale === 'es-ES' ? (
                  <>
                    <p>
                      Hola, somos Ana y Fabio — y AURA es nuestra forma de compartir lo que más amamos de la hospitalidad.
                    </p>
                    <p>
                      Nos conocimos en Bali a finales de 2021. Ana es de España, psicóloga con pasión por las personas, 
                      el marketing y crear experiencias inolvidables para los clientes. Fabio es de Portugal, una mente 
                      tecnológica que lleva años profundizando en TI e IA. Juntos, nos dimos cuenta de que teníamos la 
                      mezcla perfecta: corazón y tecnología, cuidado y estrategia.
                    </p>
                    <p>
                      También conocemos el negocio desde dentro. Nosotros mismos somos propietarios de un hotel boutique, 
                      así que entendemos exactamente cómo se siente estar del lado del propietario — lo bueno, lo estresante, 
                      y los momentos en los que solo quieres a alguien en quien puedas confiar para que se encargue de todo. 
                      Eso es lo que hacemos ahora, no solo para nuestro hotel, sino también para villas. En este momento 
                      gestionamos dos villas premium, donde nos encargamos de todo, desde chefs privados hasta conserjes y 
                      masajes en el lugar. Los huéspedes se sienten cuidados, y los propietarios finalmente pueden relajarse.
                    </p>
                    <p>
                      Y esto es solo el comienzo. En enero de 2026, cinco villas más se unirán a nuestro portafolio. 
                      Hemos estado involucrados desde el primer día — ayudando a los propietarios a pensar primero en sus 
                      clientes, incluso haciendo ajustes arquitectónicos para que los espacios realmente funcionen para las 
                      personas que se alojarán en ellos.
                    </p>
                    <p>
                      En AURA, creemos que la hospitalidad es simple: saber qué quieren los huéspedes, dónde lo quieren, 
                      y por qué les importa. Mezcla eso con un poco de tecnología inteligente y mucho cuidado genuino, 
                      y los resultados hablan por sí solos.
                    </p>
                    <p className="font-medium text-deep-green">
                      No solo gestionamos propiedades. Ayudamos a crear experiencias de las que los propietarios se sienten 
                      orgullosos, y que los huéspedes nunca olvidan.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      Hi, we&apos;re Ana and Fabio — and AURA is our way of sharing what we love most about hospitality.
                    </p>
                    <p>
                      We met in Bali at the end of 2021. Ana is from Spain, a psychologist with a passion for people, 
                      marketing, and creating unforgettable customer experiences. Fabio is from Portugal, a tech mind 
                      who&apos;s been diving deep into IT and AI for years. Together, we realized we had the perfect mix: 
                      heart and technology, care and strategy.
                    </p>
                    <p>
                      We also know the business from the inside. We own a boutique hotel ourselves, so we understand 
                      exactly what it feels like to be on the owner&apos;s side — the good, the stressful, and the moments 
                      when you just want someone you can trust to take care of things. That&apos;s what we do now, not just 
                      for our hotel, but for villas too. At the moment we manage two premium villas, where we handle 
                      everything from private chefs to concierges and on-site massages. Guests feel taken care of, and 
                      owners can finally relax.
                    </p>
                    <p>
                      And this is only the beginning. In January 2026, five more villas will join our portfolio. 
                      We&apos;ve been involved from day one — helping the owners think about their customers first, even 
                      making architecture tweaks so the spaces truly work for the people who&apos;ll stay in them.
                    </p>
                    <p>
                      At AURA, we believe hospitality is simple: know what guests want, where they want it, and why 
                      it matters to them. Mix that with a bit of smart tech and a lot of genuine care, and the results 
                      speak for themselves.
                    </p>
                    <p className="font-medium text-deep-green">
                      We don&apos;t just manage properties. We help create experiences that owners are proud of, and 
                      guests never forget.
                    </p>
                  </>
                )}
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] bg-gradient-to-br from-terracotta/20 to-terracotta/10 rounded-2xl overflow-hidden">
                <Image
                  src="/images/placeholder.svg"
                  alt="AURA team in traditional Balinese setting"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-sand rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <TreePalm className="w-12 h-12 text-terracotta mx-auto mb-2" />
                  <div className="font-serif text-2xl text-deep-green">{t.hero?.since || 'Since'}</div>
                  <div className="text-3xl font-bold text-terracotta">2018</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-sand-light to-sand">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-white rounded-2xl p-10">
              <div className="w-16 h-16 bg-terracotta/10 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="font-serif text-3xl text-deep-green mb-4">{t.mission?.title || 'Our Mission'}</h3>
              <p className="text-deep-green/80 leading-relaxed">
                {t.mission?.content || 'Our mission is to make villa ownership in Bali both easy and rewarding. We mix the warmth of Balinese hospitality with smart technology so guests feel cared for and owners see the best results — all while staying true to the island\'s culture and spirit.'}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-10">
              <div className="w-16 h-16 bg-terracotta/10 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="font-serif text-3xl text-deep-green mb-4">{t.vision?.title || 'Our Vision'}</h3>
              <p className="text-deep-green/80 leading-relaxed">
                {t.vision?.content || 'Our vision is to set a new standard for boutique property management in Southeast Asia — where technology works hand in hand with hospitality, guests leave happier, and owners see better returns. We want every step forward to also support local people and keep tourism sustainable for the long run.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl text-deep-green mb-4">
              {t.valuesSection?.title || 'Our Values'}
            </h2>
            <p className="text-xl text-deep-green/70 max-w-3xl mx-auto">
              {t.values?.subtitle || 'The principles that guide every decision, every interaction, and every innovation at AURA.'}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-terracotta/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-terracotta/20 transition-colors">
                  <value.icon className="w-10 h-10 text-terracotta" />
                </div>
                <h3 className="font-serif text-xl text-deep-green mb-2">{value.title}</h3>
                <p className="text-deep-green/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* Why Choose AURA */}
      <section className="py-20 bg-gradient-to-br from-deep-green to-deep-green-dark text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl mb-4">
              {locale === 'es-ES' ? '¿Por Qué Elegir AURA?' : 'Why Choose AURA?'}
            </h2>
            <p className="text-xl text-sand-light max-w-3xl mx-auto">
              {locale === 'es-ES' ? 'No somos solo otra empresa de gestión de propiedades. Somos tus socios en la creación de experiencias extraordinarias y rendimientos excepcionales.' : 'We\'re not just another property management company. We\'re your partners in creating extraordinary experiences and exceptional returns.'}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-10 h-10 text-terracotta" />
              </div>
              <h3 className="font-serif text-2xl mb-3">Local Expertise</h3>
              <p className="text-sand-light/80">
                Deep understanding of Balinese culture, regulations, and market dynamics ensures 
                smooth operations and authentic experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-10 h-10 text-terracotta" />
              </div>
              <h3 className="font-serif text-2xl mb-3">AI Innovation</h3>
              <p className="text-sand-light/80">
                Cutting-edge technology optimizes pricing, predicts maintenance, and automates 
                guest communications for maximum efficiency.
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 bg-white/10 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-terracotta" />
              </div>
              <h3 className="font-serif text-2xl mb-3">Proven Results</h3>
              <p className="text-sand-light/80">
                95% average occupancy, 4.9-star ratings, and 30% higher returns than industry 
                average speak for themselves.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-terracotta">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-serif text-4xl sm:text-5xl text-white mb-6">
            {locale === 'es-ES' ? '¿Listo para Experimentar la Diferencia AURA?' : 'Ready to Experience the AURA Difference?'}
          </h2>
          <p className="text-xl text-sand-light mb-8">
            {locale === 'es-ES' ? 'Ya seas un huésped buscando recuerdos inolvidables o un propietario buscando maximizar rendimientos, estamos aquí para superar tus expectativas.' : 'Whether you\'re a guest seeking unforgettable memories or an owner looking to maximize returns, we\'re here to exceed your expectations.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href={`/${locale}/villas`} className="px-8 py-4 bg-white text-terracotta rounded-full font-medium hover:bg-sand-light transition-all duration-300 transform hover:scale-105 inline-block text-center">
              Explore Our Villas
            </Link>
            <a href="https://auravillasbali.com/#qualification" className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/30 inline-block text-center">
              Partner With Us
            </a>
          </div>
        </div>
      </section>
    </main>
  )
}