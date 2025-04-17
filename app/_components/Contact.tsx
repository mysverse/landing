import WhatsappButton from "public/ChatOnWhatsAppButton/WhatsAppButtonGreenMedium.svg";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiscord, faGuilded } from "@fortawesome/free-brands-svg-icons";

import { EnvelopeIcon, MapIcon, PhoneIcon } from "@heroicons/react/20/solid";

import Link from "next/link";
import PlausibleWrapper from "./PlausibleWrapper";

export default function Contact() {
  return (
    <div className="py-12 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-16 divide-y divide-gray-100 lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-3">
            <div>
              <h2
                className="text-3xl font-bold tracking-tight text-black dark:text-white"
                id="contact"
              >
                Get in touch
              </h2>
              <p className="mt-4 leading-7 text-gray-800 dark:text-white">
                For legal matters, commercial opportunities, collaborations, or
                any general enquiries, feel free to reach out - we bring over 10
                years of combined player and developer experience to the table.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:col-span-2 lg:grid-cols-2 lg:gap-8">
              <div className="flex flex-col place-content-center justify-center rounded-2xl bg-white p-10 dark:bg-slate-800">
                <h3 className="text-black-100 text-base leading-7 font-semibold dark:text-white">
                  MYSverse Digital Ventures
                </h3>
                <h4 className="text-primary text-sm leading-5 font-medium">
                  <Link href="/ssm_cert.pdf" target="_blank">
                    202303234965 (AS0469188-M)
                  </Link>
                </h4>
                <dl className="text-black-100 mt-3 space-y-1 text-sm leading-6 dark:text-white">
                  {/* <div>
                    <dt className="sr-only">Registration</dt>
                    <dd>202303234965 (AS0469188-M)</dd>
                  </div> */}
                  <div className="flex flex-col gap-y-2">
                    <dt className="sr-only">Address</dt>
                    <dd>
                      <div className="flex items-center gap-x-2">
                        <MapIcon className="h-4 flex-none" />
                        <span className="leading-5">
                          A-5-10 Empire Tower SS16/1, 47500 Subang Jaya,
                          Selangor, Malaysia
                        </span>
                      </div>
                    </dd>
                    <dt className="sr-only">Address</dt>
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
                    <dt className="sr-only">Email</dt>
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
                  {/* <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 905-2345</dd>
                  </div> */}
                </dl>
              </div>
              <div className="flex flex-col place-content-center justify-center rounded-2xl bg-white p-10 dark:bg-slate-800">
                <h3 className="text-black-100 text-base leading-7 font-semibold dark:text-white">
                  Shoot us a message
                </h3>
                <h4 className="text-black-100 text-sm leading-7 font-normal opacity-80 dark:text-white">
                  For businesses and organisations
                </h4>
                <dl className="text-black-100 mt-3 space-y-1 text-sm leading-6 dark:text-white">
                  <div className="flex flex-col gap-y-4">
                    <dt className="sr-only">WhatsApp</dt>
                    <dd>
                      <Link href="https://wa.me/601154156978" target="_blank">
                        <WhatsappButton />
                      </Link>
                    </dd>
                    <dt className="sr-only">Cal.com</dt>
                    {/* <dd>
                      <CalButton />
                    </dd> */}
                  </div>
                  {/* <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 905-2345</dd>
                  </div> */}
                </dl>
              </div>
              <div className="flex flex-col place-content-center justify-center rounded-2xl bg-white p-10 dark:bg-slate-800">
                <h3 className="text-black-100 text-base leading-7 font-semibold dark:text-white">
                  Join the community
                </h3>
                <h4 className="text-black-100 text-sm leading-7 font-normal opacity-80 dark:text-white">
                  For game-related matters
                </h4>
                <dl className="text-black-100 mt-3 space-y-1 text-sm leading-6 dark:text-white">
                  <div className="flex flex-row gap-x-4">
                    <dt className="sr-only">Discord</dt>
                    <dd>
                      <Link
                        href="https://discord.com/invite/uPkrYWd"
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faDiscord} size="xl" />
                      </Link>
                    </dd>
                    <dt className="sr-only">Guilded</dt>
                    <dd>
                      <Link href="https://guilded.gg/mys" target="_blank">
                        <FontAwesomeIcon icon={faGuilded} size="xl" />
                      </Link>
                    </dd>
                  </div>
                  {/* <div className="mt-1">
                    <dt className="sr-only">Phone number</dt>
                    <dd>+1 (555) 905-2345</dd>
                  </div> */}
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
