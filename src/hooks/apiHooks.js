import { useState, useRef } from 'react'
import { useUpdateEffect } from './hooks'

export const useApiRequest = (
  apiCallFunction,
  url,
  params
) => {

  const responseCallbackFunc = useRef(null)
  const errorCallbackFunc = useRef(null)
  const finallyCallbackFunc = useRef(null)

  const [response, setResponse] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useUpdateEffect(() => {
    responseCallbackFunc.current && responseCallbackFunc.current(response)
    finallyCallbackFunc.current && finallyCallbackFunc.current(response)
  }, [response])

  useUpdateEffect(() => {
    errorCallbackFunc.current && errorCallbackFunc.current(error)
    finallyCallbackFunc.current && finallyCallbackFunc.current(response)
  }, [error])

  const apiRequest = (resCbFunc, errCbFunc, finalCbFunc) => {
    responseCallbackFunc.current = resCbFunc
    errorCallbackFunc.current = errCbFunc
    finallyCallbackFunc.current = finalCbFunc

    apiCallFunction(url, params).then(res => {
      setResponse(res.data)
    }).catch(err => {
      setError(err)
    }).finally(() => {
      setLoading(false)
    })
  }

  return [
    apiRequest,
    response,
    error,
    loading
  ]
}