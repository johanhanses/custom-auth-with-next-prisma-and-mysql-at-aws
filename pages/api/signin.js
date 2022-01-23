import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie"
import prisma from "../../lib/prisma"

export default async function signIn(req, res) {
  const { username, password } = req.body

  const user = await prisma.user.findUnique({
    where: {
      username
    }
  })

  if (user && bcrypt.compareSync(password, user.password)) {
    const token = jwt.sign(
      {
        id: user.id,
        username: user.username,
        time: Date.now()
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    )

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("NINJA_KAKAN", token, {
        httpOnly: true,
        maxAge: 60 * 60,
        path: "/",
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production"
      })
    )

    res.status(200).json({ user: user.username, ok: true, error: null })
  } else {
    res.status(401)
    res.json({
      error: "Wrong username or password"
    })
  }
}
