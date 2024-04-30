import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blog } from './pages/Blog'
import { Toaster } from 'react-hot-toast';
import { Blogs } from './pages/Blogs';
import { Publish } from './pages/Publish';

function App() {

  return (
    <>
      <BrowserRouter>
        <div><Toaster/></div>
        <Routes>
          <Route path="/" element={<div>Hello</div>} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/publish' element={<Publish />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App