-- AURA Villas Bali - Comprehensive Database Schema Design
-- PostgreSQL with Supabase implementation
-- Optimized for scalability, performance, and data integrity

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Create custom types
CREATE TYPE villa_status AS ENUM ('active', 'inactive', 'maintenance', 'pending_approval');
CREATE TYPE villa_area AS ENUM ('Seminyak', 'Ubud', 'Canggu', 'Uluwatu', 'Sanur', 'Nusa Dua');
CREATE TYPE booking_status AS ENUM ('inquiry', 'confirmed', 'cancelled', 'completed', 'no_show');
CREATE TYPE payment_status AS ENUM ('pending', 'processing', 'completed', 'failed', 'refunded');
CREATE TYPE user_role AS ENUM ('guest', 'owner', 'staff', 'admin');
CREATE TYPE experience_category AS ENUM ('culinary', 'wellness', 'adventure', 'cultural', 'romantic');
CREATE TYPE maintenance_priority AS ENUM ('low', 'medium', 'high', 'urgent');
CREATE TYPE maintenance_status AS ENUM ('pending', 'scheduled', 'in_progress', 'completed', 'cancelled');

-- Core schemas
CREATE SCHEMA IF NOT EXISTS villa_core;
CREATE SCHEMA IF NOT EXISTS user_management;
CREATE SCHEMA IF NOT EXISTS booking_system;
CREATE SCHEMA IF NOT EXISTS content_management;
CREATE SCHEMA IF NOT EXISTS analytics;
CREATE SCHEMA IF NOT EXISTS property_management;

-- =============================================================================
-- USER MANAGEMENT SCHEMA
-- =============================================================================

CREATE TABLE user_management.users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    password_hash VARCHAR(255),
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    avatar_url TEXT,
    role user_role DEFAULT 'guest',
    nationality VARCHAR(2), -- ISO country code
    preferred_language VARCHAR(5) DEFAULT 'en',
    preferred_currency VARCHAR(3) DEFAULT 'USD',
    date_of_birth DATE,
    email_verified BOOLEAN DEFAULT false,
    phone_verified BOOLEAN DEFAULT false,
    marketing_consent BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    last_login TIMESTAMPTZ,
    is_active BOOLEAN DEFAULT true
);

CREATE TABLE user_management.user_preferences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_management.users(id) ON DELETE CASCADE,
    experience_types experience_category[],
    preferred_areas villa_area[],
    budget_range_min DECIMAL(10,2),
    budget_range_max DECIMAL(10,2),
    group_size_preference INTEGER,
    amenity_preferences TEXT[],
    dietary_restrictions TEXT[],
    accessibility_needs TEXT[],
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE user_management.user_sessions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES user_management.users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    refresh_token VARCHAR(255) UNIQUE,
    expires_at TIMESTAMPTZ NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    last_accessed TIMESTAMPTZ DEFAULT NOW(),
    ip_address INET,
    user_agent TEXT
);

-- =============================================================================
-- VILLA CORE SCHEMA
-- =============================================================================

CREATE TABLE villa_core.locations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    area villa_area NOT NULL,
    address TEXT NOT NULL,
    coordinates GEOGRAPHY(POINT, 4326) NOT NULL,
    neighborhood VARCHAR(100),
    postal_code VARCHAR(20),
    nearby_attractions TEXT[],
    distance_to_beach_meters INTEGER,
    distance_to_airport_km INTEGER,
    distance_to_shopping_km INTEGER,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE villa_core.villas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    owner_id UUID REFERENCES user_management.users(id),
    location_id UUID REFERENCES villa_core.locations(id) NOT NULL,
    
    -- Basic details
    story TEXT,
    story_teaser VARCHAR(500),
    bedrooms INTEGER NOT NULL,
    bathrooms INTEGER NOT NULL,
    max_guests INTEGER NOT NULL,
    villa_size_sqm INTEGER,
    land_size_sqm INTEGER,
    
    -- Pricing
    base_price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    cleaning_fee DECIMAL(10,2) DEFAULT 0,
    security_deposit DECIMAL(10,2) DEFAULT 0,
    minimum_stay INTEGER DEFAULT 1,
    
    -- Status and features
    status villa_status DEFAULT 'pending_approval',
    featured BOOLEAN DEFAULT false,
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    booking_count INTEGER DEFAULT 0,
    
    -- SEO and metadata
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    seo_keywords TEXT[],
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    approved_at TIMESTAMPTZ,
    last_booked TIMESTAMPTZ
);

