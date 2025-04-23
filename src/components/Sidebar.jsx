import React from 'react'


export const Name = () => {
    return (
        <div className='w-full h-16 flex flex-col justify-start items-center mb-10'>
            <div className='w-5/6 h-16 text-center'>
                <div className='h-full flex items-center justify-center'><p className='text-3xl font-mono text-gray-400 '>ZNews</p></div>
                <hr className='text-gray-300' />
            </div>
        </div>
    )
}
export const Card = () => {
    const CardItems = [
        { id: 1, name: 'DASHBOARD', href: '/' },
        { id: 2, name: 'ARTICLE MANAGER', href: '/article' },
        { id: 3, name: 'CATEGORY MANAGER', href: '/category' },
        { id: 4, name: 'CREATE ARTILCE', href: '/add/article' },
        { id: 5, name: 'CREATE CATEGORY', href: '/add/category' },
    ]
    return (
        <>
            {CardItems.map((card) => (
                <a key={card.id} className='h-14 w-4/5 text-start text-gray-500 font-mono hover:font-bold hover:text-gray-600' href={card.href}>{card.name}</a>
            ))}
        </>
    )
}
export default function Sidebar() {
    return (
        <>
            <div className='w-full h-lvh z-50 bg-white'>
                <Name />
                <div className='w-full flex flex-col justify-center items-center  z-50'>
                    <Card />
                </div>
            </div>
        </>
    )
}
