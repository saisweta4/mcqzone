import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer-gradient text-white py-12 mt-auto">
      <div className="container-custom grid grid-cols-2 md:grid-cols-5 gap-8">

        {/* Brand */}
        <div className="col-span-2 md:col-span-1">
          <h3 className="text-2xl font-bold mb-4">
            MCQZone
          </h3>

          <p className="text-blue-100 text-sm leading-6">
            Free AI-powered platform for Odisha Government Exam preparation with
            exam-wise and subject-wise MCQs.
          </p>
        </div>

        {/* Exams */}
        <div>
          <h4 className="font-semibold mb-4">
            Exams
          </h4>

          <ul className="space-y-2 text-sm text-blue-100">
            <li><Link href="/exams" className="hover:text-white">All Exams</Link></li>
            <li><Link href="/exams/opsc" className="hover:text-white">OPSC</Link></li>
            <li><Link href="/exams/ossc" className="hover:text-white">OSSC</Link></li>
            <li><Link href="/exams/railway" className="hover:text-white">Railway</Link></li>
            <li><Link href="/exams/banking" className="hover:text-white">Banking</Link></li>
            <li><Link href="/exams" className="hover:text-white">More Exams</Link></li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h4 className="font-semibold mb-4">
            Features
          </h4>

          <ul className="space-y-2 text-sm text-blue-100">
            <li><Link href="/study-planner" className="hover:text-white">Study Planner</Link></li>
            <li><Link href="/ai-chatbot" className="hover:text-white">AI Chatbot</Link></li>
            <li><Link href="/profile" className="hover:text-white">My Profile</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-semibold mb-4">
            Company
          </h4>

          <ul className="space-y-2 text-sm text-blue-100">
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="container-custom mt-12 pt-8 border-t border-blue-400/30 text-center text-sm text-blue-200">
        <p>
          © {new Date().getFullYear()} MCQZone. All rights reserved.
        </p>

        <p className="mt-2">
          Made for Odisha Government Exam Aspirants ❤️
        </p>
      </div>
    </footer>
  );
}