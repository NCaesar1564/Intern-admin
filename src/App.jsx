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
import UpdateArticle from './CRUD/Update/Article'
import UpdateCategory from './CRUD/Update/Category'


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
        <Route path="/article" element={<PrivateRoute><ListArticle /></PrivateRoute>}></Route>
        <Route path="/category" element={<PrivateRoute><ListCategory /></PrivateRoute>}></Route>
        {/* ADD */}
        <Route path="/add/article" element={<PrivateRoute><AddArticle /></PrivateRoute>}></Route>
        <Route path="/add/category" element={<PrivateRoute><AddCategory /></PrivateRoute>}></Route>
        {/* UPDATE */}
        <Route path="/category/:id" element={<PrivateRoute><UpdateCategory /></PrivateRoute>}></Route>
        <Route path="/article/:id" element={<PrivateRoute><UpdateArticle /></PrivateRoute>}></Route>
      </Routes>
    </div>
  )
}



export default App
