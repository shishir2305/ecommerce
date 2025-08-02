import { Link } from "react-router-dom";
import heroImage from "../../assets/rabbit-hero.webp";

function Hero() {
  return (
    <section className="relative">
      <img
        src={heroImage}
        alt="Hero"
        className="w-full h-[400px] md:h-[600px] lg:h-[700px] object-cover"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center text-white p-6">
          <h1 className="text-4xl md:text-9xl font-bold tracking-lighter uppercase mb-4">
            Vacation <br /> Ready
          </h1>

          <p className="text-sm tracking-tighter md:text-lg mb-6">
            Explore our vacation ready outfits with fast worldwide shipping
          </p>

          <Link
            to="/shop"
            className="inline-block bg-white text-black py-2 px-4 rounded-lg"
          >
            Shop Now
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
