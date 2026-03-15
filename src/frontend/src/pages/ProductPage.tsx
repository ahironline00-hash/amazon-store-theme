import { Button } from "@/components/ui/button";
import { Link, useParams } from "@tanstack/react-router";
import { Check, Truck } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { ProductCard } from "../components/ProductCard";
import { StarRating } from "../components/StarRating";
import { useShop } from "../context/ShopContext";

export function ProductPage() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const { products, addToCart } = useShop();
  const product = products.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const [selectedImg, setSelectedImg] = useState(0);

  if (!product) {
    return (
      <main className="max-w-[1200px] mx-auto px-4 py-10 text-center">
        <h2 className="text-xl font-bold">Product not found</h2>
        <Link
          to="/"
          className="text-amazon-link-blue hover:underline mt-4 block"
        >
          &larr; Back to Home
        </Link>
      </main>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const thumbSeeds = [
    product.id,
    `${product.id}a`,
    `${product.id}b`,
    `${product.id}c`,
  ];
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <main className="bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <nav className="text-sm text-amazon-link-blue mb-4 flex items-center gap-1">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <span className="text-muted-foreground">&rsaquo;</span>
          <a
            href={`/search?q=&cat=${encodeURIComponent(product.category)}`}
            className="hover:underline"
          >
            {product.category}
          </a>
          <span className="text-muted-foreground">&rsaquo;</span>
          <span className="text-foreground line-clamp-1">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <div className="flex gap-3">
              <div className="flex flex-col gap-2">
                {thumbSeeds.map((seed, i) => (
                  <button
                    type="button"
                    key={seed}
                    onClick={() => setSelectedImg(i)}
                    className={`w-14 h-14 border-2 rounded overflow-hidden ${
                      selectedImg === i
                        ? "border-amazon-orange"
                        : "border-border"
                    }`}
                  >
                    <img
                      src={`https://picsum.photos/seed/${seed}/100/100`}
                      alt={`View ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
              <div className="flex-1 aspect-square bg-amazon-light-bg rounded overflow-hidden">
                <img
                  src={`https://picsum.photos/seed/${thumbSeeds[selectedImg]}/500/500`}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="md:col-span-1">
            <h1 className="font-display text-xl font-bold text-foreground mb-2 leading-snug">
              {product.title}
            </h1>
            <div className="flex items-center gap-3 mb-3">
              <StarRating
                rating={product.rating}
                reviewCount={product.reviewCount}
              />
            </div>
            <div className="border-t border-border pt-3 mb-3">
              {product.originalPrice && (
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-sm text-muted-foreground">
                    List price:{" "}
                    <span className="line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  </span>
                </div>
              )}
              <div className="flex items-baseline gap-2">
                {discount > 0 && (
                  <span className="bg-amazon-deal-red text-white text-xs px-2 py-0.5 rounded">
                    -{discount}%
                  </span>
                )}
                <span className="text-3xl font-bold text-foreground">
                  ${product.price.toFixed(2)}
                </span>
              </div>
              {product.isPrime && (
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-amazon-prime-blue font-bold text-sm">
                    prime
                  </span>
                  <span className="text-sm text-muted-foreground">
                    FREE Delivery
                  </span>
                </div>
              )}
            </div>

            <div className="mb-4">
              <h3 className="font-semibold text-base mb-2">About this item</h3>
              <ul className="space-y-1">
                {product.bullets.map((bullet) => (
                  <li
                    key={bullet}
                    className="text-sm text-foreground flex gap-2"
                  >
                    <span className="text-amazon-orange mt-0.5 flex-shrink-0">
                      &bull;
                    </span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="md:col-span-1">
            <div className="border border-border rounded p-4 shadow-card">
              <div className="text-2xl font-bold mb-1">
                ${product.price.toFixed(2)}
              </div>
              {product.isPrime && (
                <div className="flex items-center gap-1 mb-2">
                  <Truck className="w-4 h-4 text-amazon-prime-blue" />
                  <span className="text-sm text-amazon-prime-blue">
                    FREE Prime Delivery
                  </span>
                </div>
              )}
              <div className="mb-3">
                {product.inStock ? (
                  <span className="text-green-600 font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    In Stock
                  </span>
                ) : (
                  <span className="text-red-500 font-medium">Out of Stock</span>
                )}
              </div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center border border-border rounded">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="px-3 py-1 hover:bg-muted text-lg"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    &minus;
                  </button>
                  <span className="px-4 py-1 text-sm font-medium">{qty}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="px-3 py-1 hover:bg-muted text-lg"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  className="w-full bg-amazon-yellow hover:bg-amazon-yellow-hover text-foreground font-semibold rounded-full border border-amber-400"
                  disabled={!product.inStock}
                  onClick={() => {
                    addToCart(product, qty);
                    toast.success(`Added ${qty} item(s) to cart`);
                  }}
                  data-ocid="product.add_to_cart_button"
                >
                  Add to Cart
                </Button>
                <Button
                  className="w-full bg-amazon-orange hover:bg-amazon-orange-hover text-foreground font-semibold rounded-full border border-orange-500"
                  disabled={!product.inStock}
                  onClick={() => {
                    addToCart(product, qty);
                    toast.success("Proceeding to checkout...");
                  }}
                  data-ocid="product.buy_now_button"
                >
                  Buy Now
                </Button>
              </div>

              <div className="mt-4 text-xs text-muted-foreground space-y-1">
                <div>Ships from: ShopNow</div>
                <div>Sold by: ShopNow Direct</div>
                {product.isPrime && (
                  <div className="text-amazon-prime-blue">
                    Eligible for Prime
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6">
          <h2 className="font-display text-xl font-bold mb-3">
            Product Description
          </h2>
          <p className="text-foreground leading-relaxed">
            {product.description}
          </p>
        </div>

        {related.length > 0 && (
          <section className="mt-8 border-t border-border pt-6">
            <h2 className="font-display text-xl font-bold mb-4">
              Customers Also Viewed
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i + 1} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
