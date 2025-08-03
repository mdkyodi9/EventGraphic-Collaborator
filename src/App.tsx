import { HashRouter, Route, Routes } from 'react-router'
import Navbar from './components/layout/Navbar'
import HomePage from './pages/Home'
import TemplatesPage from './pages/Templates'
import Dashboard from './pages/Dashboard'
import Editor from './pages/Editor'

export default function App() {
  return (
    <HashRouter>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
