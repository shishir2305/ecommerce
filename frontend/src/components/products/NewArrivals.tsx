import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";

function NewArrivals() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const newArrivals = [
    {
      _id: "1",
      name: "Stylish Jacket",
      price: 120,
      images: [
        {
          url: "https://picsum.photos/500/500?random=1",
          altText: "Stylish Jacket",
        },
      ],
    },
    {
      _id: "2",
      name: "Casual Sneakers",
      price: 80,
      images: [
        {
          url: "https://picsum.photos/500/500?random=2",
          altText: "Casual Sneakers",
        },
      ],
    },
    {
      _id: "3",
      name: "Elegant Dress",
      price: 150,
      images: [
        {
          url: "https://picsum.photos/500/500?random=3",
          altText: "Elegant Dress",
        },
      ],
    },
    {
      _id: "4",
      name: "Classic Watch",
      price: 200,
      images: [
        {
          url: "https://picsum.photos/500/500?random=4",
          altText: "Classic Watch",
        },
      ],
    },
    {
      _id: "5",
      name: "Trendy Backpack",
      price: 60,
      images: [
        {
          url: "https://picsum.photos/500/500?random=5",
          altText: "Trendy Backpack",
        },
      ],
    },
    {
      _id: "6",
      name: "Sporty Sunglasses",
      price: 50,
      images: [
        {
          url: "https://picsum.photos/500/500?random=6",
          altText: "Sporty Sunglasses",
        },
      ],
    },
    {
      _id: "7",
      name: "Leather Wallet",
      price: 40,
      images: [
        {
          url: "https://picsum.photos/500/500?random=7",
          altText: "Leather Wallet",
        },
      ],
    },
    {
      _id: "8",
      name: "Wool Scarf",
      price: 30,
      images: [
        {
          url: "https://picsum.photos/500/500?random=8",
          altText: "Wool Scarf",
        },
      ],
    },
    {
      _id: "9",
      name: "Running Shoes",
      price: 90,
      images: [
        {
          url: "https://picsum.photos/500/500?random=9",
          altText: "Running Shoes",
        },
      ],
    },
    {
      _id: "10",
      name: "Denim Jeans",
      price: 70,
      images: [
        {
          url: "https://picsum.photos/500/500?random=10",
          altText: "Denim Jeans",
        },
      ],
    },
  ];

  // Function to update the state and appearance of scroll buttons
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (container) {
      const leftScroll = container.scrollLeft;
      const rightScrollable =
        container.scrollWidth > leftScroll + container.clientWidth;

      setCanScrollLeft(leftScroll > 0);
      setCanScrollRight(rightScrollable);
    }
  };

  // Function to enable scrolling of the items
  const scroll = (direction: string) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    const container = scrollRef.current;
    if (container) {
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Function for mouse down event
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log("mouse move");
  };

  const handleMouseUpOrLeave = () => {
    console.log("handle mouse up or leave");
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", updateScrollButtons);
    }
  }, []);

  return (
    <section>
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore new arrivals</h2>
        <p className="text-lg text-gray-600 mb-8">
          Discover the latest styles straight off the runway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll Buttons */}
        <div className="absolute right-2 bottom-[-30px] flex space-x-2">
          <button
            onClick={() => scroll("left")}
            className={`p-2 rounded border ${
              canScrollLeft
                ? "bg-white text-black cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!canScrollLeft}
          >
            <FiChevronLeft className="text-2xl" />
          </button>
          <button
            onClick={() => scroll("right")}
            className={`p-2 rounded border ${
              canScrollRight
                ? "bg-white text-black cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
            disabled={!canScrollRight}
          >
            <FiChevronRight className="text-2xl" />
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div
        ref={scrollRef}
        className="container mx-auto overflow-x-scroll flex space-x-6 relative"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative"
          >
            <img
              src={product.images[0]?.url}
              alt={product.images[0]?.altText || product.name}
              className="w-full h-[500px] object-cover rounded-lg"
            />
            <div className="absolute bottom-0 left-0 right-0 opacity-50 backdrop-blur-md text-white p-4 rounded-b-lg">
              <Link to={`/product/${product._id}`}>
                <h4 className="font-medium">{product.name}</h4>
                <p className="mt-1">${product.price}</p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default NewArrivals;
