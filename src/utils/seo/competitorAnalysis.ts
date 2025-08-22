// Competitor analysis and SEO benchmarking utilities

interface CompetitorMetrics {
  domain: string;
  lastAnalyzed: string;
  technicalSeo: {
    httpsEnabled: boolean;
    mobileOptimized: boolean;
    pagespeedScore: number;
    coreWebVitals: {
      lcp: number;
      fid: number;
      cls: number;
      fcp?: number;
      ttfb?: number;
    };
    structuredData: string[];
    metaImplementation: 'excellent' | 'good' | 'fair' | 'poor';
    titleTagOptimization: number; // Score out of 100
    metaDescriptionOptimization: number;
    headingStructure: number;
    internalLinking: number;
    imageOptimization: number;
  };
  contentStrategy: {
    blogPostFrequency: 'daily' | 'weekly' | 'biweekly' | 'monthly' | 'irregular';
    totalBlogPosts: number;
    locationPages: number;
    propertyListings: number;
    averageContentLength: number;
    contentFreshness: number; // Days since last update
    socialProof: {
      reviewCount: number;
      averageRating: number;
      testimonials: number;
    };
  };
  keywordStrategy: {
    primaryKeywords: string[];
    longTailKeywords: string[];
    brandedKeywords: string[];
    localKeywords: string[];
    estimatedTraffic: number;
    keywordDifficulty: number;
  };
  backlinks: {
    totalBacklinks: number;
    domainAuthority: number;
    referringDomains: number;
    qualityScore: number;
  };
  socialPresence: {
    platforms: string[];
    followers: Record<string, number>;
    engagement: Record<string, number>;
  };
}

// Sample competitor data for Bali villa rental market
export const BALI_VILLA_COMPETITORS: CompetitorMetrics[] = [
  {
    domain: 'thebalibibble.com',
    lastAnalyzed: '2024-01-20T10:00:00.000Z',
    technicalSeo: {
      httpsEnabled: true,
      mobileOptimized: true,
      pagespeedScore: 78,
      coreWebVitals: {
        lcp: 2800,
        fid: 120,
        cls: 0.15,
        fcp: 1900,
        ttfb: 950
      },
      structuredData: ['Organization', 'WebSite', 'BreadcrumbList', 'LocalBusiness'],
      metaImplementation: 'good',
      titleTagOptimization: 85,
      metaDescriptionOptimization: 80,
      headingStructure: 90,
      internalLinking: 75,
      imageOptimization: 70
    },
    contentStrategy: {
      blogPostFrequency: 'weekly',
      totalBlogPosts: 240,
      locationPages: 25,
      propertyListings: 150,
      averageContentLength: 1200,
      contentFreshness: 3,
      socialProof: {
        reviewCount: 450,
        averageRating: 4.3,
        testimonials: 50
      }
    },
    keywordStrategy: {
      primaryKeywords: ['bali villa rental', 'luxury villa bali', 'seminyak villas'],
      longTailKeywords: ['best family villas bali', 'beachfront villa seminyak', 'private pool villa ubud'],
      brandedKeywords: ['bali bible villas', 'bali bible rental'],
      localKeywords: ['seminyak villa rental', 'ubud accommodation', 'canggu villas'],
      estimatedTraffic: 45000,
      keywordDifficulty: 65
    },
    backlinks: {
      totalBacklinks: 2800,
      domainAuthority: 45,
      referringDomains: 180,
      qualityScore: 75
    },
    socialPresence: {
      platforms: ['instagram', 'facebook', 'youtube'],
      followers: { instagram: 65000, facebook: 25000, youtube: 8000 },
      engagement: { instagram: 3.2, facebook: 2.1, youtube: 4.5 }
    }
  },
  {
    domain: 'villabugis.com',
    lastAnalyzed: '2024-01-20T10:00:00.000Z',
    technicalSeo: {
      httpsEnabled: true,
      mobileOptimized: true,
      pagespeedScore: 65,
      coreWebVitals: {
        lcp: 3200,
        fid: 180,
        cls: 0.22,
        fcp: 2100,
        ttfb: 1100
      },
      structuredData: ['Organization', 'Product', 'Review'],
      metaImplementation: 'fair',
      titleTagOptimization: 70,
      metaDescriptionOptimization: 65,
      headingStructure: 60,
      internalLinking: 55,
      imageOptimization: 50
    },
    contentStrategy: {
      blogPostFrequency: 'monthly',
      totalBlogPosts: 80,
      locationPages: 15,
      propertyListings: 200,
      averageContentLength: 800,
      contentFreshness: 14,
      socialProof: {
        reviewCount: 280,
        averageRating: 4.1,
        testimonials: 25
      }
    },
    keywordStrategy: {
      primaryKeywords: ['bali villa', 'villa rental bali', 'holiday villa bali'],
      longTailKeywords: ['cheap villa bali', 'group villa bali', 'wedding villa bali'],
      brandedKeywords: ['villa bugis bali'],
      localKeywords: ['denpasar villa', 'sanur villa rental'],
      estimatedTraffic: 25000,
      keywordDifficulty: 55
    },
    backlinks: {
      totalBacklinks: 1200,
      domainAuthority: 35,
      referringDomains: 95,
      qualityScore: 60
    },
    socialPresence: {
      platforms: ['instagram', 'facebook'],
      followers: { instagram: 15000, facebook: 8000 },
      engagement: { instagram: 2.8, facebook: 1.9 }
    }
  }
];

