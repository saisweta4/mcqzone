import { HeroSection } from "@/components/home/hero-section";
import { PopularExams } from "@/components/home/popular-exams";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { HowItWorks } from "@/components/home/how-it-works";
import { Testimonials } from "@/components/home/testimonials";
import { FaqSection } from "@/components/home/faq-section";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <PopularExams />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <FaqSection />
    </div>
  );
}