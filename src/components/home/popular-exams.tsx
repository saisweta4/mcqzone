import Link from "next/link";
const EXAMS = [
  { title: "OPSC ASO", subjects: "15 Subjects" , link: "/exams/opsc/opsc-aso" },
  { title: "RRB NTPC", subjects: "8 Subjects" , link: "/exams/railway/rrb-ntpc" },
  { title: "OSSC CGL", subjects: "10 Subjects" , link: "/exams/ossc/ossc-cgl" },
  { title: "Odisha Police SI", subjects: "12 Subjects" , link: "/exams/police/police-si" },
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
          <Link href="/exams">
          <button className="text-primary font-medium hover:underline mt-4 md:mt-0">
            View All Exams &rarr;
          </button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {EXAMS.map((exam, index) => (
            <div key={index} className="exam-card p-6 flex flex-col h-full">
              <div className="h-12 w-12 rounded-lg bg-blue-50 flex items-center justify-center mb-4 text-primary font-bold text-xl">
                {exam.title.charAt(0)}
              </div>
              <h3 className="font-semibold text-lg mb-2">{exam.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-grow">{exam.subjects}</p>
              <Link href={exam.link}>
                <button className="text-primary font-medium hover:underline mt-4">
                  View Details &rarr;
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}