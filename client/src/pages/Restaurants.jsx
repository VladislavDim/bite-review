import { useState } from "react";
import RestaurantCard from "../components/restaurant-card/RestaurantCard";
import ScrollToTop from "../components/ui/ScrollToTop";

const allRestaurants = [
    {
        _id:"asdas213123as123",
        name: "Pizza Palace",
        rating: 4.5,
        address: "123 Main St, Sofia",
        images: [
            "https://upload.wikimedia.org/wikipedia/commons/6/62/Barbieri_-_ViaSophia25668.jpg",
            "https://zavedenia.com/zimages/varna/big/1957/1957DcCEUwHHscolWCGoPhkV8fptzzOhZiTCvvh.jpg",
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    },
    {
        _id:"asdas213123as123",
        name: "Sushi Time",
        rating: 4.8,
        address: "456 Ocean Dr, Varna",
        images: [
            "https://rezzo.bg/files/images/31489/DSC_2863_fit_431_304.jpg?ver=1700655453",
            "https://lesroches.edu/wp-content/uploads/2022/08/Restaurant_business_plan_main.jpg"
        ]
    }

];


export default function Restaurants() {
    const ITEMS_PER_LOAD = 10;
    const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);

    const visibleRestaurants = allRestaurants.slice(0, visibleCount);

    const handleLoadMore = () => {
        setVisibleCount(prev => prev + ITEMS_PER_LOAD);
    };

    return (
        <section className="min-h-screen bg-[#f8f8f8] px-4 py-6">
            <h2 className="text-3xl font-bold text-center mb-6 text-[#E9762B]">Restaurants</h2>

            <div
                className="grid gap-6 justify-center"
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
                }}
            >
                {visibleRestaurants.map((restaurant, index) => (
                    <RestaurantCard key={index} {...restaurant} />
                ))}
            </div>

            {visibleCount < allRestaurants.length && (
                <div
                    className="flex flex-col items-center mt-10 group cursor-pointer"
                    onClick={handleLoadMore}
                >
                    <span className="mb-1 text-[#E9762B] font-medium text-lg group-hover:scale-105 transition">
                        Load more
                    </span>

                    <div className="w-12 h-0.5 bg-[#E9762B] group-hover:w-36 transition-all duration-300"></div>
                </div>
            )}
            <ScrollToTop />
        </section>
    );
}
