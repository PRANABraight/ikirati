import React from 'react';
import { Mountain } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-green-900 text-white py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <Mountain className="w-12 h-12 mb-4 text-amber-400" />
            <p className="text-green-200">
              Preserving our heritage, one story at a time.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Heritage</h4>
            <ul className="space-y-2 text-green-200">
              <li><a href="#" className="hover:text-amber-300 transition-colors">Stories</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Traditions</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Timeline</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Gallery</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Community</h4>
            <ul className="space-y-2 text-green-200">
              <li><a href="#" className="hover:text-amber-300 transition-colors">Join Us</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Events</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Volunteer</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-4">Resources</h4>
            <ul className="space-y-2 text-green-200">
              <li><a href="#" className="hover:text-amber-300 transition-colors">Archive</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Research</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Education</a></li>
              <li><a href="#" className="hover:text-amber-300 transition-colors">Support</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-300">
          <p>&copy; 2024 Heritage Community. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};