CREATE TABLE villa_core.villa_images (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    villa_id UUID REFERENCES villa_core.villas(id) ON DELETE CASCADE,
    url TEXT NOT NULL,
    alt_text VARCHAR(255),
    caption TEXT,
    image_type VARCHAR(50) DEFAULT 'gallery', -- hero, gallery, room, amenity, exterior
    display_order INTEGER DEFAULT 0,
    width INTEGER,
    height INTEGER,
    file_size INTEGER,
    is_primary BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE villa_core.amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL, -- essential, luxury, experience, safety
    icon VARCHAR(100),
    description TEXT,
    is_highlighted BOOLEAN DEFAULT false,
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE villa_core.villa_amenities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    villa_id UUID REFERENCES villa_core.villas(id) ON DELETE CASCADE,
    amenity_id UUID REFERENCES villa_core.amenities(id) ON DELETE CASCADE,
    description TEXT, -- Villa-specific amenity description
    quantity INTEGER DEFAULT 1,
    UNIQUE(villa_id, amenity_id)
);

CREATE TABLE villa_core.villa_availability (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    villa_id UUID REFERENCES villa_core.villas(id) ON DELETE CASCADE,
    date DATE NOT NULL,
    is_available BOOLEAN DEFAULT true,
    price DECIMAL(10,2),
    minimum_stay INTEGER,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(villa_id, date)
);

CREATE TABLE villa_core.seasonal_rates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    villa_id UUID REFERENCES villa_core.villas(id) ON DELETE CASCADE,
    rate_name VARCHAR(100) NOT NULL, -- High Season, Low Season, Peak, etc.
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    rate DECIMAL(10,2) NOT NULL,
    minimum_stay INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- BOOKING SYSTEM SCHEMA
-- =============================================================================

CREATE TABLE booking_system.bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_reference VARCHAR(20) UNIQUE NOT NULL,
    villa_id UUID REFERENCES villa_core.villas(id) NOT NULL,
    guest_id UUID REFERENCES user_management.users(id),
    
    -- Guest information
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50),
    guest_nationality VARCHAR(2),
    
    -- Booking details
    check_in DATE NOT NULL,
    check_out DATE NOT NULL,
    number_of_guests INTEGER NOT NULL,
    number_of_adults INTEGER,
    number_of_children INTEGER,
    number_of_infants INTEGER,
    
    -- Pricing breakdown
    base_amount DECIMAL(10,2) NOT NULL,
    cleaning_fee DECIMAL(10,2) DEFAULT 0,
    service_fee DECIMAL(10,2) DEFAULT 0,
    taxes DECIMAL(10,2) DEFAULT 0,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Status and workflow
    status booking_status DEFAULT 'inquiry',
    payment_status payment_status DEFAULT 'pending',
    
    -- Communication
    special_requests TEXT,
    guest_message TEXT,
    internal_notes TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    confirmed_at TIMESTAMPTZ,
    cancelled_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

CREATE TABLE booking_system.booking_guests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES booking_system.bookings(id) ON DELETE CASCADE,
    guest_name VARCHAR(255) NOT NULL,
    guest_age INTEGER,
    guest_nationality VARCHAR(2),
    is_primary_guest BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE booking_system.payment_transactions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES booking_system.bookings(id) NOT NULL,
    transaction_reference VARCHAR(100) UNIQUE NOT NULL,
    payment_method VARCHAR(50) NOT NULL, -- stripe, xendit, bank_transfer
    payment_provider_transaction_id VARCHAR(255),
    
    -- Transaction details
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) NOT NULL,
    transaction_type VARCHAR(50) DEFAULT 'payment', -- payment, refund, adjustment
    status payment_status DEFAULT 'pending',
    
    -- Provider response data
    provider_response JSONB,
    failure_reason TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    processed_at TIMESTAMPTZ,
    failed_at TIMESTAMPTZ
);

