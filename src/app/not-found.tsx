import { Button } from "@/components/ui/Button";
import { SectionLabel } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <div className="shell grid min-h-[70vh] place-items-center py-32 text-center">
      <div>
        <SectionLabel className="mb-6 justify-center">Error 404</SectionLabel>
        <h1 className="text-hero">Nothing on this frame.</h1>
        <p className="mx-auto mt-6 max-w-md text-ink-secondary">
          The page you&apos;re looking for has moved or never existed. Let&apos;s
          get you back to the gear.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/" size="lg">Back home</Button>
          <Button href="/browse" size="lg" variant="secondary">Browse Gear</Button>
        </div>
      </div>
    </div>
  );
}
