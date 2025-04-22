import { useState } from "react"
import { RxTriangleDown, RxTriangleRight } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

export const ListButton = () => {
    return (
        <div className={`w-full flex flex-col items-center justify-start `}>
            <div
                className={`h-fit w-full bg-gray-800 text-white text-2xl cursor-pointer hover:text-gray-800 hover:bg-white rounded-lg`} >
                <a className="ml-5 flex items-center" href="/category">
                    <RxTriangleRight />
                    <p>DANH MỤC</p>
                </a>
            </div>
            <div className={`h-fit w-full bg-gray-800 text-white text-2xl cursor-pointer hover:text-gray-800 hover:bg-white rounded-lg`}>
                <a className="ml-5 flex items-center" href="/article">
                    <RxTriangleRight />
                    <p>BÀI BÁO</p>
                </a>
            </div>
        </div>
    )
}
export const AddButton = () => {
    return (
        <div className={`w-full flex flex-col items-center justify-start `}>
            <div
                className={`h-fit w-full bg-gray-800 text-white text-2xl cursor-pointer hover:text-gray-800 hover:bg-white rounded-lg`}>
                <a className="ml-5 flex items-center" href="/add/category">
                    <RxTriangleRight />
                    <p>DANH MỤC</p>
                </a>
            </div>
            <div className={`h-fit w-full bg-gray-800 text-white text-2xl cursor-pointer hover:text-gray-800 hover:bg-white rounded-lg`}>
                <a className="ml-5 flex items-center" href="/add/article">
                    <RxTriangleRight />
                    <p>BÀI BÁO</p>
                </a>
            </div>
        </div>
    )
}
export const LogoutButton = () => {
    const LogoutButton = () => {
        localStorage.removeItem('isLoggedIn')
        window.location.reload(true)
    }
    const isLoggedIn = localStorage.getItem("isLoggedIn") === "true"
    const navigate = useNavigate()
    return (
        <>
            {isLoggedIn ? (
                <div className="w-full flex justify-center">
                    <button onClick={LogoutButton} className={`w-11/12 cursor-pointer border-4 h-12 hover:text-white hover:bg-black font-bold transition-all rounded-lg`}>Logout</button>
                </div>) : (
                <div className="w-full flex justify-center">
                    <button onClick={navigate('/login')} className={`w-11/12 cursor-pointer border h-12 `}>Login</button>
                </div>
            )}
        </>
    )
}
export default function Sidebar() {
    const [list, setList] = useState(false);
    const [add, setAdd] = useState(false);
    const ShowListButton = () => {
        if (list === false) {
            setList(true)
            setAdd(false)
        }
        else {
            setList(false)
        }
    }
    const ShowAddButton = () => {
        if (add === false) {
            setAdd(true)
            setList(false)
        }
        else {
            setAdd(false)
        }
    }
    return (
        <div>
            <hr className='text-gray-300 w-full' />
            <div className={`w-full min-h-screen max-h-screen h-screens bg-gray-100 relative`}>
                <div className="w-full flex flex-col justify-center items-center  my-0.5">
                    <div className={`h-fit w-full bg-black text-white text-2xl cursor-pointer rounded-lg font-bold`} onClick={ShowListButton}>
                        <div className="h-10 flex items-center">
                            <p className="ml-3 text-nowrap whitespace-nowrap">DANH SÁCH</p>
                            <p><RxTriangleDown size={30} /></p>
                        </div>
                    </div>
                    <div className={`${list ? `` : `hidden`} w-full`}>
                        <ListButton />
                    </div>
                </div>
                <div className="w-full flex flex-col justify-center items-center my-0.5">
                    <div className={`h-fit w-full bg-black text-white text-2xl cursor-pointer rounded-lg font-bold`} onClick={ShowAddButton}>
                        <div className="h-10 flex items-center justify-start">
                            <p className="ml-3">THÊM</p>
                            <p><RxTriangleDown size={30} /></p>
                        </div>
                    </div>
                    <div className={`${add ? `` : `hidden`} w-full`}>
                        <AddButton />
                    </div>
                </div>
                <div className="absolute w-full h-full flex justify-center -bottom-151">
                    <LogoutButton />
                </div>
            </div>
        </div>

    )
}