CREATE TABLE booking_system.reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES booking_system.bookings(id) NOT NULL,
    villa_id UUID REFERENCES villa_core.villas(id) NOT NULL,
    guest_id UUID REFERENCES user_management.users(id),
    
    -- Review content
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    comment TEXT,
    
    -- Detailed ratings
    cleanliness_rating INTEGER CHECK (cleanliness_rating >= 1 AND cleanliness_rating <= 5),
    communication_rating INTEGER CHECK (communication_rating >= 1 AND communication_rating <= 5),
    location_rating INTEGER CHECK (location_rating >= 1 AND location_rating <= 5),
    value_rating INTEGER CHECK (value_rating >= 1 AND value_rating <= 5),
    
    -- Review metadata
    is_verified BOOLEAN DEFAULT false,
    is_published BOOLEAN DEFAULT false,
    guest_name VARCHAR(255),
    guest_location VARCHAR(100),
    stay_date DATE,
    
    -- Response from owner/staff
    owner_response TEXT,
    owner_response_date TIMESTAMPTZ,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    published_at TIMESTAMPTZ
);

-- =============================================================================
-- EXPERIENCE & SERVICES SCHEMA
-- =============================================================================

CREATE TABLE villa_core.experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    category experience_category NOT NULL,
    
    -- Pricing and availability
    base_price DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    duration_hours DECIMAL(4,2),
    max_participants INTEGER,
    min_participants INTEGER DEFAULT 1,
    
    -- Location and logistics
    location_areas villa_area[],
    meeting_point TEXT,
    includes TEXT[],
    excludes TEXT[],
    requirements TEXT[],
    
    -- Media
    featured_image TEXT,
    gallery_images TEXT[],
    
    -- Status
    is_active BOOLEAN DEFAULT true,
    is_featured BOOLEAN DEFAULT false,
    
    -- SEO
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE booking_system.experience_bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    main_booking_id UUID REFERENCES booking_system.bookings(id),
    experience_id UUID REFERENCES villa_core.experiences(id) NOT NULL,
    
    -- Booking details
    guest_name VARCHAR(255) NOT NULL,
    guest_email VARCHAR(255) NOT NULL,
    guest_phone VARCHAR(50),
    participants INTEGER NOT NULL,
    preferred_date DATE,
    preferred_time TIME,
    
    -- Pricing
    unit_price DECIMAL(10,2) NOT NULL,
    total_amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    
    -- Status
    status booking_status DEFAULT 'inquiry',
    special_requests TEXT,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    confirmed_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

-- =============================================================================
-- PROPERTY MANAGEMENT SCHEMA
-- =============================================================================

CREATE TABLE property_management.maintenance_tasks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    villa_id UUID REFERENCES villa_core.villas(id) NOT NULL,
    created_by UUID REFERENCES user_management.users(id),
    assigned_to UUID REFERENCES user_management.users(id),
    
    -- Task details
    title VARCHAR(255) NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL, -- cleaning, repair, inspection, upgrade
    priority maintenance_priority DEFAULT 'medium',
    status maintenance_status DEFAULT 'pending',
    
    -- Scheduling
    scheduled_date DATE,
    estimated_duration_hours DECIMAL(4,2),
    estimated_cost DECIMAL(10,2),
    actual_cost DECIMAL(10,2),
    
    -- Completion details
    completion_notes TEXT,
    completion_photos TEXT[],
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    scheduled_at TIMESTAMPTZ,
    started_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

