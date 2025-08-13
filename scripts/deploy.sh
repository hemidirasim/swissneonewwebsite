#!/bin/bash

echo "🚀 Deploying Swissneo Baby Nutrition to Vercel..."

# Build the project
echo "📦 Building project..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Build failed!"
    exit 1
fi

echo "✅ Build successful!"

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
vercel --prod

echo "✅ Deployment complete!"
echo ""
echo "🔧 Important: Make sure to set the environment variable in Vercel dashboard:"
echo "   BLOB_READ_WRITE_TOKEN=vercel_blob_rw_lpXh5J5CALn3pKRK_Vx0SPIGeZbAkiuiyC9UyRvbW0EwIGk"
echo ""
echo "📝 Steps to set environment variable:"
echo "   1. Go to Vercel dashboard"
echo "   2. Select your project"
echo "   3. Go to Settings > Environment Variables"
echo "   4. Add: BLOB_READ_WRITE_TOKEN"
echo "   5. Value: vercel_blob_rw_lpXh5J5CALn3pKRK_Vx0SPIGeZbAkiuiyC9UyRvbW0EwIGk"
echo "   6. Select all environments (Production, Preview, Development)"
echo "   7. Save"
echo ""
echo "🎯 Test the image upload at: https://your-domain.vercel.app/swissadmin"
