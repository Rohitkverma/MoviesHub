import React,{useContext, useState} from 'react'
import { TailSpin } from 'react-loader-spinner';
import { addDoc } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import swal from 'sweetalert';
import {Appstate} from '../App';
import { useNavigate } from 'react-router-dom';

const AddMovie = () => {
const useAppstate = useContext(Appstate);

    const[form, setForm] = useState({
        title: "",
        year: "",
        description : "",
        image : "",
        rating : 0,
        rated : 0
    })
    const[loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const addMovie = async()=>{
        setLoading(true)
        try{
            if(useAppstate.login){
            await addDoc(moviesRef, form);
            swal({
                title : "Successfully Added",
                icon : "success",
                button : false,
                timer : 3000
            })
            setForm({
                title: "",
                year: "",
                description : "",
                image : ""
            })
        } else{
            navigate('/login')
        }
        }catch(err){
            swal({
                title : err,
                icon : "error",
                button : false,
                timer : 3000
            })
        }
        setLoading(false);
    }
    return (
        <div>
            <section className="text-gray-600 body-font relative">
                <div className="container px-5 py-12 mx-auto">
                    <div className="flex flex-col text-center w-full mb-4">
                        <h1 className="sm:text-3xl text-xl font-medium title-font mb-4 text-white">Add Movie</h1>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="name" className="leading-7 text-base text-gray-300">Title</label>
                                    <input type="text" id="name" name="name" value={form.title} onChange={(e)=>setForm({...form, title: e.target.value})} className="w-full bg-white rounded border focus:bg-white focus:ring-2 focus:ring-indigo-200 text-bold outline-none text-gray-900 py-1 px-3 leading-8 hover: border-indigo-500" required/>
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="email" className="leading-7 text-base text-gray-300">Year</label>
                                    <input type="email" id="email" name="email" value={form.year} onChange={(e)=>setForm({...form, year: e.target.value})} className="w-full bg-white rounded border border-gray-300 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-bold outline-none text-gray-900 py-1 px-3 leading-8 " required />
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-base text-gray-300">Image Link</label>
                                    <input id="message" name="message" value={form.image} onChange={(e)=>setForm({...form, image: e.target.value})} className="w-full bg-white rounded border border-gray-300 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-bold outline-none text-gray-900 py-1 px-3 leading-8" required></input>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <div className="relative">
                                    <label htmlFor="message" className="leading-7 text-base text-gray-300">Description</label>
                                    <textarea id="message" name="message" value={form.description} onChange={(e)=>setForm({...form, description: e.target.value})} className="w-full bg-white rounded border border-gray-300 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-bold outline-none text-gray-900 h-32 py-1 px-3 leading-8 " required></textarea>
                                </div>
                            </div>
                            <div className="p-2 w-full">
                                <button onClick={addMovie} className="flex mx-auto text-white bg-lime-700 border-0 py-2 px-8 focus:outline-none hover:bg-lime-800 rounded text-lg">
                                     {loading ? <TailSpin height={25} color='white' /> : "Submit"}
                                    </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AddMovie;