// Types
export interface Article {
  id: string;
  title: string;
  content: string;
  image: string;
  category: string;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
}



// Initialize database
export async function initializeDatabase() {
  try {
    console.log('Initializing database with API endpoints...');
    // Test connection by loading articles
    await loadArticles();
    console.log('Database connection successful via API');
  } catch (error) {
    console.error('Database initialization error:', error);
    console.log('Falling back to localStorage for data storage');
  }
}

// Load articles from database
export async function loadArticles(): Promise<Article[]> {
  try {
    console.log('🔄 Loading articles from database via API...');
    
    // Check if we're in development mode
    if (import.meta.env.DEV) {
      console.log('🔧 Development mode detected, using mock data...');
      return [
        {
          id: '1',
          title: 'Uşaqlar üçün sağlam qidalanma',
          content: 'Uşaqların sağlam inkişafı üçün düzgün qidalanma çox vacibdir...',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
          category: 'Qidalanma',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Uşaq inkişafının əsas mərhələləri',
          content: 'Uşaqların inkişafı müxtəlif mərhələlərdə baş verir...',
          image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
          category: 'İnkişaf',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        },
        {
          id: '3',
          title: 'Uşaqlar üçün fiziki fəaliyyət',
          content: 'Fiziki fəaliyyət uşaqların sağlamlığı üçün vacibdir...',
          image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
          category: 'Fiziki fəaliyyət',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ];
    }
    
    const response = await fetch('/api/articles');
    console.log('📡 API Response status:', response.status);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    console.log('📡 API Response data:', result);
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to load articles');
    }
    
    console.log(`✅ Loaded ${result.data.length} articles from database`);
    return result.data;
  } catch (error) {
    console.error('Error loading articles:', error);
    throw error;
  }
}

// Save article to database
export async function saveArticle(article: Omit<Article, 'id' | 'created_at' | 'updated_at'>): Promise<Article> {
  try {
    console.log('Saving article to database via API:', article.title);
    
    const response = await fetch('/api/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(article)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to save article');
    }
    
    console.log('Article saved successfully to PostgreSQL:', result.data.id);
    return result.data;
  } catch (error) {
    console.error('Error saving article to PostgreSQL:', error);
    throw error;
  }
}

// Update article in database
export async function updateArticle(id: string, updates: Partial<Article>): Promise<Article> {
  try {
    console.log('Updating article in database via API:', id);
    
    const response = await fetch('/api/articles', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id, ...updates })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to update article');
    }
    
    console.log('Article updated successfully in PostgreSQL');
    return result.data;
  } catch (error) {
    console.error('Error updating article in PostgreSQL:', error);
    throw error;
  }
}

// Delete article from database
export async function deleteArticle(id: string): Promise<void> {
  try {
    console.log('Deleting article from database via API:', id);
    
    const response = await fetch(`/api/articles?id=${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to delete article');
    }
    
    console.log('Article deleted successfully from PostgreSQL');
  } catch (error) {
    console.error('Error deleting article from PostgreSQL:', error);
    throw error;
  }
}

// Load contact submissions from database
export async function loadContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    console.log('🔄 Loading contact submissions from database via API...');
    
    // Check if we're in development mode
    if (import.meta.env.DEV) {
      console.log('🔧 Development mode detected, using mock contact data...');
      return [
        {
          id: '1',
          name: 'Aynur Məmmədova',
          email: 'aynur.mammadova@email.com',
          message: 'Uşağım 2 yaşındadır və yemək yeməkdə problem yaşayır. Nə tövsiyə edərsiniz?',
          created_at: new Date().toISOString()
        },
        {
          id: '2',
          name: 'Elşən Əliyev',
          email: 'elshen.aliyev@email.com',
          message: 'Uşağım üçün düzgün yuxu rejimi necə qurmaq olar? 3 yaşındadır.',
          created_at: new Date().toISOString()
        }
      ];
    }
    
    const response = await fetch('/api/contact-submissions');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to load contact submissions');
    }
    
    console.log(`✅ Loaded ${result.data.length} contact submissions from database`);
    return result.data;
  } catch (error) {
    console.error('Error loading contact submissions:', error);
    throw error;
  }
}

// Add contact submission to database
export async function addContactSubmission(submission: Omit<ContactSubmission, 'id' | 'created_at'>): Promise<ContactSubmission> {
  try {
    console.log('Adding contact submission to database via API:', submission.email);
    
    const response = await fetch('/api/contact-submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(submission)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to add contact submission');
    }
    
    console.log('Contact submission added successfully to PostgreSQL:', result.data.id);
    return result.data;
  } catch (error) {
    console.error('Error adding contact submission to PostgreSQL:', error);
    throw error;
  }
}

// Delete contact submission from database
export async function deleteContactSubmission(id: string): Promise<void> {
  try {
    console.log('Deleting contact submission from database via API:', id);
    
    const response = await fetch(`/api/contact-submissions?id=${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to delete contact submission');
    }
    
    console.log('Contact submission deleted successfully from PostgreSQL');
  } catch (error) {
    console.error('Error deleting contact submission from PostgreSQL:', error);
    throw error;
  }
}

// Close database connection (not needed for API approach)
export async function closeDatabase() {
  // No connection to close when using API endpoints
}
