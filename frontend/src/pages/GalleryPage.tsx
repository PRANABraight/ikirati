import React, { useState } from 'react';
import { Camera, X } from 'lucide-react';
import { galleryImages } from '../data';

export const GalleryPage: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const allImages = [
    ...galleryImages,
    ...galleryImages.map((img, index) => ({
      ...img,
      title: `${img.title} - View ${index + 4}`,
      image: img.image.replace('w=800', 'w=1200')
    }))
  ];

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="py-20 px-6 bg-amber-50">
        <div className="max-w-4xl mx-auto text-center">
          <Camera className="w-16 h-16 mx-auto mb-6 text-amber-600" />
          <h1 className="text-5xl font-bold text-green-900 mb-6">
            Heritage Gallery
          </h1>
          <p className="text-xl text-green-700">
            The landscape that shaped our souls and stories
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {allImages.map((item, index) => (
              <div 
                key={index} 
                className="group relative overflow-hidden rounded-2xl shadow-xl cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                  <p className="text-green-100">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4">
          <div className="relative max-w-4xl w-full">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>
            
            <img 
              src={allImages[selectedImage].image} 
              alt={allImages[selectedImage].title}
              className="w-full h-auto rounded-lg"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
              <h3 className="text-2xl font-bold text-white mb-2">
                {allImages[selectedImage].title}
              </h3>
              <p className="text-gray-200">
                {allImages[selectedImage].description}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Photo Categories */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-green-900 mb-12 text-center">
            Photo Categories
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Sacred Places', count: 24 },
              { name: 'Traditional Crafts', count: 18 },
              { name: 'Community Events', count: 32 },
              { name: 'Historical Photos', count: 15 }
            ].map((category, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer">
                <h3 className="text-xl font-bold text-green-900 mb-2">{category.name}</h3>
                <p className="text-green-600">{category.count} photos</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contribute Photos */}
      <section className="py-20 px-6 bg-green-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Share Your Photos
          </h2>
          <p className="text-xl text-green-200 mb-8">
            Help us build our visual archive by sharing photos of our community, 
            traditions, and sacred places.
          </p>
          <button className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg">
            Upload Photos
          </button>
        </div>
      </section>
    </div>
  );
};