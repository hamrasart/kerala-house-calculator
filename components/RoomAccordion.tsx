import React, { useState, useCallback } from 'react';
import { Room, Item, ItemCategoryType } from '../types';
import { ROOM_TYPES, FURNITURE_DATABASE, APPLIANCES_DATABASE, DECOR_DATABASE } from '../constants';
import { ChevronDownIcon, ChevronRightIcon, XMarkIcon } from './icons';

interface ItemListProps {
    items: Item[];
    onUpdateItem: (itemId: string, updatedItem: Partial<Item>) => void;
    onRemoveItem: (itemId: string) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, onUpdateItem, onRemoveItem }) => (
    <div className="space-y-3">
        {items.map(item => (
            <div key={item.id} className="p-3 bg-slate-50 rounded-lg text-sm border border-slate-200 space-y-2">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-800 truncate pr-2">{item.name}{item.isCustom && <span className="text-xs text-kerala-600 ml-1 font-normal">(Custom)</span>}</span>
                    <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 flex-shrink-0">
                        <XMarkIcon className="w-5 h-5"/>
                    </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                    <div>
                        <label className="text-xs font-medium text-slate-500">Price (₹)</label>
                        <input
                            type="number"
                            value={item.price}
                            onChange={e => onUpdateItem(item.id, { price: Number(e.target.value) >= 0 ? Number(e.target.value) : 0 })}
                            className="w-full text-left bg-white border border-slate-300 rounded-md font-semibold text-slate-800 p-2 mt-1 focus:ring-kerala-500 focus:border-kerala-500"
                            placeholder="Price"
                        />
                    </div>
                     <div>
                        <label className="text-xs font-medium text-slate-500">Quantity</label>
                         <div className="flex items-center mt-1" style={{ height: '42px' }}>
                            <button onClick={() => onUpdateItem(item.id, { quantity: Math.max(1, item.quantity - 1) })} className="px-3 h-full rounded-l-md bg-slate-200 hover:bg-slate-300 text-lg font-bold text-slate-700">-</button>
                            <input 
                                type="number" 
                                value={item.quantity} 
                                onChange={e => onUpdateItem(item.id, { quantity: Math.max(1, parseInt(e.target.value) || 1) })} 
                                className="w-full text-center bg-white border-y border-slate-300 font-semibold text-slate-800 h-full"
                            />
                            <button onClick={() => onUpdateItem(item.id, { quantity: item.quantity + 1 })} className="px-3 h-full rounded-r-md bg-slate-200 hover:bg-slate-300 text-lg font-bold text-slate-700">+</button>
                        </div>
                    </div>
                </div>
                 <a href="https://hadkarts.blogspot.com/p/product-cost.html" target="_blank" rel="noopener noreferrer" className="text-xs text-center text-kerala-600 hover:text-kerala-800 font-semibold py-2 px-2 bg-kerala-100 rounded-md flex items-center justify-center mt-2 w-full transition-colors">
                    Check Online Price
                </a>
            </div>
        ))}
    </div>
);


interface DefaultItemSelectorProps {
    database: Record<string, number>;
    onAddItem: (name: string, price: number) => void;
}

const DefaultItemSelector: React.FC<DefaultItemSelectorProps> = ({ database, onAddItem }) => (
    <div className="max-h-56 overflow-y-auto space-y-1 p-2 bg-slate-100 rounded-lg border border-slate-200">
        {Object.entries(database).map(([name, price]) => (
            <div key={name} className="flex justify-between items-center text-sm p-2 rounded-md hover:bg-kerala-100/50">
                <span className="text-slate-700">{name}</span>
                <button onClick={() => onAddItem(name, price)} className="text-xs font-bold text-kerala-700 bg-kerala-200 hover:bg-kerala-300 px-2.5 py-1.5 rounded-md transition-colors">Add</button>
            </div>
        ))}
    </div>
);

interface ItemCategoryProps {
    title: string;
    icon: string;
    items: Item[];
    database: Record<string, number>;
    onUpdate: (updatedItems: Item[]) => void;
}

