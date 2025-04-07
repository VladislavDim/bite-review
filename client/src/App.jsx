import './App.css'
import Features from './components/features/Features'
import Footer from './components/footer/Footer'
import Header from './components/header/Header'
import Hero from './components/hero/Hero'

function App({
    user
}) {

    return (
        <>
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f8f8f8' }}>

                <Header />

                <main className="flex-1">

                    <Hero />
                    <Features />

                </main>
                
                <Footer />

            </div>
        </>
    )
}

export default App
