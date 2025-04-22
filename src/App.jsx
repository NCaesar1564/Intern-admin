import { Route, Routes } from "react-router-dom"
//Header  + Home
import Home from './Home'
import Header from "./components/Header"
//LIST
import ListArticle from './CRUD/list/ListArticle'
import ListCategory from './CRUD/list/ListCategory'
//ADD
import AddArticle from "./CRUD/add/AddArticle"
import AddCategory from './CRUD/add/AddCategory'
//UPDATE
import UpdateArticle from './CRUD/update/UpdateArticle'
import UpdateCategory from './CRUD/update/UpdateCategory'


//AUTH
import Login from './auth/login/LoginPage'
import PrivateRoute from './auth/PrivateRoute'

function App() {
  return (
    <>
      <Header />
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />}></Route>

        {/* Home */}
        <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>}></Route>
        {/* LIST */}
        <Route path="/article" element={<ListArticle />}></Route>
        <Route path="/category" element={<ListCategory />}></Route>
        {/* ADD */}
        <Route path="/add/article" element={<AddArticle />}></Route>
        <Route path="/add/category" element={<AddCategory />}></Route>
        {/* UPDATE */}
        <Route path="/category/:id" element={<UpdateCategory />}></Route>
        <Route path="/article/:id" element={<UpdateArticle />}></Route>


      </Routes>
    </>
  )
}



export default App
