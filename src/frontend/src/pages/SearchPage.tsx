import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useLocation } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ProductCard } from "../components/ProductCard";
import { useShop } from "../context/ShopContext";
import { CATEGORIES } from "../data/products";

export function SearchPage() {
  const { products } = useShop();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get("q") || "";
  const catParam = searchParams.get("cat") || "";

  const [selectedCat, setSelectedCat] = useState(catParam);
  const [primeOnly, setPrimeOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("relevance");

  const filtered = useMemo(() => {
    let result = products;
    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
      );
    }
    if (selectedCat) result = result.filter((p) => p.category === selectedCat);
    if (primeOnly) result = result.filter((p) => p.isPrime);
    result = result.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1],
    );
    result = result.filter((p) => p.rating >= minRating);
    result = [...result].sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
      return 0;
    });
    return result;
  }, [products, query, selectedCat, primeOnly, priceRange, minRating, sortBy]);

  return (
    <main className="bg-amazon-light-bg min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 py-4">
        {query && (
          <p className="text-sm text-muted-foreground mb-4">
            {filtered.length} results for{" "}
            <strong className="text-foreground">&quot;{query}&quot;</strong>
          </p>
        )}
        {catParam && !query && (
          <p className="text-lg font-bold text-foreground mb-4">
            {selectedCat || catParam}
          </p>
        )}

        <div className="flex gap-4">
          <aside className="hidden md:block w-56 flex-shrink-0">
            <div className="bg-white rounded-sm p-4 shadow-xs space-y-5">
              <div>
                <h3 className="font-semibold text-sm mb-3">Department</h3>
                <div className="space-y-1">
                  <button
                    type="button"
                    className={`block text-sm w-full text-left px-2 py-1 rounded hover:bg-muted ${
                      !selectedCat ? "font-bold" : "text-amazon-link-blue"
                    }`}
                    onClick={() => setSelectedCat("")}
                  >
                    All Departments
                  </button>
                  {CATEGORIES.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      className={`block text-sm w-full text-left px-2 py-1 rounded hover:bg-muted ${
                        selectedCat === cat
                          ? "font-bold"
                          : "text-amazon-link-blue"
                      }`}
                      onClick={() => setSelectedCat(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-3">Price Range</h3>
                <Slider
                  value={priceRange}
                  min={0}
                  max={200}
                  step={5}
                  onValueChange={(v) => setPriceRange(v as [number, number])}
                  className="mb-2"
                />
                <div className="text-xs text-muted-foreground flex justify-between">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-sm mb-3">
                  Avg. Customer Rating
                </h3>
                {[4, 3, 2, 1].map((r) => (
                  <button
                    type="button"
                    key={r}
                    className={`flex items-center gap-1 text-sm w-full text-left py-1 ${
                      minRating === r ? "font-bold" : "text-amazon-link-blue"
                    }`}
                    onClick={() => setMinRating(minRating === r ? 0 : r)}
                  >
                    <span className="star-filled">
                      {"\u2605".repeat(r)}
                      {"\u2606".repeat(5 - r)}
                    </span>
                    &amp; Up
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="prime"
                  checked={primeOnly}
                  onCheckedChange={(v) => setPrimeOnly(!!v)}
                />
                <Label htmlFor="prime" className="text-sm cursor-pointer">
                  <span className="text-amazon-prime-blue font-bold">
                    prime
                  </span>{" "}
                  Only
                </Label>
              </div>
            </div>
          </aside>

          <div className="flex-1">
            <div className="bg-white rounded-sm px-4 py-2 mb-3 flex items-center justify-between shadow-xs">
              <span className="text-sm text-muted-foreground">
                {filtered.length} results
              </span>
              <div className="flex items-center gap-2">
                <span className="text-sm">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40 h-8 text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="relevance">Relevance</SelectItem>
                    <SelectItem value="price-asc">
                      Price: Low to High
                    </SelectItem>
                    <SelectItem value="price-desc">
                      Price: High to Low
                    </SelectItem>
                    <SelectItem value="rating">Avg. Customer Review</SelectItem>
                    <SelectItem value="reviews">Most Reviews</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div
                className="bg-white rounded-sm p-12 text-center"
                data-ocid="search.results_list"
              >
                <p className="text-lg font-semibold mb-2">No results found</p>
                <p className="text-muted-foreground text-sm">
                  Try adjusting your search or filters
                </p>
              </div>
            ) : (
              <div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
                data-ocid="search.results_list"
              >
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} index={i + 1} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
