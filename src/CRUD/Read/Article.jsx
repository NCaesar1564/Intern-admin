import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate } from 'react-router-dom';

export const NameTable = ({ name, description }) => {
    return (
        <>
            <div className='flex flex-col m-4'>
                <h1 className='text-2xl'>{name}</h1>
                <p className='text-gray-300'>{description}</p>
            </div>
        </>
    )
}
export const Table = () => {
    const url = 'https://sheetdb.io/api/v1/z8vf9v7ndynps';
    const defaultIamge = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';
    const [articles, setArticles] = useState([{
        id: '',
        idContent: '',
        nameArticle: '',
        description: '',
        imgArticle: '',
        hashtags: '',
        category: '',
        author: '',
        content: ''
    }]);
    useEffect(() => {
        axios.get(url)
            .then(data => setArticles(data.data))
            .catch(err => console.error(err))
    }, [])
    return (
        <>
            <table border={1} className=''>
                <thead className='w-full'>
                    <tr>
                        <th className='w-fit text-sm'>Id</th>
                        <th className='w-fit text-sm'>Id Content</th>
                        <th className='w-fit text-sm'>Name</th>
                        <th className='w-fit text-sm'>Description</th>
                        <th className='w-fit text-sm'>Image</th>
                        <th className='w-fit text-sm'>Href</th>
                        <th className='w-fit text-sm'>Category</th>
                        <th className='w-fit text-sm'>Author</th>
                        <th className='w-fit'>content</th>
                    </tr>
                </thead>
                <tbody className='w-full '>
                    {articles.map((article) => (
                        <tr className={`${article.id % 2 === 0 ? `bg-yellow-100` : ``}`} key={article.id}>
                            <th className='w-[2%] text-xs'>{article.id}</th>
                            <th className='w-[5%] text-xs'>{article.idContent}</th>
                            <th className='w-fit text-xs'>{article.nameArticle}</th>
                            <th className='w-fit text-xs'>{article.description}</th>
                            <th className='w-full flex justify-center items-center'><img src={article.imgArticle || defaultIamge} alt={article.nameArticle} className='w-3/4 h-3/4'/></th>
                            <th className='w-fit text-xs'>{article.hashtags}</th>
                            <th className='w-fit text-xs'>{article.category}</th>
                            <th className='w-fit text-xs'>{article.author}</th>
                            <th className='w-fit'></th>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}
export const TableArticle = () => {
    return (
        <>
            <div className='w-5/6 h-11/12 flex justify-start items-start'>
                <div className='h-2/3 w-11/12 border ml-8 max-h-2/3 overflow-auto border-gray-50 bg-gray-50 rounded-md'>
                    <NameTable name='Article Table' description='description for article table' />
                    <Table />
                </div>
            </div>
        </>
    )
}
export default function Article() {
    const navigate = useNavigate()

    const [selected, setSelected] = useState(null);
    return (
        <div className='w-full h-screen flex justify-end items-center bg-gray-200'>
            <TableArticle />
        </div>
    )
}
