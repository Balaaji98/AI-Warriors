import React, {useEffect, useState} from 'react'

export default function Dashboard(){
  const [items, setItems] = useState([])

  useEffect(()=>{
    fetch('/api/v1/items').then(r=>r.json()).then(setItems).catch(()=>{})
  },[])

  const total = items.reduce((s,i)=> s + (i.unit_price||0), 0)

  return (
    <div>
      <h2 className="text-xl mb-4">Dashboard</h2>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gray-800 rounded">Items: {items.length}</div>
        <div className="p-4 bg-gray-800 rounded">Total Value: ₹{total}</div>
        <div className="p-4 bg-gray-800 rounded">Demo</div>
      </div>
      <div className="space-y-2">
        {items.map(it => (
          <div key={it.id} className="p-3 bg-gray-800 rounded flex justify-between">
            <div>
              <div className="font-semibold">{it.name}</div>
              <div className="text-sm text-gray-400">{it.description}</div>
            </div>
            <div className="text-right">
              <div>₹{it.unit_price}</div>
              <div className="text-sm text-gray-400">Qty: {it.qty}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
