import { Routes, Route } from 'react-router'

import './App.css'

import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Restaurants from './pages/Restaurants'
import RestaurantDetails from './pages/RestaurantDetails'


function App() {

    return (
        <>
            <div className="min-h-screen flex flex-col" >

                <Header />

                <main className="flex-1">

                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/restaurants' element={<Restaurants />} />
                        <Route path='/restaurants/:id' element={<RestaurantDetails />} />
                    </Routes>

                </main>

                <Footer />

            </div>
        </>
    )
}

export default App
