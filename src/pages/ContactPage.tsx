import Contact from "@/components/sections/Contact";

export default function ContactPage() {
  return (
    <>
      <section className="py-20 bg-gray-50 text-center">
        <h1 className="text-5xl font-bold text-gray-800">Contact Me</h1>
        <p className="text-gray-500 mt-4 text-lg">
          Let's work together
        </p>
      </section>
      <Contact />
    </>
  );
}