import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie"
import prisma from "../../lib/prisma"

export default async function signUp(req, res) {
  const salt = bcrypt.genSaltSync()
  const { username, password } = req.body

  let user

  try {
    user = await prisma.user.create({
      data: {
        username,
        password: bcrypt.hashSync(password, salt)
      }
    })
  } catch (error) {
    res.status(401)
    res.json({
      error: "User already exists"
    })
    return
  }

  const token = jwt.sign(
    {
      username: user.username,
      id: user.id,
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

  res.status(201).json(user)
}
