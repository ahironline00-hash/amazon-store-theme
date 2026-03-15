import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined" ? window.location.hostname : "";
  const caffeineUrl = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`;

  return (
    <footer>
      <button
        type="button"
        className="w-full bg-amazon-nav-light text-white text-center py-3 text-sm cursor-pointer hover:opacity-90"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Back to top
      </button>

      <div className="bg-amazon-nav text-white py-10">
        <div className="max-w-[1200px] mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h4 className="font-semibold mb-3">Get to Know Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white">
                  About ShopNow
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Press Releases
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Sustainability
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Make Money with Us</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white">
                  Sell on ShopNow
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Advertise Products
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Payment Products</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white">
                  Business Card
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Shop with Points
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Reload Your Balance
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Let Us Help You</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link to="/" className="hover:text-white">
                  Your Account
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Your Orders
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Shipping Rates
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Returns &amp; Replacements
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-amazon-nav border-t border-gray-700 py-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <ShoppingCart className="text-amazon-orange w-5 h-5" />
          <span className="text-white font-bold">ShopNow</span>
        </div>
        <p className="text-gray-400 text-xs">
          &copy; {year}. Built with &hearts; using{" "}
          <a
            href={caffeineUrl}
            target="_blank"
            rel="noreferrer"
            className="text-amazon-orange hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </div>
    </footer>
  );
}
