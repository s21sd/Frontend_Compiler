import { Route, Routes } from 'react-router-dom'
import './App.css'
import { ThemeProvider } from "@/components/theme-provider"
import Header from './components/Header'
import { Home } from './pages/Home'
import Compile from './pages/Compile'
import { Toaster } from 'sonner'
function App() {


  return (
    <>
      <Toaster position='bottom-right' theme='dark' />
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">

        <Header />
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/compile' element={<Compile />}></Route>
          <Route path='/compile/:urlId' element={<Compile />}></Route>
        </Routes>
        {/* <h1 className='bg-red-400'>HII</h1> */}
      </ThemeProvider>
    </>
  )
}

export default App
