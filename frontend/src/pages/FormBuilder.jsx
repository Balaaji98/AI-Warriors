import React, {useState} from 'react'

// Simple JSON-schema like renderer for basic field types
const renderField = (field, value, onChange) => {
  const common = {className:'w-full p-2 rounded bg-gray-800', value: value || ''}
  switch(field.type){
    case 'string': return <input {...common} onChange={e=>onChange(e.target.value)} />
    case 'number': return <input type='number' {...common} onChange={e=>onChange(e.target.value)} />
    case 'textarea': return <textarea {...common} onChange={e=>onChange(e.target.value)} />
    default: return <input {...common} onChange={e=>onChange(e.target.value)} />
  }
}

export default function FormBuilder(){
  const schema = {
    title: 'Invoice Item',
    fields: [
      {name:'name', label:'Name', type:'string', required:true},
      {name:'description', label:'Description', type:'textarea'},
      {name:'qty', label:'Qty', type:'number'},
      {name:'unit_price', label:'Unit Price', type:'number'}
    ]
  }

  const initial = schema.fields.reduce((s,f)=>({...s,[f.name]: f.type==='number'?0:''}),{})
  const [form, setForm] = useState(initial)

  const submit = async (e) =>{
    e.preventDefault()
    const body = {...form, qty: parseInt(form.qty||0), unit_price: parseFloat(form.unit_price||0)}
    await fetch('/api/v1/items/', {method:'POST', headers:{'Content-Type':'application/json','Authorization': 'Bearer ' + (localStorage.getItem('token')||'')}, body: JSON.stringify(body)})
    alert('Submitted — refresh dashboard to see data.')
  }

  return (
    <div>
      <h2 className="text-xl mb-4">{schema.title}</h2>
      <form onSubmit={submit} className="space-y-3 max-w-md">
        {schema.fields.map(f=>(
          <div key={f.name}>
            <label className="block text-sm">{f.label}</label>
            {renderField(f, form[f.name], v=>setForm({...form,[f.name]: v}))}
          </div>
        ))}
        <button className="px-4 py-2 bg-indigo-600 rounded">Submit</button>
      </form>
    </div>
  )
}
