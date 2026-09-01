import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Hero from "./Components/Hero";
import Info from "./Components/Info";
import Info2 from "./Components/Info2";
import Info3 from "./Components/Info3";
import MovingText from "./Components/MovindText";
import Review from "./Components/Review";
import Package from "./Components/Packages";
import FAQ from "./Components/FAQ";
import Packages from "./Components/Packages";
// Package detail pages — as you build each one, import it here
// and add its matching <Route> below. Bir is done; the rest are
// stubbed out so the app still runs while you build them one by one.
import Bir from "./Packages/Bir";
import Triund from "./Packages/Triund";
import ChakrataMoila from "./Packages/ChakrataMoila";
import Kasol from "./Packages/Kasol";
import ShangarhSainj from "./Packages/Sharganj";
import Enquiry from "./Components/Enquiry";
import Footer from "./Components/Footer";
import AdminLogin from "./Components/AdminLogin";
import AdminPanel from "./Components/AdminPanel";
import AboutUs from "./Components/AboutUs";
import Contact from "./Components/Contact";
import ProtectedRoute from "./Components/ProtectedRoute";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Info />
      <Info2 />
      <Info3 />
      <MovingText />
      <Package />
      
      <Review />
      <FAQ />
      <Footer />
    </>
  );
}

function App() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/utkarshadmin" element={<AdminLogin />} />

        <Route path="/packages" element={<Packages />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/utkarshadmin/adminpanel" element={<AdminPanel />} />
        </Route>
        <Route path="/packages/bir" element={<Bir />} />
        {<Route path="/packages/triund" element={<Triund />} />}
        {<Route path="/packages/chakrata-moila" element={<ChakrataMoila />} />}
        {<Route path="/packages/kasol" element={<Kasol />} />}
        {<Route path="/packages/shangarh-sainj" element={<ShangarhSainj />} />}
        <Route path="/packages/bir/enquiry" element={<Enquiry />} />
        <Route path="/packages/triund/enquiry" element={<Enquiry />} />
        <Route path="/packages/kasol/enquiry" element={<Enquiry />} />
        <Route path="/packages/chakrata-moila/enquiry" element={<Enquiry />} />
        <Route path="/packages/shangarh-sainj/enquiry" element={<Enquiry />} />
      </Routes>
    </>
  );
}

export default App;