export class CompetitorAnalyzer {
  private competitors: CompetitorMetrics[];

  constructor(competitors: CompetitorMetrics[] = BALI_VILLA_COMPETITORS) {
    this.competitors = competitors;
  }

  // Analyze performance gaps compared to competitors
  public analyzeGaps(ourMetrics: Partial<CompetitorMetrics>): {
    strengths: string[];
    weaknesses: string[];
    opportunities: string[];
    threats: string[];
  } {
    const avgCompetitor = this.calculateAverageMetrics();
    
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    const opportunities: string[] = [];
    const threats: string[] = [];

    // Technical SEO analysis
    if (ourMetrics.technicalSeo) {
      if (ourMetrics.technicalSeo.pagespeedScore > avgCompetitor.technicalSeo.pagespeedScore) {
        strengths.push(`Page speed ${ourMetrics.technicalSeo.pagespeedScore}% vs competitor avg ${avgCompetitor.technicalSeo.pagespeedScore}%`);
      } else {
        weaknesses.push(`Page speed needs improvement: ${ourMetrics.technicalSeo.pagespeedScore}% vs competitor avg ${avgCompetitor.technicalSeo.pagespeedScore}%`);
      }

      // Core Web Vitals comparison
      const ourLCP = ourMetrics.technicalSeo.coreWebVitals?.lcp || 0;
      if (ourLCP < avgCompetitor.technicalSeo.coreWebVitals.lcp) {
        strengths.push(`Superior LCP performance: ${ourLCP}ms vs ${avgCompetitor.technicalSeo.coreWebVitals.lcp}ms`);
      } else if (ourLCP > avgCompetitor.technicalSeo.coreWebVitals.lcp * 1.2) {
        weaknesses.push(`LCP needs optimization: ${ourLCP}ms vs competitor avg ${avgCompetitor.technicalSeo.coreWebVitals.lcp}ms`);
      }
    }

    // Content strategy analysis
    if (ourMetrics.contentStrategy) {
      if (ourMetrics.contentStrategy.locationPages > avgCompetitor.contentStrategy.locationPages) {
        strengths.push(`More location pages: ${ourMetrics.contentStrategy.locationPages} vs avg ${avgCompetitor.contentStrategy.locationPages}`);
      } else {
        opportunities.push(`Expand location pages: currently ${ourMetrics.contentStrategy.locationPages}, competitor avg ${avgCompetitor.contentStrategy.locationPages}`);
      }

      if (ourMetrics.contentStrategy.totalBlogPosts < avgCompetitor.contentStrategy.totalBlogPosts * 0.5) {
        weaknesses.push(`Blog content gap: ${ourMetrics.contentStrategy.totalBlogPosts} posts vs competitor avg ${avgCompetitor.contentStrategy.totalBlogPosts}`);
      }
    }

    // Backlink analysis
    if (ourMetrics.backlinks) {
      if (ourMetrics.backlinks.domainAuthority < avgCompetitor.backlinks.domainAuthority - 10) {
        threats.push(`Lower domain authority: ${ourMetrics.backlinks.domainAuthority} vs competitor avg ${avgCompetitor.backlinks.domainAuthority}`);
      }
    }

    return { strengths, weaknesses, opportunities, threats };
  }

