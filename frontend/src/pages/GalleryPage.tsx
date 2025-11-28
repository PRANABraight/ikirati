import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { galleryImages } from '../data';
import { ScrollRevealSection } from '../components/ScrollReveal';

export const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const allImages = [
    ...galleryImages,
    ...galleryImages.map((img, index) => ({
      ...img,
      title: `${img.title} - View ${index + 4}`,
      image: img.image.replace('w=800', 'w=1200')
    }))
  ];

  return (
    <div className="overflow-x-hidden">
      {/* Parallax Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-100 ease-out"
          style={{
            backgroundImage: "url('/src/assets/cultur.webp')", // Reusing cultural image or specific gallery hero
            transform: `translateY(${scrollY * 0.5}px) scale(${1 + scrollY * 0.0005})`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/80 via-green-800/60 to-amber-50" />

        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-xl">
            Heritage Gallery
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 drop-shadow-md max-w-2xl mx-auto">
            The landscape that shaped our souls and stories
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {allImages.map((item, index) => (
              <ScrollRevealSection key={index} className={`delay-${(index % 3) * 100}`}>
                <div
                  className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer border-4 border-white hover:border-amber-300 transition-all duration-300"
                  onClick={() => setSelectedImage(index)}
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                    <p className="text-amber-200">{item.description}</p>
                  </div>
                </div>
              </ScrollRevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 flex items-center justify-center z-50 p-4 backdrop-blur-sm" onClick={() => setSelectedImage(null)}>
          <div className="relative max-w-5xl w-full" onClick={e => e.stopPropagation()}>
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-amber-400 transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="relative rounded-lg overflow-hidden shadow-2xl border border-white/10">
              <img
                src={allImages[selectedImage].image}
                alt={allImages[selectedImage].title}
                className="w-full h-auto max-h-[80vh] object-contain bg-black"
              />

              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  {allImages[selectedImage].title}
                </h3>
                <p className="text-xl text-gray-200">
                  {allImages[selectedImage].description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Photo Categories */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <ScrollRevealSection>
            <h2 className="text-4xl font-bold text-green-900 mb-16 text-center">
              Photo Categories
            </h2>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: 'Sacred Places', count: 24, color: 'bg-green-100 text-green-800' },
                { name: 'Traditional Crafts', count: 18, color: 'bg-amber-100 text-amber-800' },
                { name: 'Community Events', count: 32, color: 'bg-green-100 text-green-800' },
                { name: 'Historical Photos', count: 15, color: 'bg-amber-100 text-amber-800' }
              ].map((category, index) => (
                <div key={index} className={`${category.color} rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1`}>
                  <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                  <p className="opacity-80 font-medium">{category.count} photos</p>
                </div>
              ))}
            </div>
          </ScrollRevealSection>
        </div>
      </section>

      {/* Contribute Photos */}
      <section className="py-24 px-6 bg-green-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollRevealSection>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              Share Your Photos
            </h2>
            <p className="text-xl text-green-100 mb-10 max-w-2xl mx-auto leading-relaxed">
              Help us build our visual archive by sharing photos of our community,
              traditions, and sacred places.
            </p>
            <button className="bg-amber-500 hover:bg-amber-400 text-white px-10 py-5 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
              Upload Photos
            </button>
          </ScrollRevealSection>
        </div>
      </section>
    </div>
  );
};