import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'

export default function UpdateArticle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [article, setArticle] = useState({
    id: '',
    idContent: '',
    nameArticle: '',
    imgArticle: '',
    category: '',
    description: '',
    hashtags: '',
    author: '',
    content: ''
  })
  const [categories, setCategories] = useState([{
    id: '',
    name: '',
    href: '',
  }])
  useEffect(() => {
    axios.get(`https://sheetdb.io/api/v1/vqq0mcmp85q2l/search?id=${id}`)
      .then(data => setArticle(data.data[0])).catch(err => console.error(err))
  }, [id])
  useEffect(() => {
    axios.get('https://sheetdb.io/api/v1/n6vtnrc2m0zh9')
      .then(data => setCategories(data.data))
  }, [])
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setArticle({ ...article, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToUpdate = { ...article };
    try {
      await axios.put(`https://sheetdb.io/api/v1/vqq0mcmp85q2l/id/${id}`, dataToUpdate, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate('/article');
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form onSubmit={handleSubmit} className='w-full flex justify-center'>
      <div className='flex flex-col gap-y-5 mt-20 w-1/2'>
        {/* id */}
        <fieldset className='border h-12 w-full flex justify-center rounded-md'>
          <legend className='mx-2 rounded-2xl' >id</legend>
          <input
            type="number"
            name='id'
            className='w-[98%] h-full outline-none'
            onChange={handleInputChange}
            value={article.id}
            disabled
          />
        </fieldset>
        {/* idcontent */}
        <fieldset className='border h-12 w-full flex justify-center rounded-md'>
          <legend className='mx-2 rounded-2xl'>idContent</legend>
          <input
            name='idcontent'
            type="number"
            className='w-[98%] h-full outline-none'
            onChange={handleInputChange}
            value={article.idContent}
          />
        </fieldset>
        {/* name */}
        <fieldset className='border h-12 w-full flex justify-center rounded-md'>
          <legend className='mx-2 rounded-2xl'>nameArticle</legend>
          <input
            name='nameArticle'
            type="text"
            className='w-[98%] h-full outline-none uppercase'
            onChange={handleInputChange}
            value={article.nameArticle}
          />
        </fieldset>
        {/* img */}
        <fieldset className='border h-12 w-full flex justify-center rounded-md'>
          <legend className='mx-2 rounded-2xl'>imgArticle</legend>
          <input
            name='imgArticle'
            type="text"
            className='w-[98%] h-full outline-none'
            onChange={handleInputChange}
            value={article.imgArticle}
          />
        </fieldset>
        {/* category */}
        <fieldset className='border h-12 w-full flex justify-center rounded-md'>
          <legend className='mx-2 rounded-2xl'>category</legend>
          <select
            value={article.category}
            name="category"
            className='w-full h-fit flex justify-center outline-none font-bold'
          >
            {categories.map((cat) => (
              <option className='h-8 font-bold' key={cat.id}>{cat.name}</option>
            ))}
          </select>
        </fieldset>
        {/* description */}
        <fieldset className='border h-12 w-full flex justify-center rounded-md'>
          <legend className='mx-2 rounded-2xl'>description</legend>
          <input
            name='description'
            type="text"
            className='w-[98%] h-full outline-none font-bold '
            onChange={handleInputChange}
            value={article.description}
          />
        </fieldset>
        {/* author */}
        <fieldset className='border h-12 w-full flex justify-center rounded-md'>
          <legend className='mx-2 rounded-2xl'>author</legend>
          <input
            name='author'
            type="text"
            className='w-[98%] h-full outline-none'
            onChange={handleInputChange}
            value={article.author}
          />
        </fieldset>
        <button
          className='border h-12 w-full flex justify-center items-center cursor-pointer rounded-md'
          type='submit'>
          Cập nhật
        </button>
      </div>
    </form>
  )
}
