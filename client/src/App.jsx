import './App.css'
import Features from './components/features/Features'
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
                {/* Footer */}
                <footer className="bg-gray-800 text-white py-6">
                    <div className="container mx-auto text-center">
                        <p>&copy; 2025 BiteReview. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    )
}

export default App
