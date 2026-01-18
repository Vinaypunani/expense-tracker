import { useState } from 'react';

const EMOJI_CATEGORIES = {
    'Smileys': ['😀', '😃', '😄', '😁', '😅', '😆', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎'],
    'Gestures': ['👋', '🤚', '🖐', '✋', '🖖', '👌', '🤌', '🤏', '✌', '🤞', '🤟', '🤘', '🤙', '👈', '👉', '👆', '👇', '☝', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐'],
    'Objects': ['⌚', '📱', '💻', '⌨', '🖥', '🖨', '🖱', '🖲', '🕹', '💾', '💿', '📀', '📼', '📷', '📸', '📹', '🎥', '📽', '🎬', '📺', '📻', '🎙', '🎚', '🎛', '⏱', '⏲', '⏰'],
    'Money': ['💰', '💴', '💵', '💶', '💷', '💸', '💳', '🧾', '💹', '🪙', '💲', '💱'],
    'Food': ['🍔', '🍕', '🌭', '🌮', '🌯', '🥙', '🥪', '🍟', '🍗', '🥓', '🥚', '🍳', '🧇', '🥞', '🧈', '🥐', '🍞', '🥖', '🥨', '🥯', '🧀', '🍖', '🍗', '🥩', '🍠', '🥗'],
    'Transport': ['🚗', '🚕', '🚙', '🚌', '🚎', '🏎', '🚓', '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🛴', '🚲', '🛵', '🏍', '🛺', '🚨', '🚔', '🚍', '🚘', '🚖', '✈', '🛫'],
    'Activities': ['⚽', '🏀', '🏈', '⚾', '🥎', '🎾', '🏐', '🏉', '🥏', '🎱', '🏓', '🏸', '🏒', '🏑', '🥍', '🏏', '🪃', '🥅', '⛳', '🪁', '🏹', '🎣', '🤿', '🥊', '🥋', '🎽', '🎿'],
    'Places': ['🏠', '🏡', '🏢', '🏣', '🏤', '🏥', '🏦', '🏨', '🏩', '🏪', '🏫', '🏬', '🏭', '🏯', '🏰', '💒', '🗼', '🗽', '⛪', '🕌', '🛕', '🕍', '⛩', '🕋', '⛲', '⛺', '🏕'],
    'Symbols': ['💡', '🔦', '🏮', '🪔', '📔', '📕', '📖', '📗', '📘', '📙', '📚', '📓', '📒', '📃', '📜', '📄', '📰', '🗞', '📑', '🔖', '🏷', '💰', '💳', '🪙', '💎', '⚖', '📌']
};

export const EmojiPicker = ({ onSelect, onClose }) => {
    const [selectedCategory, setSelectedCategory] = useState('Smileys');

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={onClose}>
            <div className="fixed inset-0 overflow-y-auto pointer-events-none">
                <div className="flex min-h-full items-center justify-center p-4">
                    <div
                        className="pointer-events-auto relative w-full max-w-md bg-white dark:bg-gray-900 rounded-2xl shadow-2xl"
                        style={{ maxWidth: '400px' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Select Emoji</h3>
                            <button
                                onClick={onClose}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                            >
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>

                        {/* Category Tabs */}
                        <div className="flex gap-1 px-4 py-2 overflow-x-auto border-b border-gray-200 dark:border-gray-800">
                            {Object.keys(EMOJI_CATEGORIES).map(category => (
                                <button
                                    key={category}
                                    onClick={() => setSelectedCategory(category)}
                                    className={`px-3 py-1.5 text-sm font-medium rounded-lg whitespace-nowrap transition-colors ${selectedCategory === category
                                            ? 'bg-[#007AFF] text-white'
                                            : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>

                        {/* Emoji Grid */}
                        <div className="p-4 max-h-80 overflow-y-auto">
                            <div className="grid grid-cols-8 gap-2">
                                {EMOJI_CATEGORIES[selectedCategory].map((emoji, index) => (
                                    <button
                                        key={index}
                                        onClick={() => {
                                            onSelect(emoji);
                                            onClose();
                                        }}
                                        className="w-10 h-10 flex items-center justify-center text-2xl hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                                    >
                                        {emoji}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
