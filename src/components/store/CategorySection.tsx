import Link from 'next/link';

export default function CategorySection() {
  const categories = [
    {
      name: 'Apparel',
      image: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/b9b222d058-d07116d6f4e014965d57.png',
      href: '/store/apparel',
    },
    // Add more categories
  ];

  return (
    <section className="py-12 bg-gradient-to-r from-royal-DEFAULT to-royal-dark">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl text-white font-bold text-center mb-8">
          Shop by Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="category-card bg-white rounded-lg shadow-sm overflow-hidden transition hover:shadow-md"
            >
              <div className="h-40 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  src={category.image}
                  alt={category.name}
                />
              </div>
              <div className="p-4 text-center">
                <h3 className="font-medium text-royal-DEFAULT">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}