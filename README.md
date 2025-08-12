# 🍼 Swissneo - Super Premium Baby Formula Website

[![GitHub](https://img.shields.io/badge/GitHub-Swissneo-blue?style=flat&logo=github)](https://github.com/hemidirasim/swiss-neo)
[![React](https://img.shields.io/badge/React-18.3.1-blue?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue?style=flat&logo=postgresql)](https://www.postgresql.org/)

## 🌟 Xüsusiyyətlər

### 🎨 **Modern UI/UX**
- **Responsive Design** - Bütün cihazlarda mükəmməl görünüş
- **Dark/Light Mode** - Avtomatik tema dəyişmə
- **Smooth Animations** - Professional animasiyalar
- **Accessibility** - WCAG standartlarına uyğun

### 🌍 **İki Dilli Dəstək**
- **Azərbaycan dili** - Əsas dil
- **İngilis dili** - Beynəlxalq dəstək
- **Avtomatik dil dəyişmə** - İstifadəçi təcrübəsi

### 🔐 **Təhlükəsizlik**
- **PostgreSQL Database** - Remote server-də saxlanılır
- **Bcrypt şifrələmə** - Təhlükəsiz şifrə hash
- **SQL Injection qorunması** - Parameterized queries
- **SSL bağlantısı** - Təhlükəsiz data ötürülməsi

### 📱 **Səhifələr**
- **Ana Səhifə** - Hero section, məhsullar, məlumatlar
- **Məhsul Detalları** - Ətraflı məhsul məlumatları
- **Haqqımızda** - Şirkət məlumatları
- **Əlaqə** - Əlaqə formu və məlumatları
- **Təlimatlar** - Qidalandırma təlimatları
- **Məqalələr** - Sağlamlıq məqalələri
- **Admin Panel** - Məzmun idarəetməsi

## 🚀 Quraşdırma

### Tələblər
- Node.js 18+ 
- npm/yarn
- PostgreSQL database

### Quraşdırma addımları

```bash
# Repository-ni klonlayın
git clone https://github.com/hemidirasim/swiss-neo.git
cd swiss-neo

# Dependencies quraşdırın
npm install

# Development server başladın
npm run dev
```

### Database Quraşdırması

1. **PostgreSQL database** yaradın
2. **Database məlumatlarını** konfiqurasiya edin:
   ```typescript
   // src/config/database.ts
   host: 'your-database-host',
   database: 'your-database-name',
   user: 'your-username',
   password: 'your-password'
   ```

3. **Schema-nı** yükləyin:
   ```bash
   # Database schema-nı yükləyin
   psql -h your-host -U your-user -d your-database -f src/database/schema.sql
   ```

## 📖 İstifadə

### Development
```bash
# Development server
npm run dev

# Build production
npm run build

# Preview production build
npm run preview
```

### Admin Panel
- **URL**: `http://localhost:8080/swissadmin`
- **İstifadəçi adı**: `admin`
- **Şifrə**: `swissneo2024`

### Avtomatik Deploy
```bash
# Dəyişiklikləri avtomatik push et
npm run push

# Build və push
npm run deploy
```

## 🏗️ Texnologiya Stack

### Frontend
- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Shadcn/ui** - UI components
- **React Router** - Navigation
- **React Query** - Data fetching

### Backend
- **PostgreSQL** - Database
- **Node.js** - Runtime
- **Bcrypt** - Password hashing
- **pg** - PostgreSQL client

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Type checking

## 📁 Layihə Strukturu

```
swiss-neo/
├── public/                 # Static files
├── src/
│   ├── components/         # React components
│   ├── contexts/          # React contexts
│   ├── pages/             # Page components
│   ├── services/          # API services
│   ├── config/            # Configuration
│   ├── database/          # Database schema
│   └── lib/               # Utilities
├── scripts/               # Build scripts
└── package.json
```

## 🔧 Konfiqurasiya

### Environment Variables
```bash
# Database
DB_HOST=your-database-host
DB_PORT=5432
DB_NAME=your-database-name
DB_USER=your-username
DB_PASSWORD=your-password

# JWT
JWT_SECRET=your-secret-key
```

### Database Schema
- **users** - İstifadəçi autentifikasiyası
- **site_content** - Sayt məzmunu
- **articles** - Məqalələr
- **contact_submissions** - Əlaqə formları

## 🚀 Deploy

### Vercel
```bash
# Vercel CLI quraşdırın
npm i -g vercel

# Deploy edin
vercel
```

### Netlify
```bash
# Build edin
npm run build

# Netlify-a yükləyin
netlify deploy --prod --dir=dist
```

## 🤝 Töhfə

1. **Fork** edin
2. **Feature branch** yaradın (`git checkout -b feature/amazing-feature`)
3. **Commit** edin (`git commit -m 'Add amazing feature'`)
4. **Push** edin (`git push origin feature/amazing-feature`)
5. **Pull Request** yaradın

## 📄 Lisenziya

Bu layihə MIT lisenziyası altında yayımlanır.

## 📞 Əlaqə

- **Website**: [swissneo.az](https://swissneo.az)
- **Email**: info@swissneo.az
- **GitHub**: [@hemidirasim](https://github.com/hemidirasim)

## 🙏 Təşəkkür

- **React Team** - Mükəmməl framework
- **Vite Team** - Sürətli build tool
- **Tailwind CSS** - Utility-first CSS
- **Shadcn/ui** - Gözəl UI components

---

**Swissneo** - İsveçrə keyfiyyətində premium uşaq qidası 🍼🇨🇭
