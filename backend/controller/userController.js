const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();

// ======================================== GET USER ========================================
const getUser = async (req, res, next) => {
  try {
    const user = await prisma.user.findMany();
    res.json(user);
  } catch (error) {
    res.status(404).json({ error, message: "hanya bisa diakses oleh admin" });
    next(error);
  }
};

// ======================================== REGISTER ========================================
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    res.json(newUser);
  } catch (error) {
    res.status(500).json({ message: "user sudah melakukan registrasi" });
  }
};

// ======================================== LOGIN ========================================
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    // cek user berdasarkan email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "user belum pernah melakukan registrasi" });
    }

    // cek valid password dan tidak valid
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(404).json({ message: "password salah" });
    }

    // Access Token
    const accessToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "50s" }
    );

    // Refresh Token
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.SECRET_KEY,
      { expiresIn: "1d" }
    );

    // UPDATE REFRESH TOKEN KE DATABASE
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        jwt: refreshToken,
      },
    });

    // COOKIE
    res.cookie("refreshToken", refreshToken, { httpOnly: true });

    // Jika berhasil
    res.json({
      message: "login sukses",
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        accessToken: accessToken,
      },
    });
  } catch (error) {
    res.status(404).json({ message: "email atau password salah!" });
  }
};

// ======================================== LOGOUT ========================================

const logoutUser = async (req, res) => {
  const { email } = req.body;

  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) return res.sendStatus(204); // status no content

  // mencari kesamaan jwt pada database dengan refreshToken cookies
  const user = await prisma.user.findMany({
    where: {
      jwt: refreshToken,
    },
  });
  if (!user) res.sendStatus(204); // status no content

  // jika terdapat refreshToken maka update jwt menjadi null , pencarian berdasarkan email
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      jwt: null,
    },
  });
  res.clearCookie("refreshToken"); // untuk menghapus refreshToken pada cookies
  res.sendStatus(200);
};

module.exports = { getUser, registerUser, loginUser, logoutUser };
