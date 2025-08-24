'use client'

import Image from 'next/image'
import { Heart, Sparkles, Users, Leaf } from 'lucide-react'

const experiences = [
  {
    id: 'memories',
    title: 'Memories Over Walls',
    description: 'Beautiful architecture is just the beginning. We focus on the memories guests take home — the sunsets, the conversations, the personal touches they\'ll talk about long after they leave.',
    icon: Heart,
    image: '/images/placeholder.svg',
    stats: '95% guests return or refer friends',
  },
  {
    id: 'story',
    title: 'Your Villa\'s Story',
    description: 'No two villas are the same. We discover your property\'s personality, craft its identity, and create a guest profile and marketing plan that truly fit.',
    icon: Sparkles,
    image: '/images/placeholder.svg',
    stats: '30% higher booking rates',
  },
  {
    id: 'human',
    title: 'Human Care, Smart Tools',
    description: 'We use AI-powered marketing, intelligent villa management systems, and modern hospitality tools while keeping the personal connection at the center.',
    icon: Users,
    image: '/images/placeholder.svg',
    stats: '24/7 multilingual support',
  },
  {
    id: 'bali',
    title: 'Bali\'s Spirit in Every Stay',
    description: 'We honor and share the culture, nature, and soul of Bali in everything we do — from our guest experiences to the way we work with our team and community.',
    icon: Leaf,
    image: '/images/placeholder.svg',
    stats: 'Supporting 50+ local families',
  },
]

export function AuraExperience() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-deep-green mb-4">
            The AURA Experience
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            What makes us different isn't what we do — it's how we do it
          </p>
        </div>

        {/* Experience Blocks */}
        <div className="space-y-20">
          {experiences.map((exp, index) => (
            <div
              key={exp.id}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Image */}
              <div className="lg:w-1/2">
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={exp.image}
                    alt={exp.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* Icon Badge */}
                  <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm p-4 rounded-full">
                    <exp.icon className="w-8 h-8 text-terracotta" />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:w-1/2">
                <h3 className="font-serif text-3xl md:text-4xl text-deep-green mb-4">
                  {exp.title}
                </h3>
                <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                  {exp.description}
                </p>
                
                {/* Stats */}
                <div className="bg-sand rounded-lg px-6 py-4 inline-block">
                  <p className="text-deep-green font-semibold">
                    {exp.stats}
                  </p>
                </div>

                {/* Testimonial Mini */}
                {index === 0 && (
                  <div className="mt-8 pl-6 border-l-4 border-terracotta">
                    <p className="text-gray-600 italic mb-2">
                      "AURA doesn't just manage our villa, they bring it to life. Our guests consistently mention the personal touches and authentic experiences."
                    </p>
                    <p className="text-sm text-gray-500">
                      — Michael R., Villa Owner since 2022
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20 bg-ivory rounded-2xl p-12">
          <h3 className="font-serif text-3xl text-deep-green mb-4">
            Ready to Experience the AURA Difference?
          </h3>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Whether you're looking for your perfect Bali villa or seeking management for your property, we're here to create something special together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-terracotta hover:bg-terracotta-dark text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
              Explore Our Villas
            </button>
            <button className="bg-deep-green hover:bg-deep-green-dark text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200">
              Partner With Us
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}