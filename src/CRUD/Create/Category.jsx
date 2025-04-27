import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup, TextField } from '@mui/material';

export default function CreateCategory() {
  const url = 'https://sheetdb.io/api/v1/p0h7yppzewaue'
  const [categories, setCategories] = useState([{
    id: '', name: '', href: ''
  }]);

  useEffect(() => {
    axios.get(url)
      .then(data => setCategories(data.data))
      .catch(err => console.error(err))
  }, []);
  const idCat = categories.length + 1
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
    <div className='flex w-full justify-end py-5'>
      <div className='w-5/6'>
        <form onSubmit={handleSubmit} className='flex flex-col w-full gap-5'>
          <TextField variant="outlined" name="id" label='id' fullWidth disabled value={idCat} required/>
          <TextField label="Name" variant="outlined" name="name" fullWidth type="number" required/>
          <TextField label="Href" variant="outlined" name="href" fullWidth required/>
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button variant="contained" fullWidth type="submit">Add</Button>
            <Button variant="contained" fullWidth type="reset" color="error" >Clear</Button>
          </ButtonGroup>
        </form>
      </div>
    </div>
  );
}
