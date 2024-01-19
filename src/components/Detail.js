import React, { useEffect, useState } from 'react'
import ReactStars from 'react-stars'
import { useParams } from 'react-router-dom'
import { db } from '../firebase/firebase';
import {doc, getDoc} from 'firebase/firestore'
import { Puff} from 'react-loader-spinner'
import Reviews from './Reviews';



const Detail = () => {
    const {id} = useParams();
    const [data, setData] = useState({
        title:"",
        year:"",
        image:"",
        description:"",
        rating: 0
    })

    useEffect(()=>{
        async function getData(){
            setLoading(true)
            const _doc = doc(db, "movies", id);
            const _data = await getDoc(_doc)
            setData(_data.data())
            setLoading(false)
        }
        getData();
    },[])

    const [loading, setLoading] = useState(false)
  return (
    <div className='p-4 mt-4 flex flex-col md:flex-row  items-center md:items-start  justify-center w-full'>
      {loading ? <div className='w-full flex justify-center items-center h-96'><Puff height={80} color='white'/></div>
      :
      <>
      <img className='h-96 block md:sticky top-24' src={data.image}/>
        <div className='ml-0 md:ml-4 md:w-1/2 w-full' >
            <h1 className='text-3xl text-gray-400 font-bold '>{data.title} <span className='text-xl'>({data.year})</span></h1>
            <ReactStars
              size={20}
              half = {true}
              value= {4.5}
              edit={false}

            />
            <p className='mt-2'>{data.description}</p>

            <Reviews id={id} prevRating = {data.rating} />
        </div>
        </>
      }
    </div>
  )
}

export default Detail;