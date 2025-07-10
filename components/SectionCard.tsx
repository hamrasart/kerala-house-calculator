import React from 'react';

interface SectionCardProps {
    title: string;
    children: React.ReactNode;
}

const SectionCard: React.FC<SectionCardProps> = ({ title, children }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
            <h2 className="text-xl font-bold text-slate-800 mb-5">{title}</h2>
            {children}
        </div>
    );
};

export default SectionCard;