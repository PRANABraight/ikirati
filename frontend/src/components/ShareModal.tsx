import React, { useState } from 'react';
import { X, Copy, Facebook, Mail, Link, Check } from 'lucide-react';
import { Modal } from './Modal';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  ingredients?: string[];
  prep?: string[];
}

export const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, title, content, ingredients, prep }) => {
  const [copiedOption, setCopiedOption] = useState<string | null>(null);

  const shareUrl = window.location.href;
  const shareText = `Check out "${title}" from our cultural heritage archive!`;

  // The preview only shows a truncated `content`, but ingredients/prep are
  // part of what's being shared (e.g. a recipe) — every copy/share/email
  // action should carry the full text, not just the description.
  const fullContent = [
    content,
    ingredients && ingredients.length > 0
      ? `Ingredients:\n${ingredients.map((ing) => `- ${ing}`).join('\n')}`
      : null,
    prep && prep.length > 0
      ? `Preparation:\n${prep.map((step, idx) => `${idx + 1}. ${step}`).join('\n')}`
      : null,
  ]
    .filter(Boolean)
    .join('\n\n');

  const copyToClipboard = async (text: string, optionName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedOption(optionName);
      setTimeout(() => setCopiedOption(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const shareViaWebAPI = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `${shareText}\n\n${fullContent}`,
          url: shareUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard(`${shareText}\n\n${fullContent}\n\n${shareUrl}`, 'Share');
    }
  };

  const shareOptions = [
    {
      name: 'Copy Link',
      icon: <Link className="w-5 h-5" />,
      action: () => copyToClipboard(shareUrl, 'Copy Link'),
      color: 'bg-green-50 hover:bg-green-100 text-green-700 border border-green-200'
    },
    {
      name: 'Copy Content',
      icon: <Copy className="w-5 h-5" />,
      action: () => copyToClipboard(fullContent, 'Copy Content'),
      color: 'bg-green-100 hover:bg-green-200 text-green-800 border border-green-300'
    },
    {
      name: 'Email',
      icon: <Mail className="w-5 h-5" />,
      action: () => window.open(`mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(`${shareText}\n\n${fullContent}\n\n${shareUrl}`)}`),
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
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      label={`Share ${title}`}
      overlayClassName="bg-black/60 backdrop-blur-sm"
      panelClassName="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl"
    >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-green-900">Share "{title}"</h3>
          <button
            onClick={onClose}
            aria-label="Close share dialog"
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
              {copiedOption === option.name ? <Check className="w-5 h-5" /> : option.icon}
              <span className="font-medium">{copiedOption === option.name ? 'Copied!' : option.name}</span>
            </button>
          ))}
        </div>
    </Modal>
  );
};