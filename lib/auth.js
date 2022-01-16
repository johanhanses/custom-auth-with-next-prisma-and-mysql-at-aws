import jwt from "jsonwebtoken"
import prisma from "./prisma"

export default function validateRoute(handler) {
  return async (req, res) => {
    const { NINJA_KAKAN: token } = req.cookies

    if (token) {
      let user

      try {
        const { id } = jwt.verify(token, process.env.SECRET)
        user = await prisma.user.findUnique({ where: { id } })

        if (!user) {
          throw new Error("User does not exist")
        }
      } catch (error) {
        res.status(401).json({ error: "Not authorized" })
        return
      }
      return handler(req, res, user)
    }

    res.status(401).json({ error: "Not authorized" })
  }
}
