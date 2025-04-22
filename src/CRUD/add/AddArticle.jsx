import axios from "axios"
import { useEffect, useState } from "react"

export default function AddArticle() {
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
        axios.get('https://sheetdb.io/api/v1/j9b6mmfvg2885').then(data => setCategories(data.data))
        axios.get('https://sheetdb.io/api/v1/vqq0mcmp85q2l').then(data => setArticles(data.data))
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
        <div className='w-full flex flex-col items-center my-22'>
            <form className="flex flex-col justify-center items-center gap-y-5 w-1/2" onSubmit={handleSubmit}>
                {/* id */}
                <fieldset className='border h-12 w-full flex justify-center rounded-md opacity-80'>
                    <legend className='mx-2 rounded-2xl'>id bài báo</legend>
                    <input
                        name='id'
                        type="number"
                        className='w-[98%] h-full outline-none'
                        value={idArticle}
                        disabled
                    />
                </fieldset>
                {/* idcontent */}
                <fieldset className='border h-12 w-full flex justify-center  rounded-md'>
                    <legend className='mx-2  rounded-2xl'>id định dạng</legend>
                    <input
                        name='idContent'
                        type="number"
                        className='w-[98%] h-full outline-none'
                    />
                </fieldset>
                {/* img */}
                <fieldset className='border h-12 w-full flex justify-center rounded-md'>
                    <legend className='mx-2  rounded-2xl' >Hình ảnh</legend>
                    <input
                        name='imgArticle'
                        type="text"
                        className='w-[98%] outline-none'
                    />
                </fieldset>
                {/* name */}
                <fieldset className='border h-12 w-full flex justify-center rounded-md'>
                    <legend className='mx-2 '>Tên bài báo</legend>
                    <input
                        name='nameArticle'
                        type="text"
                        className='w-[98%] h-fit outline-none font-bold uppercase'
                    />
                </fieldset>
                {/* description */}
                <fieldset className='border h-12 w-full flex justify-center rounded-md'>
                    <legend className='mx-2 '>Mô tả bài báo</legend>
                    <input
                        name='description'
                        type="text"
                        className='w-[98%] h-fit outline-none font-bold uppercase'
                    />
                </fieldset>
                {/* hashtags */}
                <fieldset className='border h-12 w-full flex justify-center rounded-md'>
                    <legend className='mx-2  rounded-2xl'>hashtags</legend>
                    <input
                        name='hashtags'
                        type="text"
                        className='w-[98%] h-fit outline-none'
                    />
                </fieldset>
                {/* category */}
                <fieldset className='border h-12 w-full flex justify-center rounded-md'>
                    <legend className='mx-2  rounded-2xl'>Danh mục</legend>
                    <select
                        name="category"
                        className='w-full h-fit flex justify-center outline-none font-bold'
                    >
                        {categories.map((cat) => (
                            <option className='h-8 font-bold' key={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </fieldset>
                {/* author */}
                <fieldset className='border h-12 w-full flex justify-center rounded-md'>
                    <legend className='mx-2  rounded-2xl'>Tác giả</legend>
                    <input
                        name='author'
                        type="text"
                        className='w-[98%] h-fit outline-none uppercase font-bold'
                    />
                </fieldset>
                {/* content */}
                <fieldset className='border h-full w-full flex justify-end rounded-md'>
                    <legend className='mx-2  rounded-2xl'>Nội dung</legend>
                    <textarea
                        name='content'
                        className='w-[99%] outline-none'
                    />
                </fieldset>
                {/* button */}
                <div className='w-full flex justify-center'>
                    <button type='submit' className='w-full border h-12 bg-green-400 hover:opacity-80 cursor-pointer' >Thêm bài báo</button>
                    <button type='reset' className='w-full border h-12 bg-red-500 hover:opacity-80 cursor-pointer'>Clear</button>
                </div>
            </form>
        </div>
    )
}