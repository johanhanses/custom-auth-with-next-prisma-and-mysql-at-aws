import { useRouter } from "next/router"
import { useState } from "react"
import { useSWRConfig } from "swr"
import fetcher from "../lib/fetcher"

export default function AuthForm() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()

  const handleSubmit = async (event) => {
    event.preventDefault()
    setIsLoading(true)

    let response = await fetcher("/signin", { username, password })

    console.log(response)

    if (response.ok) {
      setIsLoading(false)
      router.push(`${window.location.origin}/cv`)
    } else {
      setError("Wrong username or password")
      setIsLoading(false)
    }
  }

  return (
    <div style={{ background: "black", color: "white", height: "100vh" }}>
      <div>Tjena</div>

      <div>
        <div>
          {error}
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Username</label>
            <input
              name="username"
              type="text"
              placeholder="Username"
              onChange={(event) => setUsername(event.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.target.value)}
              required
            />

            <button type="submit" disabled={isLoading}>
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
