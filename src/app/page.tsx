import { ContactDrawer } from "@/components/contact/contact-drawer";
import { Cursor } from "@/components/motion/cursor";
import { Loader } from "@/components/motion/loader";
import { MotionRuntime } from "@/components/motion/motion-runtime";
import { About } from "@/components/sections/about";
import { Community } from "@/components/sections/community";
import { Contact } from "@/components/sections/contact";
import { Hero } from "@/components/sections/hero";
import { Loop } from "@/components/sections/loop";
import { Mission } from "@/components/sections/mission";
import { Services } from "@/components/sections/services";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { Values } from "@/components/sections/values";
import { community, services, site, social } from "@/config/site";

const sameAs = [...social, ...community].flatMap((s) =>
  s.href ? [s.href] : [],
);

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  logo: `${site.url}/icon.svg`,
  email: site.email,
  description: site.description,
  slogan: site.tagline,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.countryCode,
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    email: site.email,
    availableLanguage: "en",
  },
  knowsAbout: services.map((s) => s.name),
  ...(sameAs.length > 0 && { sameAs }),
};

/**
 * Every section is a static Server Component. Interactivity lives in four
 * small client islands (motion runtime, loader, cursor, contact drawer) that
 * enhance the server-rendered markup via data attributes.
 */
export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="content" tabIndex={-1} className="outline-none">
        <Hero />
        <Mission />
        <About />
        <Services />
        <Loop />
        <Values />
        <Community />
        <Contact />
      </main>
      <SiteFooter />

      <ContactDrawer />
      <Cursor />
      <Loader />
      <MotionRuntime />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
