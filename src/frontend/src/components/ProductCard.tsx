import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import { useShop } from "../context/ShopContext";
import type { Product } from "../data/products";
import { StarRating } from "./StarRating";

interface ProductCardProps {
  product: Product;
  index: number;
}

export function ProductCard({ product, index }: ProductCardProps) {
  const { addToCart } = useShop();
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  return (
    <div
      className="product-card bg-white border border-border rounded-sm p-3 flex flex-col relative"
      data-ocid={`product.item.${index}`}
    >
      {product.isOnDeal && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-amazon-deal-red text-white text-xs px-2 py-0.5 rounded-sm">
            -{discount}% DEAL
          </Badge>
        </div>
      )}
      <Link
        to="/product/$id"
        params={{ id: product.id }}
        className="block mb-3"
      >
        <div className="aspect-square overflow-hidden bg-amazon-light-bg rounded-sm">
          <img
            src={`https://picsum.photos/seed/${product.id}/300/300`}
            alt={product.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="flex-1 flex flex-col gap-1">
        <Link to="/product/$id" params={{ id: product.id }}>
          <h3 className="text-sm text-foreground hover:text-amazon-link-blue line-clamp-2 leading-snug font-medium">
            {product.title}
          </h3>
        </Link>
        <StarRating
          rating={product.rating}
          reviewCount={product.reviewCount}
          size="sm"
        />
        <div className="flex items-baseline gap-2 mt-1">
          <span className="text-lg font-bold text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
        {product.isPrime && (
          <div className="flex items-center gap-1">
            <span className="text-amazon-prime-blue font-bold text-xs">
              prime
            </span>
            <span className="text-xs text-muted-foreground">FREE Delivery</span>
          </div>
        )}
        <Button
          size="sm"
          className="mt-2 w-full bg-amazon-yellow hover:bg-amazon-yellow-hover text-foreground text-xs font-medium rounded-full border border-amber-400"
          onClick={() => {
            addToCart(product);
            toast.success("Added to cart", {
              description: `${product.title.slice(0, 40)}...`,
            });
          }}
          data-ocid="product.add_to_cart_button"
        >
          <ShoppingCart className="w-3 h-3 mr-1" />
          Add to Cart
        </Button>
      </div>
    </div>
  );
}
