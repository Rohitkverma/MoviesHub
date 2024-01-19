import React, { useContext, useEffect, useState } from 'react';
import { TailSpin, ThreeDots } from 'react-loader-spinner';
import ReactStars from 'react-stars'
import { addDoc , doc, updateDoc, query, where, getDocs} from 'firebase/firestore';
import { reviewsRef,db} from '../firebase/firebase';
import swal from 'sweetalert';
import {Appstate } from '../App';
import { useNavigate } from 'react-router-dom';




const Reviews = (id, prevRating) => {
  
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();


  const[rating, setRating] = useState(0);
  const[loading, setLoading] = useState(false)
  const[reviewsLoading, setReviewsLoading] = useState(false)
  const[inputhandal, setInputhandal] = useState("")
  const [data, setData] = useState([]);
  const [newComment, setNewComment]= useState(0);

  const sendReviews = async()=>{
    // this is send data to firebase
    try{
      if(useAppstate.login){
      setLoading(true)
      await addDoc(reviewsRef, {
        moviesid : id.id,
        name : useAppstate.userName,
        rating : rating,
        thought : inputhandal,
        timestamp : new Date().getTime()
      }) 
      const ref = doc(db, 'movies', id.id);
      await updateDoc(ref, {
        rating : prevRating + rating
      }) 

      setRating(0);
      setInputhandal("")
      setNewComment(newComment+1)
      swal({
        title : "Review Sent",
                icon : "success",
                button : false,
                timer : 3000
      })
    } else{
      navigate('/login');
  }
    }catch(error){
      swal({
        title : error.message,
                icon : "error",
                button : false,
                timer : 3000
      })
    }
    setLoading(false)
  }


  useEffect(()=>{
    async function getData(){
      setReviewsLoading(true)
      setData([])
      let quer = query(reviewsRef, where('moviesid', '==', id.id))

      const querySnapshot = await getDocs(quer)
      querySnapshot.forEach((doc)=>{
        setData((prev)=>[...prev, doc.data()])
      })
      setReviewsLoading(false)
    }
    getData();
  },[newComment])

  return (
    <div className='mt-4 w-full border-t-2 border-gray-600'>
      <ReactStars
              size={30}
              half = {true}
              value={rating}
              onChange={(e)=> setRating(e)}

            />
      <input className='header w-full mb-2 bg-transparent p-2 outline-none ' value={inputhandal} onChange={(e)=>setInputhandal(e.target.value)} placeholder='Share your thoughts....'/>
      <button onClick={sendReviews} className='w-full  text-white bg-lime-500 border-0 p-2 flex justify-center  focus:outline-none hover:bg-lime-600 rounded text-lg'>
        {loading ? <TailSpin height={22} color='white'/> : "Share"}
      </button>

    {
      reviewsLoading ? <div className='mt-5 flex justify-center'><ThreeDots height={10} color='white'/></div> : 
      <div>
        {
          data.map((e,i)=>{
            return(
              <div key={i} className='p-2 w-full border-b reviewscmt border-gray-700 mt-2'>
                <div  className='flex'>
                  <p className='text-blue-600'>{e.name}</p>
                  <p className='ml-2 text-xs mt-1'>({new Date(e.timestamp).toLocaleString()})</p>
                </div>
                <ReactStars
                  size={15}
                  half = {true}
                  value={e.rating}
                  edit = {false}
                  />
                <p>{e.thought}</p>
              </div>
            )
          })
        }
      </div>
    }

    </div>
  )
}

export default Reviews