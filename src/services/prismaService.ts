import { PrismaClient } from '@prisma/client';

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

// Create Prisma client instance
const prisma = new PrismaClient();

// Check if we're in browser environment
const isBrowser = typeof window !== 'undefined';

// Initialize database
export async function initializeDatabase() {
  try {
    console.log('Initializing database with Prisma...');
    // Test connection
    await prisma.$connect();
    console.log('Prisma database connection successful');
  } catch (error) {
    console.error('Database initialization error:', error);
    console.log('Falling back to localStorage for data storage');
  }
}

// Load articles from database
export async function loadArticles(): Promise<Article[]> {
  try {
    console.log('Loading articles from database with Prisma...');
    const articles = await prisma.article.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`Loaded ${articles.length} articles from database`);
    
    // Convert to our interface format
    return articles.map(article => ({
      id: article.id,
      title: article.title,
      content: article.content,
      image: article.image,
      category: article.category,
      created_at: article.createdAt.toISOString(),
      updated_at: article.updatedAt.toISOString()
    }));
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
    console.log('Saving article to database with Prisma:', article.title);
    
    const newArticle = await prisma.article.create({
      data: {
        title: article.title,
        content: article.content,
        image: article.image,
        category: article.category
      }
    });
    
    console.log('Article saved successfully:', newArticle.id);
    
    return {
      id: newArticle.id,
      title: newArticle.title,
      content: newArticle.content,
      image: newArticle.image,
      category: newArticle.category,
      created_at: newArticle.createdAt.toISOString(),
      updated_at: newArticle.updatedAt.toISOString()
    };
  } catch (error) {
    console.error('Error saving article:', error);
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
    console.log('Updating article in database with Prisma:', id);
    
    const updateData: any = {};
    if (updates.title !== undefined) updateData.title = updates.title;
    if (updates.content !== undefined) updateData.content = updates.content;
    if (updates.image !== undefined) updateData.image = updates.image;
    if (updates.category !== undefined) updateData.category = updates.category;
    
    const updatedArticle = await prisma.article.update({
      where: { id },
      data: updateData
    });
    
    console.log('Article updated successfully');
    
    return {
      id: updatedArticle.id,
      title: updatedArticle.title,
      content: updatedArticle.content,
      image: updatedArticle.image,
      category: updatedArticle.category,
      created_at: updatedArticle.createdAt.toISOString(),
      updated_at: updatedArticle.updatedAt.toISOString()
    };
  } catch (error) {
    console.error('Error updating article:', error);
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
    console.log('Deleting article from database with Prisma:', id);
    await prisma.article.delete({
      where: { id }
    });
    console.log('Article deleted successfully');
  } catch (error) {
    console.error('Error deleting article:', error);
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
    console.log('Loading contact submissions from database with Prisma...');
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: 'desc' }
    });
    
    console.log(`Loaded ${submissions.length} contact submissions from database`);
    
    // Convert to our interface format
    return submissions.map(submission => ({
      id: submission.id,
      name: submission.name,
      email: submission.email,
      message: submission.message,
      created_at: submission.createdAt.toISOString()
    }));
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
    console.log('Adding contact submission to database with Prisma:', submission.email);
    
    const newSubmission = await prisma.contactSubmission.create({
      data: {
        name: submission.name,
        email: submission.email,
        message: submission.message
      }
    });
    
    console.log('Contact submission added successfully:', newSubmission.id);
    
    return {
      id: newSubmission.id,
      name: newSubmission.name,
      email: newSubmission.email,
      message: newSubmission.message,
      created_at: newSubmission.createdAt.toISOString()
    };
  } catch (error) {
    console.error('Error adding contact submission:', error);
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
    console.log('Deleting contact submission from database with Prisma:', id);
    await prisma.contactSubmission.delete({
      where: { id }
    });
    console.log('Contact submission deleted successfully');
  } catch (error) {
    console.error('Error deleting contact submission:', error);
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

// Close Prisma connection
export async function closeDatabase() {
  await prisma.$disconnect();
}
