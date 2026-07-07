import Image from "next/image";

export function ExamsHero() {
  return (
    <div className="bg-hero-gradient border rounded-2xl px-10 py-8 flex justify-between items-center relative overflow-hidden">
      <div className="max-w-xl relative z-10">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          Achieve Your Dream <span className="text-primary">Government Job</span><br/>
          with MCQZone
        </h1>
        <p className="mt-4 text-gray-500 text-sm">
          Explore dedicated prep modules for OPSC, OSSC, and other state departments. Practice 10,000+ AI verified questions.
        </p>
      </div>

      <div className="relative z-10 hidden md:block">
        <Image
          src="/images/visily-image.jpg"
          width={280}
          height={100}
          alt="Student studying"
          className="rounded-xl shadow-sm object-cover"
        />
      </div>
    </div>
  );
}