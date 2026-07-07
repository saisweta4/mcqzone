import { HeroSection } from "@/components/home/hero-section";
import { PopularExams } from "@/components/home/popular-exams";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";
import { Navbar } from "@/components/layout/navbar";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Navbar />
      <HeroSection />
      <PopularExams />
      <WhyChooseUs />
      <div id="study-plan">
        <HowItWorks />
      </div>
      <Testimonials />
      <FaqSection />
    </div>
  );
}