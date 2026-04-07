import type { Metadata } from "next";
import { legalEntity } from "data/legal";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for MYSverse, detailing how we collect, use, and protect your personal information."
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="text-sm opacity-60">
        Effective date: {legalEntity.effectiveDate}
      </p>

      <h2>1. Introduction</h2>
      <p>
        {legalEntity.name} ({legalEntity.registration}), operating as MYSverse
        (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), is committed to
        protecting your privacy. This Privacy Policy explains how we collect,
        use, disclose, and safeguard your information when you interact with our
        services, including our website, game experiences, and developer payout
        platform.
      </p>

      <h2>2. Information We Collect</h2>
      <p>We may collect the following types of information:</p>

      <h3>2.1 Developer &amp; Collaborator Information</h3>
      <p>
        When you participate in our developer payout programme, we collect:
      </p>
      <ul>
        <li>Full name and contact details (e.g. email address)</li>
        <li>Roblox username and user ID</li>
        <li>
          Payment information required for payout processing (e.g. bank account
          details, payment processor account information)
        </li>
        <li>Tax-related information where required by applicable law</li>
      </ul>

      <h3>2.2 Website Analytics</h3>
      <p>
        We use Plausible Analytics, a privacy-focused analytics service, to
        collect anonymised usage data about visitors to our website. Plausible
        does not use cookies, does not collect personal data, and is fully
        compliant with GDPR, CCPA, and PECR. The data collected includes:
      </p>
      <ul>
        <li>Page views and referral sources</li>
        <li>Browser and device type (anonymised)</li>
        <li>Country-level location (no precise geolocation)</li>
      </ul>

      <h3>2.3 Communication Data</h3>
      <p>
        If you contact us via email or other channels, we may collect the content
        of your messages and any information you voluntarily provide.
      </p>

      <h2>3. How We Use Your Information</h2>
      <p>We use the information we collect to:</p>
      <ul>
        <li>
          Process and facilitate developer payouts through our third-party
          payment processor
        </li>
        <li>
          Communicate with developers regarding payout status, project updates,
          and related matters
        </li>
        <li>Comply with legal and tax obligations</li>
        <li>
          Improve our website and services based on anonymised analytics data
        </li>
        <li>Prevent fraud and ensure the security of our platform</li>
      </ul>

      <h2>4. Third-Party Sharing</h2>
      <p>
        We do not sell, trade, or rent your personal information. We may share
        your information with the following third parties:
      </p>
      <ul>
        <li>
          <strong>Payment processor:</strong> We share necessary payment
          information with our third-party payment processor to facilitate
          developer payouts. The payment processor handles your data in
          accordance with their own privacy policy.
        </li>
        <li>
          <strong>Legal compliance:</strong> We may disclose your information
          where required by law, regulation, legal process, or governmental
          request.
        </li>
        <li>
          <strong>Analytics:</strong> Plausible Analytics processes anonymised
          website usage data. No personal information is shared with Plausible.
        </li>
      </ul>

      <h2>5. Data Retention</h2>
      <p>
        We retain developer and collaborator information for as long as necessary
        to fulfil the purposes described in this policy, including:
      </p>
      <ul>
        <li>
          Payment records are retained for the duration of your participation in
          the developer payout programme and for a minimum period thereafter as
          required by applicable tax and financial regulations
        </li>
        <li>
          Communication records are retained for as long as necessary to resolve
          any related matters
        </li>
        <li>
          Analytics data is retained by Plausible in anonymised form and cannot
          be linked to individual users
        </li>
      </ul>

      <h2>6. Data Security</h2>
      <p>
        We implement reasonable technical and organisational measures to protect
        your personal information against unauthorised access, alteration,
        disclosure, or destruction. However, no method of transmission over the
        Internet or electronic storage is completely secure, and we cannot
        guarantee absolute security.
      </p>

      <h2>7. Your Rights</h2>
      <p>
        Depending on your jurisdiction, you may have the following rights
        regarding your personal information:
      </p>
      <ul>
        <li>
          <strong>Access:</strong> Request a copy of the personal information we
          hold about you
        </li>
        <li>
          <strong>Correction:</strong> Request correction of inaccurate or
          incomplete information
        </li>
        <li>
          <strong>Deletion:</strong> Request deletion of your personal
          information, subject to legal retention requirements
        </li>
        <li>
          <strong>Objection:</strong> Object to the processing of your personal
          information in certain circumstances
        </li>
      </ul>
      <p>
        To exercise any of these rights, please contact us at{" "}
        <a href={`mailto:${legalEntity.email}`}>{legalEntity.email}</a>.
      </p>

      <h2>8. Cookies</h2>
      <p>
        Our website does not use cookies for tracking or advertising purposes.
        Plausible Analytics, our analytics provider, operates without cookies.
        Essential cookies may be used solely for website functionality (e.g.
        theme preference).
      </p>

      <h2>9. Children&apos;s Privacy</h2>
      <p>
        Our developer payout programme is not intended for individuals under the
        age of 18. We do not knowingly collect personal information from children
        for the purposes of payment processing. If you believe we have
        inadvertently collected such information, please contact us immediately
        at <a href={`mailto:${legalEntity.email}`}>{legalEntity.email}</a> and
        we will take steps to delete it.
      </p>

      <h2>10. International Data Transfers</h2>
      <p>
        Your information may be transferred to and processed in countries other
        than your own, including Malaysia where {legalEntity.name} is
        registered. We ensure that appropriate safeguards are in place to protect
        your information in accordance with this policy.
      </p>

      <h2>11. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. Changes will be
        posted on this page with an updated effective date. For material changes
        affecting how we handle developer payment information, we will make
        reasonable efforts to notify affected individuals directly.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        If you have any questions or concerns about this Privacy Policy or our
        data practices, please contact us at{" "}
        <a href={`mailto:${legalEntity.email}`}>{legalEntity.email}</a>.
      </p>
      <p>
        {legalEntity.name} ({legalEntity.registration})
      </p>
    </>
  );
}
