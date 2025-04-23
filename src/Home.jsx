import React from 'react'
import { redirect } from 'react-router-dom'
import ListCard from './components/Card'

export default function Home() {
  if (!localStorage.getItem('token')) {
    redirect('/login')
  }
  return (
    <>
      <div className='w-full flex justify-end min-h-screen'>
        <div className='w-5/6 py-2'>
          <ListCard />
        </div>
      </div>
    </>

  )
}
