export function OwnerChallenges() {
  const challenges = [
    {
      title: 'Empty Nights Cost Money',
      description: 'Your beautiful villa sits empty while competitors with inferior properties stay booked',
      icon: '📉'
    },
    {
      title: 'Marketing is Overwhelming',
      description: 'Managing OTAs, social media, and direct bookings while competing with hotels',
      icon: '😰'
    },
    {
      title: 'Guest Issues Never Stop',
      description: 'Dealing with complaints, damages, and emergencies at all hours',
      icon: '🚨'
    },
    {
      title: 'Maintenance Never Ends',
      description: 'Coordinating repairs, cleaning, and upkeep between guest stays',
      icon: '🔧'
    }
  ]

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-gray-900 mb-4">
            We Know the Challenges You Face
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Managing a luxury villa in Bali should be rewarding, not overwhelming
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {challenges.map((challenge, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{challenge.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600">
                    {challenge.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-lg text-gray-700 font-medium">
            What if you could enjoy passive income while we handle everything?
          </p>
        </div>
      </div>
    </section>
  )
}