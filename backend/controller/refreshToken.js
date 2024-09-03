const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
const prisma = new PrismaClient();

const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) return res.sendStatus(401);

    const user = await prisma.user.findMany({
      where: {
        jwt: refreshToken,
      },
    });
    if (!user) return res.sendStatus(403);

    jwt.verify(refreshToken, process.env.SECRET_KEY, (err, decoded) => {
      if (err) return res.sendStatus(403);

      const accessToken = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.SECRET_KEY,
        { expiresIn: "20s" }
      );
      res.json({ accessToken });
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { refreshToken };
