import Sidebar from './Sidebar';

export const HeaderContent = () => {
    return (
        <>
            <div className='h-16 flex flex-col justify-center'>
                <a className='ml-10 w-fit h-16 flex justify-center items-center' href='/'><p className='text-gray-900 font-bold text-lg'>Dashboard</p></a>
                <hr className="text-gray-200 " />
            </div >
        </>
    )
}

export default function Layout() {
    return (
        <>
            <div className='w-full h-16 grid grid-cols-6 bg-white z-50'>
                <div className='col-span-1 not-lg:hidden'>
                    <Sidebar />
                </div>
                <div className='col-span-5 not-lg:col-span-6'>
                    <HeaderContent />
                </div>
            </div>
        </>
    )
}
