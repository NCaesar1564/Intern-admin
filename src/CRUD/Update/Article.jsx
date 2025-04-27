import { Button, ButtonGroup, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import DraftEditor from '../DraftEditor'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';

export default function UpdateArticle() {
    const { id } = useParams();
    const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
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
        axios.get('https://sheetdb.io/api/v1/p0h7yppzewaue').then(data => setCategories(data.data)).catch(err => console.error(err))
    }, [])
    useEffect(() => {
        axios.get(`https://sheetdb.io/api/v1/xjzqyyqrbfymx/search?id=${id}`)
            .then(data => {
                const fetchedArticle = data.data[0];
                setArticle(fetchedArticle);
                if (fetchedArticle.content) {
                    try {
                        const contentState = convertFromRaw(JSON.parse(fetchedArticle.content));
                        setEditorState(EditorState.createWithContent(contentState));
                    } catch (err) {
                        console.error(err);
                        setEditorState(EditorState.createEmpty());
                    }
                }
            })
    }, [id])

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setArticle({ ...article, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const rawContent = convertToRaw(editorState.getCurrentContent());
        const contentJson = JSON.stringify(rawContent);
        const dataToUpdate = { ...article, content: contentJson };
        axios.put(`https://sheetdb.io/api/v1/xjzqyyqrbfymx/id/${id}`,
            dataToUpdate,
            { headers: { 'Content-Type': 'application/json' } }
        );
        setTimeout(() => {
            navigate('/article');
        }, 2000);
    }

    return (
        <div className="w-full flex justify-end py-2">
            <div className='w-5/6 flex justify-center'>
                <form onSubmit={handleSubmit} className="flex flex-col justify-center w-full gap-6" >
                    <TextField label='id' variant="outlined" name="id" fullWidth disabled onChange={handleInputChange} value={article.id} required/>
                    <TextField label="Id Content" variant="outlined" name="idContent" fullWidth type="number" onChange={handleInputChange} value={article.idContent} required/>
                    <TextField label="Name" variant="outlined" name="nameArticle" fullWidth onChange={handleInputChange} value={article.nameArticle} required/>
                    <TextField label="Image" variant="outlined" name="imgArticle" fullWidth onChange={handleInputChange} value={article.imgArticle}/>
                    <FormControl>
                        <InputLabel>Category</InputLabel>
                        <Select id="Category" label="Category" name="category" value={article.category || ""} onChange={handleInputChange} required>
                            {categories.map((cat) => (
                                <MenuItem value={cat.name} key={cat.id}>{cat.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <TextField label="Description" variant="outlined" name="description" fullWidth onChange={handleInputChange} value={article.description} required/>
                    <TextField label="Href" variant="outlined" name="hashtags" fullWidth onChange={handleInputChange} value={article.hashtags} required/>
                    <TextField label="Author" variant="outlined" name="author" fullWidth onChange={handleInputChange} value={article.author} required/>
                    <DraftEditor editorState={editorState} setEditorState={setEditorState} />
                    <ButtonGroup variant="contained" aria-label="Basic button group">
                        <Button variant="contained" fullWidth type="submit">Update</Button>
                        <Button variant="contained" fullWidth color="error" onClick={() => navigate('/article')}>Quay về</Button>
                    </ButtonGroup>
                </form>
            </div>
        </div>
    )
}
