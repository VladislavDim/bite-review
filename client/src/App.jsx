import { useState } from 'react'
import { Routes, Route } from 'react-router'

import { UserContext } from './contexts/UserContext'

import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Restaurants from './pages/Restaurants'
import RestaurantDetails from './pages/RestaurantDetails'
import MyProfile from './pages/MyProfile'
import Logout from './pages/Logout'

import './App.css'
import AddRestaurant from './pages/AddRestaurant'
import NotFound from './pages/NotFound'

function App() {

    const [authData, setAuthData] = useState({});

    const userLoginHandler = (resultData) => {
        setAuthData(resultData);
    };

    const userLogoutHandler = () => {
        setAuthData({});
    };

    return (
        <UserContext.Provider value={{ ...authData, userLoginHandler, userLogoutHandler }}>
            <div className="min-h-screen flex flex-col" >

                <Header />

                <main className="flex-1">

                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/restaurants' element={<Restaurants />} />
                        <Route path='/restaurants/:id/details' element={<RestaurantDetails />} />
                        <Route path='/profile' element={<MyProfile />} />
                        <Route path='/logout' element={<Logout />} />
                        <Route path='/add-restaurant' element={<AddRestaurant />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>

                </main>

                <Footer />

            </div>
        </UserContext.Provider>
    )
}

export default App