CREATE TABLE property_management.property_inspections (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    villa_id UUID REFERENCES villa_core.villas(id) NOT NULL,
    inspector_id UUID REFERENCES user_management.users(id) NOT NULL,
    
    -- Inspection details
    inspection_type VARCHAR(100) NOT NULL, -- routine, pre_arrival, post_departure, maintenance
    inspection_date DATE NOT NULL,
    overall_score INTEGER CHECK (overall_score >= 1 AND overall_score <= 10),
    
    -- Detailed scores
    cleanliness_score INTEGER CHECK (cleanliness_score >= 1 AND cleanliness_score <= 10),
    maintenance_score INTEGER CHECK (maintenance_score >= 1 AND maintenance_score <= 10),
    amenities_score INTEGER CHECK (amenities_score >= 1 AND amenities_score <= 10),
    
    -- Findings
    findings TEXT,
    issues_found TEXT[],
    recommendations TEXT[],
    photos TEXT[],
    
    -- Follow-up
    requires_follow_up BOOLEAN DEFAULT false,
    follow_up_date DATE,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ
);

CREATE TABLE property_management.service_providers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    business_name VARCHAR(255),
    service_category VARCHAR(100) NOT NULL, -- cleaning, maintenance, security, concierge
    
    -- Contact information
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NOT NULL,
    whatsapp VARCHAR(50),
    address TEXT,
    
    -- Service details
    service_areas villa_area[],
    services_offered TEXT[],
    hourly_rate DECIMAL(8,2),
    minimum_booking_hours DECIMAL(4,2),
    
    -- Ratings and performance
    rating DECIMAL(3,2) DEFAULT 0,
    jobs_completed INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    is_verified BOOLEAN DEFAULT false,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- ANALYTICS SCHEMA
-- =============================================================================

CREATE TABLE analytics.page_views (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255),
    user_id UUID REFERENCES user_management.users(id),
    
    -- Page details
    page_path TEXT NOT NULL,
    page_title VARCHAR(255),
    referrer TEXT,
    utm_source VARCHAR(100),
    utm_medium VARCHAR(100),
    utm_campaign VARCHAR(100),
    
    -- User details
    ip_address INET,
    user_agent TEXT,
    device_type VARCHAR(50), -- desktop, mobile, tablet
    browser VARCHAR(100),
    operating_system VARCHAR(100),
    country VARCHAR(2),
    city VARCHAR(100),
    
    -- Engagement metrics
    time_on_page INTEGER, -- seconds
    scroll_depth INTEGER, -- percentage
    bounce BOOLEAN DEFAULT false,
    
    -- Timestamp
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE analytics.search_queries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255),
    user_id UUID REFERENCES user_management.users(id),
    
    -- Search details
    query_text TEXT,
    filters_applied JSONB,
    results_count INTEGER,
    results_clicked INTEGER DEFAULT 0,
    
    -- Search metadata
    search_type VARCHAR(50) DEFAULT 'villa_search', -- villa_search, experience_search
    page_number INTEGER DEFAULT 1,
    sort_order VARCHAR(50),
    
    -- Performance
    response_time_ms INTEGER,
    
    -- Timestamp
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE analytics.conversion_events (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255),
    user_id UUID REFERENCES user_management.users(id),
    
    -- Event details
    event_type VARCHAR(100) NOT NULL, -- villa_view, inquiry_submit, booking_confirm
    event_value DECIMAL(10,2),
    villa_id UUID REFERENCES villa_core.villas(id),
    booking_id UUID REFERENCES booking_system.bookings(id),
    
    -- Conversion funnel
    funnel_stage VARCHAR(100),
    time_since_first_visit INTEGER, -- seconds
    
    -- Attribution
    attribution_source VARCHAR(100),
    attribution_medium VARCHAR(100),
    attribution_campaign VARCHAR(100),
    
    -- Timestamp
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- CONTENT MANAGEMENT SCHEMA
-- =============================================================================