  // Get keyword opportunities based on competitor analysis
  public getKeywordOpportunities(): {
    lowCompetition: string[];
    highOpportunity: string[];
    longTail: string[];
    local: string[];
  } {
    const allKeywords = this.competitors.flatMap(c => [
      ...c.keywordStrategy.primaryKeywords,
      ...c.keywordStrategy.longTailKeywords,
      ...c.keywordStrategy.localKeywords
    ]);

    // Count keyword frequency across competitors
    const keywordFrequency = allKeywords.reduce((acc, keyword) => {
      acc[keyword] = (acc[keyword] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const lowCompetition = Object.entries(keywordFrequency)
      .filter(([_, count]) => count === 1)
      .map(([keyword]) => keyword);

    const highOpportunity = [
      'luxury beachfront villa bali',
      'private chef villa bali',
      'wedding venue villa seminyak',
      'family villa with pool ubud',
      'romantic villa retreat canggu',
      'surf villa rental bali',
      'wellness retreat villa bali',
      'digital nomad villa bali'
    ];

    const longTail = [
      'best luxury villa for couples bali',
      'villa with infinity pool seminyak',
      'traditional balinese villa ubud',
      'modern minimalist villa canggu',
      'villa with private beach access',
      'pet friendly villa rental bali',
      'villa with home theater bali',
      'eco luxury villa bali'
    ];

    const local = [
      'uluwatu cliff villa rental',
      'jimbaran bay villa',
      'sanur beachfront villa',
      'nusa dua luxury villa',
      'candidasa villa rental',
      'amed villa with view',
      'munduk mountain villa',
      'pemuteran villa diving'
    ];

    return { lowCompetition, highOpportunity, longTail, local };
  }

  // Generate content strategy recommendations
  public getContentRecommendations(): {
    blogTopics: string[];
    locationPages: string[];
    servicePages: string[];
    seasonalContent: string[];
  } {
    return {
      blogTopics: [
        'Ultimate Guide to Bali Villa Wedding Planning',
        'Best Bali Villas for Digital Nomads',
        'Family-Friendly Villa Activities in Bali',
        'Luxury Villa Amenities Guide',
        'Sustainable Tourism: Eco Villas in Bali',
        'Balinese Culture: What to Expect During Your Villa Stay',
        'Villa Safety Tips for Solo Travelers',
        'Best Time to Book Bali Villas for Each Season',
        'Villa Etiquette and Local Customs in Bali',
        'Comparing Villa Locations: Seminyak vs Ubud vs Canggu'
      ],
      locationPages: [
        'Luxury Villas in Uluwatu',
        'Beachfront Villas in Jimbaran',
        'Cultural Villas in Mas Village',
        'Jungle Villas in Munduk',
        'Surfing Villas in Bingin',
        'Romantic Villas in Lovina',
        'Adventure Villas near Mount Batur',
        'Diving Villas in Pemuteran'
      ],
      servicePages: [
        'Private Chef Services',
        'Spa and Wellness Treatments',
        'Airport Transfer Services',
        'Villa Photography Sessions',
        'Event Planning Services',
        'Babysitting and Childcare',
        'Car Rental Services',
        'Tour and Activity Booking'
      ],
      seasonalContent: [
        'New Year Villa Packages',
        'Valentine\'s Day Romantic Getaways',
        'Easter Family Villa Specials',
        'Summer Long-Stay Discounts',
        'Wedding Season (April-September) Packages',
        'Surfing Season Villa Deals',
        'Christmas and New Year Premium Bookings',
        'Monsoon Season Indoor Activities'
      ]
    };
  }

  // Performance benchmarking against competitors
  public benchmarkPerformance(ourMetrics: Partial<CompetitorMetrics>): {
    overallScore: number;
    categoryScores: Record<string, number>;
    recommendations: string[];
  } {
    const avgCompetitor = this.calculateAverageMetrics();
    const recommendations: string[] = [];
    
    // Calculate scores for each category (0-100)
    const categoryScores: Record<string, number> = {};

    // Technical SEO score
    if (ourMetrics.technicalSeo) {
      let techScore = 0;
      techScore += Math.min((ourMetrics.technicalSeo.pagespeedScore / avgCompetitor.technicalSeo.pagespeedScore) * 100, 100);
      techScore += ourMetrics.technicalSeo.coreWebVitals?.lcp ? 
        Math.min((avgCompetitor.technicalSeo.coreWebVitals.lcp / ourMetrics.technicalSeo.coreWebVitals.lcp) * 100, 100) : 50;
      categoryScores.technicalSeo = Math.round(techScore / 2);
      
      if (categoryScores.technicalSeo < 80) {
        recommendations.push('Improve page speed and Core Web Vitals performance');
      }
    }

    // Content score
    if (ourMetrics.contentStrategy) {
      let contentScore = 0;
      contentScore += Math.min((ourMetrics.contentStrategy.locationPages / avgCompetitor.contentStrategy.locationPages) * 100, 100);
      contentScore += Math.min((ourMetrics.contentStrategy.totalBlogPosts / avgCompetitor.contentStrategy.totalBlogPosts) * 100, 100);
      categoryScores.content = Math.round(contentScore / 2);
      
      if (categoryScores.content < 70) {
        recommendations.push('Increase content production and location page coverage');
      }
    }

    // Authority score
    if (ourMetrics.backlinks) {
      categoryScores.authority = Math.min((ourMetrics.backlinks.domainAuthority / avgCompetitor.backlinks.domainAuthority) * 100, 100);
      
      if (categoryScores.authority < 80) {
        recommendations.push('Focus on building high-quality backlinks and domain authority');
      }
    }

    const overallScore = Math.round(
      Object.values(categoryScores).reduce((sum, score) => sum + score, 0) / 
      Object.keys(categoryScores).length
    );

    return { overallScore, categoryScores, recommendations };
  }

  private calculateAverageMetrics(): CompetitorMetrics {
    const count = this.competitors.length;
    
    return {
      domain: 'average',
      lastAnalyzed: new Date().toISOString(),
      technicalSeo: {
        httpsEnabled: true,
        mobileOptimized: true,
        pagespeedScore: Math.round(this.competitors.reduce((sum, c) => sum + c.technicalSeo.pagespeedScore, 0) / count),
        coreWebVitals: {
          lcp: Math.round(this.competitors.reduce((sum, c) => sum + c.technicalSeo.coreWebVitals.lcp, 0) / count),
          fid: Math.round(this.competitors.reduce((sum, c) => sum + c.technicalSeo.coreWebVitals.fid, 0) / count),
          cls: Number((this.competitors.reduce((sum, c) => sum + c.technicalSeo.coreWebVitals.cls, 0) / count).toFixed(2))
        },
        structuredData: [],
        metaImplementation: 'good',
        titleTagOptimization: Math.round(this.competitors.reduce((sum, c) => sum + c.technicalSeo.titleTagOptimization, 0) / count),
        metaDescriptionOptimization: Math.round(this.competitors.reduce((sum, c) => sum + c.technicalSeo.metaDescriptionOptimization, 0) / count),
        headingStructure: Math.round(this.competitors.reduce((sum, c) => sum + c.technicalSeo.headingStructure, 0) / count),
        internalLinking: Math.round(this.competitors.reduce((sum, c) => sum + c.technicalSeo.internalLinking, 0) / count),
        imageOptimization: Math.round(this.competitors.reduce((sum, c) => sum + c.technicalSeo.imageOptimization, 0) / count)
      },
      contentStrategy: {
        blogPostFrequency: 'weekly',
        totalBlogPosts: Math.round(this.competitors.reduce((sum, c) => sum + c.contentStrategy.totalBlogPosts, 0) / count),
        locationPages: Math.round(this.competitors.reduce((sum, c) => sum + c.contentStrategy.locationPages, 0) / count),
        propertyListings: Math.round(this.competitors.reduce((sum, c) => sum + c.contentStrategy.propertyListings, 0) / count),
        averageContentLength: Math.round(this.competitors.reduce((sum, c) => sum + c.contentStrategy.averageContentLength, 0) / count),
        contentFreshness: Math.round(this.competitors.reduce((sum, c) => sum + c.contentStrategy.contentFreshness, 0) / count),
        socialProof: {
          reviewCount: Math.round(this.competitors.reduce((sum, c) => sum + c.contentStrategy.socialProof.reviewCount, 0) / count),
          averageRating: Number((this.competitors.reduce((sum, c) => sum + c.contentStrategy.socialProof.averageRating, 0) / count).toFixed(1)),
          testimonials: Math.round(this.competitors.reduce((sum, c) => sum + c.contentStrategy.socialProof.testimonials, 0) / count)
        }
      },
      keywordStrategy: {
        primaryKeywords: [],
        longTailKeywords: [],
        brandedKeywords: [],
        localKeywords: [],
        estimatedTraffic: Math.round(this.competitors.reduce((sum, c) => sum + c.keywordStrategy.estimatedTraffic, 0) / count),
        keywordDifficulty: Math.round(this.competitors.reduce((sum, c) => sum + c.keywordStrategy.keywordDifficulty, 0) / count)
      },
      backlinks: {
        totalBacklinks: Math.round(this.competitors.reduce((sum, c) => sum + c.backlinks.totalBacklinks, 0) / count),
        domainAuthority: Math.round(this.competitors.reduce((sum, c) => sum + c.backlinks.domainAuthority, 0) / count),
        referringDomains: Math.round(this.competitors.reduce((sum, c) => sum + c.backlinks.referringDomains, 0) / count),
        qualityScore: Math.round(this.competitors.reduce((sum, c) => sum + c.backlinks.qualityScore, 0) / count)
      },
      socialPresence: {
        platforms: [],
        followers: {},
        engagement: {}
      }
    };
  }

  // Generate SEO action plan based on competitor analysis
  public generateActionPlan(ourMetrics: Partial<CompetitorMetrics>): {
    immediate: string[];
    shortTerm: string[];
    longTerm: string[];
    priority: 'high' | 'medium' | 'low';
  } {
    const gaps = this.analyzeGaps(ourMetrics);
    const benchmark = this.benchmarkPerformance(ourMetrics);
    
    const immediate: string[] = [];
    const shortTerm: string[] = [];
    const longTerm: string[] = [];
    
    // Immediate actions (1-2 weeks)
    if (benchmark.categoryScores.technicalSeo < 70) {
      immediate.push('Optimize Core Web Vitals (LCP, FID, CLS)');
      immediate.push('Implement proper schema markup for all villa pages');
      immediate.push('Fix mobile responsiveness issues');
    }
    
    if (gaps.weaknesses.some(w => w.includes('meta'))) {
      immediate.push('Optimize meta titles and descriptions');
      immediate.push('Improve heading structure (H1, H2, H3)');
    }

    // Short-term actions (1-3 months)
    if (benchmark.categoryScores.content < 70) {
      shortTerm.push('Create location landing pages for all major Bali areas');
      shortTerm.push('Develop content calendar with weekly blog posts');
      shortTerm.push('Implement user review and testimonial system');
    }

    shortTerm.push('Build internal linking strategy');
    shortTerm.push('Optimize images with alt tags and compression');
    shortTerm.push('Create FAQ pages for common queries');

    // Long-term actions (3-12 months)
    if (benchmark.categoryScores.authority < 80) {
      longTerm.push('Develop link building strategy with travel and hospitality sites');
      longTerm.push('Guest posting on relevant industry blogs');
      longTerm.push('Build partnerships with local businesses');
    }

    longTerm.push('Expand to additional location markets');
    longTerm.push('Develop comprehensive travel guides');
    longTerm.push('Build social media presence and engagement');

    const priority = benchmark.overallScore < 60 ? 'high' : 
                    benchmark.overallScore < 80 ? 'medium' : 'low';

    return { immediate, shortTerm, longTerm, priority };
  }
}

// Utility function to monitor competitor changes
export const trackCompetitorChanges = async (
  competitors: string[], 
  previousData: CompetitorMetrics[]
): Promise<{
  newContent: Array<{ domain: string; pages: string[] }>;
  technicalChanges: Array<{ domain: string; changes: string[] }>;
  rankingMovements: Array<{ domain: string; keywords: Array<{ keyword: string; change: number }> }>;
}> => {
  // This would integrate with tools like SEMrush, Ahrefs, or custom crawlers
  // For demo purposes, returning mock data
  return {
    newContent: [
      {
        domain: 'thebalibibble.com',
        pages: ['/blog/best-villas-2024', '/locations/nusa-dua-villas']
      }
    ],
    technicalChanges: [
      {
        domain: 'villabugis.com',
        changes: ['Improved page speed score by 15 points', 'Added new structured data']
      }
    ],
    rankingMovements: [
      {
        domain: 'thebalibibble.com',
        keywords: [
          { keyword: 'luxury villa bali', change: +2 },
          { keyword: 'seminyak villa rental', change: -1 }
        ]
      }
    ]
  };
};

export default CompetitorAnalyzer;