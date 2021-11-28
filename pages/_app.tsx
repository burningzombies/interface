import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Router from "next/router";
import NProgress from "nprogress";
import "../styles/nprogress.css";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "../components/alert-template";

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

if (typeof window !== "undefined") {
  require("bootstrap/dist/js/bootstrap.bundle.min");
  if (window.ethereum) {
    window.ethereum.on("chainChanged", () => {
      Router.reload();
    });
  }
}

const App: React.ReactNode = ({ Component, pageProps }: AppProps) => {
  return (
    <AlertProvider
      template={AlertTemplate}
      {...{
        position: positions.TOP_CENTER,
        timeout: 3000,
        offset: "1rem",
        transition: transitions.SCALE,
      }}
    >
      <Component {...pageProps} />
    </AlertProvider>
  );
};
export default App;
