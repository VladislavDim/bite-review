import { Routes, Route } from 'react-router'

import UserProvider from './providers/UserProvider'

import AuthGuard from './guards/AuthGuard'
import GuestGuard from './guards/GuestGuard'

import Header from './components/header/Header'
import Footer from './components/footer/Footer'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Logout from './pages/Logout'
import MyProfile from './pages/MyProfile'
import Restaurants from './pages/Restaurants'
import RestaurantDetails from './pages/RestaurantDetails'
import AddRestaurant from './pages/AddRestaurant'
import EditRestaurant from './pages/EditRestaurant'
import MyRestaurants from './pages/MyRestaurants'
import NotFound from './pages/NotFound'
import TopInfoBar from './components/top-info-bar/TopInfoBar'
import About from './pages/About'
import ContactUs from './pages/ContactUs'
import PrivacyPolicy from './pages/PrivacyPolicy'
import LogoutRegistrar from './init/logoutRegister'

import './App.css'


function App() {

  return (
    <UserProvider>
      <LogoutRegistrar />
      <div className="min-h-screen flex flex-col">
        <Header />
        <TopInfoBar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route element={<GuestGuard />}>
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
            </Route>

            <Route path="/restaurants" element={<Restaurants />} />
            <Route path="/restaurants/:id/details" element={<RestaurantDetails />} />

            <Route element={<AuthGuard />}>
              <Route path="/profile" element={<MyProfile />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/add-restaurant" element={<AddRestaurant />} />
              <Route path="/my-restaurants" element={<MyRestaurants />} />
              <Route path="/restaurants/:id/edit" element={<EditRestaurant />} />
            </Route>

            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </UserProvider>
  )
}

export default App
