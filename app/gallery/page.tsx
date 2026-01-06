import { Metadata } from 'next';
import Link from 'next/link';
import { content } from '@/lib/content';

export const metadata: Metadata = {
  title: `Gallery | ${content.business.name}`,
  description: `View our portfolio of completed ${content.business.service.toLowerCase()} projects. See examples of our professional work from ${content.business.name} in ${content.business.city}.`,
};

export default function GalleryPage() {
  const { business, gallery, services } = content;

  // Generate categories from actual services
  const categories = services.slice(0, 6).map(s => s.title.split(' ').slice(0, 2).join(' '));

  // Use gallery from content.json or generate from services
  const galleryItems = gallery && gallery.length > 0
    ? gallery
    : services.map((service, i) => ({
        image: service.image,
        alt: service.title,
        category: service.title.split(' ').slice(0, 2).join(' ')
      }));

  return (
    <>
      {/* Hero */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>/</span>
            <span className="text-white">Gallery</span>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Our Work</h1>
            <p className="text-xl text-gray-300">
              Browse through our completed {business.service.toLowerCase()} projects in {business.city}.
              Quality workmanship and professional results on every job.
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-gray-50 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            <button className="px-5 py-2 rounded-full bg-brand text-white font-medium">
              All
            </button>
            {categories.map((category) => (
              <button key={category} className="px-5 py-2 rounded-full bg-white text-gray-600 hover:bg-brand/10 hover:text-brand font-medium transition-colors border border-gray-200">
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {galleryItems.map((item, i) => (
              <div key={i} className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer">
                <img
                  src={item.image}
                  alt={item.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <span className="inline-block bg-brand text-white text-xs px-3 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Want Results Like These?
          </h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Contact us today for a free quote on your {business.service.toLowerCase()} project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 bg-brand hover:bg-brand-dark text-white px-8 py-4 rounded-full text-lg font-semibold transition-all"
            >
              Get Free Quote
            </Link>
            <a
              href={`tel:${business.phone}`}
              className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-gray-900 transition-all"
            >
              Call {business.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Our Services</h2>
            <p className="text-gray-600 mt-2">Professional {business.service.toLowerCase()} for {business.city}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {services.slice(0, 3).map((service) => (
              <Link key={service.slug} href={`/services/${service.slug}`} className="group">
                <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-brand transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 mt-1">{service.shortDescription}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
