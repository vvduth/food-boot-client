import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/common/Navbar'
import Footer from './components/common/Footer'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import RegisterPage from './components/auth/RegisterPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar />
      <div className='content'>
        <Routes>
          {/* <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/contact' element={<Contact />} /> */}
          <Route path='/register' element={<RegisterPage />} />
        </Routes>
      </div>
      <Footer />
    
    </BrowserRouter>
  )
}

export default App
