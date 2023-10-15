import logo from './logo.svg';
import './App.css';

import { Route, Routes } from 'react-router-dom';
import Header from './components/header-component/header-component';
import HomeComponent from './components/home-component/home-component';
import Authentication from './components/authentication component/authentication component';
import { HeaderProvider } from './contexts/header-context';
import RoomComponent from './components/room-component/room-component';

function App() {
  return (
    <Routes>
      
        <Route path='/' element={<Header></Header>}>
          <Route index element = {<HomeComponent></HomeComponent>}></Route>
          <Route path='resort' element=''></Route>
          <Route path='gallery' element={<RoomComponent></RoomComponent>}></Route>
          <Route path='contact' element=''></Route>
          <Route path='authentication' element = {<Authentication></Authentication>}></Route>
        </Route>
        
     
     

     
      
    </Routes>
    
  );
}

export default App;