const ItemCategory: React.FC<ItemCategoryProps> = ({ title, icon, items, database, onUpdate }) => {
    const [showDefaultList, setShowDefaultList] = useState(false);
    const [customItemName, setCustomItemName] = useState('');
    const [customItemPrice, setCustomItemPrice] = useState(0);

    const handleAddItem = (name: string, price: number, isCustom = false) => {
        const existingItem = items.find(i => i.name === name && i.price === price && !i.isCustom);
        if (existingItem) {
            const updatedItems = items.map(i => i.id === existingItem.id ? { ...i, quantity: i.quantity + 1 } : i);
            onUpdate(updatedItems);
        } else {
            const newItem: Item = { id: `${name}-${Date.now()}`, name, price, quantity: 1, isCustom };
            onUpdate([...items, newItem]);
        }
    };

    const handleAddCustomItem = () => {
        if (customItemName.trim() === '') return;
        handleAddItem(customItemName, customItemPrice, true);
        setCustomItemName('');
        setCustomItemPrice(0);
    };

    const handleUpdateItem = (itemId: string, updatedItem: Partial<Item>) => {
        const updatedItems = items.map(i => i.id === itemId ? { ...i, ...updatedItem } : i);
        onUpdate(updatedItems);
    };

    const handleRemoveItem = (itemId: string) => {
        onUpdate(items.filter(i => i.id !== itemId));
    };

    return (
        <div className="space-y-3">
            <h4 className="font-semibold text-slate-700">{icon} {title}</h4>
            <ItemList items={items} onUpdateItem={handleUpdateItem} onRemoveItem={handleRemoveItem} />
             <div className="space-y-3 text-sm pt-2">
                 <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                     <p className="text-sm font-semibold text-slate-600">Add a custom item</p>
                    <input 
                        type="text" 
                        value={customItemName} 
                        onChange={e => setCustomItemName(e.target.value)} 
                        placeholder="Custom Item Name" 
                        className="w-full p-2 border border-slate-300 rounded-md focus:ring-kerala-500 focus:border-kerala-500 bg-white text-slate-900"
                    />
                    <div className="flex gap-2">
                        <input 
                            type="number" 
                            value={customItemPrice || ''} 
                            onChange={e => setCustomItemPrice(Number(e.target.value))} 
                            placeholder="Price (₹)" 
                            className="flex-grow w-full p-2 border border-slate-300 rounded-md focus:ring-kerala-500 focus:border-kerala-500 bg-white text-slate-900"
                        />
                        <button onClick={handleAddCustomItem} className="bg-kerala-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-kerala-600 transition-colors flex-shrink-0">Add</button>
                    </div>
                 </div>
                <button onClick={() => setShowDefaultList(!showDefaultList)} className="text-kerala-600 font-semibold hover:text-kerala-700 transition-colors pt-1">
                    {showDefaultList ? '− Hide' : '+ Select from'} Default {title} List
                </button>
                {showDefaultList && <DefaultItemSelector database={database} onAddItem={(name, price) => handleAddItem(name, price)} />}
            </div>
        </div>
    );
};


interface RoomAccordionProps {
    room: Room;
    onUpdateRoom: (id: string, updatedRoom: Partial<Room>) => void;
    onRemoveRoom: (id:string) => void;
}

