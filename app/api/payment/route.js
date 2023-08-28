import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST (request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  console.log('request received')

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price: `price_1Nk7xuSB7hQsCwxuF3Cf3VUx`,
        quantity: 2
      }
    ],
    mode: 'payment',
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel'
  })

  return NextResponse.json({ url: session.url })
}
