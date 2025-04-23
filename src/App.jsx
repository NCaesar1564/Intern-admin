import { Route, Routes } from "react-router-dom"
//Header  + Home
import Home from './Home'
import Layout from "./components/Layout"
//LIST
import ListArticle from './CRUD/Read/Article'
import ListCategory from './CRUD/Read/Category'
//ADD
import AddArticle from "./CRUD/Create/Article"
import AddCategory from './CRUD/Create/Category'
//UPDATE
import UpdateArticle from './CRUD/update/UpdateArticle'
import UpdateCategory from './CRUD/update/UpdateCategory'


//AUTH
import Login from './auth/login/LoginPage'
import PrivateRoute from './auth/PrivateRoute'

function App() {
  return (
    <div className="overflow-hidden">
      <Layout />
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
    </div>
  )
}



export default App
