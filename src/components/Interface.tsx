import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store';
import { useSound } from '../hooks/useSound';
import { Menu, X, Maximize2, Minimize2, Volume2, VolumeX, Brain, BookOpen, Settings, Info } from 'lucide-react';
import { systems } from '../data/systems';
import Search from './Search';
import QuizMode from './QuizMode';

const Interface = () => {
  const { activeSystem, isExploding, setIsExploding, systemOpacity, setSystemOpacity } = useStore();
  const { playSound } = useSound();
  const [isMuted, setIsMuted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMode, setActiveMode] = useState<'explorer' | 'quiz'>('explorer');

  const activeSystemInfo = systems.find(s => s.id === activeSystem);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <div className="w-full h-full pointer-events-auto">
      {/* Top Navigation */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-10"
      >
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setIsMenuOpen(!isMenuOpen);
              playSound('select');
            }}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6 text-cyan-500" /> : <Menu className="w-6 h-6 text-cyan-500" />}
          </button>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-500">
            Anatomy Explorer
          </h1>
        </div>

        <div className="flex items-center space-x-4">
          <Search />
          
          <button
            onClick={() => {
              setIsMuted(!isMuted);
              playSound('select');
            }}
            className="p-2 rounded-full bg-gray-800/50 hover:bg-gray-700/50 transition-colors"
          >
            {isMuted ? 
              <VolumeX className="w-6 h-6 text-cyan-500" /> : 
              <Volume2 className="w-6 h-6 text-cyan-500" />
            }
          </button>
        </div>
      </motion.div>

      {activeMode === 'explorer' ? (
        <>
          {/* System Controls */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-4">
            {systems.map((system) => (
              <motion.button
                key={system.id}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  useStore.setState({ activeSystem: system.id });
                  playSound('select');
                }}
                className={`p-4 rounded-full ${
                  activeSystem === system.id ? 'bg-cyan-500' : 'bg-gray-800'
                } hover:bg-cyan-600 transition-colors relative group`}
              >
                <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                  {system.name}
                </span>
                <div
                  className="w-6 h-6"
                  style={{ backgroundColor: system.color, borderRadius: '50%' }}
                />
              </motion.button>
            ))}
          </div>

          {/* View Controls */}
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2 space-y-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsExploding(!isExploding);
                playSound('select');
              }}
              className="p-3 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors"
            >
              {isExploding ? 
                <Minimize2 className="w-5 h-5 text-cyan-500" /> : 
                <Maximize2 className="w-5 h-5 text-cyan-500" />
              }
            </motion.button>

            <div className="h-32 bg-gray-800 rounded-full p-2">
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={systemOpacity}
                onChange={(e) => setSystemOpacity(parseFloat(e.target.value))}
                className="w-32 -rotate-90 transform translate-y-10 appearance-none bg-transparent [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-gray-700 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-500"
              />
            </div>
          </div>

          {/* Info Panel */}
          <AnimatePresence>
            {activeSystemInfo && (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="absolute left-6 top-1/2 transform -translate-y-1/2 w-80 bg-gray-900/80 backdrop-blur-md rounded-lg p-6 border border-cyan-500/30"
              >
                <h2 className="text-xl font-bold mb-4" style={{ color: activeSystemInfo.color }}>
                  {activeSystemInfo.name}
                </h2>
                <p className="text-gray-300 mb-4">
                  {activeSystemInfo.description}
                </p>
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-cyan-500">Quick Facts</h3>
                  <ul className="space-y-2">
                    {activeSystemInfo.facts.map((fact, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-300">
                        <span className="text-cyan-500 mt-1">•</span>
                        <span>{fact}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      ) : (
        <QuizMode />
      )}

      {/* Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={() => setIsMenuOpen(false)}
          >
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              className="absolute left-0 top-0 h-full w-80 bg-gray-900 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-2xl font-bold text-cyan-500 mb-8">Menu</h2>
              <nav className="space-y-4">
                <button
                  onClick={() => {
                    setActiveMode('explorer');
                    setIsMenuOpen(false);
                    playSound('select');
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  <Brain className="w-5 h-5" />
                  <span>Explorer</span>
                </button>
                <button
                  onClick={() => {
                    setActiveMode('quiz');
                    setIsMenuOpen(false);
                    playSound('select');
                  }}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  <BookOpen className="w-5 h-5" />
                  <span>Quiz Mode</span>
                </button>
                <button
                  onClick={() => playSound('select')}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => playSound('select')}
                  className="w-full flex items-center space-x-3 px-4 py-2 rounded hover:bg-gray-800 transition-colors"
                >
                  <Info className="w-5 h-5" />
                  <span>About</span>
                </button>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Interface;