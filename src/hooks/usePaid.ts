import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from './useAuth'
import { segnaAccessoPagato } from '../lib/trial'

export function usePaid() {
  const { user } = useAuth()
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkPaid() {
      if (!user) {
        setLoading(false)
        return
      }

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
    }

    checkPaid()
  }, [user])

  return { paid, loading }
}