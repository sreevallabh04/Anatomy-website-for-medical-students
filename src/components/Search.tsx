import React, { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { motion, AnimatePresence } from 'framer-motion';
import { bodyParts } from '../data/bodyParts';
import { systems } from '../data/systems';
import { SearchResult } from '../types';
import { Search as SearchIcon, X } from 'lucide-react';

const searchIndex = new Fuse(
  [
    ...Object.values(bodyParts).flat(),
    ...systems,
    ...Object.values(bodyParts)
      .flat()
      .map(part => part.conditions || [])
      .flat()
  ],
  {
    keys: ['name', 'description'],
    threshold: 0.3,
    includeScore: true
  }
);

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchIndex.search(query).map(result => ({
        type: 'part' in result.item ? 'part' : 'system' in result.item ? 'system' : 'condition',
        item: result.item,
        score: result.score || 1
      }));
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query]);

  return (
    <div className="relative">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search anatomy..."
          className="w-64 px-4 py-2 pl-10 bg-gray-800/50 border border-cyan-500/30 rounded-full focus:outline-none focus:border-cyan-500"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-cyan-500" />
        {query && (
          <button
            onClick={() => setQuery('')}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <X className="w-4 h-4 text-gray-400 hover:text-white transition-colors" />
          </button>
        )}
      </div>

      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-gray-900/90 backdrop-blur-md rounded-lg border border-cyan-500/30 shadow-xl max-h-96 overflow-y-auto"
          >
            {results.map((result, index) => (
              <div
                key={index}
                className="p-4 hover:bg-gray-800/50 transition-colors border-b border-gray-800 last:border-0"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-cyan-500">
                      {result.item.name}
                    </h3>
                    <p className="text-sm text-gray-400">
                      {result.item.description}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-gray-800 text-gray-400">
                    {result.type}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Search;