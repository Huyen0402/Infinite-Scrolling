# Infinite Scroll Products List

This is a React application that displays a list of products using an infinite scroll feature. It fetches product data from a dummy API and dynamically loads more products as the user scrolls down the page.

## Features

- Display a list of products with title, price, and thumbnail.
- Implement infinite scroll to load more products dynamically.
- Fetch product data from a dummy API.
- Search products by entering keywords

## Installation

To run this application locally, follow these steps:

1. Clone the repository to your local machine:

```
git clone https://github.com/Huyen0402/Infinite-Scrolling.git
```

2. Navigate to the project directory:

```
cd infinite-scroll-products-list
```

3. Install dependencies:

```
npm install
```

4. Start the development server:

```
npm start
```

5. Open your browser and visit `http://localhost:3000` to view the application.

## Usage

- Scroll down the page to load more products dynamically.
- Products will be fetched from the dummy API in batches as you scroll.
- The application displays a loading indicator while fetching data and notifies the user when there are no more products to load.

## Technologies Used

- React.js
- react-infinite-scroll-component
- TypeScript
- CSS (Tailwind CSS)

## Credits

- Dummy product data is fetched from [DummyJSON](https://dummyjson.com/).
- Infinite scroll functionality is implemented using [react-infinite-scroll-component](https://www.npmjs.com/package/react-infinite-scroll-component).
