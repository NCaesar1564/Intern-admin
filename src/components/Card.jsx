import React from 'react'
import { BiSolidCategory } from 'react-icons/bi'
import { GrArticle } from 'react-icons/gr'
import { RiHashtag } from 'react-icons/ri'

export const CardManager = ({ name, icon }) => {
    return (
        <>
            <p className='border border-black rounded-lg px-10 py-5 flex justify-center items-center gap-1'>
                {icon} Quản lý {name}
            </p>
        </>
    )
}
export const CardAdd = ({ name, icon }) => {
    return (
        <>
            <p className='border border-black rounded-lg px-10 py-5 flex justify-center items-center gap-1'>
                {icon} Thêm {name}
            </p>
        </>
    )
}
export default function ListCard() {
    const managerList = [{
        id: 1,
        name: 'Danh mục',
        href: 'category',
        icon: <BiSolidCategory />
    }, {
        id: 2,
        name: 'Bài báo',
        href: 'article',
        icon: <GrArticle />
    }];

    return (
        <div className='w-full flex justify-center'>
            <div className='w-2/3 flex justify-start gap-10 mt-20'>
                <div className='flex flex-col gap-y-5'>
                    <div className='flex w-full'>
                        <div className='flex flex-col gap-y-5'>
                            {managerList.map((list) => (
                                <a key={list.id} href={list.href} >
                                    <CardManager name={list.name} icon={list.icon} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='flex flex-col gap-y-5'>
                    <div className='flex w-full'>
                        <div className='flex flex-col gap-y-5'>
                            {managerList.map((list) => (
                                <a key={list.id} href={`/add/${list.href}`} >
                                    <CardAdd name={list.name} icon={list.icon} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
