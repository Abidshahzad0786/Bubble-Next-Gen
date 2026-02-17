
import React, { useState, useCallback, useEffect } from 'react';
import { ArtAsset, AssetCategory } from './types';
import { INITIAL_ASSETS } from './constants';
import { generateArtAsset } from './imageService';
import { AssetCard } from './AssetCard';
import JSZip from 'jszip';

const App: React.FC = () => {
  const [assets, setAssets] = useState<ArtAsset[]>(INITIAL_ASSETS);
  const [activeTab, setActiveTab] = useState<AssetCategory | 'All'>('All');
  const [isGeneratingAll, setIsGeneratingAll] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [hasUserKey, setHasUserKey] = useState<boolean>(false);

  // Check if user has selected an API key on mount
  useEffect(() => {
    const checkKey = async () => {
      // @ts-ignore
      if (window.aistudio?.hasSelectedApiKey) {
        // @ts-ignore
        const hasKey = await window.aistudio.hasSelectedApiKey();
        setHasUserKey(hasKey);
      }
    };
    checkKey();
  }, []);

  const handleOpenKeyDialog = async () => {
    // @ts-ignore
    if (window.aistudio?.openSelectKey) {
      // @ts-ignore
      await window.aistudio.openSelectKey();
      // Assume success as per instructions
      setHasUserKey(true);
    } else {
      window.open('https://ai.google.dev/gemini-api/docs/billing', '_blank');
    }
  };

  const handleGenerate = useCallback(async (id: string) => {
    setAssets(prev => prev.map(a => a.id === id ? { ...a, isLoading: true } : a));
    
    const asset = assets.find(a => a.id === id);
    if (!asset) return;

    try {
      const imageUrl = await generateArtAsset(asset.prompt, asset.aspectRatio);
      setAssets(prev => prev.map(a => a.id === id ? { ...a, imageUrl, isLoading: false } : a));
    } catch (err: any) {
      console.error(err);
      setAssets(prev => prev.map(a => a.id === id ? { ...a, isLoading: false } : a));
      
      // If requested entity not found, reset key state
      if (err?.message?.includes("Requested entity was not found")) {
        setHasUserKey(false);
      }
      
      alert(`Generation failed for "${asset.name}". ${err?.message?.includes("429") ? "Quota exceeded. Try using your own API key." : "Server error. Please try again."}`);
    }
  }, [assets]);

  const handleGenerateAll = async () => {
    if (isGeneratingAll) return;
    setIsGeneratingAll(true);
    
    const targetAssets = activeTab === 'All' 
      ? assets 
      : assets.filter(a => a.category === activeTab);

    // Filter out already generated assets to be efficient
    const pendingAssets = targetAssets.filter(a => !a.imageUrl && !a.isLoading);

    // Process sequentially to avoid aggressive rate limiting
    for (const asset of pendingAssets) {
      await handleGenerate(asset.id);
      // Small pause between starting requests
      await new Promise(resolve => setTimeout(resolve, 1500));
    }
    
    setIsGeneratingAll(false);
  };

  const downloadAsZip = async () => {
    const generated = assets.filter(a => a.imageUrl);
    if (generated.length === 0) return;

    setIsZipping(true);
    const zip = new JSZip();

    for (const asset of generated) {
      const base64Data = asset.imageUrl!.split(',')[1];
      zip.file(`${asset.category}/${asset.name.replace(/\s+/g, '_').toLowerCase()}.png`, base64Data, { base64: true });
    }

    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = "bubble_shooter_art_pack.zip";
    link.click();
    setIsZipping(false);
  };

  const categories = ['All', ...Object.values(AssetCategory)];
  const filteredAssets = activeTab === 'All' 
    ? assets 
    : assets.filter(a => a.category === activeTab);

  const stats = {
    total: assets.length,
    generated: assets.filter(a => a.imageUrl).length,
    loading: assets.filter(a => a.isLoading).length
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-2.5 rounded-2xl shadow-lg shadow-blue-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ART PACK GENERATOR
              </h1>
              <p className="text-xs text-slate-500 font-medium">Glossy 3D Mobile Bubble-Shooter Assets</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {!hasUserKey && (
              <button
                onClick={handleOpenKeyDialog}
                className="flex items-center gap-2 bg-amber-600/20 hover:bg-amber-600/30 text-amber-400 px-4 py-2.5 rounded-xl text-xs font-bold border border-amber-600/30 transition-all"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
                Fix Quota Errors
              </button>
            )}

            {stats.generated > 0 && (
              <button
                onClick={downloadAsZip}
                disabled={isZipping}
                className="flex items-center gap-2 bg-purple-600/20 hover:bg-purple-600/30 text-purple-400 px-4 py-2.5 rounded-xl text-xs font-bold border border-purple-600/30 transition-all shadow-lg"
              >
                {isZipping ? (
                   <div className="w-4 h-4 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin"></div>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                )}
                Download Zip ({stats.generated})
              </button>
            )}

            <div className="hidden lg:flex flex-col items-end mr-4">
              <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Progress</div>
              <div className="flex gap-1 h-1.5 w-32 bg-slate-800 rounded-full mt-1 overflow-hidden">
                <div 
                  className="bg-blue-500 transition-all duration-500" 
                  style={{ width: `${(stats.generated / stats.total) * 100}%` }}
                ></div>
                <div 
                  className="bg-slate-700 transition-all duration-500" 
                  style={{ width: `${(stats.loading / stats.total) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <button
              onClick={handleGenerateAll}
              disabled={isGeneratingAll || stats.loading > 0}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 disabled:shadow-none"
            >
              {isGeneratingAll ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Sequential Gen...
                </>
              ) : (
                <>
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Generate {activeTab === 'All' ? 'Full Pack' : activeTab}
                </>
              )}
            </button>
          </div>
        </div>
        
        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 pb-0 overflow-x-auto scrollbar-hide">
          <nav className="flex gap-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat as any)}
                className={`px-4 py-3 text-xs font-bold whitespace-nowrap border-b-2 transition-all ${
                  activeTab === cat 
                    ? 'border-blue-500 text-blue-400 bg-blue-500/5' 
                    : 'border-transparent text-slate-500 hover:text-slate-300'
                }`}
              >
                {cat}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 py-8">
        {/* Warning if no key and errors occurring */}
        {!hasUserKey && stats.loading > 0 && (
          <div className="mb-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 text-xs flex items-center gap-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p>Hitting rate limits? Using your own API key provides higher quota for large art packs.</p>
            <button onClick={handleOpenKeyDialog} className="ml-auto underline font-bold whitespace-nowrap">Select Key</button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {filteredAssets.map(asset => (
            <AssetCard 
              key={asset.id} 
              asset={asset} 
              onGenerate={handleGenerate}
            />
          ))}
        </div>

        {filteredAssets.length === 0 && (
          <div className="flex flex-col items-center justify-center py-24 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-lg font-medium">No assets found in this category</p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-900/50 p-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="text-slate-400 text-sm font-bold">Style Lock & Quota Shield Active</span>
            <p className="text-[10px] text-slate-600 max-w-md text-center md:text-left">
              Generations use exponential backoff and sequential queuing to ensure a complete, consistent pack even under heavy API usage.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
             <div className="flex -space-x-2">
                {assets.filter(a => a.imageUrl).slice(0, 5).map(a => (
                  <img key={a.id} src={a.imageUrl} className="w-8 h-8 rounded-full border-2 border-slate-900 object-cover" />
                ))}
             </div>
             <span className="text-xs text-slate-500 font-bold">{stats.generated} / {stats.total} Assets Generated</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
