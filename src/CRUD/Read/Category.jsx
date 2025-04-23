import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoIosSearch } from 'react-icons/io'
import { IoClose } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

export const Dialog = ({ name, ConfirmDelete, CancelDelete }) => {
  return (
    <div className='flex justify-center items-center fixed top-1/3 left-1/4 border w-1/2 bg-gray-100 py-20 z-50'>
      <div className='flex flex-col items-center justify-start h-20 gap-y-10'>
        <p className='text-gray-800 font-bold text-xl'>Bạn có chắc muốn xóa danh mục "{name}" không?</p>
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
export default function ListCategory() {
  const [categories, setCategories] = useState([{ id: '', name: '', href: '' }])
  const url = 'https://sheetdb.io/api/v1/yzelvmaoczxfc'
  const [dialog, setDialog] = useState(false)
  const [selected, setSelected] = useState(null)
  const [searchBar, setSearchBar] = useState(false)
  const [searchKey, setSearchKey] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    axios.get(url)
      .then(data => setCategories(data.data))
      .catch(err => console.error(err))
  }, [])
  //search input on
  const HandleSearchBar = () => {
    setSearchBar(!searchBar)
  }
  //tim kiem
  const CategoryFiltered = categories.filter(cat => cat.name.normalize("NFD").toLowerCase().trim().replace(/[\u0300-\u036f]/g, "").includes(searchKey.normalize("NFD").toLocaleLowerCase().trim().replace(/[\u0300-\u036f]/g, "")))
  //dialog on
  const DeleteCategory = (category) => {
    setDialog(true);
    setSelected(category)
  }
  //xac nhan xoa
  const ConfirmDelete = async (id) => {
    try {
      await axios.delete(`https://sheetdb.io/api/v1/j9b6mmfvg2885/id/${id}`);
      setCategories(categories.filter(c => c.id !== id));
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

  return (
    <div className='w-full flex flex-col items-center justify-end gap-5'>

    </div>
  )
}
