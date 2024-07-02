import React,{useEffect, useState} from 'react'
import { Puff} from 'react-loader-spinner'
import ReactStars from 'react-stars'
import { getDocs } from 'firebase/firestore';
import { moviesRef } from '../firebase/firebase';
import { Link } from 'react-router-dom';

const Card = () => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(()=>{
    async function getData(){
        setLoading(true)

      const _data = await getDocs(moviesRef);

      _data.forEach((doc)=>{
        setData((prv)=>[...prv, {...(doc.data()), id: doc.id}])
      })
      setLoading(false)
    }
    getData();
  }, [])
  return (<>
    <div className='cardmargin flex justify-between flex-wrap mt-2 p-4 '>
      { loading ? <div className='w-full flex justify-center items-center h-96'><Puff height={80} color='white'/></div> :
      data.map((e, i)=>{
        return(
        <Link to={`/detail/${e.id}`}><div key={i} className='Card font-medium shadow-lg p-3 hover:-translate-y-3 transition-all duration-500 cursor-pointer rounded-md mt-5' >
            <img alt='' className='h-60 w-60 md:h-72' src={e.image}/>
            <h1><span className='text-gray-400 '>Name:</span> {e.title}</h1>
            <h1 className='flex items-center'><span className='text-gray-400 mr-1'>Rating:</span>
            <ReactStars
              size={20}
              half = {true}
              value= {4.5}
              edit={false}

            />
            </h1>
            <h1><span className='text-gray-400'>Year:</span> {e.year}</h1>
        </div></Link>
      )})}
    </div>
    </>
  )
}

export default Card