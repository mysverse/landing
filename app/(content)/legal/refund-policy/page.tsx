import type { Metadata } from "next";
import { legalEntity } from "data/legal";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund policy for MYSverse, covering developer payouts and payment dispute resolution."
};

export default function RefundPolicyPage() {
  return (
    <>
      <h1>Refund Policy</h1>
      <p className="text-sm opacity-60">
        Effective date: {legalEntity.effectiveDate}
      </p>

      <h2>1. Scope</h2>
      <p>
        This Refund Policy applies to all payment-related activities conducted by{" "}
        {legalEntity.name} ({legalEntity.registration}), operating as MYSverse
        (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
      </p>

      <h2>2. No Consumer Payments</h2>
      <p>
        MYSverse does not sell products, subscriptions, or services directly to
        end users or consumers. We do not accept payments from the public.
        Accordingly, there are no consumer purchases to refund.
      </p>
      <p>
        Any in-game purchases made within our Roblox experiences are processed
        entirely by the Roblox platform and are subject to{" "}
        <a
          href="https://en.help.roblox.com/hc/en-us/articles/206514399-Roblox-Refund-Policy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Roblox&apos;s own refund policy
        </a>
        . MYSverse has no control over and bears no responsibility for refunds of
        Roblox transactions.
      </p>

      <h2>3. Developer Payouts</h2>
      <p>
        Our payment platform is used exclusively to disburse payouts to
        developers and collaborators who contribute to MYSverse projects. These
        payouts represent compensation for work performed and are not commercial
        transactions subject to consumer refund rights.
      </p>

      <h3>3.1 Payout Corrections</h3>
      <p>
        If a payout is made in error (e.g. incorrect amount or recipient), we
        will work with the affected developer and our payment processor to
        resolve the issue. This may include:
      </p>
      <ul>
        <li>Issuing a corrective payment for underpayments</li>
        <li>
          Requesting a voluntary return of overpayments, which may be deducted
          from future payouts if not returned
        </li>
        <li>
          Coordinating with our payment processor to reverse erroneous
          transactions where possible
        </li>
      </ul>

      <h3>3.2 Payout Disputes</h3>
      <p>
        If you are a developer or collaborator and believe a payout is incorrect,
        missing, or otherwise disputed, please contact us at{" "}
        <a href={`mailto:${legalEntity.email}`}>{legalEntity.email}</a> with the
        following details:
      </p>
      <ul>
        <li>Your full name and contact information</li>
        <li>A description of the issue</li>
        <li>
          Any relevant supporting documentation (e.g. payout agreement,
          transaction reference)
        </li>
      </ul>
      <p>
        We will review all disputes in good faith and aim to resolve them within
        a reasonable timeframe.
      </p>

      <h2>4. Third-Party Payment Processor</h2>
      <p>
        All payouts are processed through a third-party payment processor. In
        some cases, disputes or corrections may be subject to the policies and
        processing times of the payment processor. We will make reasonable
        efforts to facilitate resolution but cannot guarantee outcomes that
        depend on third-party systems.
      </p>

      <h2>5. Changes to This Policy</h2>
      <p>
        We may update this Refund Policy from time to time. Changes will be
        posted on this page with an updated effective date. For material changes
        affecting developer payouts, we will make reasonable efforts to notify
        affected developers directly.
      </p>

      <h2>6. Contact Us</h2>
      <p>
        If you have any questions about this Refund Policy, please contact us at{" "}
        <a href={`mailto:${legalEntity.email}`}>{legalEntity.email}</a>.
      </p>
      <p>
        {legalEntity.name} ({legalEntity.registration})
      </p>
    </>
  );
}
