# URL Shortener Web App

A production-ready URL Shortener built using **React** and **Material UI**. Users can shorten up to 5 URLs at once, set custom shortcodes, and define expiration times. All data (shortened URLs, click logs, analytics) is stored client-side using `localStorage`.

---

## Features

- Shorten up to **5 URLs** at once
- Optional custom shortcode (must be unique and alphanumeric)
- Optional expiry time in minutes (defaults to 30 mins)
- Client-side validation for URL, shortcode, and validity
- Stores all data in `localStorage`
- Tracks click events: timestamp, source, and mock location
- View statistics: original URL, short URL, click count, click history
- Redirects short URL from `/shortcode` to original URL
- Custom middleware for logging (no console.log)
- Clean code structure with React + `react-router-dom` for routing
- Fully styled with **Material UI**

---

## Tech Stack

- **React**
- **Material UI (MUI)**
- **React Router DOM**
- **TypeScript**
- `localStorage` (for persistence)
- `uuid` or `nanoid` (for shortcode generation)

---

## Project Structure

```

src/
│
├── components/
│   ├── UrlForm.tsx          # Form to shorten URLs
│   ├── UrlList.tsx          # Displays list of shortened URLs
│   └── StatsPage.tsx        # Statistics and click analytics
│
├── middleware/
│   └── logger.ts            # Custom logging middleware
│
├── pages/
│   ├── Home.tsx             # Main form + URL list
│   └── RedirectHandler.tsx  # Redirect logic based on shortcode
│
├── utils/
│   ├── validators.ts        # URL & shortcode validation logic
│   └── storage.ts           # Abstraction over localStorage
│
└── App.tsx                  # Router and main layout

````

---

## 📦 Installation

```bash
git clone https://github.com/ashbhati26/22131011190.git
cd url-shortener
npm install
npm start
````

The app runs locally at:
**[http://localhost:3000](http://localhost:3000)**

---

## Usage

1. Enter one or more long URLs (up to 5).
2. Optionally provide:

   * A **custom shortcode**
   * A **validity duration** in minutes.
3. Click **Shorten** to generate short links.
4. Visit the short URL to trigger redirection and track clicks.
5. Go to the **Statistics** page to see analytics.

---

## Notes

* All data is stored in `localStorage` — clearing browser storage will remove saved links and analytics.
* IP-based location tracking is mocked for privacy and simplicity.
* This project avoids external APIs or databases for demo/test purposes.

---

## Clean Code Practices

* Modular component structure
* Reusable utility and middleware functions
* Descriptive error messages
* Strict TypeScript usage
* No `console.log` — custom logger is used instead
