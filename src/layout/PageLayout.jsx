import Footer from "./Footer/Footer";
import Header from "./Header/Header";

export default function PageLayout({ children }) {
  return (
    <div className="app-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
