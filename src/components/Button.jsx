import React from 'react'

function Button({text,onclick}) {
  return (
    <div>
      <button onClick={onclick} className=' p-2 text-white bg-blue-500 w-[200px] rounded-lg'>{text}</button>
    </div>
  )
}

export default Button