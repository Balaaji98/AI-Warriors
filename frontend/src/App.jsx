import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import FormBuilder from './pages/FormBuilder'
import Auth from './pages/Auth'

export default function App(){
  return (
    <div className="min-h-screen p-6">
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Competition Template</h1>
        <nav className="space-x-4">
          <Link to="/" className="text-sm">Dashboard</Link>
          <Link to="/form" className="text-sm">Form</Link>
          <Link to="/auth" className="text-sm">Auth</Link>
        </nav>
      </header>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/form" element={<FormBuilder/>} />
        <Route path="/auth" element={<Auth/>} />
      </Routes>
    </div>
  )
}
