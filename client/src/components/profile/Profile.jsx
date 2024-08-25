import React from 'react'
import person from '../../assets/images/person.jpg'
const Profile = () => {
  return (
    <div className='bg-green-500 w-full p-2 rounded-lg shadow-md'>
        <section className=''>
            <div>
                <img src={person} alt="" className='w-10 rounded-full' />
            </div>
            <div>
                <h1>sreeraj</h1>
                <p>No profession</p>
            </div>
        </section>
        <hr />
    </div>
  )
}

export default Profile