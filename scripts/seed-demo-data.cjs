const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: "postgresql://swissp_1:ti6NdPyN2uHREREA@j2tw.your-database.de:5432/swissp_db1"
    }
  }
});

async function seedDemoData() {
  try {
    console.log('🌱 Starting demo data seeding...');

    // Demo articles
    const demoArticles = [
      {
        title: 'Uşaqlar üçün sağlam qidalanma',
        content: `Uşaqların sağlam inkişafı üçün düzgün qidalanma çox vacibdir. Gündəlik pəhrizdə aşağıdakı qida qrupları olmalıdır:

1. **Təzə meyvə və tərəvəzlər** - Vitamin və mineral mənbəyi
2. **Tam taxıl məhsulları** - Enerji və lif mənbəyi  
3. **Yağsız protein** - Ət, balıq, yumurta, paxla
4. **Süd məhsulları** - Kalsium və D vitamini
5. **Sağlam yağlar** - Zeytun yağı, qoz-fındıq

Uşaqların yaşına görə pəhriz fərqlənə bilər. Mütəxəssisə müraciət etmək tövsiyə olunur.`,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        category: 'Qidalanma'
      },
      {
        title: 'Uşaq inkişafının əsas mərhələləri',
        content: `Uşaqların inkişafı müxtəlif mərhələlərdə baş verir:

**0-6 ay:**
- Başını saxlama
- Gözləri ilə obyektləri izləmə
- Səs çıxarma

**6-12 ay:**
- Oturma və sürünmə
- "Ana", "ata" sözlərini demə
- Oyuncaqlarla oynama

**1-2 yaş:**
- Yeriyə bilmə
- Sadə sözlər demə
- Müstəqil yemək yemə

**2-3 yaş:**
- Cümlə qurma
- Rəngləri tanıma
- Sadə tapşırıqları yerinə yetirmə

Hər uşaq öz sürətində inkişaf edir. Narahatlıq halında həkimə müraciət edin.`,
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
        category: 'İnkişaf'
      },
      {
        title: 'Uşaqlar üçün fiziki fəaliyyət',
        content: `Fiziki fəaliyyət uşaqların sağlamlığı üçün vacibdir:

**Gündəlik fəaliyyət tövsiyələri:**
- 3-5 yaş: Gündə 3 saat aktiv oyun
- 6-17 yaş: Gündə 60 dəqiqə orta və ya yüksək intensivlikli fəaliyyət

**Fəaliyyət növləri:**
1. **Aerobik fəaliyyət** - Qaçma, üzmə, velosiped
2. **Güc məşqləri** - Çəkmə, itələmə hərəkətləri
3. **Sümük gücləndirmə** - Tullanma, dırmaşma

**Faydaları:**
- Ürək-damar sağlamlığı
- Güclü sümüklər və əzələlər
- Sağlam çəki
- Yaxşı yuxu
- Stress azalması

Uşaqları məşğul etmək üçün əyləncəli oyunlar seçin!`,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        category: 'Fiziki fəaliyyət'
      },
      {
        title: 'Uşaqların yuxu rejimi',
        content: `Düzgün yuxu uşaqların inkişafı üçün vacibdir:

**Yaşa görə yuxu vaxtı:**
- 0-3 ay: 14-17 saat
- 4-11 ay: 12-15 saat  
- 1-2 yaş: 11-14 saat
- 3-5 yaş: 10-13 saat
- 6-13 yaş: 9-11 saat

**Yaxşı yuxu üçün tövsiyələr:**
1. **Düzgün rejim** - Hər gün eyni vaxtda yatmaq
2. **Yuxu mühiti** - Qaranlıq, sakit və sərin otaq
3. **Yuxu ritualı** - Hekayə oxuma, mahnı söyləmə
4. **Elektronik cihazlardan uzaqlaşma** - Yatmadan 1 saat əvvəl
5. **Yüngül yemək** - Yatmadan 2-3 saat əvvəl

Düzgün yuxu uşağın öyrənmə qabiliyyətini artırır və davranış problemlərini azaldır.`,
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=300&fit=crop',
        category: 'Sağlamlıq'
      },
      {
        title: 'Uşaqların immun sistemi',
        content: `Uşaqların immun sistemi yaşla birlikdə güclənir:

**İmmun sistemini gücləndirmək üçün:**
1. **Düzgün qidalanma** - Vitamin və mineral zəngin qida
2. **Kifayət qədər yuxu** - İmmun sistemin bərpası üçün
3. **Fiziki fəaliyyət** - Düzgün qan dövranı
4. **Stress azaltma** - Stress immun sistemini zəiflədir
5. **Təzə hava** - Vitamin D mənbəyi

**Təcili yardım lazım olduqda:**
- Yüksək hərarət (39°C-dən yuxarı)
- Uzun müddətli xəstəlik
- Su itkisi əlamətləri
- Nəfəs çətinliyi

Uşaqların immun sistemi təcrübə ilə güclənir. Həkimə müntəzəm müayinə vacibdir.`,
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
        category: 'Sağlamlıq'
      }
    ];

    // Demo contact submissions
    const demoContactSubmissions = [
      {
        name: 'Aynur Məmmədova',
        email: 'aynur.mammadova@email.com',
        message: 'Uşağım 2 yaşındadır və yemək yeməkdə problem yaşayır. Nə tövsiyə edərsiniz?'
      },
      {
        name: 'Elşən Əliyev',
        email: 'elshen.aliyev@email.com', 
        message: 'Uşağım üçün düzgün yuxu rejimi necə qurmaq olar? 3 yaşındadır.'
      },
      {
        name: 'Leyla Hüseynova',
        email: 'leyla.huseynova@email.com',
        message: 'Uşağımın fiziki inkişafı üçün hansı məşqlər tövsiyə edərsiniz?'
      }
    ];

    // Test database connection
    console.log('🔗 Testing database connection...');
    await prisma.$connect();
    console.log('✅ Database connection successful');

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await prisma.article.deleteMany({});
    await prisma.contactSubmission.deleteMany({});
    console.log('✅ Existing data cleared');

    // Insert demo articles
    console.log('📝 Creating demo articles...');
    const createdArticles = await Promise.all(
      demoArticles.map(article => 
        prisma.article.create({ data: article })
      )
    );
    console.log(`✅ ${createdArticles.length} demo articles created`);

    // Insert demo contact submissions
    console.log('📧 Creating demo contact submissions...');
    const createdSubmissions = await Promise.all(
      demoContactSubmissions.map(submission =>
        prisma.contactSubmission.create({ data: submission })
      )
    );
    console.log(`✅ ${createdSubmissions.length} demo contact submissions created`);

    // Verify data
    const articleCount = await prisma.article.count();
    const submissionCount = await prisma.contactSubmission.count();
    
    console.log('\n🎉 Demo data seeding completed successfully!');
    console.log(`📊 Database now contains:`);
    console.log(`   - ${articleCount} articles`);
    console.log(`   - ${submissionCount} contact submissions`);

    // Show sample data
    console.log('\n📋 Sample articles:');
    const sampleArticles = await prisma.article.findMany({
      take: 3,
      select: { id: true, title: true, category: true }
    });
    sampleArticles.forEach(article => {
      console.log(`   - ${article.title} (${article.category})`);
    });

  } catch (error) {
    console.error('❌ Error seeding demo data:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
    console.log('🔌 Database connection closed');
  }
}

// Run the seeding
seedDemoData();
