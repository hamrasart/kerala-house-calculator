
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Quality, SelectedMaterials, AdditionalFeatures, Room, MaterialKey, MaterialOption } from './types';
import { DEFAULT_ROOMS, MATERIAL_OPTIONS, FEATURE_RATES } from './constants';
import SectionCard from './components/SectionCard';
import CostSummary from './components/CostSummary';
import RoomAccordion from './components/RoomAccordion';
import AdBanner from './components/AdBanner';
import Footer from './components/Footer';

const Header = () => (
    <header className="text-center p-8 bg-gradient-to-r from-kerala-700 via-kerala-800 to-emerald-700 text-white rounded-xl shadow-2xl mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide">Kerala House Building Cost Calculator</h1>
        <p className="mt-3 text-lg text-kerala-200/90 max-w-2xl mx-auto">Plan your dream home with our comprehensive and easy-to-use cost estimator</p>
    </header>
);

const QualitySelector: React.FC<{ selected: Quality; onSelect: (q: Quality) => void }> = ({ selected, onSelect }) => (
    <SectionCard title="🏗️ Construction Quality">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {(['Basic', 'Medium', 'Premium'] as Quality[]).map(q => (
                <button
                    key={q}
                    onClick={() => onSelect(q)}
                    className={`p-4 text-lg font-bold rounded-lg border-2 transition-all duration-300 transform hover:-translate-y-1 ${
                        selected === q ? 'bg-kerala-600 border-kerala-700 text-white shadow-lg' : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-kerala-400 hover:text-kerala-700'
                    }`}
                >
                    {q}
                </button>
            ))}
        </div>
    </SectionCard>
);

const MaterialSelector: React.FC<{ selected: SelectedMaterials; onSelect: (key: MaterialKey, option: MaterialOption) => void }> = ({ selected, onSelect }) => (
    <SectionCard title="🧱 Material Selection">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {Object.entries(MATERIAL_OPTIONS).map(([key, options]) => (
                <div key={key}>
                    <label className="font-semibold text-slate-700 capitalize">{key}</label>
                    <select
                        value={selected[key as MaterialKey].name}
                        onChange={(e) => {
                            const selectedOption = options.find(opt => opt.name === e.target.value) || options[0];
                            onSelect(key as MaterialKey, selectedOption);
                        }}
                        className="mt-1 block w-full p-3 bg-slate-50 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-kerala-500 focus:border-kerala-500 text-slate-900"
                    >
                        {options.map(option => <option key={option.name} value={option.name}>{option.name}</option>)}
                    </select>
                </div>
            ))}
        </div>
    </SectionCard>
);

