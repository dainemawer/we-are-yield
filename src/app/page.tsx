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
import { site } from "@/config/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  url: site.url,
  email: site.email,
  description: site.description,
  slogan: site.tagline,
  logo: `${site.url}/icon.svg`,
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
