import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="text-center py-8 mt-12 border-t border-slate-200">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-lg font-semibold text-slate-700 mb-2">Disclaimer</h3>
                <p className="text-sm text-slate-500">
                    The costs, prices, and calculations provided by this application are estimates for informational purposes only and are not a formal quote. They are not guaranteed to be 100% accurate. Material costs, labor rates, and local market conditions can vary significantly and change over time. Please consult with our team and professional contractors to recheck all information and receive a precise quote before making any financial decisions.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
