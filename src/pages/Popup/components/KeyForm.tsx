import React, { useState, useEffect } from 'react';
import { clear, get, KEY_ID, set } from '../../../utils/storage';





const storeKey = async (value: string) => {
  await set({[KEY_ID]: value})
}



export const KeyForm = () =>  {
  const [keyState, setKey] = useState({key: undefined})

  const removeKey = async () => {
    await clear()
    setKey({key: null})
  }

  useEffect(() => {
    async function getStoredKey() {
      const locallyStoredKey = await get(KEY_ID)
    if(locallyStoredKey) {
      setKey({key: locallyStoredKey})
      }
    }
   
      getStoredKey()
  }, [])
  
  return (
    keyState.key ? <button 
    className="GLReviewer-keyFormButton negative"
    type="button" onClick={removeKey}>Remove saved key</button> : (
      <form 
       className="GLReviewer-keyForm"
        onSubmit={(e) => {
          e.preventDefault()
          const value = e.target[0].value
          setKey({key: value})
          storeKey(value)
      }}>
        <input 
        className="GLReviewer-keyFormInput"
        name="setGLKey" type="password" placeholder="Insert your gitlab key" value={keyState.key} />
        <button className="GLReviewer-keyFormButton positive">Save</button>
      </form>
    ) 
  )
}