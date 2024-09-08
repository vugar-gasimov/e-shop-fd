import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import store from './store/index';
import { Toaster } from 'react-hot-toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <Suspense>
      <App />
      <Toaster
        toastOptions={{
          position: 'top-right',
          style: {
            background: '#4c51bf',
            color: '#f1f5f9',
          },
        }}
      />
    </Suspense>
  </Provider>
);

reportWebVitals();
