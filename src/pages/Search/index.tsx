import React, { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import Product from "../../component/Product";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
}

const Search: React.FC = () => {
  const [products, setProducts] = useState<ProductProps[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${searchTerm}&page=${page}&limit=20`
      );
      const data = await response.json();
      const newProducts: ProductProps[] = data.products.map((product: any) => ({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      }));
      const deserializedProducts = newProducts.sort(
        (a, b) => a.price - b.price
      );
      setProducts((prevProducts) => [...prevProducts, ...deserializedProducts]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist(); // Ensure that the event is not removed from memory
    const value = event.target.value;
    setSearchTerm(value);
    console.log(value); // Log the value you just entered
    setPage(1);
    setProducts([]); // Clear the existing product list
  };

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]); // Fetch products whenever searchTerm changes

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Type keywords to search products"
        className="w-1/2 m-8 h-10 p-2 border border-gray-300 rounded-sm focus:border-gray-600 outline-none"
      />
      {products.length === 0 ? ( // Kiểm tra nếu không có sản phẩm nào được tìm thấy
        <p className="text-red-800 uppercase mt-2 mb-4 font-bold">
          No products found!
        </p>
      ) : (
        <InfiniteScroll
          dataLength={products.length}
          next={fetchProducts}
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
      )}
    </div>
  );
};

export default Search;
