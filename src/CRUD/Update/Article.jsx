import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateArticle() {
    const { id } = useParams();
    const navigate = useNavigate()
    const [categories, setCategories] = useState([
        {
            id: '',
            name: '',
            href: '',
        }
    ])
    const [article, setArticle] = useState(
        {
            id: '',
            idContent: '',
            nameArticle: '',
            imgArticle: '',
            category: '',
            description: '',
            hashtags: '',
            author: '',
            content: ''
        }
    );
    useEffect(() => {
        axios.get('https://sheetdb.io/api/v1/5otjx4kyw1e1y').then(data => setCategories(data.data)).catch(err => console.error(err))
    }, [])
    useEffect(() => {
        axios.get(`https://sheetdb.io/api/v1/znf87zwkiuisa/search?id=${id}`).then(data => setArticle(data.data[0])).catch(err => console.error(err))
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToUpdate = { ...article };
        try {
            await axios.put(`https://sheetdb.io/api/v1/znf87zwkiuisa/id/${id}`, dataToUpdate, {
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
        <div className="w-full flex justify-end py-2">
            <div className='w-5/6 flex justify-center'>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center w-full gap-6" >
                    <TextField label='id' variant="outlined" name="id" fullWidth disabled onChange={handleInputChange} value={article.id} />
                    <TextField label="Id Content" variant="outlined" name="idContent" fullWidth type="number" onChange={handleInputChange} value={article.idContent} />
                    <TextField label="Name" variant="outlined" name="nameArticle" fullWidth onChange={handleInputChange} value={article.nameArticle} />
                    <TextField label="Image" variant="outlined" name="imgArticle" fullWidth onChange={handleInputChange} value={article.imgArticle} />
                    <FormControl>
                        <InputLabel>Category</InputLabel>
                        <Select id="Category" label="Category" name="category" value={article.category || ""} onChange={handleInputChange}>
                            {categories.map((cat) => ( 
                                <MenuItem value={cat.name} key={cat.id}>{cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField label="Description" variant="outlined" name="description" fullWidth onChange={handleInputChange} value={article.description} />
                    <TextField label="Href" variant="outlined" name="hashtags" fullWidth onChange={handleInputChange} value={article.hashtags} />
                    <TextField label="Author" variant="outlined" name="author" fullWidth onChange={handleInputChange} value={article.author} />
                    <TextField label="Content" variant="outlined" name="content" fullWidth onChange={handleInputChange} value={article.content} />
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button variant="contained" fullWidth type="submit">Update</Button>
                        <Button variant="contained" fullWidth color="error" onClick={() => navigate('/article')}>Quay về</Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    )
}
