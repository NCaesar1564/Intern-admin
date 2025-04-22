import React from 'react'
import ListCard from './components/Card'
import { redirect } from 'react-router-dom'

export default function Home() {
  if (!localStorage.getItem ('token')) {
    redirect('/login')
  }
  return (
    <>
      <div className='w-full flex justify-center z-50'>
        <ListCard />
      </div>
    </>

  )
}
