import Head from 'next/head'
import { Sidebar } from '../components/Sidebar'

export default function Home() {
  return (
    <div className="bg-black">
      <Head>
        <title>Create Next App</title>
      </Head>

      <main>
        <Sidebar />
        {/* Center */}
      </main>

      <div>{/* Player */}</div>

    </div>
  )
}
