import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io';
import { IoClose } from 'react-icons/io5';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

export const Dialog = ({ name, ConfirmDelete, CancelDelete }) => {
  return (
    <div className='flex justify-center items-center  border w-1/2 bg-gray-100 p-20'>
      <div className='flex flex-col items-center justify-start h-20 gap-y-10'>
        <p className='text-gray-800 font-bold text-xl'>Bạn có chắc muốn xóa bài báo "{name}" không?</p>
        <div className='flex justify-center gap-20 w-full'>
          <button onClick={ConfirmDelete} className='text-black bg-red-500 w-1/2 py-3 cursor-pointer hover:opacity-80'>Xóa</button>
          <button onClick={CancelDelete} className='text-black bg-green-500 w-1/2 py-3 cursor-pointer hover:opacity-80'>Hủy</button>
        </div>
      </div>
    </div>
  )
}
export const SearchBarButton = ({ searchKey, setSearchKey, searchBar, HandleSearchBar }) => {
  return (
    <div className='flex justify-end flex-row relative items-center'>
      <input
        className={`${searchBar ? `w-96 pl-3 not-lg:w-80 not-sm:w-50%` : `w-0`} transition-all duration-300 border-black outline-black 
          bg-gray-700 placeholder:text-white  text-white absolute right-0 h-13 rounded-sm mr-9`}
        placeholder='Nhập nội dung cần tìm'
        onChange={(e) => setSearchKey(e.target.value)} />
      {searchBar
        ?
        <IoClose size={40} className={`cursor-pointer relative z-50 ${searchBar ? `text-black hover:text-red-500` : ``}`} onClick={HandleSearchBar} />
        :
        <IoIosSearch size={40} className={`cursor-pointer relative z-50 ${!searchBar ? `text-black hover:text-green-700` : ``}`} onClick={HandleSearchBar} />}

    </div>
  )
}
export default function ListArticle() {
  const defaultIamge = 'https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg';
  const url = 'https://sheetdb.io/api/v1/vqq0mcmp85q2l';
  const navigate = useNavigate()
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
  const [selected, setSelected] = useState(null);
  const [dialog, setDialog] = useState(false)
  const [maxlength, setMaxlength] = useState(10);
  const [searchBar, setSearchBar] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  useEffect(() => {
    axios.get(url)
      .then(data => setArticles(data.data))
      .catch(err => console.error(err))
  }, [])
  const HandleSearchBar = () => {
    setSearchBar(!searchBar)
  }
  //tim kiem
  const ArticleFiltered = articles.filter(art => art.nameArticle.normalize("NFD").toLowerCase().trim().replace(/[\u0300-\u036f]/g, "").includes(searchKey.normalize("NFD").toLocaleLowerCase().trim().replace(/[\u0300-\u036f]/g, "")))
  //dialog on
  const DeleteArticle = (article) => {
    setDialog(true);
    setSelected(article)
  }
  //xac nhan xoa
  const ConfirmDelete = async (id) => {
    try {
      await axios.delete(`https://sheetdb.io/api/v1/yzelvmaoczxfc/id/${id}`);
      setArticles(articles.filter(a => a.id !== id));
      setDialog(false);
      setSelected(null);
    }
    catch (err) {
      console.error(err)
    }
  }
  //huy lenh xoa
  const CancelDelete = () => {
    setDialog(false)
    setSelected(null)
  }
  //Hien thi 10 bai bao dau tien
  const TopArticle = ArticleFiltered.slice(0, maxlength)

  return (
    <div className='flex flex-col justify-center items-center w-full'>
      <div className='absolute top-3 right-0 z-50 w-1/2'>
        <SearchBarButton setSearchKey={setSearchKey} searchKey={searchKey} searchBar={searchBar} HandleSearchBar={HandleSearchBar} />
      </div>
      <table border={1} className='w-full'>
        <thead className='w-full border'>
          <tr className='w-full'>
            <th className='border h-fit bg-gray-200'>id</th>
            <th className='border h-fit bg-gray-200'>imgArticle</th>
            <th className='border h-fit bg-gray-200'>nameArticle</th>
            <th className='border h-fit bg-gray-200 not-lg:hidden'>description</th>
            <th className='border h-fit bg-gray-200 not-sm:hidden'>hashtags</th>
            <th className='border h-fit bg-gray-200 not-sm:hidden'>category</th>
            <th className='border h-fit bg-gray-200'>author</th>
            <th className='border h-fit bg-gray-200 not-sm:hidden'>button</th>
          </tr>
        </thead>
        <tbody className='w-full border'>
          {TopArticle.map((article) => (
            <tr key={article.id} className='w-full'>
              <td className='border h-fit text-center uppercase font-black px-5'>{article.id}</td>
              <td className='border h-fit p-5'><img src={article.imgArticle || defaultIamge} alt={article.nameArticle} className='h-48' /></td>
              <td className='border h-fit text-center uppercase font-black px-5'>{article.nameArticle}</td>
              <td className='border h-fit text-center font-bold px-5 not-lg:hidden'>{article.description}</td>
              <td className='border h-fit text-center px-5 not-sm:hidden'>{article.hashtags}</td>
              <td className='border h-fit text-center px-5 not-sm:hidden'>{article.category}</td>
              <td className='border h-fit text-center font-bold px-5'>{article.author}</td>
              <td className='border h-fit text-center not-sm:hidden'>
                <div className='flex gap-5'>
                  <button className='border w-full bg-green-500 cursor-pointer p-5 hover:opacity-80' onClick={() => navigate(`/article/${article.id}`)}>Sửa</button>
                  <button className='border w-full bg-red-400 cursor-pointer p-5 hover:opacity-80'  onClick={() => DeleteArticle(article)}>Xóa</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={`w-1/2 flex justify-center ${maxlength >= articles.length ? 'hidden' : ' '}`}>
        <div
          className={`w-1/2 flex flex-col items-center justify-center my-5 cursor-pointer `}
          onClick={() => setMaxlength(maxlength + 10)}>
          <p className='text-center w-full font-bold'>Xem Thêm</p>
          <MdOutlineKeyboardDoubleArrowDown size={20} />
        </div>
        <div className={`w-1/2 flex flex-col justify-center items-center my-5 cursor-pointer`}
          onClick={() => setMaxlength(articles.length)}>
          <p className='text-center w-full font-bold'>Xem tất cả</p>
          <MdOutlineKeyboardDoubleArrowDown size={20} />
        </div>
      </div>
      <div className='fixed top-1/3 left-1/4 z-50 w-full'>
        {dialog && <Dialog name={selected?.nameArticle} ConfirmDelete={ConfirmDelete(id)} CancelDelete={CancelDelete} />}
      </div>
      {dialog ?
        (
          <div className='absolute h-screen w-full z-40 bg-black opacity-80 top-0 left-0' onClick={CancelDelete}></div>
        )
        :
        (
          <div></div>
        )
      }
    </div>
  )
}
