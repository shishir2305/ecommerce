import React, { useEffect } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/products/FilterSidebar";
import ProductGrid from "../components/products/ProductGrid";
import SortOptions from "../components/products/SortOptions";

interface ProductImage {
  url: string;
  altText?: string;
}

interface Product {
  _id: number;
  name: string;
  price: number;
  images: ProductImage[];
}

const placeholderProducts: Product[] = [
  {
    _id: 1,
    name: "Product 1",
    price: 100,
    images: [{ url: "https://picsum.photos/500/500?random=14" }],
  },
  {
    _id: 2,
    name: "Product 2",
    price: 120,
    images: [{ url: "https://picsum.photos/500/500?random=25" }],
  },
  {
    _id: 3,
    name: "Product 3",
    price: 150,
    images: [{ url: "https://picsum.photos/500/500?random=38" }],
  },
  {
    _id: 4,
    name: "Product 4",
    price: 180,
    images: [{ url: "https://picsum.photos/500/500?random=44" }],
  },
  {
    _id: 5,
    name: "Product 5",
    price: 200,
    images: [{ url: "https://picsum.photos/500/500?random=50" }],
  },
  {
    _id: 6,
    name: "Product 6",
    price: 220,
    images: [{ url: "https://picsum.photos/500/500?random=60" }],
  },
  {
    _id: 7,
    name: "Product 7",
    price: 250,
    images: [{ url: "https://picsum.photos/500/500?random=70" }],
  },
  {
    _id: 8,
    name: "Product 8",
    price: 300,
    images: [{ url: "https://picsum.photos/500/500?random=80" }],
  },
];

function CollectionPage() {
  const sidebarRef = React.useRef<HTMLDivElement>(null);
  const [products, setProducts] = React.useState<Product[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  useEffect(() => {
    // add event listener for clicks outside the sidebar
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  useEffect(() => {
    // Simulate fetching products from an API
    setTimeout(() => {
      setProducts(placeholderProducts);
    }, 1000);
  }, []);

  // Function to toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsSidebarOpen(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row">
      {/* Mobile filter button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden border p-2 flex justify-center items-center"
      >
        <FaFilter className="mr-2" /> Filters
      </button>

      {/* Filter sidebar */}
      <div
        ref={sidebarRef}
        className={`${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
      >
        <FilterSidebar />
      </div>

      <div className="flex-grow p-4">
        <h2 className="text-2xl uppercase mb-4">All Collection</h2>

        {/* Sort Options */}
        <SortOptions />

        {/* Product Grid */}
        <ProductGrid products={products} />
      </div>
    </div>
  );
}

export default CollectionPage;
