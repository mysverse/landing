import type { Metadata } from "next";
import { legalEntity } from "data/legal";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "Terms and conditions governing the use of MYSverse services and developer payout platform."
};

export default function TermsPage() {
  return (
    <>
      <h1>Terms &amp; Conditions</h1>
      <p className="text-sm opacity-60">
        Effective date: {legalEntity.effectiveDate}
      </p>

      <h2>1. Introduction</h2>
      <p>
        These Terms &amp; Conditions (&quot;Terms&quot;) govern your access to
        and use of the services provided by {legalEntity.name} (
        {legalEntity.registration}), operating as MYSverse
        (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By accessing or
        using our services, you agree to be bound by these Terms.
      </p>

      <h2>2. Description of Services</h2>
      <p>
        MYSverse is a game development group that creates experiences on the
        Roblox platform. Our services include:
      </p>
      <ul>
        <li>
          Development and operation of game experiences on the Roblox platform
        </li>
        <li>
          A developer payout platform that facilitates automated compensation
          payments to contributing developers and collaborators
        </li>
        <li>Community engagement through our website and social channels</li>
      </ul>
      <p>
        <strong>Important:</strong> MYSverse does not sell products or services
        to end users and does not accept payments from consumers. Our payment
        platform is used exclusively for disbursing payouts to developers and
        collaborators who contribute to our projects.
      </p>

      <h2>3. Eligibility</h2>
      <p>
        To participate in our developer payout programme, you must:
      </p>
      <ul>
        <li>
          Be at least 18 years of age or the age of majority in your
          jurisdiction
        </li>
        <li>
          Provide accurate and complete information as required for payout
          processing
        </li>
        <li>
          Comply with all applicable laws and regulations in your jurisdiction
        </li>
      </ul>

      <h2>4. Developer Payout Terms</h2>
      <p>
        Developer payouts are processed through a third-party payment processor.
        By participating in the developer payout programme, you agree to the
        following:
      </p>
      <ul>
        <li>
          Payouts are compensation for development work, content creation, or
          other contributions to MYSverse projects as agreed upon between you and
          MYSverse
        </li>
        <li>
          You are responsible for providing accurate payment information and for
          any taxes or obligations arising from payments received
        </li>
        <li>
          Payout amounts, schedules, and conditions are determined by prior
          agreement between you and MYSverse
        </li>
        <li>
          We reserve the right to withhold or delay payouts if we reasonably
          suspect fraudulent activity, a breach of these Terms, or inaccurate
          information
        </li>
        <li>
          Payouts are subject to the terms and conditions of the third-party
          payment processor used to facilitate the transaction
        </li>
      </ul>

      <h2>5. Intellectual Property</h2>
      <p>
        All content, trademarks, logos, and intellectual property displayed on
        our website and within our game experiences are the property of{" "}
        {legalEntity.name} or their respective owners. You may not reproduce,
        distribute, or create derivative works from our content without prior
        written consent.
      </p>
      <p>
        Contributions made by developers under the payout programme are subject
        to the intellectual property terms agreed upon between the developer and
        MYSverse at the time of engagement.
      </p>

      <h2>6. User Conduct</h2>
      <p>You agree not to:</p>
      <ul>
        <li>
          Use our services for any unlawful or unauthorised purpose
        </li>
        <li>
          Provide false or misleading information in connection with payouts or
          account registration
        </li>
        <li>
          Attempt to gain unauthorised access to our systems or the systems of
          our payment processors
        </li>
        <li>
          Interfere with or disrupt the operation of our services
        </li>
      </ul>

      <h2>7. Limitation of Liability</h2>
      <p>
        To the fullest extent permitted by law, {legalEntity.name} shall not be
        liable for any indirect, incidental, special, consequential, or punitive
        damages arising from or related to your use of our services, including
        but not limited to delays or failures in payout processing caused by
        third-party payment processors.
      </p>
      <p>
        Our total liability for any claim arising from these Terms or your use of
        our services shall not exceed the total amount of payouts disbursed to
        you in the twelve (12) months preceding the claim.
      </p>

      <h2>8. Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless {legalEntity.name}, its
        officers, directors, and agents from any claims, damages, losses, or
        expenses (including reasonable legal fees) arising from your breach of
        these Terms or your use of our services.
      </p>

      <h2>9. Termination</h2>
      <p>
        We may suspend or terminate your access to our services or participation
        in the developer payout programme at any time, with or without cause,
        upon reasonable notice. Upon termination, any outstanding payouts that
        have been earned and approved will be processed in accordance with the
        applicable payout schedule, unless termination is due to a breach of
        these Terms.
      </p>

      <h2>10. Governing Law</h2>
      <p>
        These Terms shall be governed by and construed in accordance with the
        laws of Malaysia. Any disputes arising from these Terms shall be subject
        to the exclusive jurisdiction of the courts of Malaysia.
      </p>

      <h2>11. Modifications</h2>
      <p>
        We reserve the right to update or modify these Terms at any time. Changes
        will be posted on this page with an updated effective date. Your
        continued use of our services after any modifications constitutes
        acceptance of the revised Terms. For material changes affecting developer
        payouts, we will make reasonable efforts to notify affected developers
        directly.
      </p>

      <h2>12. Contact Us</h2>
      <p>
        If you have any questions about these Terms, please contact us at{" "}
        <a href={`mailto:${legalEntity.email}`}>{legalEntity.email}</a>.
      </p>
    </>
  );
}
