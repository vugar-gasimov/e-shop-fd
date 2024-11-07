import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import CheckoutForm from './CheckoutForm';

const stripePromise = loadStripe(
  'pk_test_51QFzHpCOlW0xYn4EklLRRiN7vk8eGds5r1c0cOfXlOX2cGyNkcrxaTnL4ZLXWjEnm5gqttRTgRGSvhAb7OLOQDio00NG1LuM5a'
);

const Stripe = ({ price, orderId }) => {
  const [clientSecret, setClientSecret] = useState('');
  const appearance = {
    theme: 'stripe',
  };
  const options = {
    appearance: appearance,
    clientSecret,
  };

  const create_payment = async () => {
    try {
      const { data } = await axios.post(
        'http://localhost:5000/api/order/create-payment',
        { price },
        { withCredentials: true }
      );
      setClientSecret(data.clientSecret);
    } catch (error) {
      if (error.response && error.response.data) {
        console.error(
          'Payment error:',
          error.response.data.message || error.response.data
        );
      } else {
        console.error('Unexpected error:', error.message);
      }
    }
  };

  return (
    <div className='mt-4'>
      {clientSecret ? (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm orderId={orderId} />
        </Elements>
      ) : (
        <button
          onClick={create_payment}
          className='px-10 py-[6px] rounded-sm  hover:shadow-green-700/30 hover:shadow-lg bg-green-700 text-white'
        >
          Start Payment
        </button>
      )}
      <div className=''></div>
    </div>
  );
};

export default Stripe;
