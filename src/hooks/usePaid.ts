import { useEffect, useState, useCallback } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { segnaAccessoPagato } from '../lib/trial'

export function usePaid() {
  const { user, loading: loadingAuth } = useAuth()
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(true)

  const checkPaid = useCallback(async () => {
    if (!user) {
      setLoading(false)
      return
    }

    setLoading(true)
    const { data } = await supabase
      .from('profiles')
      .select('paid')
      .eq('id', user.id)
      .single()

    if (data?.paid) {
      segnaAccessoPagato()
      setPaid(true)
    }

    setLoading(false)
  }, [user])

  useEffect(() => {
    if (!loadingAuth) {
      checkPaid()
    }
  }, [checkPaid, loadingAuth])

  return { paid, loading: loading || loadingAuth, refetch: checkPaid }
}