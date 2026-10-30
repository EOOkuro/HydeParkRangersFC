# Hyde Park Rangers FC

React (Vite) site. Home page plus a /register page.

    npm install
    npm run dev       # local
    npm run build     # Vercel: framework Vite, output dir dist

## Things you edit
- `src/config.js`: header and body photos, contact email, teams, what's included, price.
- `.env` (copy `.env.example`, or set in Vercel > Settings > Environment Variables):
  - `VITE_FORM_ENDPOINT`: a Formspree form URL. Without it, the form opens an email to the club.
  - `VITE_STRIPE_URL`: a Stripe Payment Link. Without it, there is no payment step and no price is shown.

The $200 shows only on the registration page's payment button, never on the home page.
