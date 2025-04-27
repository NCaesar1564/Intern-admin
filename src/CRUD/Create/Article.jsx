import {
  Button, ButtonGroup, FormControl, InputLabel,
  MenuItem, Select, TextField
} from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw } from 'draft-js';
import DraftEditor from '../DraftEditor';
import { useNavigate } from 'react-router-dom';

export default function Article() {
  const [categories, setCategories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const navigate = useNavigate()

  useEffect(() => {
    axios.get('https://sheetdb.io/api/v1/p0h7yppzewaue').then(data => setCategories(data.data));
    axios.get('https://sheetdb.io/api/v1/xjzqyyqrbfymx').then(data => setArticles(data.data));
  }, []);

  const idArticle = articles.length + 1;
 
  const handleSubmit = (e) => {
    
    e.preventDefault();
    const url = 'https://script.google.com/macros/s/AKfycbwYQHCylt8qtH3lu2UMxaS6o0V1nfvE2h_7FifN1Y0a1C82O_AhOW9gIzWuXwZ_m48Z/exec';
    const rawContent = convertToRaw(editorState.getCurrentContent());
    const contentJson = JSON.stringify(rawContent);

    const formData = new URLSearchParams({
      id: idArticle,
      idContent: e.target.idContent.value,
      imgArticle: e.target.imgArticle.value,
      nameArticle: e.target.nameArticle.value,
      description: e.target.description.value,
      hashtags: e.target.hashtags.value,
      category: e.target.category.value,
      author: e.target.author.value,
      content: contentJson
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
      navigate('/article')
      window.location.reload(true);
    }, 4000);
  };

  return (
    <div className="w-full flex justify-end py-5">
      <div className='w-5/6 flex justify-center not-lg:w-full'>
        <form onSubmit={handleSubmit} className="flex flex-col justify-center w-full gap-6">
          <TextField variant="outlined" name="id" label='id' fullWidth disabled value={idArticle} required/>
          <TextField label="Id Content" variant="outlined" name="idContent" fullWidth type="number" required/>
          <TextField label="Name" variant="outlined" name="nameArticle" fullWidth required/>
          <TextField label="Image" variant="outlined" name="imgArticle" fullWidth/>
          <FormControl>
            <InputLabel>Category</InputLabel>
            <Select id="Category" label="Category" name="category" defaultValue={''} required>
              {categories.map((cat) => (
                <MenuItem value={cat.id} key={cat.id}>{cat.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="Description" variant="outlined" name="description" fullWidth required/>
          <TextField label="Href" variant="outlined" name="hashtags" fullWidth required/>
          <TextField label="Author" variant="outlined" name="author" fullWidth required/>
          <DraftEditor editorState={editorState} setEditorState={setEditorState} />
          <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button variant="contained" fullWidth type="submit">Add</Button>
            <Button variant="contained" fullWidth type="reset" color="error">Clear</Button>
          </ButtonGroup>
        </form>
      </div>
    </div>
  );
}
