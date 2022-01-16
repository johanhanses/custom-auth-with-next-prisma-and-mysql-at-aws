import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import cookie from "cookie"
import prisma from "../../lib/prisma"

export default async function signOut(req, res) {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("NINJA_KAKAN", null, {
      httpOnly: true,
      maxAge: 0,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production"
    })
  )

  // res.setHeader('set-cookie', 'mycookie=; max-age=0');

  res.status(205).json({ message: "trying to logout" })
}
