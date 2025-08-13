import Header from "./Header";
import Footer from "./Footer";

export default function PageLayout({ children }) {
  return (
    <div className="app-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
