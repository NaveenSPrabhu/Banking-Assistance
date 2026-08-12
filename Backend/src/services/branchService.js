const prisma = require('../config/prisma');

const publicBranchSelect = {
  id: true,
  branchCode: true,
  branchName: true,
  area: true,
  city: true,
  state: true,
  address: true,
  isActive: true,
  createdAt: true,
  updatedAt: true,
};

function normalizeBranchInput(data) {
  return {
    branchCode: String(data.branchCode || '').trim().toUpperCase(),
    branchName: String(data.branchName || '').trim(),
    area: String(data.area || '').trim(),
    city: String(data.city || '').trim(),
    state: String(data.state || '').trim(),
    address: String(data.address || '').trim(),
  };
}

function validateBranch(data) {
  const required = ['branchCode', 'branchName', 'area', 'city', 'state', 'address'];
  for (const field of required) {
    if (!data[field]) {
      throw new Error(`${field} is required.`);
    }
  }
}

const listBranches = async () => {
  return prisma.branch.findMany({
    orderBy: { createdAt: 'desc' },
    select: publicBranchSelect,
  });
};

const createBranch = async (data) => {
  const input = normalizeBranchInput(data);
  validateBranch(input);

  const existing = await prisma.branch.findUnique({
    where: { branchCode: input.branchCode },
  });

  if (existing) {
    throw new Error('Branch code already exists.');
  }

  return prisma.branch.create({
    data: input,
    select: publicBranchSelect,
  });
};

const updateBranch = async (id, data) => {
  const input = normalizeBranchInput(data);
  validateBranch(input);

  const existing = await prisma.branch.findFirst({
    where: {
      branchCode: input.branchCode,
      NOT: { id },
    },
  });

  if (existing) {
    throw new Error('Branch code already exists.');
  }

  return prisma.branch.update({
    where: { id },
    data: input,
    select: publicBranchSelect,
  });
};

const toggleBranch = async (id) => {
  const branch = await prisma.branch.findUnique({ where: { id } });
  if (!branch) throw new Error('Branch not found.');

  return prisma.branch.update({
    where: { id },
    data: { isActive: !branch.isActive },
    select: publicBranchSelect,
  });
};

const verifyBranch = async (branchCode, userId) => {
  const code = String(branchCode || '').trim().toUpperCase();
  if (!code) throw new Error('Branch code is required.');

  const branch = await prisma.branch.findUnique({
    where: { branchCode: code },
    select: publicBranchSelect,
  });

  if (!branch || !branch.isActive) {
    throw new Error('Branch not found or inactive.');
  }

  if (userId) {
    await prisma.user.update({
      where: { id: userId },
      data: { branchId: branch.id },
    });
  }

  return branch;
};

module.exports = {
  listBranches,
  createBranch,
  updateBranch,
  toggleBranch,
  verifyBranch,
};
