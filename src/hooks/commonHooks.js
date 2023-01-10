import React, { useEffect, useRef, useCallback, useState } from 'react'

const useInitEffect = (cbFunc, deps) => {
  const isInitialMount = useRef(true)

  useEffect(() => {
    if (isInitialMount.current) {
      cbFunc && cbFunc()
      isInitialMount.current = false
    }
  }, deps)
}

const useUpdateEffect = (cbFunc, deps) => {
  const isInitialMount = useRef(true)

  useEffect(() => {
    isInitialMount.current ? isInitialMount.current = false : cbFunc && cbFunc()
  }, deps)
}

const usePrevious = (value) => {
  const currentRef = useRef(value)
  const previousRef = useRef()

  if (currentRef.current !== value) {
    previousRef.current = currentRef.current
    currentRef.current = value
  }

  return previousRef.current
}

const useTimeout = (cbFunc, delayDuration) => {
  const callbackRef = useRef(cbFunc)
  const timeoutRef = useRef()

  useEffect(() => {
    callbackRef.current = cbFunc
  }, [cbFunc])

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      callbackRef.current()
    }, delayDuration);
  }, [delayDuration])

  const clear = useCallback(() => {
    timeoutRef.current && clearTimeout(timeoutRef.current);
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [delayDuration, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}

const useInterval = (cbFunc, replayDuration) => {
  const callbackRef = useRef(cbFunc)
  const intervalRef = useRef()

  useEffect(() => {
    callbackRef.current = cbFunc
  }, [cbFunc])

  const set = useCallback(() => {
    intervalRef.current = setInterval(() => {
      callbackRef.current()
    }, replayDuration);
  }, [replayDuration])

  const clear = useCallback(() => {
    intervalRef.current && clearInterval(intervalRef.current);
  }, [])

  useEffect(() => {
    set()
    return clear
  }, [replayDuration, set, clear])

  const reset = useCallback(() => {
    clear()
    set()
  }, [clear, set])

  return { reset, clear }
}

const useDebounce = (cbFunc, debounceDuration, deps) => {
  const { reset, clear } = useTimeout(cbFunc, debounceDuration)
  useEffect(reset, [...deps, reset])
  useEffect(clear, [])
}

const useStorage = (key, value, storageObject) => {
  const [storageValue, setStorageValue] = useState(() => {
    const jsonStringValue = storageObject.getItem(key)
    if (jsonStringValue !== null) return JSON.parse(jsonStringValue)

    if (typeof value === 'function') return value()

    return value
  })

  useEffect(() => {
    if (storageValue === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(storageValue))
  }, [key, storageValue, storageObject])

  const removeStorageValue = useCallback((cbFunc = () => {}) => {
    setStorageValue(undefined)
    cbFunc()
  })

  return [storageValue, setStorageValue, removeStorageValue]
}

const useLocalStorage = (key, value) => {
  return useStorage(key, value, window.localStorage)
}

const useSessionStorage = (key, value) => {
  return useStorage(key, value, window.sessionStorage)
}

export {
  useInitEffect,
  useUpdateEffect,
  usePrevious,
  useTimeout,
  useInterval,
  useDebounce,
  useLocalStorage,
  useSessionStorage
}
