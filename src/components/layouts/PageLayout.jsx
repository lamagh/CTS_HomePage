import MainHeader from "../MainHeader";
import Body from "../Body";
import FloatingFooter from "../FloatingFooter";
import Footer from "../Footer";
import { Outlet } from "react-router-dom";

function PageLayout() {
  return (
    <>
      <MainHeader />
      <Body>
        <Outlet />
      </Body>
      <FloatingFooter />
      <Footer />
    </>
  );
}

export default PageLayout;
