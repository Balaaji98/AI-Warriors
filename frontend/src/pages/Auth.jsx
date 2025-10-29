import React, {useState} from 'react'

export default function Auth(){
  const [form, setForm] = useState({username:'demo', password:'demopass'})
  const login = async (e) => {
    e.preventDefault()
    const res = await fetch('/api/v1/auth/login', {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form)})
    if(!res.ok){ alert('login failed'); return }
    const data = await res.json()
    localStorage.setItem('token', data.access_token)
    alert('token saved to localStorage')
  }
  return (
    <div className="max-w-md">
      <h2 className="text-xl mb-4">Auth</h2>
      <form onSubmit={login} className="space-y-3">
        <div>
          <label className="block text-sm">Username</label>
          <input value={form.username} onChange={e=>setForm({...form,username:e.target.value})} className="w-full p-2 rounded bg-gray-800"/>
        </div>
        <div>
          <label className="block text-sm">Password</label>
          <input type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} className="w-full p-2 rounded bg-gray-800"/>
        </div>
        <button className="px-4 py-2 bg-indigo-600 rounded">Login</button>
      </form>
    </div>
  )
}
