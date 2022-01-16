import { NextResponse } from "next/server"

const signedInRoutes = ["/cv", "/cover-letter", "/about"]

export default function middleware(req) {
  if (signedInRoutes.find((route) => route === req.nextUrl.pathname)) {
    const token = req.cookies.NINJA_KAKAN

    if (!token) {
      return NextResponse.redirect("/signin")
    }
  }
}
