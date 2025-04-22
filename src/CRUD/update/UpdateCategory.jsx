import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'

export default function UpdateCategory() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [category, setCategory] = useState({
    id: '', name: '', href: ''
  })
  useEffect(() => {
    axios.get(`https://sheetdb.io/api/v1/n6vtnrc2m0zh9/search?id=${id}`)
      .then(data => setCategory(data.data[0])).catch(err => console.error(err))
  }, [id])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToUpdate = { ...category };
    try {
      const response = await axios.put(`https://sheetdb.io/api/v1/n6vtnrc2m0zh9/id/${id}`, dataToUpdate, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/category');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className='w-full flex justify-center'>
      <div className='flex flex-col gap-y-5 mt-20 w-1/2'>
        <fieldset className='border h-12 w-full flex justify-center rounded-md'>
          <legend className='mx-2 rounded-2xl' >id</legend>
          <input
            name='id'
            type="number"
            className='w-[98%] h-full outline-none'
            onChange={handleInputChange}
            value={category.id}
            disabled
          />
        </fieldset>
        <fieldset className='border h-12 w-full flex justify-center rounded-md'>
          <legend className='mx-2 rounded-2xl'>name</legend>
          <input
            name='name'
            type="text"
            className='w-[98%] h-full outline-none'
            onChange={handleInputChange}
            value={category.name}
          />
        </fieldset>
        <fieldset className='border h-12 w-full flex justify-center rounded-md'>
          <legend className='mx-2 rounded-2xl'>href</legend>
          <input
            name='href'
            type="text"
            className='w-[98%] h-full outline-none'
            onChange={handleInputChange}
            value={category.href}
          />
        </fieldset>
        <button
          className='border h-12 w-full flex justify-center items-center cursor-pointer rounded-md font-black hover:text-white hover:bg-black'
          type='submit'>
          Cập nhật
        </button>
      </div>
    </form>
  )
}
