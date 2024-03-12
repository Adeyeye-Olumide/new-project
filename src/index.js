import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from 'react-router-dom';
import { HeaderProvider } from './contexts/header-context';
import { UserProvider } from './contexts/user-context';
import { RoomProvider } from './contexts/room-context';

import { BookingsProvider } from './contexts/bookings-context';
import { Provider } from 'react-redux'

import { Elements } from  '@stripe/react-stripe-js'

import { returnStripe } from './utils/stripe';
import { ReviewsProvider } from './contexts/reviews-context';

import { store, persistedStore } from './store/redux-store';

import { PersistGate } from 'redux-persist/lib/integration/react';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
   
    <Provider store={store}>
   <PersistGate persistor={persistedStore}>
    <BrowserRouter>
    {/* <UserProvider> */}
      {/* <AsyncHashLinkObserver> */}

      {/* {<HeaderProvider>} */}
        {/* <RoomProvider> */}
          {/* <BookingsProvider> */}
            {/* <ReviewsProvider> */}
             
                <App />
              
            {/* </ReviewsProvider> */}
            
           
          {/* </BookingsProvider> */}
         
        {/* </RoomProvider> */}
        
         
        
        
      {/* </HeaderProvider> */}
        
      {/* </AsyncHashLinkObserver> */}
     
      {/* </UserProvider> */}
      </BrowserRouter>
      </PersistGate>
    </Provider>
    
      
    
    
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
