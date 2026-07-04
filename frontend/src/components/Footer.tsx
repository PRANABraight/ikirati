import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white py-16 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6 group">
              <Mountain className="w-10 h-10 text-amber-400 group-hover:text-amber-300 transition-colors" />
              <span className="font-bold text-2xl tracking-tight text-white group-hover:text-amber-100 transition-colors">
                Kirati<span className="text-amber-400">Heart</span>
              </span>
            </Link>
            <p className="text-green-200 leading-relaxed mb-6">
              Preserving the rich tapestry of Kirati culture, weaving together stories, traditions, and memories for future generations.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-6 text-amber-400">Discover</h4>
            <ul className="space-y-4 text-green-200">
              <li><Link to="/stories" className="hover:text-white transition-colors">Stories</Link></li>
              <li><Link to="/timeline" className="hover:text-white transition-colors">Timeline</Link></li>
              {/* <li><Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link></li> */}
              {/* <li><Link to="/crafts" className="hover:text-white transition-colors">Crafts</Link></li> */}
            </ul>
          </div>

          {/* <div> */}
            {/* <h4 className="font-bold text-lg mb-6 text-amber-400">Community</h4>
            <ul className="space-y-4 text-green-200"> */}
              {/* <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li> */}
              {/* <li><Link to="/elders" className="hover:text-white transition-colors">Elders</Link></li> */}
              {/* <li><Link to="/language" className="hover:text-white transition-colors">Language</Link></li> */}
            {/* </ul>
          </div> */}

          <div>
            <h4 className="font-bold text-lg mb-6 text-amber-400">Resources</h4>
            <ul className="space-y-4 text-green-200">
              <li><Link to="/archive" className="hover:text-white transition-colors">Archive</Link></li>
              <li><a href="mailto:pranab.rai@coss.org.in" className="hover:text-white transition-colors">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-green-800 pt-8 flex flex-col md:flex-row justify-between items-center text-green-400 text-sm">
          <p>&copy; 2025 Kirati Heritage Community. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {/* <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a> */}
          </div>
        </div>
      </div>
    </footer>
  );
};