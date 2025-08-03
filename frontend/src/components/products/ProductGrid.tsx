// 1. Define Product interface
interface Product {
  _id: number;
  name: string;
  price: number;
  images: { url: string }[];
}

// 2. Define props interface
interface ProductGridProps {
  products: Product[];
}

// 3. Type the component argument
function ProductGrid({ products }: ProductGridProps) {
  return (
    <div>ProductGrid</div>
  );
}

export default ProductGrid;
