import { useRef, useState, useEffect } from 'react'

const useStorageState = (key, initialState) => {
  const isMounted = useRef(false)
  const [value, setValue] = useState(localStorage.getItem(key) || initialState)

  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true
    } else {
      localStorage.setItem(key, value)
    }
  }, [value, key])

  return [value, setValue]
}

export { useStorageState }
