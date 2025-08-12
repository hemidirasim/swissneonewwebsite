# Swissneo - Super Premium Baby Formula

İsveçrədə istehsal olunmuş super premium uşaq qarışığı. 100 ildən artıq təcrübə ilə hazırlanmış təbii və təhlükəsiz formula.

## 🚀 Vercel Deployment

Bu layihə Vercel-ə yükləmək üçün hazırlanıb.

### Deployment Addımları:

1. **Vercel CLI quraşdırın:**
   ```bash
   npm i -g vercel
   ```

2. **Vercel-ə giriş edin:**
   ```bash
   vercel login
   ```

3. **Layihəni deploy edin:**
   ```bash
   vercel
   ```

4. **Production-a deploy edin:**
   ```bash
   vercel --prod
   ```

### Vercel Environment Variables:

Vercel dashboard-da aşağıdakı environment variables-ları əlavə edin:

```
VITE_APP_NAME=Swissneo
VITE_APP_DESCRIPTION=Super Premium Baby Formula
VITE_ADMIN_USERNAME=admin
VITE_ADMIN_PASSWORD=swissneo2024
VITE_CONTACT_EMAIL=info@swissneo.az
VITE_CONTACT_PHONE=+994 XX XXX XX XX
```

## 🛠️ Local Development

### Quraşdırma:

```bash
# Dependencies quraşdırın
npm install

# Development server başladın
npm run dev

# Build edin
npm run build

# Preview edin
npm run preview
```

### Admin Panel:

- **URL**: `http://localhost:8080/swissadmin`
- **İstifadəçi adı**: `admin`
- **Şifrə**: `swissneo2024`

## 📁 Layihə Strukturu

```
src/
├── components/          # UI komponentləri
├── contexts/           # React Context-lər
├── data/              # Məlumat faylları
├── hooks/             # Custom hooks
├── pages/             # Səhifələr
├── services/          # API və database xidmətləri
└── utils/             # Utility funksiyaları
```

## 🎨 Xüsusiyyətlər

### ✅ Tamamlanmış:
- ✅ Responsive dizayn
- ✅ İki dilli dəstək (Azərbaycan/İngilis)
- ✅ Admin panel
- ✅ Məqalələr idarəetməsi
- ✅ Şəkil yükləmə sistemi
- ✅ Contact form
- ✅ SEO optimizasiyası
- ✅ Vercel deployment

### 🔧 Texnologiyalar:
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + Shadcn/ui
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Build Tool**: Vite
- **Deployment**: Vercel

## 📱 Responsive Dizayn

- ✅ Mobile (320px+)
- ✅ Tablet (768px+)
- ✅ Desktop (1024px+)
- ✅ Large Desktop (1440px+)

## 🌐 Browser Dəstəyi

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

## 🔒 Təhlükəsizlik

- ✅ XSS qorunması
- ✅ Content Security Policy
- ✅ Secure headers
- ✅ Input validation

## 📊 Performance

- ✅ Code splitting
- ✅ Lazy loading
- ✅ Image optimization
- ✅ Bundle optimization

## 🚀 Deployment Status

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/hemidirasim/swiss-neo)

## 📞 Əlaqə

- **Email**: info@swissneo.az
- **Telefon**: +994 XX XXX XX XX
- **Ünvan**: Bakı, Azərbaycan

## 📄 Lisenziya

Bu layihə MIT lisenziyası altında yayımlanır.

---

**Swissneo** - İsveçrə keyfiyyətində premium uşaq qidası 🍼
