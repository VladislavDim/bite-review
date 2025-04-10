import { Link } from 'react-router';
import './Features.css';

export default function Features() {
    return (
        <section id="features" className="features-section">
            <h3>Explore BiteReview</h3>
            <div className="features-grid">
                <Link to="/restaurants" className="feature-card">
                    <h4>Discover Restaurants</h4>
                    <p>Browse through a variety of restaurants, explore their menus, and read customer reviews.</p>
                </Link>
                <Link to="/add-restaurant" className="feature-card">
                    <h4>Share Your Place</h4>
                    <p>Own a restaurant? Add it to our platform and let the world know what you offer.</p>
                </Link>
                <Link to="/my-restaurants" className="feature-card">
                    <h4>My Restaurants</h4>
                    <p>Manage your added restaurants, track ratings, and see which users engage the most.</p>
                </Link>
            </div>
        </section>
    );
}
