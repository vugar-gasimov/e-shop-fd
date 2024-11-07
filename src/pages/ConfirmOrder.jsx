import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Link } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

import success from '../assets/success.png';
import error from '../assets/error.png';

const load = async () => {
  return await loadStripe(
    'pk_test_51QFzHpCOlW0xYn4EklLRRiN7vk8eGds5r1c0cOfXlOX2cGyNkcrxaTnL4ZLXWjEnm5gqttRTgRGSvhAb7OLOQDio00NG1LuM5a'
  );
};

const ConfirmOrder = () => {
  const [loader, setLoader] = useState(false);
  const [stripe, setStripe] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      'payment_intent_client_secret'
    );

    if (!clientSecret) return;

    setLoader(true);

    stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        if (!paymentIntent) {
          setMessage('Payment intent not found.');
          return;
        }

        switch (paymentIntent.status) {
          case 'succeeded':
            setMessage('Payment succeeded');
            break;
          case 'processing':
            setMessage('Payment processing');
            break;
          case 'requires_payment_method':
            setMessage('Payment failed, please try again');
            break;
          default:
            setMessage('Payment failed, please try again');
        }
      })
      .catch((error) => {
        console.error('Error retrieving payment intent:', error);
        setMessage('Error retrieving payment intent.');
      })
      .finally(() => {
        setLoader(false);
      });
  }, [stripe]);

  const get_load = async () => {
    const tempStripe = await load();
    setStripe(tempStripe);
  };
  useEffect(() => {
    get_load();
  }, []);

  const update_payment = async () => {
    const orderId = localStorage.getItem('order_id');
    if (orderId) {
      try {
        await axios.get(`http://localhost:5000/api/order/confirm/${orderId}`);
        localStorage.removeItem('orderId');
        setLoader(false);
      } catch (error) {
        console.log(error.response?.data);
      }
    }
  };

  useEffect(() => {
    if (message === 'Payment succeeded') {
      update_payment();
    }
  }, [message]);

  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col gap-4'>
      <h2>Confirm Order</h2>
      {message === 'Payment failed, please try again' ||
      message === 'Payment processing' ? (
        <>
          <img src={error} alt='Error img.' />
          <Link
            to='/dashboard/my-orders'
            className='px-5 py-2 bg-green-500 rounded-sm text-white'
          >
            Back to Dashboard
          </Link>
        </>
      ) : message === 'Payment succeeded' ? (
        loader ? (
          <FadeLoader />
        ) : (
          <>
            {' '}
            <img src={success} alt='Success img.' />
            <Link
              to='/dashboard/my-orders'
              className='px-5 py-2 bg-green-500 rounded-sm text-white'
            >
              Back to Dashboard
            </Link>
          </>
        )
      ) : (
        <FadeLoader />
      )}
    </div>
  );
};

export default ConfirmOrder;
