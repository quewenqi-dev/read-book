
import React from 'react';

const Search: React.FC = () => {
  const chips = [
    { label: 'Trips', icon: 'flight' },
    { label: 'Documents', icon: 'description' },
    { label: 'Food', icon: 'restaurant' },
    { label: 'Pets', icon: 'pets' },
    { label: 'Events', icon: 'celebration' },
  ];

  const recentPhotos = [
    'https://lh3.googleusercontent.com/aida-public/AB6AXuBZBnMlR-XufCoUP82szhJSNQa1CnTlrNKKJb-90Ym1ysP5XyYwtJUjmunSDANy5C47kD3KQ_vXXyRBUtmytafc_RVG8mDTTTGoLLiG7q3jcDSzENDUhfp2JsF82dqsaSRoCRHndcNTiKNjbVYI8u780duyq2iGB3pMIMo6jk6Sk4D1wOlsIyWvV8NdpplVgVNan95GpnD4Nsq5uKoXQ6rE4R7x3rldv2wFsO0kvJmjc4BEduT144sKn8hGNcRcZbcTJVA9sHLtj24',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDpN868bM_5mnVMOhpb5vpILDETlKoxonpCC3_gvvLmEF9tyqyFqE40yyLqvUWVH00QmuQFj30yb2xnVatCjnq1ErJhX8l1XHXWKNS4tCZr0JYh1lQQpvSCCO3B2USAKUROPmIDMaCj1pB9bgl61BEBwYq8zatWKR23sJ6Cy1JQ_OCUfGDAWBWOGzHP_4FugpQcoIrR9rThOqAP1_vfIDYcT6Sadka3VvBCKS9ixoo-6DmujiDFSBirg9GuIG72LxHEX1LX6a-uz5A',
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCbkwGlh055f5WtqTFOGRhYWCBP8SoGpfEP64IeJaiF9ty2M_8S6NZHEP84qrIbJ49OX5Nt1s81yBWTr9IW32S3vK8EDrrO8RlqYz645Cun1zkNeTF4T8QuP9bAg0-s9ZHUSBnPRR4-SQyRib2WDp2xK2ABaD7fN0vcQvBGywFrglONLbR6-YSrZIYB6Pu9i9BEntHDFrxRIPMkCZS6y_T9NOfTylYpCskAOYRl2epK7FM1vZkzPgBn0waCOePybzbRW-dsGbaD35E',
  ];

  return (
    <div className="flex flex-col animate-in fade-in duration-300">
      <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-4 py-2">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-bold tracking-tight">Search</h1>
          <button className="text-primary text-sm font-medium">Cancel</button>
        </div>
        <div className="relative flex items-center w-full">
          <div className="absolute left-3 flex items-center pointer-events-none text-slate-400">
            <span className="material-symbols-outlined text-[20px]">search</span>
          </div>
          <input 
            className="w-full h-10 pl-10 pr-4 bg-slate-200/50 dark:bg-slate-800/50 border-none rounded-xl focus:ring-2 focus:ring-primary text-sm font-normal placeholder:text-slate-500" 
            placeholder="Search people, places..." 
            type="text"
          />
        </div>
      </header>

      <section className="mt-4">
        <div className="flex gap-3 px-4 overflow-x-auto hide-scrollbar">
          {chips.map((chip) => (
            <div key={chip.label} className="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-slate-800 pl-3 pr-4 cursor-pointer hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors">
              <span className="material-symbols-outlined text-[18px] text-primary">{chip.icon}</span>
              <p className="text-sm font-medium">{chip.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex items-center justify-between px-4 mb-3">
          <h3 className="text-lg font-bold">Places</h3>
          <span className="text-primary text-sm font-medium">Show Map</span>
        </div>
        <div className="px-4">
          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden group cursor-pointer shadow-lg">
            <div 
              className="w-full h-full bg-cover bg-center filter grayscale-[0.2]"
              style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD-uUV3E9YPLlzRczJJcbQB9F2Av47RaC2s-XSFvCbr3FY6pJjZa74fQEedbRkHVO2a8JEChinmJM3Mbbm_GudjsRv5rmUSwHtzRTutwpm0TYkafnJluvmC_l30Cm6jdV44rkg16kG_C7NPJ57LIDZjDmuWc5Qq-kVz9WCwZIsUEo_gEIf75QV1j6jwFeDFY9Ms6R_DsMLxo8GbP3fuMRIYsh-PDQsbnHwx4bUpgAcleY-RDNBGNr1XVKv6BJs8QVhllH5b5gPNl6Q")' }}
            />
            <div className="absolute inset-0 bg-black/10" />
            <div className="absolute top-1/4 left-1/3 flex items-center justify-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg border-2 border-white shadow-xl bg-cover bg-center rotate-[-4deg]" style={{ backgroundImage: 'url("https://picsum.photos/id/10/100/100")' }} />
                <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-background-dark">124</div>
              </div>
            </div>
            <div className="absolute bottom-1/3 right-1/4 flex items-center justify-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-lg border-2 border-white shadow-xl bg-cover bg-center rotate-[6deg]" style={{ backgroundImage: 'url("https://picsum.photos/id/20/100/100")' }} />
                <div className="absolute -top-2 -right-2 bg-primary text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full border-2 border-background-dark">48</div>
              </div>
            </div>
            <div className="absolute bottom-3 left-3 bg-white/90 dark:bg-black/80 backdrop-blur-sm px-3 py-1.5 rounded-lg">
              <p className="text-xs font-semibold">Tokyo, Japan</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 mb-6">
        <h3 className="text-lg font-bold px-4 mb-3">Recently Added</h3>
        <div className="grid grid-cols-3 gap-1 px-1">
          {recentPhotos.map((url, idx) => (
            <div key={idx} className="aspect-square bg-slate-200 dark:bg-slate-800 bg-cover bg-center hover:opacity-90 transition-opacity cursor-pointer overflow-hidden">
               <img src={url} alt={`Recent ${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
          <div className="aspect-square bg-slate-200 dark:bg-slate-800 bg-cover bg-center cursor-pointer overflow-hidden">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZBnMlR-XufCoUP82szhJSNQa1CnTlrNKKJb-90Ym1ysP5XyYwtJUjmunSDANy5C47kD3KQ_vXXyRBUtmytafc_RVG8mDTTTGoLLiG7q3jcDSzENDUhfp2JsF82dqsaSRoCRHndcNTiKNjbVYI8u780duyq2iGB3pMIMo6jk6Sk4D1wOlsIyWvV8NdpplVgVNan95GpnD4Nsq5uKoXQ6rE4R7x3rldv2wFsO0kvJmjc4BEduT144sKn8hGNcRcZbcTJVA9sHLtj24" alt="Landscape" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square bg-slate-200 dark:bg-slate-800 bg-cover bg-center cursor-pointer overflow-hidden">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTDvlatqnl4hMgL4uCW9Q041CzXDslNZ8N_xszRo30rWJjqXW1HTYysSptdT4Vq3-H0cMarIbcyPS4ssgz5T03tLBmh17Eq_nl45M6r1OyQQVYJb58gkqLkCsRHe1MJtDzOUFfPHC3uXexRgX5cp1xjrvxD7dGJPGVwXBf7ZemkRuI15m_sLwGiSMpdiQrQTlf20MkCsXivqxEGxjst17B29Q1spoCIJEkco_w4XXfN6fnG6cK3ciAmaXtgOUi3EXO_rOHtWRCdBg" alt="Mountains" className="w-full h-full object-cover" />
          </div>
          <div className="aspect-square bg-slate-200 dark:bg-slate-800 bg-cover bg-center cursor-pointer overflow-hidden">
             <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCHKC4KCKEXAv50EC8zpyYtE-va5w2BrlmhOqYFJfUoTkE6iSPSigf9INNOnnVZw2uZYX6XtRZbkCcoGy7wASwiF5_Dnl1kEKXyM7dwzWV08V44QXoTEra41UU3Yt-e7W0ipzOV36jhzebJZdBuNKeSxtooduu4c2kUv9QYS1deXiUQ7XG-ROkOYAqlLRRfVetH9mUaMSWH-5-0ZdC7T57-rjN4mtbJw_GL46RQ3hYXmECnfrafodq2XYoLKB9rA2HE-V8tSopU6bI" alt="Tree" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Search;
