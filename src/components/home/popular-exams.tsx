const EXAMS = [
  { title: "OPSC ASO (Secretariat)", subjects: "15 Subjects" },
  { title: "OSSSC RI & Amin", subjects: "8 Subjects" },
  { title: "OSSC CGL 2024", subjects: "10 Subjects" },
  { title: "Odisha Police SI", subjects: "12 Subjects" },
];

export function PopularExams() {
  return (
    <section className="section-spacing bg-white">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">Popular Exams</h2>
            <p className="text-muted-foreground">Most attempted exams by aspirants in Odisha</p>
          </div>
          <button className="text-primary font-medium hover:underline mt-4 md:mt-0">
            View All Exams &rarr;
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXAMS.map((exam, index) => (
            <div key={index} className="exam-card p-6 flex flex-col h-full">
              <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 text-primary font-bold text-xl">
                {exam.title.charAt(0)}
              </div>
              <h3 className="font-semibold text-lg mb-2">{exam.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-grow">{exam.subjects}</p>
              <div className="flex gap-2">
                <button className="flex-1 rounded-md border border-gray-200 py-2 text-sm font-medium hover:bg-gray-50 transition-colors">
                  View Syllabus
                </button>
                <button className="flex-1 rounded-md bg-primary text-white py-2 text-sm font-medium hover:bg-primary/90 transition-colors">
                  Start
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}