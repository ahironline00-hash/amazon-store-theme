import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ChevronDown,
  MapPin,
  Package,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { useState } from "react";
import { useShop } from "../context/ShopContext";
import { CATEGORIES } from "../data/products";

const NAV_LINKS = [
  { label: "\u2630 All", path: "/" },
  { label: "Today's Deals", path: "/deals" },
  { label: "Electronics", path: "/search?q=&cat=Electronics" },
  { label: "Books", path: "/search?q=&cat=Books" },
  { label: "Clothing", path: "/search?q=&cat=Clothing" },
  { label: "Home & Kitchen", path: "/search?q=&cat=Home+%26+Kitchen" },
  { label: "Sports", path: "/search?q=&cat=Sports" },
  { label: "Beauty", path: "/search?q=&cat=Beauty" },
  { label: "Best Sellers", path: "/search?q=best" },
  { label: "New Arrivals", path: "/search?q=new" },
];

export function Navbar() {
  const { cartCount, setSearchQuery } = useShop();
  const [localSearch, setLocalSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchQuery(localSearch);
    navigate({
      to: "/search",
      search: {
        q: localSearch,
        cat: selectedCategory === "All" ? "" : selectedCategory,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-amazon-nav px-4 py-2">
        <div className="max-w-[1500px] mx-auto flex items-center gap-3">
          <Link
            to="/"
            className="nav-link-hover flex items-center gap-1 flex-shrink-0"
          >
            <ShoppingCart className="text-amazon-orange w-6 h-6" />
            <span className="text-white font-display font-bold text-xl tracking-tight">
              Shop<span className="text-amazon-orange">Now</span>
            </span>
          </Link>

          <div className="nav-link-hover hidden lg:flex flex-col flex-shrink-0">
            <span className="text-gray-300 text-xs">Deliver to</span>
            <div className="flex items-center gap-1">
              <MapPin className="text-white w-3 h-3" />
              <span className="text-white text-sm font-semibold">
                United States
              </span>
            </div>
          </div>

          <form onSubmit={handleSearch} className="flex-1 flex max-w-2xl">
            <div className="flex w-full rounded-md overflow-hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs px-3 py-0 h-10 rounded-none border-0 flex-shrink-0 gap-1"
                  >
                    {selectedCategory}
                    <ChevronDown className="w-3 h-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {["All", ...CATEGORIES].map((cat) => (
                    <DropdownMenuItem
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                placeholder="Search ShopNow..."
                className="flex-1 rounded-none border-0 h-10 focus-visible:ring-0 text-gray-800"
                data-ocid="nav.search_input"
              />
              <button
                type="submit"
                className="bg-amazon-orange hover:bg-amazon-orange-hover px-4 h-10 flex items-center justify-center flex-shrink-0"
                data-ocid="nav.search_button"
              >
                <Search className="w-5 h-5 text-gray-900" />
              </button>
            </div>
          </form>

          <div className="hidden md:flex items-center gap-2 flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="nav-link-hover flex flex-col text-white"
                >
                  <span className="text-xs text-gray-300">Hello, Sign in</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">Account</span>
                    <ChevronDown className="w-3 h-3" />
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <User className="w-4 h-4 mr-2" />
                  Sign In
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link to="/admin" className="flex items-center gap-2">
                    Admin Panel
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/" className="nav-link-hover flex flex-col text-white">
              <span className="text-xs text-gray-300">Returns</span>
              <div className="flex items-center gap-1">
                <Package className="w-3 h-3" />
                <span className="text-sm font-semibold">&amp; Orders</span>
              </div>
            </Link>

            <Link
              to="/cart"
              className="nav-link-hover flex items-end gap-1 text-white relative"
              data-ocid="nav.cart_button"
            >
              <div className="relative">
                <ShoppingCart className="w-8 h-8" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-1 bg-amazon-orange text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="text-sm font-semibold pb-1">Cart</span>
            </Link>
          </div>

          <Link
            to="/cart"
            className="md:hidden flex items-center text-white relative"
            data-ocid="nav.cart_button"
          >
            <ShoppingCart className="w-7 h-7" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-1 bg-amazon-orange text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      <div className="bg-amazon-nav-light">
        <div className="max-w-[1500px] mx-auto px-4">
          <nav className="flex items-center gap-1 overflow-x-auto py-1">
            {NAV_LINKS.map((item) => (
              <a
                key={item.label}
                href={item.path}
                className="nav-link-hover text-white text-sm whitespace-nowrap px-3 py-1.5"
                data-ocid="nav.link"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
