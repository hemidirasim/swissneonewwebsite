-- Swissneo Database Initialization Script
-- Database: swissp_db1
-- User: swissp_1

-- Create articles table
CREATE TABLE IF NOT EXISTS articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    image TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- Insert sample article for testing
INSERT INTO articles (title, content, image, category) VALUES (
    'Körpə Qidalandırmasında İlk 6 Ay: Əsas Prinsiplər',
    '<h2>Körpə Qidalandırmasında İlk 6 Ay: Əsas Prinsiplər</h2>
    
    <p>Yeni doğulmuş körpələrin qidalandırması onların sağlam inkişafı üçün ən vacib amillərdən biridir. İlk 6 ay ərzində körpələrin qida ehtiyacları çox spesifikdir və ana südü ilə qidalandırma ən yaxşı seçimdir.</p>

    <h3>Ana Südünün Üstünlükləri</h3>
    <ul>
        <li><strong>İmmun Sistemi:</strong> Ana südü körpənin immun sistemini gücləndirir və xəstəliklərdən qoruyur</li>
        <li><strong>Həzm:</strong> Körpənin həzm sistemini dəstəkləyir və qaz problemlərini azaldır</li>
        <li><strong>İnkişaf:</strong> Beyin və fiziki inkişaf üçün lazım olan bütün qida elementlərini təmin edir</li>
        <li><strong>Əlaqə:</strong> Ana ilə körpə arasında emosional əlaqəni gücləndirir</li>
    </ul>

    <h3>Qidalandırma Cədvəli</h3>
    <p>İlk həftələrdə körpə 2-3 saatdan bir qidalandırılmalıdır. Bu vaxt hər körpə üçün fərqli ola bilər:</p>
    <ul>
        <li><strong>0-1 ay:</strong> Gündə 8-12 dəfə</li>
        <li><strong>1-3 ay:</strong> Gündə 6-8 dəfə</li>
        <li><strong>3-6 ay:</strong> Gündə 5-6 dəfə</li>
    </ul>

    <p><strong>Qeyd:</strong> Hər körpə fərqlidir və öz tempində inkişaf edir. Əgər narahatlığınız varsa, həkimə müraciət edin.</p>',
    'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?w=800&h=600&fit=crop',
    'Qidalandırma'
) ON CONFLICT DO NOTHING;

-- Show table information
SELECT 
    table_name, 
    column_name, 
    data_type, 
    is_nullable
FROM information_schema.columns 
WHERE table_schema = 'public' 
AND table_name IN ('articles', 'contact_submissions')
ORDER BY table_name, ordinal_position;
