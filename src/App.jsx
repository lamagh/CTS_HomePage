import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "./components/layouts/PageLayout";
import DashboardLayout from "./components/layouts/DashboardLayout";
import HomePage from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import ProductsPage from "./pages/Products";
import Aiducator from "./pages/Aiducator";
import Login from "./pages/Login";
import ContactUs from "./pages/ContactUs";
import MediaPage from "./pages/Media";
import DashboardPages from "./pages/Dashboard/Pages";
import DashboardHome from "./pages/Dashboard/Home";
import DashboardServices from "./pages/Dashboard/Services";
import DashboardBlogs from "./pages/Dashboard/Blogs";
import DashboardSingleService from "./pages/Dashboard/SingleService";
import DashboardProducts from "./pages/Dashboard/Products";
import DashboardSingleBlog from "./pages/Dashboard/SingleBlog";
import DashboardTestimonials from "./pages/Dashboard/Testimonials";
import DashboardSingleTestimonial from "./pages/Dashboard/SingleTestimonial";
import DashboardCaseStudy from "./pages/Dashboard/CaseStudy";
import DashboardSingleCaseStudy from "./pages/Dashboard/SingleCaseStudy";
import DashboardNews from "./pages/Dashboard/News";
import DashboardTeamMembers from "./pages/Dashboard/TeamMembers";
import DashboardSingleTeamMember from "./pages/Dashboard/SingleTeamMember";
import DashboardSingleProduct from "./pages/Dashboard/SingleProduct";
import UserDashboard from "./pages/Dashboard/Users";
import SingleUserDashboard from "./pages/Dashboard/SingleUser";
import DashboardSingleSuccessStory from "./pages/Dashboard/SingleSuccessStory";
import DashboardSuccessStories from "./pages/Dashboard/SuccessStory";
import NewsPage from "./pages/News";
import Blogs from "./pages/Blogs";
import CaseStudies from "./pages/CaseStudies";
import Testimonials from "./pages/Testimonials";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import DashboardPageHome from "./pages/Dashboard/SinglePages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutUs />} />
          <Route path="media" element={<MediaPage />} />
          <Route path="media/news" element={<NewsPage />} />
          <Route path="media/events" element={<Blogs />} />
          <Route path="media/case-studies" element={<CaseStudies />} />
          <Route path="media/testimonials" element={<Testimonials />} />
          <Route path="products" element={<ProductsPage />} />
          <Route path="products/aiducator" element={<Aiducator />} />
          <Route path="contact" element={<ContactUs />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route element={<AuthOutlet fallbackPath="/login" />}>
          <Route path="/dashboard/" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="pages/:slug" element={<DashboardPages />} />
            <Route path="page/home" element={<DashboardPageHome />} />
            <Route path="products" element={<DashboardProducts />} />
            <Route path="services" element={<DashboardServices />} />
            <Route path="testimonials" element={<DashboardTestimonials />} />
            <Route path="events" element={<DashboardBlogs />} />
            <Route path="news" element={<DashboardNews />} />
            <Route path="team-members" element={<DashboardTeamMembers />} />
            <Route path="users" element={<UserDashboard />} />
            <Route
              path="success-stories"
              element={<DashboardSuccessStories />}
            />
            <Route path="case-studies" element={<DashboardCaseStudy />} />
            <Route
              path="success-stories/:slug"
              element={<DashboardSingleSuccessStory />}
            />
            <Route path="services/:slug" element={<DashboardSingleService />} />
            <Route path="events/:slug" element={<DashboardSingleBlog />} />
            <Route path="products/:slug" element={<DashboardSingleProduct />} />
            <Route
              path="testimonials/:slug"
              element={<DashboardSingleTestimonial />}
            />
            <Route
              path="case-studies/:slug"
              element={<DashboardSingleCaseStudy />}
            />
            <Route
              path="team-members/:id"
              element={<DashboardSingleTeamMember />}
            />
            <Route path="users/:id" element={<SingleUserDashboard />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
