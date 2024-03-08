import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 20;

  const fetchProducts = useCallback(async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const data = await response.json();

    if (data && data.products) {
      const products = await Promise.all(
        data.products.map(async (product: Product) => {
          const productResponse = await fetch(
            `https://dummyjson.com/products/${product.id}`
          );
          const productData = await productResponse.json();

          return {
            ...product,
            thumbnail: productData.thumbnail,
          };
        })
      );

      return products;
    } else {
      return [];
    }
  }, [skip]);

  function loadMoreProducts() {
    setSkip((skip) => skip + limit);
  }

  useEffect(() => {
    fetchProducts()
      .then((newProducts) => {
        setProducts((prevProducts) => [...prevProducts, ...newProducts]);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [fetchProducts]);

  return (
    <div className="">
      <h1 className="uppercase text-4xl font-bold">Products List</h1>
      <InfiniteScroll
        dataLength={products.length}
        next={loadMoreProducts}
        hasMore={products.length < 100}
        loader={<h4 className="text-blue-800 uppercase mt-2">Loading...</h4>}
        endMessage={
          <h3 className="text-red-800 uppercase mt-2 font-bold">
            No more products to load!
          </h3>
        }
      >
        {products.map((product, index) => (
          <div
            key={`product.id-${index}`}
            className="w-1/5 inline-block m-4 mt-8 border-solid border rounded-lg"
          >
            <div className="relative h-60 border-b rounded-lg">
              <img
                src={product.thumbnail}
                alt={product.title}
                className="absolute h-full object-cover"
              />
            </div>
            <h3 className="mt-4 mb-4 font-serif text-lg">{product.id}</h3>
            <p className="font-bold text-red-500">{`Price: $${product.price}`}</p>
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Products;
