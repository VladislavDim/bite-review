import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { useGetAllRestaurants } from "../../api/restaurantApi";
import { useGetAllReviews } from "../../api/reviewApi";
import { UserContext } from "../../contexts/UserContext";

import "./Hero.css";

const baseUrl = import.meta.env.VITE_APP_SERVER_URL;

export default function Hero() {
    const { restaurants } = useGetAllRestaurants();
    const { _id: userId } = useContext(UserContext);
    const { getAll: getAllReviews } = useGetAllReviews();

    const [ratingsMap, setRatingsMap] = useState({});
    const [hoveredId, setHoveredId] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        async function fetchRatings() {
            try {
                const reviews = await getAllReviews();
                const map = {};

                reviews.forEach((r) => {
                    if (!map[r.restaurantId]) map[r.restaurantId] = [];
                    map[r.restaurantId].push(r.rating);
                });

                const calculatedRatings = {};
                for (const id in map) {
                    const total = map[id].reduce((a, b) => a + b, 0);
                    calculatedRatings[id] = total / map[id].length;
                }

                setRatingsMap(calculatedRatings);
            } catch (err) {
                console.error("Failed to load ratings:", err);
            }
        }

        fetchRatings();
    }, [getAllReviews]);

    const featuredRestaurants = restaurants.slice(0, 5);

    const renderCard = (r) => (
        <div
            key={r._id}
            className="carousel-card fixed-height"
            onMouseEnter={() => {
                setIsPaused(true);
                setHoveredId(r._id);
            }}
            onMouseLeave={() => {
                setIsPaused(false);
                setHoveredId(null);
            }}
        >
            <Link to={`/restaurants/${r._id}/details`}>
                <img
                    src={r.images?.[0] ? `${baseUrl}${r.images[0]}` : "/placeholder.jpg"}
                    alt={r.name}
                    className="carousel-image"
                />
                <div className="carousel-info">
                    <h4 className="text-lg font-semibold">{r.name}</h4>

                    {hoveredId === r._id && (
                        <div className="carousel-hover-details">
                            <p><span className="font-semibold">Location:</span> {r.location}</p>
                            {r.features?.length > 0 && (
                                <p><span className="font-semibold">Features:</span> {r.features.join(" • ")}</p>
                            )}
                        </div>
                    )}

                    <p className="carousel-rating">⭐ {(ratingsMap[r._id] || 0).toFixed(1)}</p>
                </div>
            </Link>
        </div>
    );

    return (
        <section className="hero-section text-center text-white py-24">
            <h2 className="text-4xl font-semibold mb-4">Welcome to BiteReview!</h2>
            <p className="text-lg mb-6">
                Your go-to platform for honest and reliable restaurant reviews.
            </p>

            <Link
                to={userId ? "/restaurants" : "/register"}
                className="hero-button mb-24"
            >
                Get Started
            </Link>

            {featuredRestaurants.length >= 5 ? (
                <div className="carousel-flex-wrapper mt-12">
                    <div className={`carousel-items ${isPaused ? "paused" : ""}`}>
                        {[...featuredRestaurants, ...featuredRestaurants].map(renderCard)}
                    </div>
                </div>
            ) : (
                <div className="flex gap-6 justify-center flex-wrap mt-12">
                    {featuredRestaurants.map(renderCard)}
                </div>
            )}
        </section>
    );
}
