import AuthLayout from './components/AuthLayout'
import MainLayout from './components/MainLayout'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VerificationPage from './pages/VerificationPage'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Homepage from './pages/HomePage'
import Favorites from './pages/Favourites'
import RecipePage from './pages/RecipePage'
import Logout from './pages/Logout'
import NotFound from './pages/NotFound'

function App() {
  return (
    <BrowserRouter>
     <Toaster position="top-right" reverseOrder={false} />
    <Routes>
    <Route element={<AuthLayout />} >
    <Route path="/signin" element={<LoginPage />} />
    <Route path="/signup" element={<SignupPage />} />
    <Route path="/verification" element={<VerificationPage />} />
    </Route>
    
    <Route element={<MainLayout/>}>
    <Route path="/" element={<Homepage />} />
    <Route path='/logout' element={<Logout />} />
    <Route path='/favourites' element={<Favorites />} />
    <Route path="/recipe/:id" element={<RecipePage />} />
    </Route>
    <Route path='*' element={<NotFound />} />
    </Routes>
    </BrowserRouter>
  )
}

export default App
