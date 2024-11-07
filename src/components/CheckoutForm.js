import React, { useEffect, useState } from 'react';
import {
  PaymentElement,
  LinkAuthenticationElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

const CheckoutForm = ({ orderId }) => {
  // localStorage.setItem('orderId', orderId);

  const stripe = useStripe();
  const elements = useElements();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (orderId) localStorage.setItem('orderId', orderId);
  }, [orderId]);

  const paymentElementOptions = {
    layout: 'tabs',
  };

  const formHandler = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      setMessage('Stripe has not loaded correctly.');
      setLoading(false);
      return;
    }
    setLoading(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmPayment: {
        return_url: 'https://localhost:3000/order/confirm',
      },
    });
    if (error.type === 'card_error' || error.type === 'validation_error') {
      setMessage(error.message);
    } else {
      setMessage('An unexpected error occurred. Please try again');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={formHandler} id='payment-form'>
      <LinkAuthenticationElement id='link-authentication-element' />
      <PaymentElement id='payment-element' options={paymentElementOptions} />

      <button
        disabled={loading || !stripe || !elements}
        id='submit'
        className='px-10 py-[6px] rounded-sm  hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'
      >
        <span id='button-text'>
          {loading ? <div>Processing...</div> : 'Pay Now'}
        </span>
      </button>
      {message && <div className='mt-4 text-red-500'>{message}</div>}
    </form>
  );
};

export default CheckoutForm;
