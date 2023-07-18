import Header from "components/header";
import Footer from "components/footer";
import { themeStore } from 'states/store';

const PageLayout = ({ children }: any) => {
  const theme: any = themeStore((state: any) => state.theme);
  
  return (
    <div className={`layout min-h-screen ${theme === "dark" ? "bg-black text-white" : ""}`}>
      <Header />
      <div className="main-content py-8 px-[5%] min-h-[calc(100vh-168px)]">{children}</div>
      <Footer />
    </div>
  );
};

export default PageLayout;
