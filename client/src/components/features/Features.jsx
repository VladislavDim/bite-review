import './Features.css';

export default function Features() {

    return (

        <section id="features" className="features-section">
            <h3>Features</h3>
            <div className="features-grid">
                <div className="feature-card">
                    <h4>Honest Reviews</h4>
                    <p>Read genuine feedback from real customers and make informed decisions about where to eat.</p>
                </div>
                <div className="feature-card">
                    <h4>Easy-to-Use</h4>
                    <p>Submit your reviews easily and quickly with our user-friendly interface.</p>
                </div>
                <div className="feature-card">
                    <h4>Ranking System</h4>
                    <p>Earn rewards and higher ranking as you contribute more valuable reviews.</p>
                </div>
            </div>
        </section>

    );
}