const AdditionalFeaturesSection: React.FC<{ features: AdditionalFeatures; onUpdate: (features: AdditionalFeatures) => void }> = ({ features, onUpdate }) => {
    const handleToggle = (key: keyof AdditionalFeatures) => {
        onUpdate({ ...features, [key]: { ...features[key], enabled: !features[key].enabled } });
    };

    const handleChange = (key: keyof AdditionalFeatures, field: string, value: any) => {
        onUpdate({ ...features, [key]: { ...features[key], [field]: value } });
    };

    const featureConfig = [
        { key: 'landscaping', title: '🌿 Landscaping', areaInput: true, types: Object.keys(FEATURE_RATES.landscaping) },
        { key: 'paving', title: '🛤️ Paving', areaInput: true, types: Object.keys(FEATURE_RATES.paving) },
        { key: 'boundaryWall', title: '🧱 Boundary Wall', lengthInput: true, types: Object.keys(FEATURE_RATES.boundaryWall) },
        { key: 'solar', title: '☀️ Solar Setup', types: Object.keys(FEATURE_RATES.solar) }
    ];

    return (
        <SectionCard title="🌟 Additional Features">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {featureConfig.map(f => {
                    const key = f.key as keyof AdditionalFeatures;
                    const featureState = features[key];
                    
                    return (
                        <div key={key} className="bg-slate-50/70 p-4 rounded-lg border border-slate-200">
                            <div className="flex items-center gap-3">
                                <input type="checkbox" id={key} checked={featureState.enabled} onChange={() => handleToggle(key)} className="h-5 w-5 text-kerala-600 rounded border-slate-300 focus:ring-kerala-500"/>
                                <label htmlFor={key} className="text-lg font-bold text-slate-800">{f.title}</label>
                            </div>
                            {featureState.enabled && (
                                <div className="mt-4 space-y-3 pl-8">
                                    {(f.areaInput || f.lengthInput) && (
                                         <input 
                                            type="number" 
                                            value={ 'area' in featureState ? featureState.area : ('length' in featureState ? featureState.length : 0)}
                                            onChange={e => handleChange(key, f.areaInput ? 'area' : 'length', Number(e.target.value))}
                                            placeholder={f.areaInput ? "Area (sq ft)" : "Length (ft)"}
                                            className="w-full p-2 border border-slate-300 rounded-md bg-white text-slate-900 focus:ring-2 focus:ring-kerala-500"
                                        />
                                    )}
                                    <select 
                                        value={featureState.type}
                                        onChange={e => handleChange(key, 'type', e.target.value)}
                                        className="w-full p-2 bg-white border border-slate-300 rounded-md text-slate-900 focus:ring-2 focus:ring-kerala-500"
                                    >
                                        {f.types.map(t => <option key={t} value={t}>{t}</option>)}
                                    </select>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </SectionCard>
    );
};

const App: React.FC = () => {
    const [quality, setQuality] = useState<Quality>('Medium');
    const [materials, setMaterials] = useState<SelectedMaterials>({
        cement: MATERIAL_OPTIONS.cement[0],
        flooring: MATERIAL_OPTIONS.flooring[0],
        kitchen: MATERIAL_OPTIONS.kitchen[0],
        wood: MATERIAL_OPTIONS.wood[0],
        paint: MATERIAL_OPTIONS.paint[0],
        roofing: MATERIAL_OPTIONS.roofing[0],
    });
    const [additionalFeatures, setAdditionalFeatures] = useState<AdditionalFeatures>({
        landscaping: { enabled: false, area: 100, type: 'Basic (Grass & Simple Plants)' },
        paving: { enabled: false, area: 100, type: 'Concrete' },
        boundaryWall: { enabled: false, length: 50, type: 'Standard (Concrete Block)' },
        solar: { enabled: false, type: '3KW System' },
    });
    const [rooms, setRooms] = useState<Room[]>(DEFAULT_ROOMS);

    const handleMaterialSelect = useCallback((key: MaterialKey, option: MaterialOption) => {
        setMaterials(prev => ({ ...prev, [key]: option }));
    }, []);

    const addRoom = useCallback(() => {
        const newRoom: Room = {
            id: uuidv4(), name: 'New Room', type: '🛏️ Bedroom', width: 10, length: 10, area: 100,
            hasFalseCeiling: false, furniture: [], appliances: [], decor: []
        };
        setRooms(prev => [newRoom, ...prev]);
    }, []);

    const updateRoom = useCallback((id: string, updatedRoom: Partial<Room>) => {
        setRooms(prev => prev.map(r => r.id === id ? { ...r, ...updatedRoom } : r));
    }, []);

    const removeRoom = useCallback((id: string) => {
        setRooms(prev => prev.filter(r => r.id !== id));
    }, []);

    return (
        <div className="bg-slate-100 min-h-screen p-4 sm:p-6 lg:p-8 font-sans">
            <div className="max-w-screen-2xl mx-auto">
                <Header />
                <div className="flex flex-col lg:flex-row gap-8">
                    <main className="lg:w-2/3 space-y-8">
                        <QualitySelector selected={quality} onSelect={setQuality} />
                        <MaterialSelector selected={materials} onSelect={handleMaterialSelect} />
                        <AdditionalFeaturesSection features={additionalFeatures} onUpdate={setAdditionalFeatures} />
                        
                        <AdBanner />

                        <SectionCard title="🏠 Room Configuration">
                             <button onClick={addRoom} className="mb-6 w-full sm:w-auto bg-gradient-to-r from-kerala-500 to-kerala-600 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300">
                                + Add New Room
                            </button>
                            <div className="space-y-4">
                                {rooms.map(room => (
                                    <RoomAccordion key={room.id} room={room} onUpdateRoom={updateRoom} onRemoveRoom={removeRoom} />
                                ))}
                            </div>
                        </SectionCard>
                    </main>
                    <CostSummary quality={quality} materials={materials} features={additionalFeatures} rooms={rooms} />
                </div>
                <Footer />
            </div>
        </div>
    );
};

export default App;