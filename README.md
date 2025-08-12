# Swissneo Baby Nutrition Website

Swissneo baby nutrition website with admin panel and multilingual support.

## 🚀 Vercel Deployment

### 1. Environment Variables Setup

Vercel dashboard-da bu environment variable-ı əlavə edin:

```
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_lpXh5J5CALn3pKRK_Vx0SPIGeZbAkiuiyC9UyRvbW0EwIGk
```

**Addım-addım:**
1. Vercel dashboard-a daxil olun
2. Proyektinizi seçin
3. "Settings" tab-ına keçin
4. "Environment Variables" bölməsini tapın
5. "Add New" düyməsinə basın
6. Name: `BLOB_READ_WRITE_TOKEN`
7. Value: `vercel_blob_rw_lpXh5J5CALn3pKRK_Vx0SPIGeZbAkiuiyC9UyRvbW0EwIGk`
8. Environment: Production, Preview, Development (hamısını seçin)
9. "Save" düyməsinə basın

### 2. Deploy

```bash
# Vercel CLI ilə
vercel --prod

# Və ya GitHub-dan avtomatik deploy
```

## 🛠️ Local Development

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

### Build

```bash
npm run build
```

### Preview

```bash
npm run preview
```

## 🔐 Admin Panel

- **URL**: `/swissadmin`
- **Username**: `admin`
- **Password**: `swissneo2024`
- **Session**: 7 gün avtomatik uzadılır

## 📝 Features

- ✅ Multilingual support (AZ/EN)
- ✅ Admin panel with session management
- ✅ Article management with image upload
- ✅ Contact form submissions
- ✅ Responsive design
- ✅ Vercel Blob Storage for images
- ✅ LocalStorage for data persistence

## 🏗️ Project Structure

```
src/
├── components/          # UI components
├── contexts/           # React contexts
├── data/              # Static data
├── hooks/             # Custom hooks
├── pages/             # Page components
├── services/          # API services
└── types/             # TypeScript types
```

## 🔧 Configuration

### Vite Config
- Build optimization
- Vercel deployment ready
- SPA routing support

### Vercel Config
- SPA fallback routing
- Static asset caching
- Security headers

## 📱 Pages

- **Home**: `/` - Main landing page
- **About**: `/about` - Company information
- **Products**: `/products` - Product catalog
- **Articles**: `/articles` - Blog articles
- **Contact**: `/contact` - Contact information
- **Instructions**: `/instructions` - Feeding instructions
- **Admin**: `/swissadmin` - Admin panel

## 🚀 Deployment Status

- ✅ Local development working
- ✅ Vercel deployment configured
- ✅ Environment variables documented
- ✅ Error handling implemented
- ✅ Fallback mechanisms in place

## 🔍 Troubleshooting

### Vercel Deployment Issues

1. **Environment Variable Missing**
   - Vercel dashboard-da `BLOB_READ_WRITE_TOKEN` əlavə edin
   - Bütün environment-ləri seçin (Production, Preview, Development)

2. **Build Errors**
   - `npm run build` local-da test edin
   - Console xətalarını yoxlayın

3. **Image Upload Issues**
   - Vercel Blob token düzgün əlavə edilib-edilmədiyini yoxlayın
   - Fallback placeholder images istifadə olunur

### Local Development Issues

1. **Port Already in Use**
   ```bash
   pkill -f "npm run dev"
   npm run dev
   ```

2. **Dependencies Issues**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

## 📞 Support

Əgər problem varsa:
1. Console xətalarını yoxlayın
2. Environment variables-ı yoxlayın
3. Vercel logs-ı yoxlayın
4. Local build test edin
