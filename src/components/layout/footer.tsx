import Link from "next/link";

export function Footer() {
  return (
    <footer className="footer-gradient text-white py-12 mt-auto">
      <div className="container-custom grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">MCQZone</h3>
          <p className="text-blue-100 text-sm">Prepare smarter for Odisha Government Exams.</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><Link href="#" className="hover:text-white">Free Mock Tests</Link></li>
            <li><Link href="#" className="hover:text-white">Study Planner</Link></li>
            <li><Link href="#" className="hover:text-white">Current Affairs</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Company</h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><Link href="#" className="hover:text-white">Success Stories</Link></li>
            <li><Link href="#" className="hover:text-white">About Us</Link></li>
            <li><Link href="#" className="hover:text-white">Contact Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm text-blue-100">
            <li><Link href="#" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white">Terms of Service</Link></li>
          </ul>
        </div>
      </div>
      <div className="container-custom mt-12 pt-8 border-t border-blue-400/30 text-center text-sm text-blue-200">
        <p>© {new Date().getFullYear()} MCQZone. All rights reserved.</p>
      </div>
    </footer>
  );
}