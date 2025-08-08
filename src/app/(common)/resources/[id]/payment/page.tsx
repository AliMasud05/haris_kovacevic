import BillingDetails from '@/components/resources/payment/BillingDetails'
import PaymentInformation from '@/components/resources/payment/PaymentInformation'
import React from 'react'

export default function ResourcePaymentPage() {
  return (
    <div className='pt-40 pb-24 container mx-auto flex flex-col md:flex-row gap-16'>
        <BillingDetails />
        <PaymentInformation />
    </div>
  )
}
