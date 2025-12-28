import { useState } from 'react'
import ZkLoginButton from './components/ZkLoginButton';
import TicketMarketplace from './components/TicketMarketplace';
import EventSearch from './components/EventSearch';
import './App.css'

function App() {
  const [userAddress, setUserAddress] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white">
      <header className="p-6 border-b border-purple-500">
        <h1 className="text-4xl font-bold">🎫 Sui Ticket Platform</h1>
        <ZkLoginButton onLogin={setUserAddress} />
      </header>
      <main className="p-6">
        <EventSearch />
        <TicketMarketplace userAddress={userAddress} />
      </main>
    </div>
  );  
  /* Original code
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
  */
}

export default App
