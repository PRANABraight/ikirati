import React from 'react';
import { Calendar } from 'lucide-react';
import { timeline } from '../data';

interface TimelineModalProps {
    isOpen: boolean;
    onClose: () => void;
    event: typeof timeline[0] | null;
    icon: React.ReactNode;
}

export const TimelineModal: React.FC<TimelineModalProps> = ({ isOpen, onClose, event, icon }) => {
    if (!isOpen || !event) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="absolute inset-0 bg-green-950/80 backdrop-blur-sm" />

            <div
                className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden animate-scale-up"
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div className="relative h-48 bg-gradient-to-r from-green-900 to-green-800 p-8 flex flex-col justify-end">
                    {/* <div className="absolute top-0 right-0 p-4">
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>
                    </div> */}

                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 -mr-16 -mt-16" />

                    <div className="relative z-10 flex items-end gap-4">
                        <div className="p-4 bg-white/10 backdrop-blur-md rounded-2xl text-amber-300 border border-white/20 shadow-lg">
                            {icon}
                        </div>
                        <div>
                            <div className="flex items-center gap-2 text-green-200 mb-1 text-sm font-bold uppercase tracking-wider">
                                <Calendar className="w-4 h-4" />
                                <span>Historical Event</span>
                            </div>
                            <h2 className="text-4xl font-bold text-white font-serif">{event.year}</h2>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8 md:p-10 bg-white">
                    <h3 className="text-2xl font-bold text-green-900 mb-6 font-serif">{event.event}</h3>

                    <div className="prose prose-green max-w-none">
                        <p className="text-lg text-green-800 leading-relaxed">
                            {event.description || "Detailed historical information for this period is currently being researched and archived."}
                        </p>
                    </div>

                    <div className="mt-8 pt-8 border-t border-green-50 flex justify-end">
                        <button
                            onClick={onClose}
                            className="px-6 py-3 bg-green-50 hover:bg-green-100 text-green-800 rounded-xl font-bold transition-colors"
                        >
                            Close Detail
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
