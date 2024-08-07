import React, { useEffect } from 'react'
import Header from './components/Header';
import Card from './components/Card';
import AddMovie from './components/AddMovie';
import { Route, Routes } from 'react-router-dom';
import Detail from './components/Detail';
import {createContext, useState} from 'react'
import Login from './components/Login'
import SignUp from './components/SignUp'
import { getDoc } from 'firebase/firestore';
import { NotFound } from './components/NotFound';

const Appstate = createContext();
function App() {
  useEffect(()=>{
        console.log();
  },[]);
  const [login, setLogin] = useState(false);
  const [userName, setUserName] = useState('');
  return (
    <div className="App relative">
      <Appstate.Provider value={{login, userName, setLogin, setUserName}}>
      <Header/>
      <Routes>
        <Route path='/' element={<Card/>}/>
        <Route path='/addmovie' element={<AddMovie/>}/>
        <Route path='/detail/:id' element={<Detail/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
      </Appstate.Provider>
    </div>
  );
}

export default App;
export {Appstate};
