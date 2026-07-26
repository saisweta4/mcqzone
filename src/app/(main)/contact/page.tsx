export default function ContactPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-6">
        Contact Us
      </h1>

      <div className="space-y-6 text-gray-700 leading-8">

        <p>
          We'd love to hear from you.
        </p>

        <p>
          If you've found a bug, have a feature request, or want to
          provide feedback about MCQZone, feel free to contact us.
        </p>

        <div className="border rounded-xl p-6 bg-gray-50">
          <h2 className="text-xl font-semibold mb-4">
            Contact Information
          </h2>

          <p>
            📧 Email: support@mcqzone.in
          </p>

          <p>
            🌐 Website: https://mcqzone.in
          </p>

          <p>
            📍 Odisha, India
          </p>
        </div>

        <p className="text-sm text-gray-500">
          We generally respond within 24–48 business hours.
        </p>

      </div>
    </main>
  );
}