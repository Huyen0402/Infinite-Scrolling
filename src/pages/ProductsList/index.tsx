import { useState, useEffect, useCallback } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Product from "../../component/Product";
import { Link } from "react-router-dom";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const ProductsList: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [skip, setSkip] = useState(0);
  const limit = 20;

  const fetchProducts = useCallback(async () => {
    const response = await fetch(
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    );
    const data = await response.json();
    //console.log("api 1", skip);
    const products = await Promise.all(
      data.products.map(async (product: ProductProps) => {
        const productResponse = await fetch(
          `https://dummyjson.com/products/${product.id}`
        );
        const productData = await productResponse.json();
        console.log(product.id);
        return {
          ...product,
          thumbnail: productData.thumbnail,
        };
      })
    );
    return products;
  }, [skip]);

  function loadMoreProducts() {
    setSkip((prevSkip) => prevSkip + limit);
    //console.log("load more data");
  }

  useEffect(() => {
    //console.log("use effect");
    fetchProducts()
      .then((newProducts) => {
        setProducts((prevProducts) => {
          const currentProductIds = new Set(
            prevProducts.map((product) => product.id)
          );
          const newUniqueProducts = newProducts.filter(
            (product) => !currentProductIds.has(product.id)
          );
          return [...prevProducts, ...newUniqueProducts];
        });
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, [fetchProducts]);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <h1 className="uppercase text-4xl font-bold m-4 flex-grow text-center">
          Products List
        </h1>
        <Link
          to="/products/search"
          className="bg-indigo-500 hover:bg-indigo-600 text-white py-3 px-6 rounded-md text-lg"
        >
          Search Products
        </Link>
      </div>
      <InfiniteScroll
        dataLength={products.length}
        next={loadMoreProducts}
        hasMore={products.length < 100}
        loader={
          <h4 className="text-blue-800 uppercase mt-2 mb-4">Loading...</h4>
        }
        endMessage={
          <h3 className="text-red-800 uppercase mt-2 mb-4 font-bold">
            No more products to load!
          </h3>
        }
      >
        {products.map((product, index) => (
          <Product
            key={`product.id-${index}`}
            id={product.id}
            title={product.title}
            price={product.price}
            thumbnail={product.thumbnail}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default ProductsList;
