import React from 'react'
import { useStore } from '../../context/StoreContextProvider';

const EditProfile = () => {
  const {  profile,setProfile } = useStore();

  return (
    <div>EditProfile</div>
  )
}

export default EditProfile