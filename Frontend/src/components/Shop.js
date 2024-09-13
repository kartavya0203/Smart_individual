import { useState, useEffect } from "react";
import Footer from "./Footer";
import Header from "./Header";
import ProductCard from "./ProductCard";
// import { useDispatch } from "react-redux";

const Shop = () => {
  // State to store fetched products
  const [products, setProducts] = useState([]);

  // Old commented code for reference
  // const products = [
  //   {
  //     id: 1,
  //     name: "Organic Fertilizer",
  //     description: "Description 1",
  //     price: 500,
  //     image:
  //       "https://cdn.cdnparenting.com/articles/2021/07/16191322/380433403.webp",
  //   },
  //   {
  //     id: 2,
  //     name: "Crops Seed",
  //     description: "Description 2",
  //     price: 700,
  //     image:
  //       "https://articles-1mg.gumlet.io/articles/wp-content/uploads/2016/12/seeds.jpg?compress=true&quality=80&w=640&dpr=2.6",
  //   },
  //   // Add more products as needed
  // ];

  // const fetchData = async () => {
  //   const response = await fetch("http://127.0.0.1:8000/api/v1/product/");
  //   const data = await response.json();
  //   console.log(data);
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/v1/product/");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setProducts(data); // Update state with fetched data
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 py-20">
          <h1 className="text-5xl md:text-6xl text-center font-extrabold text-white drop-shadow-lg">
            Our Products
          </h1>
        </div>
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} productData={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Shop;
