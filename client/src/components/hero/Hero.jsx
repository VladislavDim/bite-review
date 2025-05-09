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
                    if (!map[r.restaurant]) map[r.restaurant] = [];
                    map[r.restaurant].push(r.rating);
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

    const renderCard = (r, index) => {
        const imageUrl = r.images?.[0]
            ? `${baseUrl}${r.images[0]}`
            : `${baseUrl}/public/no-image-available.png`;
        const isDefaultImage = imageUrl.includes("no-image-available");

        const locationDisplay =
            r.location?.length > 40 ? r.location.slice(0, 40) + "..." : r.location;

        const featuresDisplay = r.features?.join(" • ");
        const featuresDisplayTruncated =
            featuresDisplay?.length > 50
                ? featuresDisplay.slice(0, 50) + "..."
                : featuresDisplay;

        return (
            <div
                key={`${r._id}-${index}`}
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
                    <div
                        className="image-wrapper"
                        style={{
                            backgroundColor: isDefaultImage ? "#d57133" : "transparent",
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt={r.name}
                            className={isDefaultImage ? "default-image" : "carousel-image"}
                        />
                    </div>
                    <div className="carousel-info">
                        <h4 className="text-lg font-semibold">{r.name}</h4>

                        {hoveredId === r._id && (
                            <div className="carousel-hover-details">
                                {r.location && (
                                    <p>
                                        <span className="font-semibold">Location:</span>{" "}
                                        {locationDisplay}
                                    </p>
                                )}
                                {featuresDisplayTruncated && (
                                    <p>
                                        <span className="font-semibold">Features:</span>{" "}
                                        {featuresDisplayTruncated}
                                    </p>
                                )}
                            </div>
                        )}

                        <p className="carousel-rating">
                            ⭐ {(ratingsMap[r._id] || 0).toFixed(1)}
                        </p>
                    </div>
                </Link>
            </div>
        );
    };

    return (
        <section className="hero-section text-center text-white py-24">
            <h2 className="text-4xl font-semibold mb-4">Welcome to BiteReview!</h2>
            <p className="text-lg mb-6">
                Your go-to platform for honest and reliable restaurant reviews.
            </p>

            <Link
                to={userId ? "/restaurants" : "/register"}
                className="hero-button"
            >
                Get Started
            </Link>

            {featuredRestaurants.length >= 5 ? (
                <div className="carousel-flex-wrapper mt-6">
                    <div className={`carousel-items ${isPaused ? "paused" : ""}`}>
                        {[...featuredRestaurants, ...featuredRestaurants].map((r, index) =>
                            renderCard(r, index)
                        )}
                    </div>
                </div>
            ) : (
                <div className="carousel-center-wrapper mt-6">
                    {featuredRestaurants.map((r, index) => renderCard(r, index))}
                </div>
            )}
        </section>
    );
}
