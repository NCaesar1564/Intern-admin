import { Button } from '@mui/material';
import Sidebar from './Sidebar';

export const HeaderContent = () => {
    return (
        <>
            <a className='h-16 flex items-center' href='/'>
                <p className='mr-auto font-bold text-lg text-gray-500 ml-10'>Dashboard</p>
            </a>
            <hr className='text-gray-300' />
        </>
    )
}
export const LogoutButton = () => {
    const handleLogout = () => {
        localStorage.removeItem('isLoggedIn')
        window.location.reload(true)
    }
    return (
        <>
            <Button variant='outlined' onClick={handleLogout}>Đăng Xuất</Button>
        </>
    )
}
export default function Layout() {
    return (
        <>
            <div className='w-full h-16 grid grid-cols-6 bg-gray-200 z-50'>
                <span className='col-span-1 not-lg:hidden'>
                    <Sidebar />
                </span>
                <span className='col-span-5 not-lg:col-span-6'>
                    <HeaderContent />
                </span>
                <span className='absolute top-4 right-4'>
                    <LogoutButton />
                </span>

            </div>
        </>
    )
}
