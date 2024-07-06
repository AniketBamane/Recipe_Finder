import AuthLayout from './components/AuthLayout'
import MainLayout from './components/MainLayout'
import LoginPage from './pages/LoginPage'
import VerificationPage from './pages/VerificationPage'
import {BrowserRouter, Route, Routes} from "react-router-dom"

function App() {
  return (
    <BrowserRouter>
    <Routes>
    <Route element={<AuthLayout />} >
    <Route path="/signin" element={<LoginPage />} />
    {/* <Route path="/signup" element={<SignUp />} /> */}
    <Route path="/verification" element={<VerificationPage />} />
    </Route>
    
    <Route element={<MainLayout/>}>
    {/* <Route path="/home" element={<Home />} />
    <Route path="/profile" element={<Profile />} /> */}
    </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
