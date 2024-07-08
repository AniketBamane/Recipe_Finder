import AuthLayout from './components/AuthLayout'
import MainLayout from './components/MainLayout'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VerificationPage from './pages/VerificationPage'
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Toaster} from "react-hot-toast"

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
    <Route path="/" element={<HomePage />} />
    {/* <Route path="/profile" element={<Profile />} /> */}
    </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
