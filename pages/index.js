import Head from "next/head"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Tjenare</h1>

        <Link href="/cv">
          <a>cv</a>
        </Link>
      </main>
    </div>
  )
}
