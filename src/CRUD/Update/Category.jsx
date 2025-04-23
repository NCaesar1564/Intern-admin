import { Button, ButtonGroup, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateCategory() {
  const { id } = useParams();
  const navigate = useNavigate()
  const [category, setCategory] = useState(
    {
      id: '',
      name: '',
      href: '',
    }
  )
  useEffect(() => {
    axios.get(`https://sheetdb.io/api/v1/5otjx4kyw1e1y/search?id=${id}`).then(data => setCategory(data.data[0])).catch(err => console.error(err))
  }, [id])

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToUpdate = { ...category };
    try {
      await axios.put(`https://sheetdb.io/api/v1/5otjx4kyw1e1y/id/${id}`, dataToUpdate, {
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
    <div className="w-full flex justify-end py-2">
      <div className='w-5/6 flex justify-center'>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center w-full gap-6" >
          <TextField label='Id' variant="outlined" name="id" fullWidth disabled onChange={handleInputChange} value={category.id} />
          <TextField label="Name" variant="outlined" name="name" fullWidth onChange={handleInputChange} value={category.name} />
          <TextField label="Href" variant="outlined" name="href" fullWidth onChange={handleInputChange} value={category.href} />
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button variant="contained" fullWidth type="submit">Update</Button>
            <Button variant="contained" fullWidth color="error" onClick={() => navigate('/category')}>Quay về</Button>
          </ButtonGroup>
        </form>
      </div>
    </div>
  )
}
