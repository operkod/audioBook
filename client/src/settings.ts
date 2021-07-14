/* eslint-disable react-hooks/rules-of-hooks */
import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'

const StalerScreen = ({ children }: any) => {
  const dispatch = useDispatch()
  const handleResize = useCallback(({ target }: any) => {
    const { innerHeight, innerWidth } = target
    dispatch({ type: 'SETTINGS_SET_DATA', payload: { width: innerWidth, height: innerHeight } })
  }, [dispatch])

  // Зделать оптимизацию "debounce"
  React.useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [handleResize])

  React.useEffect(() => {
    let width = document.body.clientWidth
    let height = document.body.clientHeight
    dispatch({ type: 'SETTINGS_SET_DATA', payload: { width, height } })
  }, [dispatch])

  return children
}


export default StalerScreen