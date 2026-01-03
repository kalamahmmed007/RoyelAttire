import { useEffect, useState, useRef } from "react";

const Hero = () => {
    const [banners, setBanners] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef(null);

    useEffect(() => {
        const fetchBanners = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/banners`);
                const data = await res.json();
                if (Array.isArray(data)) setBanners(data);
                else throw new Error("Invalid data");
            } catch (err) {
                console.error("Error fetching banners:", err);
                // Fallback dummy banners
                setBanners([
                    {
                        _id: "1",
                        image: "/banners/cover.png",
                        title: "MageGee",
                        subtitle: "Tri-Mode Mechanical Keyboard",
                        link: "/products",
                    },
                    {
                        _id: "2",
                        image: "/banners/cover2.png",
                        title: "RGB Gaming Gear",
                        subtitle: "Level up your setup",
                        link: "/products",
                    },
                ]);
            }
        };
        fetchBanners();
    }, []);

    // Swipe support for mobile
    const startX = useRef(0);

    const handleTouchStart = (e) => {
        startX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = (e) => {
        const endX = e.changedTouches[0].clientX;
        if (endX - startX.current > 50) prevSlide();
        else if (startX.current - endX > 50) nextSlide();
    };

    const prevSlide = () =>
        setCurrentIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
    const nextSlide = () =>
        setCurrentIndex((prev) => (prev === banners.length - 1 ? 0 : prev + 1));

    if (!banners.length) return null;

    return (
        <div
            ref={sliderRef}
            className="relative h-[250px] w-full overflow-hidden sm:h-[300px] md:h-[500px] lg:h-[600px] xl:h-[700px]"
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {banners.map((banner, index) => (
                <div
                    key={banner._id}
                    className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${index === currentIndex ? "translate-x-0" : "translate-x-full"
                        }`}
                >
                    <img
                        src={banner.image}
                        alt={banner.title || "Banner"}
                        className="h-full w-full object-cover"
                    />
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 transform sm:left-8 md:left-16 lg:left-32">
                        <h1 className="text-xl font-bold text-red-600 sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl">
                            {banner.title}
                        </h1>
                        <p className="mt-1 text-sm text-black sm:mt-2 sm:text-base md:text-lg lg:text-2xl">
                            {banner.subtitle}
                        </p>
                        {banner.link && (
                            <a
                                href={banner.link}
                                className="mt-2 inline-block rounded bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-700 sm:mt-3 sm:px-5 sm:py-3 sm:text-base md:text-lg"
                            >
                                Shop Now
                            </a>
                        )}
                    </div>
                </div>
            ))}

            {/* Navigation dots */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {banners.map((_, i) => (
                    <span
                        key={i}
                        className={`h-2 w-2 rounded-full ${i === currentIndex ? "bg-red-600" : "bg-gray-300"
                            }`}
                        onClick={() => setCurrentIndex(i)}
                    ></span>
                ))}
            </div>
        </div>
    );
};

export default Hero;
