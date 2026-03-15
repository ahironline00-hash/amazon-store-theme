import { Badge } from "@/components/ui/badge";
import { ProductCard } from "../components/ProductCard";
import { useShop } from "../context/ShopContext";

export function DealsPage() {
  const { products } = useShop();
  const deals = products.filter((p) => p.isOnDeal);

  return (
    <main className="bg-amazon-light-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-6">
          <h1 className="font-display text-2xl font-bold text-foreground">
            Today&#39;s Deals
          </h1>
          <Badge className="bg-amazon-deal-red text-white text-sm px-3">
            {deals.length} deals
          </Badge>
        </div>
        <div className="bg-white rounded-sm p-4 shadow-xs mb-4">
          <p className="text-sm text-muted-foreground">
            &#9889; Lightning deals refresh throughout the day. Limited
            quantities available.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {deals.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i + 1} />
          ))}
        </div>
      </div>
    </main>
  );
}
