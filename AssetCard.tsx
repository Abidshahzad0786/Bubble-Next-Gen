
import React from 'react';
import { ArtAsset } from '../types';

interface AssetCardProps {
  asset: ArtAsset;
  onGenerate: (id: string) => void;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, onGenerate }) => {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 hover:border-blue-500 transition-all group shadow-lg">
      <div className={`relative bg-slate-900 flex items-center justify-center overflow-hidden ${asset.aspectRatio === '9:16' ? 'aspect-[9/16]' : 'aspect-square'}`}>
        {asset.isLoading ? (
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-400 font-medium">Generating {asset.name}...</p>
          </div>
        ) : asset.imageUrl ? (
          <img 
            src={asset.imageUrl} 
            alt={asset.name} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="text-slate-500 flex flex-col items-center gap-2 p-4 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm font-semibold">Ready to Generate</span>
          </div>
        )}
        
        {asset.imageUrl && !asset.isLoading && (
          <button 
            onClick={() => {
              const link = document.createElement('a');
              link.href = asset.imageUrl!;
              link.download = `${asset.name.replace(/\s+/g, '-').toLowerCase()}.png`;
              link.click();
            }}
            className="absolute top-2 right-2 bg-slate-900/80 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600"
            title="Download Asset"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
          </button>
        )}
      </div>
      
      <div className="p-4 border-t border-slate-700 bg-slate-800/50 backdrop-blur-sm">
        <h3 className="font-bold text-sm mb-1">{asset.name}</h3>
        <p className="text-[10px] text-slate-400 line-clamp-1 mb-3">{asset.category}</p>
        <button
          onClick={() => onGenerate(asset.id)}
          disabled={asset.isLoading}
          className={`w-full py-2 px-3 rounded-lg text-xs font-bold transition-colors flex items-center justify-center gap-2 ${
            asset.imageUrl 
              ? 'bg-slate-700 hover:bg-slate-600 text-slate-200' 
              : 'bg-blue-600 hover:bg-blue-500 text-white'
          } disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {asset.imageUrl ? 'Regenerate' : 'Generate'}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  );
};
