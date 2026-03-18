import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  
  const queryParams = new URLSearchParams(location.search)
  const mode = queryParams.get('mode')
  const destinazioneFissata = queryParams.get('redirectTo') || '/simulazione'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errore, setErrore] = useState<string | null>(null)
  const [messaggio, setMessaggio] = useState<string | null>(null)
  const [isRegistrazione, setIsRegistrazione] = useState(mode === 'signup')

  useEffect(() => {
    setIsRegistrazione(mode === 'signup')
  }, [mode])

  async function handleEmailAuth() {
    setLoading(true)
    setErrore(null)
    setMessaggio(null)

    try {
      if (isRegistrazione) {
        const { error } = await supabase.auth.signUp({ email, password })
        if (error) throw error
        setMessaggio('Registrazione completata! Ora puoi accedere o controllare l\'email.')
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) throw error
        
        // IMPORTANTE: manteniamo i parametri (es. ?action=checkout) nel redirect
        navigate(`${destinazioneFissata}${location.search}`)
      }
    } catch (e: any) {
      setErrore(e.message || 'Errore durante l\'autenticazione')
    } finally {
      setLoading(false)
    }
  }

  async function handleGoogle() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        // Manteniamo i parametri anche per Google
        redirectTo: `${window.location.origin}${destinazioneFissata}${location.search}`
      }
    })
    if (error) setErrore(error.message)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-6">
      <div className="max-w-md w-full text-center">
        <button onClick={() => navigate('/')} className="text-blue-700 font-bold text-xl mb-6 block mx-auto">
          SimulatoreIVASS
        </button>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 space-y-4">
          <h2 className="text-xl font-bold">{isRegistrazione ? 'Crea un account' : 'Accedi'}</h2>
          
          {errore && <div className="bg-red-50 text-red-700 p-3 rounded-lg text-sm">{errore}</div>}
          {messaggio && <div className="bg-green-50 text-green-700 p-3 rounded-lg text-sm">{messaggio}</div>}

          <button onClick={handleGoogle} className="w-full py-3 border-2 border-gray-200 rounded-xl font-medium flex items-center justify-center gap-3 hover:bg-gray-50">
            <svg width="18" height="18" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/><path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/><path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/><path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/></svg>
            Continua con Google
          </button>

          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-3 border rounded-xl text-sm focus:border-blue-400 outline-none" />
          <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 border rounded-xl text-sm focus:border-blue-400 outline-none" />

          <button onClick={handleEmailAuth} disabled={loading} className="w-full py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50">
            {loading ? 'Caricamento...' : isRegistrazione ? 'Registrati' : 'Accedi'}
          </button>

          <p className="text-sm text-gray-500">
            {isRegistrazione ? 'Hai già un account?' : 'Non hai un account?'} 
            <button onClick={() => setIsRegistrazione(!isRegistrazione)} className="text-blue-600 font-medium ml-1 hover:underline">
              {isRegistrazione ? 'Accedi' : 'Registrati'}
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}