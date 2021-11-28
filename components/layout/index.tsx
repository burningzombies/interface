import React from "react";
import Head from "next/head";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { Web3Bar } from "./web3-bar";
import useWindowSize from "../../hooks/use-window-size";
import { APP } from "../../utils/consts";

export const Layout: React.FC = ({ children }) => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false);

  const { width } = useWindowSize();

  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  React.useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  return (
    <div className="wrapper d-flex flex-column min-vh-100">
      <Head>
        <title>{APP.NAME}</title>
      </Head>
      <Navbar />
      {children}
      <Footer />
      <Web3Bar />
      {isVisible && width && width >= 960 && (
        <button
          onClick={scrollToTop}
          className="shadow btn btn-danger"
          id="scroll-top"
          title="Go to top"
        >
          <i className="fas fa-caret-up"></i>
        </button>
      )}
      <style jsx>{`
        #scroll-top {
          position: fixed;
          bottom: 90px;
          right: 90px;
          z-index: 99;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
};
