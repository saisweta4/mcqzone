export default function AboutPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">
        About MCQZone
      </h1>

      <div className="space-y-6 text-gray-700 leading-8">
        <p>
          MCQZone is a free AI-powered learning platform designed to help
          students prepare for Odisha Government Exams through structured,
          exam-wise and subject-wise multiple-choice questions.
        </p>

        <p>
          Our mission is to make government exam preparation simple,
          accessible, and effective by combining quality questions with
          AI-powered explanations that help students truly understand every
          concept.
        </p>

        <p>
          Whether you're preparing for OPSC, OSSC, OSSSC, Odisha Police,
          RI, ARI, Amin, or other competitive examinations, MCQZone provides
          organized learning resources to support your journey.
        </p>

        <h2 className="text-2xl font-semibold pt-4">
          Why Choose MCQZone?
        </h2>

        <ul className="list-disc ml-6 space-y-2">
          <li>Free practice questions</li>
          <li>AI-powered explanations</li>
          <li>Subject-wise preparation</li>
          <li>Exam-wise question bank</li>
          <li>Modern and responsive interface</li>
          <li>Designed specifically for Odisha Government Exams</li>
        </ul>
      </div>
    </main>
  );
}