"use client";
import Footer from "@/src/components/landingPage/Footer";
import NavigationSection from "@/src/components/landingPage/Navigation";
import SecondSection from "@/src/components/landingPage/SecondSection";
import TopSection from "@/src/components/landingPage/TopSection";
import { useSession } from "next-auth/react";
import "react-photo-view/dist/react-photo-view.css";
import "react-loading-skeleton/dist/skeleton.css";

const LandingPage = () => {
  const { data: session } = useSession();
  return (
    <div className="bg-backgroundColor">
      <NavigationSection />
      <TopSection user={session?.user} />
      <SecondSection user={session?.user} />
      <Footer />
    </div>
  );
};

export default LandingPage;
