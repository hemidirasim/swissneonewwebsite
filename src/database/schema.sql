-- Users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) DEFAULT 'admin',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Site content table
CREATE TABLE IF NOT EXISTS site_content (
    id SERIAL PRIMARY KEY,
    section VARCHAR(50) NOT NULL,
    field VARCHAR(50) NOT NULL,
    language VARCHAR(10) NOT NULL,
    content TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(section, field, language)
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title_az TEXT NOT NULL,
    title_en TEXT NOT NULL,
    excerpt_az TEXT,
    excerpt_en TEXT,
    category_az VARCHAR(100),
    category_en VARCHAR(100),
    read_time_az VARCHAR(20),
    read_time_en VARCHAR(20),
    author_az VARCHAR(100),
    author_en VARCHAR(100),
    content_az TEXT,
    content_en TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    language VARCHAR(10) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user
INSERT INTO users (username, password_hash, role) 
VALUES ('admin', '$2b$10$rQZ8K9mN2pL1vX3yU6wA7eB4cD5fG8hI9jK0lM1nO2pQ3rS4tU5vW6xY7z', 'admin')
ON CONFLICT (username) DO NOTHING;

-- Insert default site content
INSERT INTO site_content (section, field, language, content) VALUES
-- Hero section
('hero', 'title', 'az', 'İsveçrə keyfiyyətində'),
('hero', 'title', 'en', 'Swiss Quality'),
('hero', 'subtitle', 'az', 'Premium uşaq qidası'),
('hero', 'subtitle', 'en', 'Premium Baby Formula'),
('hero', 'description', 'az', 'Swissneo — 100 ildən artıq İsveçrə təcrübəsi ilə hazırlanmış super premium uşaq qarışığı. Uşağınızın sağlam inkişafı və güclü immunitet üçün.'),
('hero', 'description', 'en', 'Swissneo — super premium baby formula crafted with over 100 years of Swiss expertise. For your baby''s healthy development and strong immunity.'),

-- Products
('product1', 'name', 'az', 'Swissneo 1'),
('product1', 'name', 'en', 'Swissneo 1'),
('product1', 'description', 'az', 'Doğulduğu gündən etibarən 6 ayadək olan körpələr üçün başlanğıc süd qarışığı'),
('product1', 'description', 'en', 'Starting infant milk formula for babies from birth to 6 months'),
('product2', 'name', 'az', 'Swissneo 2'),
('product2', 'name', 'en', 'Swissneo 2'),
('product2', 'description', 'az', '6-12 aylıq körpələr üçün növbəti mərhələ süd qarışığı'),
('product2', 'description', 'en', 'Follow-on milk formula for babies from 6 to 12 months'),

-- Contact
('contact', 'phone', 'az', '+994 XX XXX XX XX'),
('contact', 'email', 'az', 'info@swissneo.az'),
('contact', 'address', 'az', 'Bakı, Azərbaycan'),
('contact', 'address', 'en', 'Baku, Azerbaijan'),

-- Company
('company', 'description', 'az', 'Swissneo — süd məhsulları sahəsində 100 ildən artıq təcrübəyə malik İsveçrənin super premium uşaq qidası markasıdır.'),
('company', 'description', 'en', 'Swissneo is a super premium baby food brand from Switzerland with over 100 years of experience in dairy products.'),
('company', 'mission', 'az', 'Keyfiyyətə önəm verən və uşaqlarına ən yaxşısını vermək istəyən Azərbaycan valideynlərinin artan tələbatını qarşılamaq.'),
('company', 'mission', 'en', 'To meet the growing demand of knowledgeable Azerbaijani parents who value quality and want to give their children the best.'),
('company', 'quality', 'az', 'İsveçrənin ən yüksək keyfiyyət standartları ilə istehsal olunan məhsullarımız uşağınızın təhlükəsizliyi üçün bütün sertifikatları daşıyır.'),
('company', 'quality', 'en', 'Our products manufactured with Switzerland''s highest quality standards carry all certifications for your child''s safety.'),

-- Instructions
('instructions', 'title', 'az', 'Qidalandırma Təlimatları'),
('instructions', 'title', 'en', 'Feeding Instructions'),
('instructions', 'description', 'az', 'Körpənizi düzgün qidalandırmaq üçün vacib təlimatlar'),
('instructions', 'description', 'en', 'Important instructions for properly feeding your baby'),

-- Articles
('articles', 'title', 'az', 'Məqalələr və Məsləhətlər'),
('articles', 'title', 'en', 'Articles & Tips'),
('articles', 'description', 'az', 'Körpə qidalandırması haqqında faydalı məqalələr'),
('articles', 'description', 'en', 'Useful articles about baby nutrition'),

-- Footer
('footer', 'description', 'az', 'Swissneo — İsveçrə keyfiyyətində premium uşaq qidası'),
('footer', 'description', 'en', 'Swissneo — Premium baby food with Swiss quality'),
('footer', 'copyright', 'az', '© 2024 Swissneo. Bütün hüquqlar qorunur.'),
('footer', 'copyright', 'en', '© 2024 Swissneo. All rights reserved.')
ON CONFLICT (section, field, language) DO NOTHING;

-- Insert default articles
INSERT INTO articles (title_az, title_en, excerpt_az, excerpt_en, category_az, category_en, read_time_az, read_time_en, author_az, author_en, content_az, content_en) VALUES
('İlk 6 Ayda Körpə Qidalandırması', 'Baby Nutrition in First 6 Months', 'Yeni doğulmuş körpələrin qidalandırılması üçün əsas məlumatlar', 'Essential information for feeding newborns', 'Qidalandırma', 'Nutrition', '5 dəq', '5 min', 'Dr. Aynur Məmmədova', 'Dr. Aynur Mammadova', 'Körpə qidalandırması haqqında ətraflı məlumat...', 'Detailed information about baby nutrition...'),
('DHA və ARA-nın Əhəmiyyəti', 'Importance of DHA and ARA', 'Bu vacib yağ turşularının körpə inkişafındakı rolu', 'The role of these essential fatty acids in baby development', 'Sağlamlıq', 'Health', '7 dəq', '7 min', 'Dr. Elnur Hüseynov', 'Dr. Elnur Huseynov', 'DHA və ARA haqqında ətraflı məlumat...', 'Detailed information about DHA and ARA...')
ON CONFLICT DO NOTHING;
