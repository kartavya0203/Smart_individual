import { Outlet } from "react-router-dom";
import Header from "./Header";
import useAuth from "../hooks/useAuth";
import Footer from "./Footer";
import Browse from "./Browse";

const Home = () => {
  // useAuth();
  return (
    <div>
      <Header />
      <Browse />
      <Footer />
    </div>
  );
};

export default Home;
