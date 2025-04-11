import { Routes, Route } from 'react-router'

import UserProvider from "./providers/UserProvider";
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
import MyRestaurants from './pages/MyRestaurants'
import EditRestaurant from './pages/EditRestaurant'

function App() {

    return (
        <UserProvider>
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
                        <Route path='/my-restaurants' element={<MyRestaurants />} />
                        <Route path='/restaurants/:id/edit' element={<EditRestaurant />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>

                </main>

                <Footer />

            </div>
        </UserProvider>
    )
}

export default App
