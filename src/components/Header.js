import React, { useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Appstate } from '../App';

const Header = () => {
  const useAppstate = useContext(Appstate);
  return (
    <div className='sticky top-0 header text-4xl text-red-500  border-b-2 border-gray-500 items-center flex justify-between font-bold p-3'><span><Link to={"/"}>
        Movies<span className='text-white hover:text-gray-200'>Hub</span></Link></span>

       {useAppstate.login ? 
        <Link to="/addmovie">
       <h1 className='flex items-center text-white cursor-pointer '>
        <Button>
        <AddIcon className='mr-1' color='info'/>
        <span className='text-lg  text-white '>Add More</span>
        </Button>
        </h1> </Link>

        :

        <Link to="/login">
        <h1 className='flex items-center rounded-md p-0  bg-lime-700 focus:outline-none hover:bg-lime-800  text-white cursor-pointer '>
         <Button>
         <span className='text-md  text-white capitalize  '>login</span>
         </Button>
         </h1> </Link>
        }
    </div>
  )
}

export default Header