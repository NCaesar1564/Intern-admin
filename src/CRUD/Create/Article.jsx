import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function CreateArticle() {
    const [categories, setCategories] = useState([
        {
            id: '',
            name: '',
            href: '',
        }
    ])
    const [articles, setArticles] = useState([
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
    ]);
    useEffect(() => {
        axios.get('https://sheetdb.io/api/v1/5otjx4kyw1e1y').then(data => setCategories(data.data))
        axios.get('https://sheetdb.io/api/v1/znf87zwkiuisa').then(data => setArticles(data.data))
    }, [])
    const idArticle = articles.length + 1;
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = 'https://script.google.com/macros/s/AKfycbwYQHCylt8qtH3lu2UMxaS6o0V1nfvE2h_7FifN1Y0a1C82O_AhOW9gIzWuXwZ_m48Z/exec';
        const formData = new URLSearchParams({
            id: idArticle,
            idContent: e.target.idContent.value,
            imgArticle: e.target.imgArticle.value,
            nameArticle: e.target.nameArticle.value,
            description: e.target.description.value,
            hashtags: e.target.hashtags.value,
            category: e.target.category.value,
            author: e.target.author.value,
            content: e.target.content.value
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
            window.location.reload(true)
        }, 4000);
    };
    return (
        <div className="w-full flex justify-end py-5">
            <div className='w-5/6 flex justify-center'>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center w-full gap-6">
                    <TextField variant="outlined" name="id" label='id' fullWidth disabled={true} value={idArticle} />
                    <TextField label="Id Content" variant="outlined" name="idContent" fullWidth type="number" />
                    <TextField label="Name" variant="outlined" name="nameArticle" fullWidth />
                    <TextField label="Image" variant="outlined" name="imgArticle" fullWidth />
                    <FormControl>
                        <InputLabel>Category</InputLabel>
                        <Select id="Category" label="Category" name="category" defaultValue={''}>
                            {categories.map((cat) => (
                                <MenuItem value={cat.id} key={cat.id}>{cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField label="Description" variant="outlined" name="description" fullWidth />
                    <TextField label="Href" variant="outlined" name="hashtags" fullWidth />
                    <TextField label="Author" variant="outlined" name="author" fullWidth />
                    <TextField label="Content" variant="outlined" name="content" fullWidth />
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button variant="contained" fullWidth type="submit">Add</Button>
                        <Button variant="contained" fullWidth type="reset" color="error" >Clear</Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    )
}
