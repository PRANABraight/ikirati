import React from 'react';
import { X, Copy, Facebook, Twitter, Mail, Link } from 'lucide-react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, content }) => {
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
      color: 'bg-gray-100 hover:bg-gray-200 text-gray-700'
    },
    {
      name: 'Copy Content',
      icon: <Copy className="w-5 h-5" />,
      action: () => copyToClipboard(content),
      color: 'bg-green-100 hover:bg-green-200 text-green-700'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      action: () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${content}\n\n${shareUrl}`)}`),
      color: 'bg-blue-100 hover:bg-blue-200 text-blue-700'
    },
    {
      name: 'Share',
      icon: <Facebook className="w-5 h-5" />,
      action: shareViaWebAPI,
      color: 'bg-amber-100 hover:bg-amber-200 text-amber-700'
    }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-green-900">Share "{title}"</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="mb-6">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-700 text-sm">{content.substring(0, 150)}...</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {shareOptions.map((option, index) => (
            <button
              key={index}
              onClick={option.action}
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${option.color}`}
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