# Amazon-Style E-Commerce Store

## Current State
New project. No existing code.

## Requested Changes (Diff)

### Add
- Full e-commerce storefront with Amazon-like layout and UX
- Top navigation bar with logo, search bar, cart icon, account menu, and location selector
- Hero banner/carousel with promotional content
- Product category navigation bar (horizontal scrolling categories)
- Product listing grid with cards showing image, title, price, ratings, Prime badge
- Individual product detail page with images, description, price, add-to-cart, buy now
- Shopping cart drawer/page with item list, quantities, subtotal
- "Today's Deals" and "Recommended for You" sections on homepage
- Footer with links (About, Help, Careers, etc.)
- Admin panel to manage products (add, edit, delete)
- Authorization for admin role vs. guest/shopper

### Modify
N/A

### Remove
N/A

## Implementation Plan
1. Select authorization and blob-storage components
2. Generate Motoko backend with: Product CRUD, Cart operations, Category management, Order basics
3. Build frontend:
   - App shell with nav bar, search, cart icon
   - Homepage with hero banner, deal sections, product grid
   - Product detail page
   - Cart page
   - Admin product management page
   - Routing between pages
4. Wire authorization for admin-only product management
5. Deploy
