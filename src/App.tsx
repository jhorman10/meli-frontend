import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="flex gap-8 mb-8">
        <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1 className="text-5xl font-bold bg-gradient-to-r from-primary-500 to-primary-700 bg-clip-text text-transparent mb-8">
        Vite + React
      </h1>

      <div className="card max-w-2xl">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="btn-primary mb-4"
        >
          count is {count}
        </button>
        <p className="text-gray-600">
          Edit{" "}
          <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono text-primary-700">
            src/App.tsx
          </code>{" "}
          and save to test HMR
        </p>
      </div>

      <p className="text-gray-400 mt-8 text-sm">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
