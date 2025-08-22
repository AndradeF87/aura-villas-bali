import Image from 'next/image'
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

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'Authentic Hospitality',
      description: 'We blend traditional Balinese warmth with world-class service standards.'
    },
    {
      icon: Globe,
      title: 'Cultural Respect',
      description: 'Deep reverence for Bali\'s culture, traditions, and natural beauty guides everything we do.'
    },
    {
      icon: Shield,
      title: 'Trust & Transparency',
      description: 'Clear communication, honest pricing, and reliable service build lasting relationships.'
    },
    {
      icon: Sparkles,
      title: 'Innovation Excellence',
      description: 'Pioneering AI technology enhances rather than replaces the human touch.'
    }
  ]

  const milestones = [
    { year: '2018', event: 'AURA founded with 5 luxury villas in Seminyak' },
    { year: '2019', event: 'Expanded to Ubud and Canggu, 25 villas under management' },
    { year: '2020', event: 'Launched AI-powered pricing and guest service platform' },
    { year: '2021', event: 'Achieved 95% average occupancy rate across portfolio' },
    { year: '2022', event: 'Introduced sustainability program and local community partnerships' },
    { year: '2023', event: 'Reached 100+ villas, became Bali\'s premier luxury villa management company' },
    { year: '2024', event: 'Launched AURA Experiences and personalized concierge AI assistant' }
  ]

  const team = [
    {
      name: 'Kadek Sutrisna',
      role: 'Co-Founder & CEO',
      bio: 'Born and raised in Ubud, Kadek brings 20 years of hospitality expertise and deep cultural knowledge.',
      image: '/images/placeholder.svg'
    },
    {
      name: 'Sarah Chen',
      role: 'Co-Founder & CTO',
      bio: 'Tech innovator from Singapore, pioneering AI applications in luxury hospitality.',
      image: '/images/placeholder.svg'
    },
    {
      name: 'Made Wijaya',
      role: 'Head of Guest Experience',
      bio: 'Ensures every guest experiences the true magic of Balinese hospitality.',
      image: '/images/placeholder.svg'
    },
    {
      name: 'Emma Roberts',
      role: 'Head of Property Management',
      bio: 'Maximizing owner returns while maintaining the highest standards of property care.',
      image: '/images/placeholder.svg'
    }
  ]

  const stats = [
    { number: '100+', label: 'Luxury Villas' },
    { number: '95%', label: 'Occupancy Rate' },
    { number: '50K+', label: 'Happy Guests' },
    { number: '4.9★', label: 'Average Rating' }
  ]

  return (
    <main className="pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-sand to-sand-light py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-deep-green mb-6">
              Every Villa Has a Story,
              <span className="block text-terracotta mt-2">Ours Began in Bali</span>
            </h1>
            <p className="text-xl text-deep-green/80 leading-relaxed">
              Where ancient Balinese wisdom meets modern innovation, creating unforgettable 
              experiences for guests and exceptional returns for property owners.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-deep-green py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-terracotta mb-2">{stat.number}</div>
                <div className="text-sand">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-4xl sm:text-5xl text-deep-green mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-deep-green/80">
                <p>
                  AURA was born from a simple observation: Bali&apos;s luxury villa market was missing 
                  something essential – the perfect balance between authentic local hospitality and 
                  modern technological efficiency.
                </p>
                <p>
                  In 2018, our co-founders Kadek Sutrisna, a Balinese hospitality veteran, and 
                  Sarah Chen, a tech innovator from Singapore, joined forces with a vision: to create 
                  a property management company that honors Bali&apos;s cultural heritage while leveraging 
                  cutting-edge AI technology.
                </p>
                <p>
                  Today, AURA manages over 100 luxury villas across Bali&apos;s most sought-after locations. 
                  Our proprietary AI platform handles everything from dynamic pricing to predictive 
                  maintenance, while our local team ensures every guest experiences genuine Balinese 
                  warmth and every owner enjoys peace of mind.
                </p>
                <p className="font-medium text-deep-green">
                  We don&apos;t just manage properties – we create stories, forge connections, and build 
                  a bridge between tradition and innovation.
                </p>
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
                  <div className="font-serif text-2xl text-deep-green">Since</div>
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
              <h3 className="font-serif text-3xl text-deep-green mb-4">Our Mission</h3>
              <p className="text-deep-green/80 leading-relaxed">
                To revolutionize luxury villa management in Bali by seamlessly blending 
                authentic Balinese hospitality with innovative AI technology, creating 
                exceptional experiences for guests and maximizing returns for property owners 
                while respecting and preserving local culture and environment.
              </p>
            </div>
            <div className="bg-white rounded-2xl p-10">
              <div className="w-16 h-16 bg-terracotta/10 rounded-xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-terracotta" />
              </div>
              <h3 className="font-serif text-3xl text-deep-green mb-4">Our Vision</h3>
              <p className="text-deep-green/80 leading-relaxed">
                To become the gold standard for luxury property management across Southeast Asia, 
                known for our perfect harmony of technology and tradition, setting new benchmarks 
                for guest satisfaction, owner returns, and sustainable tourism that benefits 
                local communities.
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
              Our Values
            </h2>
            <p className="text-xl text-deep-green/70 max-w-3xl mx-auto">
              The principles that guide every decision, every interaction, and every innovation at AURA.
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

      {/* Team Section */}
      <section className="py-20 bg-sand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl text-deep-green mb-4">
              Meet Our Leadership
            </h2>
            <p className="text-xl text-deep-green/70 max-w-3xl mx-auto">
              A diverse team united by passion for hospitality and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-white rounded-2xl overflow-hidden group hover:shadow-xl transition-shadow">
                <div className="aspect-square bg-gradient-to-br from-terracotta/20 to-terracotta/10 relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-deep-green mb-1">{member.name}</h3>
                  <div className="text-terracotta text-sm mb-3">{member.role}</div>
                  <p className="text-deep-green/70 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl sm:text-5xl text-deep-green mb-4">
              Our Journey
            </h2>
            <p className="text-xl text-deep-green/70">
              Milestones that mark our growth and evolution
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-terracotta/30"></div>
            {milestones.map((milestone, index) => (
              <div key={index} className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'justify-start' : 'justify-end'
              }`}>
                <div className={`w-5/12 ${index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                  <div className="bg-sand-light rounded-xl p-6 inline-block">
                    <div className="font-bold text-terracotta mb-2">{milestone.year}</div>
                    <div className="text-deep-green">{milestone.event}</div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-terracotta rounded-full border-4 border-white"></div>
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
              Why Choose AURA?
            </h2>
            <p className="text-xl text-sand-light max-w-3xl mx-auto">
              We&apos;re not just another property management company. We&apos;re your partners in creating 
              extraordinary experiences and exceptional returns.
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
            Ready to Experience the AURA Difference?
          </h2>
          <p className="text-xl text-sand-light mb-8">
            Whether you&apos;re a guest seeking unforgettable memories or an owner looking to maximize returns, 
            we&apos;re here to exceed your expectations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-terracotta rounded-full font-medium hover:bg-sand-light transition-all duration-300 transform hover:scale-105">
              Explore Our Villas
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/30">
              Partner With Us
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}