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

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

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
    console.log('Loading articles from database via API...');
    
    const response = await fetch('/api/articles');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to load articles');
    }
    
    console.log(`Loaded ${result.data.length} articles from database`);
    return result.data;
  } catch (error) {
    console.error('Error loading articles:', error);
    // Fallback to localStorage if database fails
    console.log('Falling back to localStorage for articles');
    if (isBrowser) {
      const stored = localStorage.getItem('articles');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
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
    // Fallback to localStorage
    console.log('Falling back to localStorage for article save');
    if (isBrowser) {
      const newArticle: Article = {
        ...article,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };
      
      const stored = localStorage.getItem('articles');
      const articles = stored ? JSON.parse(stored) : [];
      articles.unshift(newArticle);
      localStorage.setItem('articles', JSON.stringify(articles));
      
      return newArticle;
    }
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
    // Fallback to localStorage
    console.log('Falling back to localStorage for article update');
    if (isBrowser) {
      const stored = localStorage.getItem('articles');
      const articles = stored ? JSON.parse(stored) : [];
      const index = articles.findIndex((a: Article) => a.id === id);
      
      if (index !== -1) {
        articles[index] = { ...articles[index], ...updates, updated_at: new Date().toISOString() };
        localStorage.setItem('articles', JSON.stringify(articles));
        return articles[index];
      }
    }
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
    // Fallback to localStorage
    console.log('Falling back to localStorage for article delete');
    if (isBrowser) {
      const stored = localStorage.getItem('articles');
      const articles = stored ? JSON.parse(stored) : [];
      const filtered = articles.filter((a: Article) => a.id !== id);
      localStorage.setItem('articles', JSON.stringify(filtered));
    }
    throw error;
  }
}

// Load contact submissions from database
export async function loadContactSubmissions(): Promise<ContactSubmission[]> {
  try {
    console.log('Loading contact submissions from database via API...');
    
    const response = await fetch('/api/contact-submissions');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Failed to load contact submissions');
    }
    
    console.log(`Loaded ${result.data.length} contact submissions from database`);
    return result.data;
  } catch (error) {
    console.error('Error loading contact submissions:', error);
    // Fallback to localStorage if database fails
    console.log('Falling back to localStorage for contact submissions');
    if (isBrowser) {
      const stored = localStorage.getItem('contactSubmissions');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
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
    // Fallback to localStorage
    console.log('Falling back to localStorage for contact submission');
    if (isBrowser) {
      const newSubmission: ContactSubmission = {
        ...submission,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString()
      };
      
      const stored = localStorage.getItem('contactSubmissions');
      const submissions = stored ? JSON.parse(stored) : [];
      submissions.unshift(newSubmission);
      localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
      
      return newSubmission;
    }
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
    // Fallback to localStorage
    console.log('Falling back to localStorage for contact submission delete');
    if (isBrowser) {
      const stored = localStorage.getItem('contactSubmissions');
      const submissions = stored ? JSON.parse(stored) : [];
      const filtered = submissions.filter((s: ContactSubmission) => s.id !== id);
      localStorage.setItem('contactSubmissions', JSON.stringify(filtered));
    }
    throw error;
  }
}

// Close database connection (not needed for API approach)
export async function closeDatabase() {
  // No connection to close when using API endpoints
}
