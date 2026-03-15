import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useShop } from "../context/ShopContext";
import { CATEGORIES, type Product } from "../data/products";

const emptyProduct: Omit<Product, "id"> = {
  title: "",
  description: "",
  price: 0,
  originalPrice: undefined,
  category: "Electronics",
  rating: 4.5,
  reviewCount: 100,
  isPrime: true,
  inStock: true,
  isOnDeal: false,
  bullets: [],
};

export function AdminPage() {
  const { products, setProducts } = useShop();
  const [isOpen, setIsOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Product, "id">>(emptyProduct);

  const openAdd = () => {
    setEditId(null);
    setForm(emptyProduct);
    setIsOpen(true);
  };

  const openEdit = (p: Product) => {
    setEditId(p.id);
    setForm({ ...p });
    setIsOpen(true);
  };

  const handleSave = () => {
    if (!form.title || !form.price) {
      toast.error("Title and price are required");
      return;
    }
    if (editId) {
      setProducts((prev) =>
        prev.map((p) => (p.id === editId ? { ...form, id: editId } : p)),
      );
      toast.success("Product updated");
    } else {
      const newProduct: Product = { ...form, id: `p${Date.now()}` };
      setProducts((prev) => [...prev, newProduct]);
      toast.success("Product added");
    }
    setIsOpen(false);
  };

  const handleDelete = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    toast.success("Product deleted");
  };

  return (
    <main className="bg-amazon-light-bg min-h-screen">
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-display text-2xl font-bold">
            Admin &mdash; Product Management
          </h1>
          <Button
            className="bg-amazon-orange hover:bg-amazon-orange-hover text-foreground font-medium flex items-center gap-2"
            onClick={openAdd}
            data-ocid="admin.add_button"
          >
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>

        <div className="bg-white rounded-sm shadow-xs overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-amazon-nav text-white">
              <tr>
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">
                  Category
                </th>
                <th className="text-left px-4 py-3">Price</th>
                <th className="text-left px-4 py-3 hidden md:table-cell">
                  Stock
                </th>
                <th className="text-left px-4 py-3 hidden md:table-cell">
                  Prime
                </th>
                <th className="text-left px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, i) => (
                <tr
                  key={p.id}
                  className="border-b border-border hover:bg-muted/30"
                  data-ocid={`admin.row.${i + 1}`}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://picsum.photos/seed/${p.id}/50/50`}
                        alt=""
                        className="w-10 h-10 rounded object-cover flex-shrink-0"
                      />
                      <span className="line-clamp-2 font-medium">
                        {p.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-muted-foreground">
                    {p.category}
                  </td>
                  <td className="px-4 py-3 font-bold">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={p.inStock ? "text-green-600" : "text-red-500"}
                    >
                      {p.inStock ? "In Stock" : "Out"}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span
                      className={
                        p.isPrime
                          ? "text-amazon-prime-blue font-bold"
                          : "text-muted-foreground"
                      }
                    >
                      {p.isPrime ? "\u2713" : "\u2013"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 px-2"
                        onClick={() => openEdit(p)}
                        data-ocid={`admin.edit_button.${i + 1}`}
                      >
                        <Pencil className="w-3 h-3" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7 px-2 border-red-200 text-red-500 hover:bg-red-50"
                            data-ocid={`admin.delete_button.${i + 1}`}
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Product?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This will permanently remove &quot;{p.title}&quot;
                              from the store.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel data-ocid="admin.cancel_button">
                              Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-500 hover:bg-red-600 text-white"
                              onClick={() => handleDelete(p.id)}
                              data-ocid="admin.confirm_button"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editId ? "Edit Product" : "Add New Product"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div>
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) =>
                  setForm((f) => ({ ...f, title: e.target.value }))
                }
                data-ocid="admin.input"
              />
            </div>
            <div>
              <Label htmlFor="desc">Description</Label>
              <Textarea
                id="desc"
                value={form.description}
                onChange={(e) =>
                  setForm((f) => ({ ...f, description: e.target.value }))
                }
                rows={3}
                data-ocid="admin.textarea"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="price">Price *</Label>
                <Input
                  id="price"
                  type="number"
                  value={form.price}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      price: Number.parseFloat(e.target.value) || 0,
                    }))
                  }
                />
              </div>
              <div>
                <Label htmlFor="origPrice">Original Price</Label>
                <Input
                  id="origPrice"
                  type="number"
                  value={form.originalPrice || ""}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      originalPrice: e.target.value
                        ? Number.parseFloat(e.target.value)
                        : undefined,
                    }))
                  }
                />
              </div>
            </div>
            <div>
              <Label htmlFor="category-select">Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              >
                <SelectTrigger id="category-select" data-ocid="admin.select">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>
                      {c}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Switch
                  id="prime-switch"
                  checked={form.isPrime}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isPrime: v }))
                  }
                  data-ocid="admin.switch"
                />
                <Label htmlFor="prime-switch">Prime</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="stock-switch"
                  checked={form.inStock}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, inStock: v }))
                  }
                />
                <Label htmlFor="stock-switch">In Stock</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch
                  id="deal-switch"
                  checked={form.isOnDeal}
                  onCheckedChange={(v) =>
                    setForm((f) => ({ ...f, isOnDeal: v }))
                  }
                />
                <Label htmlFor="deal-switch">Deal</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              data-ocid="admin.cancel_button"
            >
              Cancel
            </Button>
            <Button
              className="bg-amazon-orange hover:bg-amazon-orange-hover text-foreground"
              onClick={handleSave}
              data-ocid="admin.save_button"
            >
              {editId ? "Update Product" : "Add Product"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
