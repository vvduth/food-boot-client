import React, { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import  { useError } from '../common/ErrorDisplay'
import type { OrderDetailsForPayment } from '../../types/order'
import Payment from './Payment'

const ProcessPaymentPage = () => {

    const [searchParams] = useSearchParams()
    const [paymentCompleted, setPaymentCompleted] = useState(false)

    const navigate =  useNavigate()
    const { ErrorDisplay, showError } = useError()

    const [orderDetails, setOrderDetails] = useState<OrderDetailsForPayment>({
        orderId: '',
        amount: 0,
    })

    const handlePaymentSuccess = (paymentIntent: any) => {
        console.log('Payment successful')
        setTimeout(() => {
            navigate('/my-orders-history')
        }, 8000)
        // Optionally, you can show a success message or redirect to another page
        setPaymentCompleted(true)
    }

    useEffect(() => {
        const orderId = searchParams.get('orderid')
        const amount = searchParams.get('amount')
        if (!orderId || !amount) {
            showError('Invalid payment details')
           
            return
        }

        if (isNaN(Number(amount))) {
            showError('Invalid amount specified')
            return
        }

        setOrderDetails({
            orderId: orderId,
            amount: Number(amount)
        })
       

        
    },[searchParams])

     if (paymentCompleted) {
         return (
            <div className='payment-success'>
                <h2>Payment successful</h2>
                <p>Your payment of ${orderDetails.amount} for order {orderDetails.orderId} has been processed successfully.</p>
                <p>You will receive a confirmation email shortly.</p>
            </div>
         )   
        }

    return (
    <div className='checkout-container'>
        <ErrorDisplay />
        <h1>Food Boot</h1>
        <Payment 
            orderId={orderDetails.orderId}
            amount={orderDetails.amount}
            onSuccess={handlePaymentSuccess}
            
        />
    </div>
  )
}

export default ProcessPaymentPage