const RoomAccordion: React.FC<RoomAccordionProps> = ({ room, onUpdateRoom, onRemoveRoom }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleDimensionChange = useCallback((field: 'width' | 'length' | 'area', value: number) => {
        const newRoom = { ...room };
        if (field === 'area') {
            newRoom.area = value;
            const side = Math.sqrt(value) || 0;
            newRoom.width = Math.round(side * 10) / 10;
            newRoom.length = Math.round(side * 10) / 10;
        } else {
            newRoom[field] = value;
            newRoom.area = Math.round(newRoom.width * newRoom.length * 10) / 10;
        }
        onUpdateRoom(room.id, newRoom);
    }, [room, onUpdateRoom]);

    const handleItemCategoryUpdate = (category: ItemCategoryType, updatedItems: Item[]) => {
        onUpdateRoom(room.id, { [category]: updatedItems });
    };

    return (
        <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden transition-all duration-300">
            <button onClick={() => setIsExpanded(!isExpanded)} className="w-full text-left p-4 bg-slate-50 hover:bg-slate-100 transition-colors">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        {isExpanded ? <ChevronDownIcon className="w-5 h-5 text-kerala-700"/> : <ChevronRightIcon className="w-5 h-5 text-kerala-700"/>}
                        <span className="font-bold text-lg text-slate-800">{room.name || `Room`} - <span className="font-normal text-slate-600">{room.type}</span></span>
                    </div>
                     <span className="text-kerala-600 font-semibold bg-kerala-100 px-3 py-1 rounded-full text-sm">{room.area} sq ft</span>
                </div>
            </button>
            {isExpanded && (
                <div className="p-5 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <input type="text" value={room.name} onChange={e => onUpdateRoom(room.id, { name: e.target.value })} placeholder="Room Name" className="p-2 border border-slate-300 rounded-md focus:ring-kerala-500 focus:border-kerala-500 bg-white text-slate-900" />
                        <select value={room.type} onChange={e => onUpdateRoom(room.id, { type: e.target.value })} className="p-2 border border-slate-300 rounded-md focus:ring-kerala-500 focus:border-kerala-500 bg-white text-slate-900">
                            {ROOM_TYPES.map(type => <option key={type} value={type}>{type}</option>)}
                        </select>
                        <button onClick={() => onRemoveRoom(room.id)} className="bg-red-500 text-white font-semibold px-4 py-2 rounded-md hover:bg-red-600 transition-colors">Remove Room</button>
                    </div>

                    <div className="border-t border-slate-200 pt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end text-sm">
                        <div>
                            <label className="font-semibold text-slate-600">Width (ft)</label>
                            <input type="number" value={room.width} onChange={e => handleDimensionChange('width', Number(e.target.value))} className="w-full mt-1 p-2 border border-slate-300 rounded-md bg-white text-slate-900"/>
                        </div>
                        <div>
                            <label className="font-semibold text-slate-600">Length (ft)</label>
                            <input type="number" value={room.length} onChange={e => handleDimensionChange('length', Number(e.target.value))} className="w-full mt-1 p-2 border border-slate-300 rounded-md bg-white text-slate-900"/>
                        </div>
                         <div>
                            <label className="font-semibold text-slate-600">Area (sq ft)</label>
                            <input type="number" value={room.area} onChange={e => handleDimensionChange('area', Number(e.target.value))} className="w-full mt-1 p-2 border border-slate-300 rounded-md bg-white text-slate-900"/>
                        </div>
                        <div className="text-slate-500 pb-2 text-center md:text-left">= {room.width} × {room.length} ft</div>
                         <div className="flex items-center justify-start gap-2 pb-2">
                             <input type="checkbox" id={`fc-${room.id}`} checked={room.hasFalseCeiling} onChange={e => onUpdateRoom(room.id, { hasFalseCeiling: e.target.checked })} className="h-5 w-5 text-kerala-600 rounded border-slate-300 focus:ring-kerala-500"/>
                             <label htmlFor={`fc-${room.id}`} className="font-semibold text-slate-600">False Ceiling</label>
                         </div>
                    </div>
                    
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pt-6 border-t border-slate-200">
                        <ItemCategory title="Furniture" icon="🪑" items={room.furniture} database={FURNITURE_DATABASE} onUpdate={(items) => handleItemCategoryUpdate('furniture', items)} />
                        <ItemCategory title="Appliances" icon="📱" items={room.appliances} database={APPLIANCES_DATABASE} onUpdate={(items) => handleItemCategoryUpdate('appliances', items)} />
                        <ItemCategory title="Decor" icon="🎨" items={room.decor} database={DECOR_DATABASE} onUpdate={(items) => handleItemCategoryUpdate('decor', items)} />
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomAccordion;