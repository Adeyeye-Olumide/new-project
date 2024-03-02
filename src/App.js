import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import Header from './components/header-component/header-component';
import HomeComponent from './components/home-component/home-component';
import Authentication from './components/authentication component/authentication component';
import { HeaderProvider } from './contexts/header-context';
import RoomComponent from './components/room-component/room-component';
import PaymentForm from './components/payment-form-component/payment-form-component';
import ReviewsComponent from './components/reviews-component/reviews-component';
import TransactionSuccessPage from './components/transaction-success-page/transaction-success-page';
import GalleryComponent from './components/gallery-component/gallery-component';

function App() {
  return (
    <Routes>
      
        <Route path='/' element={<Header></Header>}>
          <Route index element = {<HomeComponent></HomeComponent>}></Route>
          <Route path='resort' element={<RoomComponent></RoomComponent>}></Route>
          <Route path='gallery' element={<GalleryComponent></GalleryComponent>}></Route>
          {/* <Route path='contact' element=''></Route> */}
          <Route path='authentication' element = {<Authentication></Authentication>}></Route>
          <Route path='payment' element = {<PaymentForm></PaymentForm>}></Route>
          <Route path='reviews' element= {<ReviewsComponent></ReviewsComponent>}></Route>
          <Route path='transactionsuccess' element = {<TransactionSuccessPage></TransactionSuccessPage>}></Route>
          
        </Route>
        
     
    </Routes>
    
  );
}

export default App;
