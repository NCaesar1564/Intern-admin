import React from 'react'
import { redirect } from 'react-router-dom'
import ListCard from './components/Card'

export default function Home() {
  if (!localStorage.getItem('token')) {
    redirect('/login')
  }
  return (
    <>
      <div className='w-full flex justify-center'>
        <div className='w-5/6'>
          <ListCard />
        </div>
      </div>
    </>

  )
}
