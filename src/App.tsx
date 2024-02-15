
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import './App.css'
import Auth from './components/auth'
import Dashboard from './components/dashboard'
import { Toaster } from 'react-hot-toast'
import Spinner from './components/ui/spinner'
import { useSpinner } from './hooks/use-spinner'
import { AnimatePresence } from 'framer-motion'
import NewEntry from './components/new-entry'
import UserSettings from './components/user-settings'



function App() {

  const {spinnerLoading} = useSpinner();


  return (
    <div className='h-screen relative'>
      <Toaster/>
      <AnimatePresence>
      {spinnerLoading && <Spinner/>}
      </AnimatePresence>
      <Router>
      <Routes>
        <Route path='/' element={<Auth/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/newEntry' element={<NewEntry/>}/>
        <Route path='/account' element={<UserSettings/>}/>
      </Routes>
      </Router>
    </div>
  )
}

export default App
