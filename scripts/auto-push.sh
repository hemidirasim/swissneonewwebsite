#!/bin/bash

# Auto-push script for Swissneo project
# This script automatically commits and pushes changes to GitHub

echo "🔄 Starting auto-push process..."

# Get current timestamp
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

# Add all changes
echo "📁 Adding files to Git..."
git add .

# Check if there are any changes to commit
if git diff-index --quiet HEAD --; then
    echo "✅ No changes to commit"
else
    # Commit changes with timestamp
    echo "💾 Committing changes..."
    git commit -m "🔄 Auto-update: $TIMESTAMP - Swissneo website updates"
    
    # Push to GitHub
    echo "🚀 Pushing to GitHub..."
    git push origin main
    
    echo "✅ Successfully pushed to GitHub!"
    echo "📅 Timestamp: $TIMESTAMP"
fi

echo "🎉 Auto-push process completed!"
