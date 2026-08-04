import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { SignatureSection } from "@/components/signature/SignatureSection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />

        <SignatureSection />

        <PlaceholderSection id="products" title="Products" />
        <PlaceholderSection id="about" title="About" />
        <PlaceholderSection id="gallery" title="Gallery" />
        <PlaceholderSection id="contact" title="Contact" />
      </main>
    </>
  );
}

function PlaceholderSection({ id, title }: { id: string; title: string }) {
  return (
    <section
      id={id}
      className="flex min-h-[70vh] items-center justify-center border-t border-border/50"
    >
      <h2 className="font-heading text-4xl font-medium text-muted-foreground">
        {title}
      </h2>
    </section>
  );
}