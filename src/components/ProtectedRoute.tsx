import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { usePaid } from '../hooks/usePaid'
import { puoSimulare } from '../lib/trial'

interface Props {
  children: React.ReactNode
}

export default function ProtectedRoute({ children }: Props) {
  const { user } = useAuth()
  const { paid, loading } = usePaid()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⏳</div>
          <p className="text-gray-600">Caricamento...</p>
        </div>
      </div>
    )
  }
  console.log('ProtectedRoute:', { user: !!user, paid, loading, puoSimulare: puoSimulare() })

  if (paid) return <>{children}</>
  if (puoSimulare()) return <>{children}</>
  if (!user) return <Navigate to="/login?redirect=/simulazione" replace />
  return <Navigate to="/paywall" replace />
}
