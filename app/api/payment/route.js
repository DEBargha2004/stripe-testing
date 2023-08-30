import { NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST (request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

  console.log('request received')

  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          currency: 'INR',
          product_data: {
            name: 'Sample',
            description: 'Sample order to validate payment without priceId',
            images: [
              'https://imgs.search.brave.com/0U5CYbv-9Xj_V-4Oo1mh1reiourITmPyW8fYl4lhyYo/rs:fit:500:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzAwLzgzLzcwLzc1/LzM2MF9GXzgzNzA3/NTQwX0twSnhPYmpH/cDBicjd2aEJqRzg2/VW9raFdnRGRDZThN/LmpwZw'
            ]
          },
          unit_amount: 2000
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1
        },
        quantity: 2
      }
    ],
    mode: 'payment',
    submit_type: 'pay',
    payment_method_types: ['card'],
    billing_address_collection: 'auto',
    shipping_options: [{ shipping_rate: 'shr_1NkpxkSB7hQsCwxuNLmTYC5n' }],
    success_url: 'http://localhost:3000/success',
    cancel_url: 'http://localhost:3000/cancel'
  })
  console.log(session.invoice);
  return NextResponse.json({
    url: session.url,
    id: session.id,
    invoice: session.invoice
  })
}
