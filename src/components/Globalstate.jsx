import React, { useState } from 'react'
import { createContext } from 'react'
export let game=createContext()
function Globalstate({children}) {
  let[user1,setuser1]=useState(false)
  return (
    <game.Provider value={{user1,setuser1}}>
      {children}
    </game.Provider>
  )
}

export default Globalstate