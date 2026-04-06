/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  BarChart3, 
  Database, 
  FileText, 
  Folder, 
  Image as ImageIcon, 
  LayoutDashboard, 
  Menu, 
  MousePointer2, 
  PieChart, 
  Search, 
  Settings, 
  TrendingUp, 
  X 
} from 'lucide-react';

interface StorageItem {
  id: string;
  name: string;
  type: 'image' | 'folder' | 'file';
  clicks: number;
  size: string;
}

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [storageItems, setStorageItems] = useState<StorageItem[]>([
    { id: '1', name: 'PROJECT_ALPHA.JPG', type: 'image', clicks: 124, size: '2.4 MB' },
    { id: '2', name: 'QUARTERLY_REPORT.PDF', type: 'file', clicks: 89, size: '1.1 MB' },
    { id: '3', name: 'ARCHIVE_2025', type: 'folder', clicks: 45, size: '450 MB' },
    { id: '4', name: 'SYSTEM_LOGS.TXT', type: 'file', clicks: 231, size: '12 KB' },
    { id: '5', name: 'BRAND_ASSETS', type: 'folder', clicks: 67, size: '1.2 GB' },
    { id: '6', name: 'HERO_BANNER.PNG', type: 'image', clicks: 156, size: '3.8 MB' },
  ]);

  const handleItemClick = (id: string) => {
    setStorageItems(prev => prev.map(item => 
      item.id === id ? { ...item, clicks: item.clicks + 1 } : item
    ));
  };

  const totalClicks = storageItems.reduce((acc, item) => acc + item.clicks, 0);
  const activeFiles = storageItems.length;

  return (
    <div className="min-h-screen font-serif">
      {/* Header */}
      <header className="fixed top-0 w-full bg-black border-b border-white z-50">
        <nav className="container mx-auto px-6 h-20 flex justify-between items-center">
          <a href="#" className="font-sans font-bold text-2xl tracking-tighter uppercase">
            Monochrome<span className="text-gray-500">.</span>
          </a>
          
          {/* Desktop Nav */}
          <ul className="hidden md:flex gap-8 font-sans text-xs font-bold uppercase tracking-widest">
            <li><a href="#home" className="hover:text-gray-400 transition-colors">Overview</a></li>
            <li><a href="#analytics" className="hover:text-gray-400 transition-colors">Analytics</a></li>
            <li><a href="#storage" className="hover:text-gray-400 transition-colors">Storage</a></li>
            <li><a href="#settings" className="hover:text-gray-400 transition-colors">Settings</a></li>
          </ul>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden bg-black border-b border-white px-6 py-8"
            >
              <ul className="flex flex-col gap-6 font-sans text-lg font-bold uppercase tracking-widest">
                <li><a href="#home" onClick={() => setIsMenuOpen(false)}>Overview</a></li>
                <li><a href="#analytics" onClick={() => setIsMenuOpen(false)}>Analytics</a></li>
                <li><a href="#storage" onClick={() => setIsMenuOpen(false)}>Storage</a></li>
                <li><a href="#settings" onClick={() => setIsMenuOpen(false)}>Settings</a></li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main className="container mx-auto px-6 pt-32">
        {/* Hero / Overview Section */}
        <section id="home" className="min-h-[80vh] flex flex-col justify-center items-center text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-sans text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-4"
          >
            Data Intelligence
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl italic"
          >
            Real-time monitoring and storage analytics for high-performance systems.
          </motion.p>

          <div className="w-full max-w-4xl mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border-2 border-white p-10 text-left bg-black">
              <h2 className="font-sans text-2xl font-bold uppercase border-b-2 border-white pb-4 mb-8">System Status</h2>
              <div className="space-y-6">
                <div className="flex justify-between items-end">
                  <span className="text-sm uppercase text-gray-500 font-sans font-bold">Uptime</span>
                  <span className="text-3xl font-bold">99.9%</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm uppercase text-gray-500 font-sans font-bold">Latency</span>
                  <span className="text-3xl font-bold">14ms</span>
                </div>
                <div className="flex justify-between items-end">
                  <span className="text-sm uppercase text-gray-500 font-sans font-bold">Load</span>
                  <span className="text-3xl font-bold">24%</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="border border-gray-800 p-6 flex flex-col justify-between hover:border-white transition-colors group">
                <TrendingUp className="text-gray-500 group-hover:text-white transition-colors" size={20} />
                <div>
                  <span className="block text-4xl font-bold mb-1">{totalClicks}</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-sans font-bold">Total Interactions</span>
                </div>
              </div>
              <div className="border border-gray-800 p-6 flex flex-col justify-between hover:border-white transition-colors group">
                <Activity className="text-gray-500 group-hover:text-white transition-colors" size={20} />
                <div>
                  <span className="block text-4xl font-bold mb-1">{activeFiles}</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-sans font-bold">Active Assets</span>
                </div>
              </div>
              <div className="border border-gray-800 p-6 flex flex-col justify-between hover:border-white transition-colors group">
                <Database className="text-gray-500 group-hover:text-white transition-colors" size={20} />
                <div>
                  <span className="block text-4xl font-bold mb-1">1.8 <span className="text-lg">TB</span></span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-sans font-bold">Used Capacity</span>
                </div>
              </div>
              <div className="border border-gray-800 p-6 flex flex-col justify-between hover:border-white transition-colors group">
                <MousePointer2 className="text-gray-500 group-hover:text-white transition-colors" size={20} />
                <div>
                  <span className="block text-4xl font-bold mb-1">842</span>
                  <span className="text-[10px] uppercase tracking-widest text-gray-500 font-sans font-bold">Unique Users</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Storage / Click Monitoring Section */}
        <section id="storage" className="py-20">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <div>
              <h2 className="font-sans text-4xl font-bold uppercase tracking-tighter mb-2">Storage Monitoring</h2>
              <p className="text-gray-500 italic">Tracking asset engagement and interaction frequency.</p>
            </div>
            <div className="flex gap-4">
              <button className="px-6 py-2 border border-white font-sans text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Export Data
              </button>
              <button className="px-6 py-2 bg-white text-black font-sans text-xs font-bold uppercase tracking-widest hover:bg-gray-200 transition-all">
                Add Asset
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {storageItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                whileHover={{ scale: 1.02 }}
                onClick={() => handleItemClick(item.id)}
                className="border border-white p-8 cursor-pointer group hover:bg-white hover:text-black transition-colors duration-300 flex flex-col items-center text-center"
              >
                <div className="mb-6">
                  {item.type === 'image' && <ImageIcon size={48} strokeWidth={1} />}
                  {item.type === 'folder' && <Folder size={48} strokeWidth={1} />}
                  {item.type === 'file' && <FileText size={48} strokeWidth={1} />}
                </div>
                <h3 className="font-sans font-bold text-sm uppercase tracking-wider mb-1 truncate w-full">
                  {item.name}
                </h3>
                <p className="text-xs text-gray-500 group-hover:text-gray-700 mb-6">{item.size}</p>
                
                <div className="w-full pt-4 border-t border-gray-800 group-hover:border-gray-300 flex justify-between items-center">
                  <span className="text-[10px] uppercase font-sans font-bold tracking-widest">Interactions</span>
                  <span className="text-xl font-bold">{item.clicks}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Analytics Section Placeholder */}
        <section id="analytics" className="py-20 border-t border-gray-900">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="font-sans text-4xl font-bold uppercase tracking-tighter mb-8">Performance Metrics</h2>
              <div className="aspect-video border border-gray-800 relative overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex gap-1 items-end h-32">
                    {[40, 70, 45, 90, 65, 80, 30, 50, 85, 60, 75, 40, 95, 55].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        className="w-4 bg-white opacity-20 group-hover:opacity-100 transition-opacity"
                      />
                    ))}
                  </div>
                </div>
                <div className="absolute top-4 left-4 font-sans text-[10px] font-bold uppercase tracking-widest text-gray-500">
                  Network Throughput (Gbps)
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center">
              <div className="space-y-8">
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gray-500 mb-2">Data Integrity</h4>
                  <div className="h-1 bg-gray-900 w-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '98%' }}
                      className="h-full bg-white"
                    />
                  </div>
                  <span className="block text-right text-xs mt-1 font-bold">98.4%</span>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gray-500 mb-2">Security Score</h4>
                  <div className="h-1 bg-gray-900 w-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '92%' }}
                      className="h-full bg-white"
                    />
                  </div>
                  <span className="block text-right text-xs mt-1 font-bold">92.1%</span>
                </div>
                <div>
                  <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-gray-500 mb-2">Optimization</h4>
                  <div className="h-1 bg-gray-900 w-full">
                    <motion.div 
                      initial={{ width: 0 }}
                      whileInView={{ width: '76%' }}
                      className="h-full bg-white"
                    />
                  </div>
                  <span className="block text-right text-xs mt-1 font-bold">76.8%</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-white mt-20 py-20">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <a href="#" className="font-sans font-bold text-2xl tracking-tighter uppercase mb-4 block">
              Monochrome<span className="text-gray-500">.</span>
            </a>
            <p className="text-gray-500 text-sm max-w-xs italic">
              A minimalist approach to data visualization and asset management.
            </p>
          </div>
          
          <div className="flex gap-12 font-sans text-[10px] font-bold uppercase tracking-widest">
            <div className="flex flex-col gap-4">
              <span className="text-gray-600">Product</span>
              <a href="#" className="hover:text-gray-400">Features</a>
              <a href="#" className="hover:text-gray-400">API</a>
              <a href="#" className="hover:text-gray-400">Security</a>
            </div>
            <div className="flex flex-col gap-4">
              <span className="text-gray-600">Company</span>
              <a href="#" className="hover:text-gray-400">About</a>
              <a href="#" className="hover:text-gray-400">Journal</a>
              <a href="#" className="hover:text-gray-400">Legal</a>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-6 mt-20 pt-8 border-t border-gray-900 text-center">
          <p className="text-[10px] uppercase tracking-widest text-gray-600 font-sans font-bold">
            &copy; 2026 Monochrome Systems. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

