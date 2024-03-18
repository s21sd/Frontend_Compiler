import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import Header from './components/Header'
import { Home } from './pages/Home'
import Compile from './pages/Compile'
import { Toaster } from 'sonner'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { useEffect } from 'react'
import { useGetUserDetailsQuery } from './redux/api'
import Mycodes from './pages/Mycodes'
import Allcodes from './pages/Allcodes'
import { useDispatch } from 'react-redux'
import { updateCurrentUser, updateIsLoggedIn } from './redux/slices/appSlice'
function App() {
  const { data, error } = useGetUserDetailsQuery();
  const dispatch = useDispatch();
  useEffect(() => {
    if (data) {
      dispatch(updateCurrentUser(data));
      dispatch(updateIsLoggedIn(true));
    }
    else if (error) {
      dispatch(updateCurrentUser({}));
      dispatch(updateIsLoggedIn(false));
    }

  }, [data])


  return (
    <>
      <Toaster position='bottom-right' theme='dark' />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/all-codes' element={<Allcodes />}></Route>
          <Route path='/my-codes' element={<Mycodes />}></Route>
          <Route path='/compile/:urlId?' element={<Compile />}></Route>
        </Routes>
        {/* <h1 className='bg-red-400'>HII</h1> */}
      </ThemeProvider>
    </>
  )
}

export default App
