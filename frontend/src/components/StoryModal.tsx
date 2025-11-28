import React from 'react';
import { X, User, Clock } from 'lucide-react';

interface Story {
    image: string;
    title: string;
    text: string;
    author: string;
    date?: string;
}

interface StoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    story: Story | null;
}

export const StoryModal: React.FC<StoryModalProps> = ({ isOpen, onClose, story }) => {
    if (!isOpen || !story) return null;

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in" onClick={onClose}>
            <div
                className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] shadow-2xl transform transition-all animate-scale-up flex flex-col overflow-hidden"
                onClick={e => e.stopPropagation()}
            >
                {/* Header Image */}
                <div className="relative h-64 shrink-0">
                    <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors backdrop-blur-sm"
                    >
                        <X className="w-6 h-6" />
                    </button>

                    <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-2 drop-shadow-lg">{story.title}</h2>
                        <div className="flex items-center gap-6 text-amber-200 text-sm font-medium">
                            {story.author && (
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{story.author}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4" />
                                <span>5 min read</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 overflow-y-auto custom-scrollbar bg-amber-50/30">
                    <div className="prose prose-lg prose-green max-w-none">
                        {story.text.split('\n\n').map((paragraph, index) => (
                            <p key={index}
                            // className="text-green-800 leading-relaxed mb-6 first-letter:text-5xl first-letter:font-bold first-letter:text-amber-600 first-letter:mr-3 first-letter:float-left"
                            >
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    <div className="mt-12 pt-8 border-t border-amber-100 flex justify-center">
                        <p className="text-amber-700 italic font-medium">
                            ~ End of Story ~
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
