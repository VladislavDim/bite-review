import './App.css'
import Header from './components/header/Header'

function App({
    user
}) {

    return (
        <>
            <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#f8f8f8' }}>
                {/* Header */}
                <Header />
                <main className="flex-1">
                    {/* Hero Section */}
                    <section className="bg-[#E9762B] py-20 text-center text-white">
                        <h2 className="text-4xl font-semibold mb-4">Welcome to BiteReview!</h2>
                        <p className="text-lg mb-6">Your go-to platform for honest and reliable restaurant reviews.</p>
                        <button className="bg-gray-800 text-white px-6 py-3 rounded-full hover:bg-[#41644A] transition-colors">Get Started</button>
                    </section>

                    {/* Features Section */}
                    <section id="features" className="py-16 bg-white">
                        <div className="container mx-auto text-center">
                            <h3 className="text-3xl font-semibold mb-8 text-gray-800">Features</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                <div className="p-6 bg-gray-50 rounded-lg shadow-lg transition-shadow hover:shadow-2xl">
                                    <h4 className="text-xl font-semibold mb-4 text-[#41644A]">Honest Reviews</h4>
                                    <p>Read genuine feedback from real customers and make informed decisions about where to eat.</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-lg shadow-lg transition-shadow hover:shadow-2xl">
                                    <h4 className="text-xl font-semibold mb-4 text-[#41644A]">Easy-to-Use</h4>
                                    <p>Submit your reviews easily and quickly with our user-friendly interface.</p>
                                </div>
                                <div className="p-6 bg-gray-50 rounded-lg shadow-lg transition-shadow hover:shadow-2xl">
                                    <h4 className="text-xl font-semibold mb-4 text-[#41644A]">Ranking System</h4>
                                    <p>Earn rewards and higher ranking as you contribute more valuable reviews.</p>
                                </div>
                            </div>
                        </div>
                    </section>
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
