const bcrypt = require("bcrypt");
const prisma = require("../config/prisma");

const signup = async (userData) => {
  const {
    fullName,
    username,
    email,
    mobile,
    password,
    preferredLanguage,
  } = userData;

  if (
    !fullName ||
    !username ||
    !email ||
    !mobile ||
    !password
  ) {
    throw new Error("All fields are required.");
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }, { mobile }],
    },
  });

  if (existingUser) {
    throw new Error(
      "Email, Username or Mobile already exists."
    );
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      fullName,
      username,
      email,
      mobile,
      passwordHash: hashedPassword,
      preferredLanguage: preferredLanguage || "English",
      role: "Customer",
    },
  });

  delete user.passwordHash;
  return user;
};

const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  const validPassword = await bcrypt.compare(
    password,
    user.passwordHash
  );

  if (!validPassword) {
    throw new Error("Invalid email or password.");
  }

  delete user.passwordHash;
  return user;
};

const updateProfile = async (userId, userData) => {
  const {
    fullName,
    username,
    email,
    mobile,
    preferredLanguage,
  } = userData;

  if (!fullName || !username || !email || !mobile) {
    throw new Error("Full name, username, email and mobile are required.");
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }, { mobile }],
      NOT: { id: userId },
    },
  });

  if (existingUser) {
    throw new Error("Email, Username or Mobile already exists.");
  }

  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      fullName,
      username,
      email,
      mobile,
      preferredLanguage: preferredLanguage || "English",
    },
  });

  delete user.passwordHash;
  return user;
};

module.exports = {
  signup,
  login,
  updateProfile,
};
