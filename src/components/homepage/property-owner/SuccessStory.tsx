'use client'

import { useState } from 'react'
import Image from 'next/image'

export function SuccessStory() {
  const [activeStory, setActiveStory] = useState(0)

  const stories = [
    {
      name: 'Sarah & James Mitchell',
      location: 'Villa Sunset, Uluwatu',
      image: '/images/villa-sunset.jpg',
      quote: "AURA transformed our villa from a vacation home into a profitable investment. We went from 40% to 85% occupancy in just 3 months.",
      results: {
        before: 'Rp 150M/year',
        after: 'Rp 420M/year',
        increase: '180% revenue increase'
      }
    },
    {
      name: 'Michael Chen',
      location: 'Ocean View Villa, Canggu',
      image: '/images/ocean-view-villa.jpg',
      quote: "The team's attention to detail and guest service is exceptional. Our reviews went from 4.2 to 4.9 stars, and we can charge premium rates.",
      results: {
        before: 'Rp 200M/year',
        after: 'Rp 550M/year',
        increase: '175% revenue increase'
      }
    },
    {
      name: 'Emma & David Thompson',
      location: 'Tropical Paradise, Seminyak',
      image: '/images/tropical-paradise.jpg',
      quote: "We live abroad and AURA handles everything perfectly. It's like having a trusted partner who cares about our property as much as we do.",
      results: {
        before: 'Rp 180M/year',
        after: 'Rp 480M/year',
        increase: '167% revenue increase'
      }
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            Success Stories from Villa Owners Like You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real results from real property owners who trusted AURA with their investment
          </p>
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-6">
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                  {stories[activeStory].name}
                </h3>
                <p className="text-gray-600">{stories[activeStory].location}</p>
              </div>

              <blockquote className="text-lg text-gray-700 italic mb-8">
                "{stories[activeStory].quote}"
              </blockquote>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold text-gray-900 mb-4">Revenue Results</h4>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Before AURA</p>
                    <p className="text-xl font-bold text-gray-900">{stories[activeStory].results.before}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">With AURA</p>
                    <p className="text-xl font-bold text-terracotta">{stories[activeStory].results.after}</p>
                  </div>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-lg font-semibold text-primary">
                    {stories[activeStory].results.increase}
                  </p>
                </div>
              </div>
            </div>

            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                Villa Image
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveStory(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  activeStory === index ? 'bg-terracotta' : 'bg-gray-300'
                }`}
                aria-label={`View story ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 font-medium">
            Join 50+ villa owners who've transformed their properties with AURA
          </p>
        </div>
      </div>
    </section>
  )
}