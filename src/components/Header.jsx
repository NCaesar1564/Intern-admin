import React, { useEffect, useState } from 'react'
import { IoClose, IoMenu } from 'react-icons/io5'
import Sidebar from './Sidebar';
import { useLocation } from 'react-router-dom';

export const SidebarButton = ({ sidebar, HandleSidebar }) => {
    return (
        <>
            <div className={`flex transition-all  justify-end duration-100  ${!sidebar ? `w-[50px]` : `w-1/2 not-lg:w-[50px]`}`} >
                {sidebar
                    ?
                    <IoClose size={40} className='cursor-pointer hover:text-red-500' onClick={HandleSidebar} />
                    :
                    <IoMenu size={40} className='cursor-pointer hover:text-green-700' onClick={HandleSidebar} />}
            </div>
            <div className={`${sidebar ? `left-0 not-lg:w-1/2` : ` -left-1/6`} transition-all duration-100 absolute  w-1/6 top-16`}>
                <Sidebar />
            </div>
        </>
    )
}

export const HeaderContent = () => {
    const location = useLocation()
    const [title, setTitle] = useState('Admin Page')
    useEffect(() => {
        const pathTitle = {
            '/': 'Admin Page',
            '/article': 'Manager Article',
            '/category': 'Manager Category',
            '/hashtag': 'Manager Hashtag',
            '/add/article': 'Add Article',
            '/add/category': 'Add Category',
            '/add/hashtag': 'Add Hashtag',
        }
        setTitle(pathTitle[location.pathname] || 'Admin Page')

    }, [location.pathname])
    return (
        <>
            <div className='h-full'>
                <h1 className='text-3xl font-bold h-fit
            bg-gradient-to-b from-orange-400 via-pink-500
             to-purple-600 text-transparent bg-clip-text text-nowrap whitespace-nowrap not-lg:text-3xl'>{title}</h1>
            </div>
        </>
    )
}
export default function Header() {
    const [sidebar, setSidebar] = useState(false);
    const HandleSidebar = () => {
        if (sidebar === false) {
            setSidebar(true)
        } else {
            setSidebar(false)
        }
    }
    return (
        <>
            <div className='bg-gray-100 h-16 w-full flex justify-center items-center fixed  top-0 shadow-lg shadow-gray-300 z-50'>
                <div className='w-full grid grid-cols-3 not-lg:grid-cols-2'>
                    <span className='col-span-1 flex justify-start items-center'>
                        <SidebarButton sidebar={sidebar} HandleSidebar={HandleSidebar} />
                        <span className={`lg:hidden transition-all ${sidebar ? `w-full` : `w-0`}`}>
                            <div className=''>
                                <HeaderContent />
                            </div>
                        </span>
                    </span>
                    <span className='col-span-1 flex justify-center items-center h-full not-lg:hidden'>
                        <HeaderContent />
                    </span>

                </div>
            </div>
            {sidebar ?
                (
                    <div className='h-full absolute w-5/6 right-0 top-0 bg-black opacity-30 z-40' onClick={HandleSidebar}>
                    </div>
                )
                :
                (
                    <div></div>
                )}

        </>
    )
}
