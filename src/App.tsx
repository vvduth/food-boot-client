import './App.css'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './components/auth/RegisterPage'
import LoginPage from './components/auth/LoginPage'
import HomePage from './components/home_menu/HomePage'
import CaterogyPage from './components/home_menu/CaterogyPage'
import MenuPage from './components/home_menu/MenuPage'
import MenuDetailsPage from './components/home_menu/MenuDetailsPage'

function App() {
  

  return (
    <BrowserRouter>
      <Navbar />
      <div className='content'>
        <Routes>
          {/* <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} /> */}
          <Route path='/login' element={<LoginPage  />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/categories' element={<CaterogyPage />} />
          {/* Register page */}
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/menu' element={<MenuPage />} />
          <Route path='/menu/:id' element={<MenuDetailsPage />} />
        </Routes>
      </div>
      <Footer />
    
    </BrowserRouter>
  )
}

export default App
