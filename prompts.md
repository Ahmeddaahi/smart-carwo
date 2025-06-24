You are a professional web UI generator. Build a modern, static, responsive website for **Carwo Smart**, a bilingual (Somali and English) fashion and lifestyle store. The website should be elegant, fast-loading, mobile-friendly, and styled with the Carwo Smart branding (glossy black, gradient gold, white tones). The purpose is to promote and showcase Carwo Smart’s wide variety of products, contact information, and business details.

📄 Pages to include:

1. Home
2. About Us
3. Products
4. Contact Us
5. Admin Panel (connected to Supabase)

🧩 Page Details:

➡️ Home Page:

* Hero section with a background image styled like the Carwo Smart visual (dark glossy with gold theme)
* Welcome text in Somali and English
* Section previews for About Us, Products, and Contact pages
* Each section includes a short description and a call-to-action button linking to the full page
* Featured product categories displayed as cards (e.g., Khamiis, Suits, Macawiso, Sandals, Cadaro, etc.)
* Animated customer counter that increases up to 5000+ when the user scrolls into view
* Call to action button: “Shop Now” / “Daawo Alaabta”

➡️ About Us:

* Somali and English story about Carwo Smart’s mission, team, and values
* Overview of the store’s history and dedication to fashion and tradition
* Optional image of the team or store

➡️ Products Page:

* Display all product categories with filters or category tabs
* Categories include:

  * Khamis
  * Shaadh
  * Surwaalo
  * Cadaro
  * Sacado
  * Suits
  * Single Coat
  * Jackets
  * Garaman
  * Macawiso
  * Sandals
* Each product card includes:

  * Name
  * Image
  * Price
  * Short description
  * ✅ When clicked, the user is redirected to a separate product detail page

    * The product detail page includes:

      * A wide high-quality image of the product
      * Full name and description
      * Price and material/sizes
      * “Back to Products” button
      * Optional WhatsApp order button

➡️ Contact Us:

* Google Maps embed for shop location
* WhatsApp contact button
* Phone number, email
* Social media links (Facebook, Instagram)
* Contact form (name, phone, message)

➡️ Admin Panel:

* Accessible at `/admin` (you can secure it later with Supabase Auth if needed)
* Built with front-end only (React or plain HTML/JS) and connected to Supabase
* Admin can:

  * ➕ Add new products and categories
  * 📝 Edit products and categories
  * ❌ Delete products and categories
  * 📂 Upload product images to Supabase Storage
* Uses Supabase JS SDK to perform all CRUD actions via `products` and `categories` tables
* Store `SUPABASE_URL` and `SUPABASE_ANON_KEY` in `.env` or Vercel Environment Variables

🎨 Style Guide:

* Colors: Gradient Gold, Glossy Black, White
* Fonts: Bold and modern (Montserrat, Poppins, or match Carwo Smart logo)
* Buttons: Rounded with gold-gradient and hover animations
* Layout: Sharp-edged, elegant section styling
* Hero section background styled like the Carwo Smart image (glossy/dark with gold)
* Include language switcher (EN / SO) with a toggle icon (🌐) in the top-right

📱 Features:

* Fully mobile responsive layout
* WhatsApp chat icon fixed at bottom right on every page
* Hover effect for product images
* Bilingual text support
* Language toggle icon (🌐)
* Animated customer counter (e.g., "Over 5,000+ Happy Customers") that activates on scroll
* Clickable product cards redirect to product detail pages with full image and information
* Admin panel connected to Supabase to manage products and categories dynamically

⚙️ Tech Stack:

* HTML, Tailwind CSS, JavaScript
* Optional: React/Next.js (if using Vercel)
* Supabase (PostgreSQL database + Storage + JS SDK)
* Supabase Auth (optional for securing admin panel)
* Ready for deployment on Vercel

👨‍💼 Business Info (replace if needed):

* Shop name: Carwo Smart
* Location: Jigjiga, Ethiopia
* WhatsApp: +251995817222
* Email: [carwosmart@gmail.com](mailto:carwosmart@gmail.com)
