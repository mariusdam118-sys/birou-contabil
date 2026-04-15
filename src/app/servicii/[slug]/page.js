import { servicesContent } from '@/data/services-content';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return servicesContent.map((service) => ({
    slug: service.slug,
  }));
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = servicesContent.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  return (
    <>
      <main className="pt-24 pb-20 bg-base min-h-screen">
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16 block">
            <Link 
              href="/#services" 
              className="inline-flex items-center gap-2 text-sm font-bold text-primary-blue hover:gap-3 transition-all uppercase tracking-widest"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M19 12H5m0 0l7-7m-7 7l7 7" />
              </svg>
              Înapoi la servicii
            </Link>
          </div>

          <div className="pill-badge mb-8">Expertiză</div>
          <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] text-text-navy leading-none tracking-tight mb-12">
            {service.title}
          </h1>

          <div className="prose prose-lg max-w-none mb-16">
            <p className="text-2xl text-text-muted leading-snug font-medium mb-12">
              {service.intro}
            </p>

            <h2 className="text-2xl font-black text-text-navy mb-8 uppercase tracking-widest">
              Ce oferim:
            </h2>
            <ul className="space-y-6 list-none p-0">
              {service.deliverables.map((item, index) => (
                <li key={index} className="flex items-start gap-4 text-lg text-text-muted leading-relaxed">
                  <span className="mt-2.5 size-2 bg-accent-mustard rounded-full shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-8 pt-12 border-t border-slate-100">
            <Link 
              href="/#contact" 
              className="btn-agency-primary text-xl px-12 py-6 w-full sm:w-auto"
            >
              Solicită ofertă
            </Link>
            <p className="text-text-muted font-medium">
              Sau sună-ne direct: <a href="tel:+40722802121" className="text-primary-blue font-bold hover:text-accent-orange transition-colors">0722 802 121</a>
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
