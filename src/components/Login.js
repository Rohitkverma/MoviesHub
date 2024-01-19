import React, { useContext, useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import {query , getDocs, where} from 'firebase/firestore';
import { usersRef } from '../firebase/firebase';
import swal from 'sweetalert';
import {Appstate } from '../App';
import bcrypt from 'bcryptjs';



const Login = () => {
  const navigate = useNavigate();
  const useAppstate = useContext(Appstate);
  const [form, setForm] = useState({
    mobile: "",
    password : ""
  });

  const [loading, setLoading] = useState(false);

  const login = async()=>{
    setLoading(true);
    try {
      const quer = query(usersRef, where('mobile', '==', form.mobile))
      const querySnapshot = await getDocs(quer);

      querySnapshot.forEach((doc)=>{
        const _data = doc.data();
        const isUser = bcrypt.compareSync(form.password, _data.password);

        if(isUser){
          useAppstate.setLogin(true);
          useAppstate.setUserName(_data.name);
          swal({
            text: "Logged In",
            icon: "success",
            buttons: false,
            timer: 3000,
          })
          navigate('/')
        }else{
          swal({
            text: "Invalid Credentials",
            icon: "error",
            buttons: false,
            timer: 3000,
          })
        }
      })
    } catch (error) {
      swal({
        text: error.message,
        icon: "error",
        buttons: false,
        timer: 3000,
      })
    }
    setLoading(false);
  }

  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className='text-2xl font-bold '>Login</h1>
      <div className="p-2 w-1/2 md:w-1/3">
        <div className="relative">
          <label htmlFor="name" className="leading-7 text-base text-gray-300">Mobile No.</label>
          <input type={"number"} id="name" name="name" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full bg-white rounded border focus:bg-white focus:ring-2 focus:ring-indigo-200 text-bold outline-none text-gray-900 py-1 px-3 leading-8 hover: border-indigo-500" />
        </div>
      </div>
      <div className="p-2 w-1/2 md:w-1/3">
        <div className="relative">
          <label htmlFor="email" className="leading-7 text-base text-gray-300">Password</label>
          <input type="password" id="email" name="email" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-white rounded border border-gray-300 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-bold outline-none text-gray-900 py-1 px-3 leading-8 " />
        </div>
      </div>

      <div className="p-2 w-full">
        <button onClick={login} className="flex mx-auto text-white bg-lime-700 border-0 py-2 px-8 focus:outline-none hover:bg-lime-800 rounded text-lg">
          {loading ? <TailSpin height={25} color='white' /> : "Login"}
        </button>
      </div>
      <p>Do not have account <Link to={'/signup'}><span className='text-blue-500'>Sign Up</span></Link> </p>
    </div>
  )
}

export default Login