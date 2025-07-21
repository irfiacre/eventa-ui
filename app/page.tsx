"use client";
import Footer from "@/src/components/landingPage/Footer";
import NavigationSection from "@/src/components/landingPage/Navigation";
import SecondSection from "@/src/components/landingPage/SecondSection";
import TopSection from "@/src/components/landingPage/TopSection";
import "react-photo-view/dist/react-photo-view.css";
import "react-loading-skeleton/dist/skeleton.css";

const LandingPage = () => {
  return (
    <div className="bg-backgroundColor">
      <NavigationSection />
      <TopSection />
      <SecondSection />
      <Footer />
    </div>
  );
};

export default LandingPage;
