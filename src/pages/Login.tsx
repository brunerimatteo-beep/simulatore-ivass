import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistrazione, setIsRegistrazione] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errore, setErrore] = useState<string | null>(null)
  const [messaggio, setMessaggio] = useState<string | null>(null)

  async function handleEmailAuth() {
    setLoading(true)
    setErrore(null)
    setMessaggio(null)

    try {
      if (isRegistrazione) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessaggio('Controlla la tua email per confermare la registrazione.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        navigate('/simulazione')
      }
    } catch (e: any) {
      setErrore(e.message || 'Errore sconosciuto')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/simulazione`
      }
    })
    if (error) setErrore(error.message)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full">

        <div className="text-center mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-blue-700 font-bold text-xl hover:underline"
          >
            SimulatoreIVASS
          </button>
          <p className="text-gray-500 text-sm mt-2">
            {isRegistrazione ? 'Crea il tuo account' : 'Accedi al tuo account'}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-4">

          {errore && (
            <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg p-3 text-sm">
              {errore}
            </div>
          )}

          {messaggio && (
            <div className="bg-green-50 border border-green-200 text-green-700 rounded-lg p-3 text-sm">
              {messaggio}
            </div>
          )}

          {/* Google */}
          <button
            onClick={handleGoogle}
            className="w-full py-3 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-3"
          >
            <svg width="18" height="18" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            Continua con Google
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">oppure</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleEmailAuth()}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-blue-400"
          />

          {/* Bottone principale */}
          <button
            onClick={handleEmailAuth}
            disabled={loading || !email || !password}
            className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-60"
          >
            {loading ? 'Caricamento...' : isRegistrazione ? 'Registrati' : 'Accedi'}
          </button>

          {/* Toggle registrazione/login */}
          <p className="text-center text-sm text-gray-500">
            {isRegistrazione ? 'Hai già un account?' : 'Non hai un account?'}
            {' '}
            <button
              onClick={() => {
                setIsRegistrazione(!isRegistrazione)
                setErrore(null)
                setMessaggio(null)
              }}
              className="text-blue-600 font-medium hover:underline"
            >
              {isRegistrazione ? 'Accedi' : 'Registrati'}
            </button>
          </p>

        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Accedendo accetti i nostri Termini e Condizioni e la Privacy Policy
        </p>

      </div>
    </div>
  )
}