CREATE TABLE content_management.blog_posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    excerpt VARCHAR(500),
    content TEXT NOT NULL,
    
    -- Author and status
    author_id UUID REFERENCES user_management.users(id) NOT NULL,
    status VARCHAR(50) DEFAULT 'draft', -- draft, published, archived
    
    -- SEO and metadata
    featured_image TEXT,
    meta_title VARCHAR(255),
    meta_description VARCHAR(500),
    seo_keywords TEXT[],
    
    -- Categorization
    categories TEXT[],
    tags TEXT[],
    related_villas UUID[],
    related_areas villa_area[],
    
    -- Publishing
    published_at TIMESTAMPTZ,
    scheduled_publish_at TIMESTAMPTZ,
    
    -- Timestamps
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE content_management.faqs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    question TEXT NOT NULL,
    answer TEXT NOT NULL,
    category VARCHAR(100) NOT NULL, -- booking, payment, villa, experience
    display_order INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================================================
-- INDEXES FOR PERFORMANCE
-- =============================================================================

-- User management indexes
CREATE INDEX idx_users_email ON user_management.users(email);
CREATE INDEX idx_users_role ON user_management.users(role);
CREATE INDEX idx_user_sessions_token ON user_management.user_sessions(session_token);
CREATE INDEX idx_user_sessions_user_id ON user_management.user_sessions(user_id);

-- Villa core indexes
CREATE INDEX idx_villas_slug ON villa_core.villas(slug);
CREATE INDEX idx_villas_status ON villa_core.villas(status);
CREATE INDEX idx_villas_featured ON villa_core.villas(featured) WHERE featured = true;
CREATE INDEX idx_villas_location ON villa_core.villas(location_id);
CREATE INDEX idx_villas_owner ON villa_core.villas(owner_id);
CREATE INDEX idx_villas_area ON villa_core.locations(area);
CREATE INDEX idx_villas_coordinates ON villa_core.locations USING GIST(coordinates);

-- Search performance indexes
CREATE INDEX idx_villas_search_text ON villa_core.villas USING gin(to_tsvector('english', name || ' ' || COALESCE(story, '')));
CREATE INDEX idx_villas_price_range ON villa_core.villas(base_price);
CREATE INDEX idx_villas_guest_capacity ON villa_core.villas(max_guests);
CREATE INDEX idx_villas_rating ON villa_core.villas(rating DESC);

-- Availability indexes
CREATE INDEX idx_availability_villa_date ON villa_core.villa_availability(villa_id, date);
CREATE INDEX idx_availability_date_range ON villa_core.villa_availability(date);
CREATE INDEX idx_seasonal_rates_villa ON villa_core.seasonal_rates(villa_id);
CREATE INDEX idx_seasonal_rates_dates ON villa_core.seasonal_rates(start_date, end_date);

-- Booking system indexes
CREATE INDEX idx_bookings_reference ON booking_system.bookings(booking_reference);
CREATE INDEX idx_bookings_villa ON booking_system.bookings(villa_id);
CREATE INDEX idx_bookings_guest ON booking_system.bookings(guest_id);
CREATE INDEX idx_bookings_dates ON booking_system.bookings(check_in, check_out);
CREATE INDEX idx_bookings_status ON booking_system.bookings(status);
CREATE INDEX idx_bookings_created ON booking_system.bookings(created_at DESC);

-- Payment indexes
CREATE INDEX idx_payments_booking ON booking_system.payment_transactions(booking_id);
CREATE INDEX idx_payments_reference ON booking_system.payment_transactions(transaction_reference);
CREATE INDEX idx_payments_status ON booking_system.payment_transactions(status);

-- Review indexes
CREATE INDEX idx_reviews_villa ON booking_system.reviews(villa_id);
CREATE INDEX idx_reviews_published ON booking_system.reviews(is_published) WHERE is_published = true;
CREATE INDEX idx_reviews_rating ON booking_system.reviews(rating DESC);

