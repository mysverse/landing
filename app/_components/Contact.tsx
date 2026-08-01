import { EnvelopeIcon, MapIcon, PhoneIcon } from "@heroicons/react/20/solid";

import { Link } from "i18n/navigation";
import PlausibleWrapper from "./PlausibleWrapper";
import ContactRouter from "./ContactRouter";
import Container from "app/_components/ui/Container";
import { useTranslations } from "next-intl";

export default function Contact() {
  const t = useTranslations("Contact");

  return (
    <section className="py-12 sm:py-24">
      <Container>
        <div className="divide-edge mx-auto max-w-2xl space-y-16 divide-y lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div>
              <h2 className="heading-2" id="contact">
                {t("title")}
              </h2>
              <p className="body-base mt-4">{t("desc")}</p>
              <div className="border-edge bg-surface-card mt-8 rounded-2xl border p-10 shadow-sm">
                <h3 className="text-strong text-base leading-7 font-semibold">
                  MYSverse Digital Ventures
                </h3>
                <h4 className="text-primary text-sm leading-5 font-medium">
                  <Link href="/ssm_cert.pdf" target="_blank">
                    202303234965 (AS0469188-M)
                  </Link>
                </h4>
                <dl className="text-strong mt-3 space-y-1 text-sm leading-6">
                  <div className="flex flex-col gap-y-2">
                    <dt className="sr-only">{t("sr.address")}</dt>
                    <dd>
                      <div className="flex items-center gap-x-2">
                        <MapIcon className="h-4 flex-none" />
                        <span className="leading-5">
                          A-5-10 Empire Tower SS16/1, 47500 Subang Jaya,
                          Selangor, Malaysia
                        </span>
                      </div>
                    </dd>
                    <dt className="sr-only">{t("sr.address")}</dt>
                    <dd>
                      <PlausibleWrapper
                        eventName="contactClicked"
                        eventProps={{
                          props: {
                            type: "email"
                          }
                        }}
                      >
                        <div className="text-primary font-semibold">
                          <Link
                            className="flex items-center gap-x-2"
                            href="mailto:yan@mysver.se"
                          >
                            <EnvelopeIcon className="h-4" />
                            <span>yan@mysver.se</span>
                          </Link>
                        </div>
                      </PlausibleWrapper>
                    </dd>
                    <dt className="sr-only">{t("sr.email")}</dt>
                    <dd>
                      <PlausibleWrapper
                        eventName="contactClicked"
                        eventProps={{
                          props: {
                            type: "phone"
                          }
                        }}
                      >
                        <div className="text-primary font-semibold">
                          <Link
                            className="flex items-center gap-x-2"
                            href="tel:0350219170"
                          >
                            <PhoneIcon className="h-4" />
                            <span className="tracking-wide">03-50219170</span>
                          </Link>
                        </div>
                      </PlausibleWrapper>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
            <ContactRouter className="lg:col-span-2" />
          </div>
        </div>
      </Container>
    </section>
  );
}
