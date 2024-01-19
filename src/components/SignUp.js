import React, { useState } from 'react'
import { TailSpin } from 'react-loader-spinner';
import { Link, useNavigate } from 'react-router-dom';
import {getAuth, RecaptchaVerifier, signInWithPhoneNumber} from 'firebase/auth'
import app, { usersRef } from '../firebase/firebase';
import swal from 'sweetalert';
import { addDoc } from 'firebase/firestore';
import bcrypt from 'bcryptjs'; 


const auth = getAuth(app);


const SignUp = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name:"",
    mobile: "",
    password : ""
  });

  const [loading, setLoading] = useState(false);

  const[sentOtp, setSentOtp] = useState(false);
  const [OTP, setOTP] = useState("");

  const generateRecaptha = ()=>{
    window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha-container', {
      'size': 'invisible',
      'callback': (response)=>{

      }
    });
  }

  const requestOtp = () => {
    setLoading(true);
    generateRecaptha();
    let appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, `+91${form.mobile}`, appVerifier)
      .then(confirmationResult => {
        window.confirmationResult = confirmationResult;
        swal({
          text: "OTP Sent",
          icon: "success",
          buttons: false,
          timer: 3000,
        });
        setSentOtp(true);
        setLoading(false);
      }).catch((error) => {
        console.log(error)
      })
}

  const verifyOTP=()=>{
    try {
      setLoading(true);
      window.confirmationResult.confirm(OTP).then((result)=>{
        uploadData();
        swal({
          text:"Successfully Registered",
          icon:"success",
          buttons:false,
          timer:3000,
        });
        navigate('/login')
        setLoading(false);
      })
    } catch (error) {
      console.log(error);
    }
  }

  const uploadData = async()=>{
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(form.password, salt);
      await addDoc(usersRef,{
      name: form.name,
      password : hash,
      mobile : form.mobile
    });
    } catch (error) {
      console.log(error)
    }
    
  }

  return (
    <div className='flex flex-col items-center mt-10'>
      <h1 className='text-2xl font-bold '>Sign up</h1>
      {sentOtp ? 
        <>
        <div className="p-2 w-1/2 md:w-1/3">
        <div className="relative">
          <label htmlFor="name" className="leading-7 text-base text-gray-300">OTP</label>
          <input type="text" id="name" name="name" value={OTP} onChange={(e) => setOTP(e.target.value)} className="w-full bg-white rounded border focus:bg-white focus:ring-2 focus:ring-indigo-200 text-bold outline-none text-gray-900 py-1 px-3 leading-8 hover: border-indigo-500" />
        </div>
      </div>
      <div className="p-2 w-full">
        <button onClick={verifyOTP} className="flex mx-auto text-white bg-lime-700 border-0 py-2 px-8 focus:outline-none hover:bg-lime-800 rounded text-lg">
          {loading ? <TailSpin height={25} color='white' /> : "Confirm OTP"}
        </button>
      </div>
        </>
      :
        <>
      <div className="p-2 w-1/2 md:w-1/3">
        <div className="relative">
          <label htmlFor="name" className="leading-7 text-base text-gray-300">Name</label>
          <input type="text" id="name" name="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full bg-white rounded border focus:bg-white focus:ring-2 focus:ring-indigo-200 text-bold outline-none text-gray-900 py-1 px-3 leading-8 hover: border-indigo-500" />
        </div>
      </div>
      <div className="p-2 w-1/2 md:w-1/3">
        <div className="relative">
          <label htmlFor="name" className="leading-7 text-base text-gray-300">Mobile No.</label>
          <input type={"number"} id="name" name="name" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} className="w-full bg-white rounded border focus:bg-white focus:ring-2 focus:ring-indigo-200 text-bold outline-none text-gray-900 py-1 px-3 leading-8 hover: border-indigo-500" />
        </div>
      </div>
      <div className="p-2 w-1/2 md:w-1/3">
        <div className="relative">
          <label htmlFor="email" className="leading-7 text-base text-gray-300">Password</label>
          <input type={'password'} id="email" name="email" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full bg-white rounded border border-gray-300 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-bold outline-none text-gray-900 py-1 px-3 leading-8 " />
        </div>
      </div>

      <div className="p-2 w-full">
        <button onClick={requestOtp} className="flex mx-auto text-white bg-lime-700 border-0 py-2 px-8 focus:outline-none hover:bg-lime-800 rounded text-lg">
          {loading ? <TailSpin height={25} color='white' /> : "Request OTP"}
        </button>
      </div>
      </>}
      <div>
      <p>Already have an account <Link to={'/login'}><span className='text-blue-500'>Login</span></Link> </p>
      </div>
      <div id='recaptcha-container'></div>
    </div>
  )
}

export default SignUp;