-- Analytics indexes
CREATE INDEX idx_page_views_session ON analytics.page_views(session_id);
CREATE INDEX idx_page_views_date ON analytics.page_views(created_at);
CREATE INDEX idx_page_views_path ON analytics.page_views(page_path);
CREATE INDEX idx_search_queries_date ON analytics.search_queries(created_at);
CREATE INDEX idx_conversion_events_type ON analytics.conversion_events(event_type);
CREATE INDEX idx_conversion_events_villa ON analytics.conversion_events(villa_id);

-- =============================================================================
-- TRIGGERS FOR AUTOMATED UPDATES
-- =============================================================================

-- Update timestamps trigger function
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply updated_at triggers to relevant tables
CREATE TRIGGER trigger_update_users_updated_at
    BEFORE UPDATE ON user_management.users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_villas_updated_at
    BEFORE UPDATE ON villa_core.villas
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_update_bookings_updated_at
    BEFORE UPDATE ON booking_system.bookings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Villa rating calculation trigger
CREATE OR REPLACE FUNCTION update_villa_rating()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE villa_core.villas 
    SET rating = (
        SELECT ROUND(AVG(rating)::numeric, 2)
        FROM booking_system.reviews 
        WHERE villa_id = NEW.villa_id AND is_published = true
    ),
    review_count = (
        SELECT COUNT(*)
        FROM booking_system.reviews 
        WHERE villa_id = NEW.villa_id AND is_published = true
    )
    WHERE id = NEW.villa_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_villa_rating
    AFTER INSERT OR UPDATE ON booking_system.reviews
    FOR EACH ROW 
    WHEN (NEW.is_published = true)
    EXECUTE FUNCTION update_villa_rating();

-- =============================================================================
-- VIEWS FOR COMMON QUERIES
-- =============================================================================

-- Villa search view with aggregated data
CREATE VIEW villa_core.villa_search_view AS
SELECT 
    v.id,
    v.name,
    v.slug,
    v.story_teaser,
    v.bedrooms,
    v.bathrooms,
    v.max_guests,
    v.base_price,
    v.currency,
    v.rating,
    v.review_count,
    v.featured,
    l.area,
    l.address,
    l.coordinates,
    l.distance_to_beach_meters,
    (SELECT url FROM villa_core.villa_images WHERE villa_id = v.id AND is_primary = true LIMIT 1) as primary_image,
    array_agg(DISTINCT a.name) as amenities
FROM villa_core.villas v
JOIN villa_core.locations l ON v.location_id = l.id
LEFT JOIN villa_core.villa_amenities va ON v.id = va.villa_id
LEFT JOIN villa_core.amenities a ON va.amenity_id = a.id
WHERE v.status = 'active'
GROUP BY v.id, l.id;

-- Booking analytics view
CREATE VIEW analytics.booking_analytics_view AS
SELECT 
    DATE_TRUNC('month', b.created_at) as month,
    v.id as villa_id,
    v.name as villa_name,
    l.area,
    COUNT(b.id) as booking_count,
    COUNT(CASE WHEN b.status = 'confirmed' THEN 1 END) as confirmed_bookings,
    COUNT(CASE WHEN b.status = 'completed' THEN 1 END) as completed_bookings,
    AVG(b.total_amount) as average_booking_value,
    SUM(CASE WHEN b.status IN ('confirmed', 'completed') THEN b.total_amount ELSE 0 END) as total_revenue
FROM booking_system.bookings b
JOIN villa_core.villas v ON b.villa_id = v.id
JOIN villa_core.locations l ON v.location_id = l.id
GROUP BY DATE_TRUNC('month', b.created_at), v.id, v.name, l.area;

-- =============================================================================
-- SECURITY POLICIES (Row Level Security)
-- =============================================================================

-- Enable RLS on sensitive tables
ALTER TABLE user_management.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_system.bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE property_management.maintenance_tasks ENABLE ROW LEVEL SECURITY;

-- Users can only see their own data
CREATE POLICY users_own_data ON user_management.users
    FOR ALL USING (auth.uid() = id);

-- Guests can see their own bookings
CREATE POLICY guests_own_bookings ON booking_system.bookings
    FOR SELECT USING (
        auth.uid() = guest_id OR 
        auth.email() = guest_email
    );

