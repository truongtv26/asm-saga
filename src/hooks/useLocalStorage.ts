import { useCallback, useState, useEffect } from "react"

export function useLocalStorage(key: string, defaultValue = undefined) {
     const [value, setValue] = useState(()=>{
          const json = localStorage.getItem(key);
          if (json !== null) {
               return JSON.parse(json);
          }
          return defaultValue
     })

     useEffect(()=> {
          if (value === undefined) {
               return localStorage.removeItem(key)
          }
          localStorage.setItem(key, JSON.stringify(value))
     }, [key, value])

     const remove = useCallback(()=>{
          setValue(undefined)
     }, [])

     return [value, setValue, remove]
}