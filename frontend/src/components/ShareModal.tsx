import React from 'react';
import { X, Copy, Facebook, Mail, Link } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  ingredients?: string[];
  prep?: string[];
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, content, ingredients, prep }) => {
  if (!isOpen) return null;

  const shareUrl = window.location.href;
  const shareText = `Check out "${title}" from our cultural heritage archive!`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert('Copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareViaWebAPI = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard(`${shareText}\n\n${content}\n\n${shareUrl}`);
    }
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: <Link className="w-5 h-5" />,
      action: () => copyToClipboard(shareUrl),
      color: 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-200'
    },
    {
      name: 'Copy Content',
      icon: <Copy className="w-5 h-5" />,
      action: () => copyToClipboard(content),
      color: 'bg-green-100 hover:bg-green-200 text-green-800 border border-green-300'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      action: () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${content}\n\n${shareUrl}`)}`),
      color: 'bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200'
    },
    {
      name: 'Share',
      icon: <Facebook className="w-5 h-5" />,
      action: shareViaWebAPI,
      color: 'bg-amber-100 hover:bg-amber-200 text-amber-800 border border-amber-300'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl transform transition-all animate-scale-up">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-green-900">Share "{title}"</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-green-50 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-green-700" />
          </button>
        </div>

        <div className="mb-6 max-h-[60vh] overflow-y-auto custom-scrollbar pr-2">
          <div className="bg-green-50 p-4 rounded-lg border border-green-100">
            <p className="text-green-700 text-sm italic">"{content.substring(0, 150)}..."</p>
            {ingredients && ingredients.length > 0 && (
              <div className="mt-3">
                <span className="font-semibold text-green-800 text-xs uppercase tracking-wider">Ingredients</span>
                <ul className="list-disc list-inside text-green-700 text-sm mt-1">
                  {ingredients.map((ing, idx) => (
                    <li key={idx}>{ing}</li>
                  ))}
                </ul>
              </div>
            )}
            {prep && prep.length > 0 && (
              <div className="mt-2">
                <span className="font-semibold text-green-800 text-xs uppercase tracking-wider">Preparation</span>
                <ol className="list-decimal list-inside text-green-700 text-sm mt-1">
                  {prep.map((step, idx) => (
                    <li key={idx}>{step}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {shareOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 transform hover:scale-105 ${option.color}`}
            >
              {option.icon}
              <span className="font-medium">{option.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};