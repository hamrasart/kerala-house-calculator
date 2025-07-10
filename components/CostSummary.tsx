
import React, { useMemo } from 'react';
import { Quality, SelectedMaterials, AdditionalFeatures, Room, CostBreakdown } from '../types';
import { QUALITY_RATES, FEATURE_RATES, WHATSAPP_NUMBER, WHATSAPP_TEAM_MESSAGE } from '../constants';
import { WhatsAppIcon, InstagramIcon } from './icons';

interface CostSummaryProps {
  quality: Quality;
  materials: SelectedMaterials;
  features: AdditionalFeatures;
  rooms: Room[];
}

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

const CostSummary: React.FC<CostSummaryProps> = ({ quality, materials, features, rooms }) => {
  const { totalArea, roomCount } = useMemo(() => {
    const area = rooms.reduce((sum, room) => sum + room.area, 0);
    return { totalArea: area, roomCount: rooms.length };
  }, [rooms]);

  const { costBreakdown, maintenanceCost } = useMemo(() => {
    const qualityRate = QUALITY_RATES[quality];

    const foundation = totalArea * 200;
    const structure = totalArea * (qualityRate * 0.6);
    const roofingBase = totalArea * 150;

    const materialsCost = Object.values(materials).reduce((sum, material) => sum + material.cost, 0);
    const roofingTotal = roofingBase + materials.roofing.cost;

    let featuresCost = 0;
    if (features.landscaping.enabled) {
      featuresCost += features.landscaping.area * (FEATURE_RATES.landscaping[features.landscaping.type as keyof typeof FEATURE_RATES.landscaping] || 0);
    }
    if (features.paving.enabled) {
      featuresCost += features.paving.area * (FEATURE_RATES.paving[features.paving.type as keyof typeof FEATURE_RATES.paving] || 0);
    }
    if (features.boundaryWall.enabled) {
        featuresCost += features.boundaryWall.length * (FEATURE_RATES.boundaryWall[features.boundaryWall.type as keyof typeof FEATURE_RATES.boundaryWall] || 0);
    }
    if (features.solar.enabled) {
        featuresCost += FEATURE_RATES.solar[features.solar.type as keyof typeof FEATURE_RATES.solar] || 0;
    }
    rooms.forEach(room => {
        if(room.hasFalseCeiling) {
            featuresCost += room.area * FEATURE_RATES.falseCeiling;
        }
    });

    const calculateItemTotal = (category: 'furniture' | 'appliances' | 'decor') => {
        return rooms.reduce((sum, room) => {
            return sum + room[category].reduce((itemSum, item) => itemSum + item.price * item.quantity, 0);
        }, 0);
    };

    const furniture = calculateItemTotal('furniture');
    const appliances = calculateItemTotal('appliances');
    const decor = calculateItemTotal('decor');

    const coreBuildingCost = foundation + structure + roofingTotal + (materialsCost - materials.roofing.cost) + featuresCost;
    const total = coreBuildingCost + furniture + appliances + decor;
    const maintenance = coreBuildingCost * 0.01;
    
    const breakdown: CostBreakdown = { foundation, structure, roofing: roofingTotal, materials: materialsCost - materials.roofing.cost, features: featuresCost, furniture, appliances, decor, total };

    return { costBreakdown: breakdown, maintenanceCost: maintenance };
  }, [totalArea, quality, materials, features, rooms]);
  
  const handleWhatsAppClick = () => {
    const summaryMessage = `Here is my estimated cost summary:%0A- Total Area: ${totalArea} sq ft%0A- Total Estimated Cost: ${formatCurrency(costBreakdown.total)}%0A- Est. Yearly Maintenance: ${formatCurrency(maintenanceCost)}`;
    const fullMessage = `${WHATSAPP_TEAM_MESSAGE}%0A%0A${summaryMessage}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(fullMessage)}`, '_blank');
  };
  
  const contactTeam = () => {
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEAM_MESSAGE)}`, '_blank');
  };

  const handleInstagramClick = () => {
    window.open('https://instagram.com/hamrasart', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="lg:w-1/3 lg:sticky top-8 self-start">
      <div className="bg-white p-6 rounded-xl shadow-lg border border-slate-200 space-y-5">
        <h2 className="text-xl font-bold text-slate-800">💰 Cost Summary</h2>
        <button 
          onClick={contactTeam}
          className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
          📞 Contact For Free Discussion
        </button>

        <div className="text-center p-6 bg-slate-800 rounded-lg">
          <p className="text-sm font-semibold text-slate-300">Total Estimated Cost</p>
          <p className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight my-1">{formatCurrency(costBreakdown.total)}</p>
          <p className="text-xs text-slate-400 mt-2">*Prices may vary based on market conditions</p>
        </div>

        <div className="flex justify-between items-center text-sm font-semibold bg-slate-100 p-3 rounded-md">
            <span className="text-slate-600">Total Area: <span className="font-bold text-kerala-700">{totalArea} sq ft</span></span>
            <span className="text-slate-600">Rooms: <span className="font-bold text-kerala-700">{roomCount}</span></span>
        </div>
        
        <div className="pt-2">
            <h3 className="text-lg font-bold text-slate-700 mb-3">📊 Cost Breakdown</h3>
            <div className="space-y-2 text-sm">
                {Object.entries(costBreakdown).filter(([key]) => key !== 'total').map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 rounded-md transition-colors duration-200 odd:bg-slate-50">
                        <span className="capitalize font-medium text-slate-600 flex items-center">
                           {key === 'furniture' && '🪑 '}
                           {key === 'appliances' && '📱 '}
                           {key === 'decor' && '🎨 '}
                           {key}
                        </span>
                        <span className="font-semibold text-slate-800">{formatCurrency(value)}</span>
                    </div>
                ))}
            </div>
        </div>

        <div className="pt-4 border-t border-slate-200">
            <h3 className="text-lg font-bold text-slate-700 mb-3">📈 Estimated Ongoing Costs</h3>
            <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center p-3 rounded-md bg-slate-50">
                    <span className="capitalize font-medium text-slate-600">
                        Avg. Yearly Maintenance
                    </span>
                    <span className="font-semibold text-slate-800">{formatCurrency(maintenanceCost)}</span>
                </div>
            </div>
        </div>
        
        <div className="space-y-3">
          <button 
            onClick={handleWhatsAppClick}
            className="w-full flex items-center justify-center gap-2 bg-green-500 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:bg-green-600 transform hover:-translate-y-0.5 transition-all duration-300">
            <WhatsAppIcon className="w-5 h-5"/>
            Contact via WhatsApp
          </button>
          <button
            onClick={handleInstagramClick}
            style={{ background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' }}
            className="w-full flex items-center justify-center gap-2 text-white font-bold py-3 px-4 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
            <InstagramIcon className="w-5 h-5" />
            Check House Photos
          </button>
        </div>
      </div>
    </div>
  );
};

export default CostSummary;
