import Link from "next/link";

export function HeroSection() {
  return (
    <section className="bg-hero-gradient pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden relative">
      <div className="container-custom relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-blue-200 bg-white/50 px-3 py-1 text-sm text-primary-dark mb-8 shadow-sm">
          <span className="flex h-2 w-2 rounded-full bg-green-500 mr-2"></span>
          10,000+ aspirants already joined
        </div>
        
        <h1 className="max-w-4xl text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
          Prepare Smarter for <br className="hidden md:block" />
          <span className="text-primary">Odisha Government Exams</span>
        </h1>
        
        <p className="max-w-2xl text-lg text-muted-foreground mb-10">
          Master OPSC, OSSC, and OSSSC exams with interactive quizzes, personalized AI explanations, and real-time performance tracking designed by experts.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <button className="primary-button-gradient rounded-full px-8 py-4 text-white font-semibold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            Start Learning Now
          </button>
          <button className="rounded-full bg-white px-8 py-4 text-foreground font-semibold border border-gray-200 shadow-sm hover:bg-gray-50 transition-all">
            Explore All Exams
          </button>
        </div>
      </div>
    </section>
  );
}