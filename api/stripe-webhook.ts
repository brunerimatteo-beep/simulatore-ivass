import Stripe from 'stripe'
import { createClient } from '@supabase/supabase-js'

const isTest = process.env.STRIPE_SECRET_KEY_TEST !== undefined

const stripe = new Stripe(
  process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_SECRET_KEY_LIVE!
    : process.env.STRIPE_SECRET_KEY_TEST!
)

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const sig = req.headers['stripe-signature']
  const webhookSecret = process.env.NODE_ENV === 'production'
    ? process.env.STRIPE_WEBHOOK_SECRET_LIVE!
    : process.env.STRIPE_WEBHOOK_SECRET_TEST!

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret)
  } catch (err: any) {
    console.error('Webhook signature error:', err.message)
    return res.status(400).json({ error: `Webhook Error: ${err.message}` })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const userId = session.client_reference_id

    if (!userId) {
      console.error('Nessun client_reference_id nella sessione')
      return res.status(400).json({ error: 'Missing client_reference_id' })
    }

    const { error } = await supabase
      .from('profiles')
      .update({ paid: true, paid_at: new Date().toISOString() })
      .eq('id', userId)

    if (error) {
      console.error('Errore aggiornamento profilo:', error)
      return res.status(500).json({ error: 'Database error' })
    }

    console.log(`Utente ${userId} aggiornato a Premium ✅`)
  }

  return res.status(200).json({ received: true })
}

export const config = {
  api: {
    bodyParser: false,
  },
}