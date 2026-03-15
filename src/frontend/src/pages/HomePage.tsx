import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useShop } from "../context/ShopContext";
import { CATEGORIES } from "../data/products";

const BANNERS = [
  {
    img: "/assets/generated/hero-banner-1.dim_1200x400.jpg",
    title: "Shop the Season's Best Deals",
    subtitle: "Up to 60% off across all categories",
    cta: "Shop Now",
    link: "/deals" as const,
  },
  {
    img: "/assets/generated/hero-banner-2.dim_1200x400.jpg",
    title: "Electronics Sale",
    subtitle: "Premium tech at unbeatable prices",
    cta: "Shop Electronics",
    link: "/search" as const,
  },
  {
    img: "/assets/generated/hero-banner-3.dim_1200x400.jpg",
    title: "New Arrivals \u2014 Fall Collection",
    subtitle: "Fresh styles for the new season",
    cta: "Shop Clothing",
    link: "/search" as const,
  },
];

const CATEGORY_ICONS: Record<string, string> = {
  Electronics: "\uD83D\uDCBB",
  Books: "\uD83D\uDCDA",
  Clothing: "\uD83D\uDC55",
  "Home & Kitchen": "\uD83C\uDFE0",
  Sports: "\u26BD",
  Beauty: "\u2728",
};

export function HomePage() {
  const { products } = useShop();
  const [bannerIdx, setBannerIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setBannerIdx((i) => (i + 1) % BANNERS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const deals = products.filter((p) => p.isOnDeal).slice(0, 8);
  const electronics = products.filter((p) => p.category === "Electronics");
  const recommended = products.slice(0, 8);

  return (
    <main>
      {/* Hero Banner Carousel */}
      <section className="relative overflow-hidden bg-amazon-light-bg">
        <div className="relative max-w-[1500px] mx-auto">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${bannerIdx * 100}%)` }}
          >
            {BANNERS.map((banner) => (
              <div
                key={banner.title}
                className="relative min-w-full h-64 md:h-96 overflow-hidden"
              >
                <img
                  src={banner.img}
                  alt={banner.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/20 to-transparent flex items-center">
                  <div className="pl-10 md:pl-20">
                    <h2 className="text-white font-display text-2xl md:text-4xl font-bold mb-2">
                      {banner.title}
                    </h2>
                    <p className="text-gray-200 text-sm md:text-lg mb-4">
                      {banner.subtitle}
                    </p>
                    <Link
                      to={banner.link}
                      className="bg-amazon-orange hover:bg-amazon-orange-hover text-gray-900 font-semibold px-6 py-2 rounded-sm text-sm md:text-base"
                    >
                      {banner.cta}
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            type="button"
            aria-label="Previous slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
            onClick={() =>
              setBannerIdx((i) => (i - 1 + BANNERS.length) % BANNERS.length)
            }
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md z-10"
            onClick={() => setBannerIdx((i) => (i + 1) % BANNERS.length)}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {BANNERS.map((banner, i) => (
              <button
                key={banner.title}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                className={`w-2 h-2 rounded-full transition-colors ${
                  i === bannerIdx ? "bg-amazon-orange" : "bg-white/60"
                }`}
                onClick={() => setBannerIdx(i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Category */}
      <section className="bg-white py-6">
        <div className="max-w-[1500px] mx-auto px-4">
          <h2 className="font-display text-xl font-bold text-foreground mb-4">
            Shop by Category
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
            {CATEGORIES.map((cat) => (
              <a
                key={cat}
                href={`/search?q=&cat=${encodeURIComponent(cat)}`}
                className="flex flex-col items-center gap-2 p-4 bg-amazon-light-bg hover:bg-gray-200 rounded-sm transition-colors group"
              >
                <span className="text-3xl">{CATEGORY_ICONS[cat]}</span>
                <span className="text-sm font-medium text-center text-foreground group-hover:text-amazon-link-blue">
                  {cat}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Today's Deals */}
      <section className="bg-amazon-light-bg py-6">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              Today&#39;s Deals
            </h2>
            <Link
              to="/deals"
              className="text-amazon-link-blue hover:text-amazon-orange text-sm font-medium"
            >
              See all deals &rarr;
            </Link>
          </div>
          <div className="scroll-row flex gap-3 pb-2">
            {deals.map((product, i) => (
              <div key={product.id} className="flex-shrink-0 w-52">
                <ProductCard product={product} index={i + 1} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers in Electronics */}
      <section className="bg-white py-6">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              Best Sellers in Electronics
            </h2>
            <a
              href="/search?q=&cat=Electronics"
              className="text-amazon-link-blue hover:text-amazon-orange text-sm font-medium"
            >
              See more &rarr;
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {electronics.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      {/* Recommended for You */}
      <section className="bg-amazon-light-bg py-6">
        <div className="max-w-[1500px] mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-display text-xl font-bold text-foreground">
              Recommended for You
            </h2>
            <a
              href="/search?q="
              className="text-amazon-link-blue hover:text-amazon-orange text-sm font-medium"
            >
              See more &rarr;
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {recommended.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i + 1} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
