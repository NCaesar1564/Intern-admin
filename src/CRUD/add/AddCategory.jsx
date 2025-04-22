import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function AddCategory() {
  const url = 'https://sheetdb.io/api/v1/n6vtnrc2m0zh9'
  const [categories, setCategories] = useState([{
    id: '', name: '', href: ''
  }]);

  useEffect(() => {
    axios.get(url)
      .then(data => setCategories(data.data))
      .catch(err => console.error(err))
  }, []);
  const idCat = categories.length + 1
  console.log(categories)
  console.log(categories.length)
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = 'https://script.google.com/macros/s/AKfycbz6eWvgBVaMxqk7RTw_BKIidS5ThOgLMw2VfueHC3wLa3uiS_8VfuIlEe0l1GjRQapaCA/exec';
    const formData = new URLSearchParams({
      id: e.target.id.value,
      name: e.target.name.value,
      href: e.target.href.value
    });
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: formData
    })
      .then(res => res.text())
      .then(data => alert(data))
      .catch(err => console.error(err));
    setTimeout(() => {
      window.location.reload(true);
    }, 4000);
  }
  return (
    <div className=' mt-20 flex justify-center'>
      <form onSubmit={handleSubmit} className='flex flex-col w-1/2 gap-5'>
        <input type="number"
          name='id'
          className='border rounded-md h-12 w-full px-2  opacity-50'
          placeholder='id'
          value={idCat}
          disabled
        />
        <input placeholder="Tên danh mục"
          name='name'
          className='border rounded-md h-12 w-full px-2'
        />
        <input placeholder="Href"
          name='href'
          className='border rounded-md h-12 w-full px-2'
        />
        <div className='w-full h-12'>
          <button type="submit" className='cursor-pointer border bg-green-500 w-1/2 h-full hover:opacity-80'>Thêm danh mục</button>
          <button type="reset" className='cursor-pointer border bg-red-400 w-1/2 h-full hover:opacity-80'>Clear</button>
        </div>
      </form>
    </div>
  );
}
