import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Mountain, 
  Heart, 
  Users, 
  Camera,
  Mail,
  ArrowRight
} from 'lucide-react';
import { stories } from '../data';

export const HomePage: React.FC = () => {
  const [currentStory, setCurrentStory] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setInterval(() => {
      setCurrentStory(prev => (prev + 1) % stories.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=1600')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-green-900/70 via-green-800/60 to-amber-900/70" />
        
        <div className={`relative z-10 text-center px-6 max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <Mountain className="w-16 h-16 mx-auto mb-6 text-amber-200" />
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Remember Our
            <span className="block text-amber-300">Heritage</span>
          </h1>
          <p className="text-xl md:text-2xl text-amber-100 mb-8 max-w-2xl mx-auto leading-relaxed">
            Before the hills forget our stories, before the wind carries away our songs, 
            let us gather the threads of our culture and weave them into tomorrow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/stories"
              className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg inline-flex items-center justify-center gap-2"
            >
              Share Your Story
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link 
              to="/archive"
              className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 inline-flex items-center justify-center"
            >
              Explore Heritage
            </Link>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-50 to-transparent" />
      </section>

      {/* Featured Stories Preview */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-green-900 mb-6">
              Voices of Our Community
            </h2>
            <p className="text-xl text-green-700 max-w-3xl mx-auto mb-8">
              Every story is a bridge between past and present, every memory a treasure saved from time
            </p>
            <Link 
              to="/stories"
              className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold"
            >
              View All Stories <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="relative h-96 md:h-auto">
                  <img 
                    src={stories[currentStory].image} 
                    alt={stories[currentStory].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h3 className="text-3xl font-bold text-green-900 mb-4">
                    {stories[currentStory].title}
                  </h3>
                  <p className="text-lg text-green-700 mb-6 leading-relaxed">
                    "{stories[currentStory].text}"
                  </p>
                  <p className="text-amber-600 font-semibold">
                    — {stories[currentStory].author}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-20 px-6 bg-green-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-green-900 mb-6">
              Explore Our Heritage
            </h2>
            <p className="text-xl text-green-700">
              Discover the rich tapestry of our cultural traditions
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Traditional Crafts",
                description: "Learn the ancient arts passed down through generations",
                link: "/crafts",
                image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                title: "Elder Wisdom",
                description: "Listen to the voices of our community's living treasures",
                link: "/elders",
                image: "https://images.pexels.com/photos/1402407/pexels-photo-1402407.jpeg?auto=compress&cs=tinysrgb&w=600"
              },
              {
                title: "Cultural Archive",
                description: "Access our collection of recipes, songs, and stories",
                link: "/archive",
                image: "https://images.pexels.com/photos/1666021/pexels-photo-1666021.jpeg?auto=compress&cs=tinysrgb&w=600"
              }
            ].map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-green-900 mb-3">{item.title}</h3>
                  <p className="text-green-700 mb-4">{item.description}</p>
                  <div className="flex items-center text-amber-600 font-semibold">
                    Explore <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-6 bg-gradient-to-r from-green-800 to-amber-700">
        <div className="max-w-4xl mx-auto text-center">
          <Heart className="w-16 h-16 mx-auto mb-8 text-amber-200" />
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Be Part of Our Revival
          </h2>
          <p className="text-xl text-amber-100 mb-8 max-w-2xl mx-auto">
            Join us in preserving our heritage for future generations. Every story matters, 
            every tradition counts, every voice strengthens our community.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              to="/events"
              className="bg-amber-500 hover:bg-amber-400 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            >
              <Users className="w-5 h-5" />
              Join Our Community
            </Link>
            <Link 
              to="/gallery"
              className="border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Camera className="w-5 h-5" />
              Share Photos
            </Link>
          </div>

          <div className="max-w-md mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">Stay Connected</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-l-full border-0 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <button className="bg-amber-500 hover:bg-amber-400 px-6 py-3 rounded-r-full text-white font-semibold transition-colors">
                <Mail className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};