import { useState } from 'react';
// import FundsList from "./components/FundsList/FundsList.tsx";
import CashhubWatchlist from "./components/FundsList/CashhubWatchlist";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
<div style={{ padding: 40 }}>
      <h2 style={{ textAlign: "center" }}>
        🧩 dnd-kit — Sortable Funds Vertical List(Locked Axis)
      </h2>
      {/* <FundsList /> */}
      <CashhubWatchlist />
    </div>

      {/* <div>
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
      </p> */}
    </>
  )
}

export default App
