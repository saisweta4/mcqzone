export default function PrivacyPolicyPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold mb-8">
        Privacy Policy
      </h1>

      <div className="space-y-8 text-gray-700 leading-8">

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Information We Collect
          </h2>

          <p>
            MCQZone collects only the information required to provide
            authentication and improve your learning experience.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Account Information
          </h2>

          <p>
            When you sign in using Clerk Authentication, we may store
            information such as your name, email address and profile
            picture.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            How We Use Your Information
          </h2>

          <ul className="list-disc ml-6 space-y-2">
            <li>Provide secure login</li>
            <li>Improve the platform</li>
            <li>Deliver AI-powered explanations</li>
            <li>Personalize your learning experience</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Data Security
          </h2>

          <p>
            We take reasonable measures to protect your personal information
            using secure authentication and modern web technologies.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Third-Party Services
          </h2>

          <p>
            MCQZone uses trusted third-party services such as Clerk for
            authentication and OpenAI to generate AI-powered explanations.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-2">
            Changes to this Policy
          </h2>

          <p>
            This Privacy Policy may be updated from time to time. Any
            changes will be reflected on this page.
          </p>
        </section>

      </div>
    </main>
  );
}