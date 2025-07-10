import React from 'react';
import { WHATSAPP_NUMBER, WHATSAPP_AD_MESSAGE } from '../constants';

const AdBanner = () => {
    const handleContactClick = () => {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_AD_MESSAGE)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    const handleWorksClick = () => {
        const url = 'https://instagram.com/hamrasart';
        window.open(url, '_blank', 'noopener,noreferrer');
    };

    return (
        <div 
            className="my-8 p-6 bg-gradient-to-r from-kerala-700 via-kerala-800 to-emerald-700 text-white rounded-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6"
        >
            <div className="flex-shrink-0">
                 <img 
                    src="https://i.pinimg.com/564x/44/9a/b4/449ab4ac52a8a514fd24045a552548e6.jpg" 
                    alt="Kerala style house" 
                    className="w-24 h-24 object-cover rounded-lg shadow-md border-2 border-white/50"
                />
            </div>
            <div className="text-center md:text-left flex-grow">
                <h3 className="text-2xl font-extrabold tracking-tight">Build Your Dream Home With Us!</h3>
                <p className="text-kerala-200/90 mt-1">
                    Professional Services for House Planning, 3D Design, Construction, & Interior Works.
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <button
                    onClick={handleContactClick}
                    className="bg-white text-kerala-700 font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-slate-100 transition-colors"
                >
                    Contact us
                </button>
                <button
                    onClick={handleWorksClick}
                    className="bg-transparent border-2 border-white text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:bg-white/10 transition-colors"
                >
                    Check our works
                </button>
            </div>
        </div>
    );
};

export default AdBanner;