-- Owners can see bookings for their villas
CREATE POLICY owners_villa_bookings ON booking_system.bookings
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM villa_core.villas 
            WHERE id = villa_id AND owner_id = auth.uid()
        )
    );

-- Staff and admins can see all bookings
CREATE POLICY staff_all_bookings ON booking_system.bookings
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM user_management.users 
            WHERE id = auth.uid() AND role IN ('staff', 'admin')
        )
    );

-- =============================================================================
-- SAMPLE DATA INSERTION
-- =============================================================================

-- Insert amenities
INSERT INTO villa_core.amenities (name, slug, category, icon, description, is_highlighted, display_order) VALUES
('Private Pool', 'private-pool', 'essential', 'pool', 'Private swimming pool for exclusive guest use', true, 1),
('WiFi', 'wifi', 'essential', 'wifi', 'High-speed wireless internet access', true, 2),
('Air Conditioning', 'air-conditioning', 'essential', 'snowflake', 'Climate control throughout the villa', true, 3),
('Kitchen', 'kitchen', 'essential', 'chef-hat', 'Fully equipped modern kitchen', true, 4),
('Private Chef', 'private-chef', 'luxury', 'utensils', 'Personal chef service available on request', true, 5),
('Spa Services', 'spa-services', 'luxury', 'spa', 'In-villa massage and spa treatments', true, 6),
('Butler Service', 'butler-service', 'luxury', 'concierge-bell', 'Dedicated butler for personalized service', true, 7),
('Infinity Pool', 'infinity-pool', 'luxury', 'water', 'Infinity edge swimming pool with stunning views', true, 8),
('Home Theater', 'home-theater', 'experience', 'tv', 'Private cinema with surround sound', false, 9),
('Wine Cellar', 'wine-cellar', 'luxury', 'wine-bottle', 'Temperature-controlled wine storage', false, 10);

-- Insert locations
INSERT INTO villa_core.locations (area, address, coordinates, neighborhood, nearby_attractions, distance_to_beach_meters, distance_to_airport_km, distance_to_shopping_km) VALUES
('Seminyak', 'Jl. Kayu Aya, Seminyak, Bali', ST_GeogFromText('POINT(115.1554 -8.6901)'), 'Kayu Aya', ARRAY['Seminyak Beach', 'Potato Head Beach Club', 'Ku De Ta'], 200, 8, 1),
('Ubud', 'Jl. Monkey Forest Rd, Ubud, Bali', ST_GeogFromText('POINT(115.2619 -8.5132)'), 'Monkey Forest', ARRAY['Sacred Monkey Forest', 'Ubud Traditional Market', 'Tegallalang Rice Terraces'], 15000, 35, 2),
('Canggu', 'Jl. Echo Beach, Canggu, Bali', ST_GeogFromText('POINT(115.1336 -8.6403)'), 'Echo Beach', ARRAY['Echo Beach', 'Berawa Beach', 'Tanah Lot Temple'], 100, 15, 3),
('Uluwatu', 'Jl. Uluwatu, Pecatu, Bali', ST_GeogFromText('POINT(115.0847 -8.8395)'), 'Pecatu', ARRAY['Uluwatu Temple', 'Padang Padang Beach', 'Suluban Beach'], 300, 5, 8),
('Sanur', 'Jl. Danau Tamblingan, Sanur, Bali', ST_GeogFromText('POINT(115.2623 -8.6802)'), 'Tamblingan', ARRAY['Sanur Beach', 'Le Mayeur Museum', 'Hardy''s Supermarket'], 50, 12, 1),
('Nusa Dua', 'Jl. Nusa Dua, Benoa, Bali', ST_GeogFromText('POINT(115.2353 -8.8011)'), 'BTDC', ARRAY['Bali Collection', 'Geger Beach', 'Water Blow'], 200, 8, 1);

-- The schema is now ready for the AURA Villas Bali application
-- This design supports scalability, performance, and all the features outlined in the strategic rebuild plan