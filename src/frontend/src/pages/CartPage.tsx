import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Link } from "@tanstack/react-router";
import { ChevronRight, ShoppingCart, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useShop } from "../context/ShopContext";

export function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useShop();

  if (cart.length === 0) {
    return (
      <main
        className="max-w-[1200px] mx-auto px-4 py-12"
        data-ocid="cart.empty_state"
      >
        <div className="text-center py-16">
          <ShoppingCart className="w-20 h-20 text-muted-foreground mx-auto mb-4" />
          <h2 className="font-display text-2xl font-bold mb-2">
            Your cart is empty
          </h2>
          <p className="text-muted-foreground mb-6">Add items to get started</p>
          <Link to="/">
            <Button className="bg-amazon-orange hover:bg-amazon-orange-hover text-foreground font-medium rounded-full px-8">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </main>
    );
  }

  const shipping = cartTotal >= 25 ? 0 : 5.99;

  return (
    <main className="bg-amazon-light-bg min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <h1 className="font-display text-2xl font-bold text-foreground mb-6">
          Shopping Cart
        </h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white rounded-sm p-4 shadow-xs">
            <div className="text-right text-sm text-muted-foreground pb-2 border-b border-border">
              Price
            </div>
            {cart.map((item, i) => (
              <div
                key={item.product.id}
                className="py-4 border-b border-border flex gap-4"
                data-ocid={`cart.item.${i + 1}`}
              >
                <div className="w-28 h-28 bg-amazon-light-bg rounded overflow-hidden flex-shrink-0">
                  <img
                    src={`https://picsum.photos/seed/${item.product.id}/200/200`}
                    alt={item.product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <Link
                    to="/product/$id"
                    params={{ id: item.product.id }}
                    className="text-amazon-link-blue hover:text-amazon-orange font-medium text-sm leading-snug line-clamp-2"
                  >
                    {item.product.title}
                  </Link>
                  {item.product.isPrime && (
                    <div className="text-amazon-prime-blue text-xs font-bold mt-1">
                      prime
                    </div>
                  )}
                  {item.product.inStock ? (
                    <div className="text-green-600 text-xs mt-1">In Stock</div>
                  ) : (
                    <div className="text-red-500 text-xs mt-1">
                      Out of Stock
                    </div>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center border border-border rounded text-sm">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        className="px-2 py-0.5 hover:bg-muted"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity - 1)
                        }
                      >
                        &minus;
                      </button>
                      <span className="px-3 py-0.5 font-medium">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        className="px-2 py-0.5 hover:bg-muted"
                        onClick={() =>
                          updateQuantity(item.product.id, item.quantity + 1)
                        }
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      className="text-amazon-link-blue hover:text-red-500 text-sm flex items-center gap-1"
                      onClick={() => {
                        removeFromCart(item.product.id);
                        toast.success("Removed from cart");
                      }}
                    >
                      <Trash2 className="w-3 h-3" />
                      Delete
                    </button>
                  </div>
                </div>
                <div className="text-right font-bold text-base flex-shrink-0">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="text-right pt-3 text-lg font-semibold">
              Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items):{" "}
              <span className="font-bold">${cartTotal.toFixed(2)}</span>
            </div>
          </div>

          <div className="lg:w-72">
            <div className="bg-white rounded-sm p-4 shadow-xs">
              <h2 className="font-semibold text-base mb-3">Order Summary</h2>
              <Separator className="mb-3" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-600" : ""}>
                    {shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
              </div>
              {shipping > 0 && (
                <p className="text-xs text-muted-foreground mt-2">
                  Add ${(25 - cartTotal).toFixed(2)} more for free shipping
                </p>
              )}
              <Separator className="my-3" />
              <div className="flex justify-between font-bold text-base mb-4">
                <span>Order Total</span>
                <span>${(cartTotal + shipping).toFixed(2)}</span>
              </div>
              <Button
                className="w-full bg-amazon-yellow hover:bg-amazon-yellow-hover text-foreground font-semibold rounded-full border border-amber-400 flex items-center justify-center gap-2"
                data-ocid="cart.checkout_button"
                onClick={() => toast.success("Proceeding to checkout...")}
              >
                Proceed to Checkout
                <ChevronRight className="w-4 h-4" />
              </Button>
              <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                <span>&#128274;</span>
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
