import { useNavigate } from 'react-router-dom'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { supabase } from '../lib/supabase'
import { useEffect } from 'react'

export default function Login() {
  const navigate = useNavigate()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        navigate('/simulazione')
      }
    })
    return () => subscription.unsubscribe()
  }, [navigate])

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
            Accedi per continuare con le simulazioni
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <Auth
            supabaseClient={supabase}
            appearance={{
              theme: ThemeSupa,
              variables: {
                default: {
                  colors: {
                    brand: '#2563eb',
                    brandAccent: '#1d4ed8',
                  }
                }
              }
            }}
            providers={['google']}
            localization={{
              variables: {
                sign_in: {
                  email_label: 'Email',
                  password_label: 'Password',
                  button_label: 'Accedi',
                  link_text: 'Hai già un account? Accedi',
                  email_input_placeholder: 'La tua email',
                  password_input_placeholder: 'La tua password',
                  social_provider_text: 'Continua con {{provider}}',
                },
                sign_up: {
                  email_label: 'Email',
                  password_label: 'Password',
                  button_label: 'Registrati',
                  link_text: 'Non hai un account? Registrati',
                  email_input_placeholder: 'La tua email',
                  password_input_placeholder: 'Scegli una password',
                  social_provider_text: 'Continua con {{provider}}',
                },
              }
            }}
            redirectTo={`${window.location.origin}/simulazione`}
          />
        </div>

        <p className="text-center text-xs text-gray-400 mt-4">
          Accedendo accetti i nostri Termini e Condizioni e la Privacy Policy
        </p>

      </div>
    </div>
  )
}