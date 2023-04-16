import Footer from "./footer";
import Header from "./header";
import Container from "@mui/material/Container";

interface Props {
  children: React.ReactElement;
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <div>
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
