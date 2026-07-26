import {
  Sparkles,
  CalendarDays,
  BrainCircuit,
  Clock3,
  Rocket,
} from "lucide-react";

export default function StudyPlannerComingSoon() {
  return (
    <main className="min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-3xl w-full text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border bg-blue-50 px-4 py-2 text-primary text-sm font-medium">
          <Sparkles className="w-4 h-4" />
          New AI Feature
        </div>

        {/* Title */}
        <h1 className="mt-8 text-4xl md:text-5xl font-bold text-gray-900">
          AI Study Planner
        </h1>

        <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
          We're building an intelligent study planner that creates a
          personalized preparation schedule based on your exam,
          available study time, strengths, and weak areas.
        </p>

        {/* Preview Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <CalendarDays className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold">
              Daily Schedule
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Automatically generated day-wise study plan.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <BrainCircuit className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold">
              AI Recommendations
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Personalized recommendations based on performance.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <Clock3 className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold">
              Time Tracking
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Balance your preparation with available study hours.
            </p>
          </div>

          <div className="rounded-2xl border bg-white p-6 shadow-sm">
            <Rocket className="w-10 h-10 text-primary mx-auto mb-4" />
            <h3 className="font-semibold">
              Progress Boost
            </h3>
            <p className="text-sm text-gray-500 mt-2">
              Smart milestones and revision reminders.
            </p>
          </div>

        </div>

        {/* Coming Soon Box */}
        <div className="mt-16 rounded-3xl border border-dashed border-primary/30 bg-blue-50 p-10">

          <div className="text-6xl mb-4">
            🚀
          </div>

          <h2 className="text-2xl font-bold text-gray-900">
            Coming Soon
          </h2>

          <p className="mt-3 text-gray-600 max-w-xl mx-auto">
            We're working hard to bring you an AI-powered study planner
            that will make your exam preparation smarter, faster, and
            more organized.
          </p>

          <div className="mt-8 inline-flex items-center rounded-full bg-primary px-6 py-3 text-white font-medium shadow-lg">
            Stay Tuned
          </div>

        </div>

      </div>
    </main>
  );
}