
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Auth from './components/auth'
import Dashboard from './components/dashboard'
import { Toaster } from 'react-hot-toast'
import Spinner from './components/ui/spinner'
import { useLoading } from './hooks/use-loader'
import { AnimatePresence } from 'framer-motion'
import NewEntry from './components/new-entry'
import UserSettings from './components/user-settings'
import LoadingPage from './components/ui/loading-page'
import ChatRoom from './components/chat-room'
import { useEffect, useState } from 'react'




function App() {

  const {spinner, loadingPage} = useLoading();
  const [wdth, setWdth] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => {
      setWdth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


if(wdth < 1200) {
  return(
    <div className='bg-[#924e4e] h-screen flex justify-center items-center'>
      <h1 className=' font-extrabold text-white'>Small screens not supported yet</h1>
    </div>
  )
}

  return (
    <div className='h-screen relative'>
      <Toaster/>
      <AnimatePresence>
      {loadingPage && <LoadingPage/>}
      {spinner && <AnimatePresence><Spinner/></AnimatePresence>}
      </AnimatePresence>
      <Router>
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/newEntry' element={<NewEntry/>}/>
        <Route path='/account' element={<UserSettings/>}/>
        <Route path='/chatroom' element={<ChatRoom/>}/>
      </Routes>
      </Router>
    </div>
  )
}

export default App
