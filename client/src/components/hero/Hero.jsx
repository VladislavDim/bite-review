import { Link } from 'react-router';

import './Hero.css';

export default function Hero() {
    const initialRestaurants = [
        {
            id: 1,
            name: "La Tavola",
            rating: 4.9,
            image: "https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg"
        },
        {
            id: 2,
            name: "Green Bowl",
            rating: 4.8,
            image: "https://zavedenia.com/zimages/varna/big/1957/1957DcCEUwHHscolWCGoPhkV8fptzzOhZiTCvvh.jpg"
        },
        {
            id: 3,
            name: "Sushi Go!",
            rating: 4.7,
            image: "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453"
        },
        {
            id: 4,
            name: "Spice Street",
            rating: 4.6,
            image: "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        },
        {
            id: 5,
            name: "The Vegan Spot",
            rating: 4.5,
            image: "https://zavedenia.com/zimages/varna/big/1999/1999VhEeJI4gbc4CpwogCeNfSFCEM7m5WTkRaY6.jpg"
        }
    ];


    return (
        <section className="hero-section text-center text-white py-24">
            <h2 className="text-4xl font-semibold mb-4">Welcome to BiteReview!</h2>
            <p className="text-lg mb-6">Your go-to platform for honest and reliable restaurant reviews.</p>
            <button className="hero-button mb-16">Get Started</button>

            <div className="carousel-flex-wrapper">
                <div className="carousel-items">
                    {[...initialRestaurants, ...initialRestaurants].map((r, index) => (
                        <Link to={`/restaurants/${r.id}`} key={index} className="carousel-card">
                            <img src={r.image} alt={r.name} className="carousel-image" />
                            <div className="carousel-info">
                                <h4>{r.name}</h4>
                                <p>⭐ {r.rating.toFixed(1)}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}