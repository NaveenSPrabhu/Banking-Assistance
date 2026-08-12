const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('Admin@12345', 10);

  await prisma.user.upsert({
    where: { email: 'admin@bank.com' },
    update: { role: 'Admin', passwordHash },
    create: {
      fullName: 'Bank Administrator',
      username: 'bankadmin',
      email: 'admin@bank.com',
      mobile: '9999999999',
      passwordHash,
      preferredLanguage: 'English',
      role: 'Admin',
    },
  });

  const branches = [
    {
      branchCode: 'BR001',
      branchName: 'Mangaluru Main Branch',
      area: 'Hampankatta',
      city: 'Mangaluru',
      state: 'Karnataka',
      address: 'Hampankatta, Mangaluru, Karnataka',
    },
    {
      branchCode: 'BR002',
      branchName: 'Udupi Branch',
      area: 'Udupi',
      city: 'Udupi',
      state: 'Karnataka',
      address: 'Udupi Main Road, Udupi, Karnataka',
    },
  ];

  for (const branch of branches) {
    await prisma.branch.upsert({
      where: { branchCode: branch.branchCode },
      update: branch,
      create: branch,
    });
  }

  console.log('Demo admin and branches are ready.');
  console.log('Admin login: admin@bank.com / Admin@12345');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
