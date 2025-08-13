const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    const username = 'admin';
    const password = 'admin123';
    const email = 'admin@swissneo.com';

    // Check if admin already exists
    const existingAdmin = await prisma.admin.findUnique({
      where: { username }
    });

    if (existingAdmin) {
      console.log('❌ Admin already exists with username:', username);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        email,
        role: 'admin',
        isActive: true
      }
    });

    console.log('✅ Admin created successfully!');
    console.log('📋 Admin details:');
    console.log('   Username:', admin.username);
    console.log('   Email:', admin.email);
    console.log('   Role:', admin.role);
    console.log('   ID:', admin.id);
    console.log('');
    console.log('🔑 Login credentials:');
    console.log('   Username:', username);
    console.log('   Password:', password);

  } catch (error) {
    console.error('❌ Error creating admin:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
