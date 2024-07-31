import React from 'react'

function Input({text,value,setvalue,name,placeholder}) {
  return (
    <div>
      <input className='w-[300px] border border-gray-300 py-3 lg:[300px] md:w-[300px] px-4' type={text} name={name} value={value} placeholder={placeholder} onChange={(e)=>setvalue(e.target.value)} />
    </div>
  )
}

export default Input