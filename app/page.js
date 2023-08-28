'use client'

import { useRouter } from 'next/navigation'

export default function Home () {
  const router = useRouter()
  const handlePay = async () => {
    let res = await fetch('/api/payment', {
      method: 'POST'
    })

    res = await res.json()
    const {url} = res
    // router.push(paymentPageUrl)
    router.push(url)
  }
  return (
    <div className='flex flex-col items-center justify-between h-[100px] my-5'>
      <button
        className='bg-violet-500 px-2 py-1 rounded text-white'
        onClick={handlePay}
      >
        Pay
      </button>
    </div>
  )
}
