
import React, { useState, useMemo } from 'react';
import { Language, Region, iPhoneModel } from './types';
import { IPHONE_MODELS, TRANSLATIONS, EXCHANGE_RATES } from './constants';
import { ShoppingCart, Globe, MessageSquare, CheckCircle, Truck, Search, Box, X, MapPin, Phone, User, ArrowRight, LogIn } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const App: React.FC = () => {
  const [lang, setLang] = useState<Language>('zh');
  const [region, setRegion] = useState<Region>('AU');
  const [activeModel, setActiveModel] = useState<iPhoneModel>(IPHONE_MODELS[0]);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  
  const [trackNumber, setTrackNumber] = useState('');
  const [showTracking, setShowTracking] = useState(false);

  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isOrderSuccess, setIsOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '', address: '' });

  const t = TRANSLATIONS[lang];
  const currentRate = region === 'AU' ? EXCHANGE_RATES.AUD_CNY : EXCHANGE_RATES.GBP_CNY;
  const currencySymbol = region === 'AU' ? '$' : '£';

  const pricing = useMemo(() => {
    const raw = activeModel.basePrice[region] * currentRate;
    const fee = raw * 0.05;
    return {
      subtotal: Math.round(raw),
      fee: Math.round(fee),
      total: Math.round(raw + fee)
    };
  }, [activeModel, region, currentRate]);

  const chartData = useMemo(() => [
    { name: '1', price: pricing.total - 100 },
    { name: '2', price: pricing.total + 50 },
    { name: '3', price: pricing.total - 20 },
    { name: '4', price: pricing.total + 80 },
    { name: '5', price: pricing.total - 10 },
    { name: '6', price: pricing.total + 40 },
    { name: '7', price: pricing.total },
  ], [pricing]);

  const handleSendMessage = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatInput('');
    setChatHistory(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: `You are a helpful expert personal shopper for iPhones in ${region}. 
          Answer in ${lang === 'zh' ? 'Chinese' : 'English'}. 
          Provide advice on models, color options, storage needs, and price comparisons for the iPhone 17 series.`,
        },
      });
      setChatHistory(prev => [...prev, { role: 'ai', content: response.text || '' }]);
    } catch (error) {
      console.error("AI Error:", error);
      setChatHistory(prev => [...prev, { role: 'ai', content: lang === 'zh' ? "助手暂时离开，请稍后再试。" : "AI assistant is busy, please try again later." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F]">
      <header className="sticky top-0 z-[60] glass-effect border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center shadow-lg shadow-black/20">
              <ShoppingCart size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tighter leading-none">{t.title}</h1>
              <p className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-0.5">Premium Concierge</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center bg-gray-100/80 rounded-full p-1 border border-gray-200">
              <button onClick={() => setRegion('AU')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${region === 'AU' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}>AU</button>
              <button onClick={() => setRegion('UK')} className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${region === 'UK' ? 'bg-white shadow-sm text-black' : 'text-gray-400 hover:text-gray-600'}`}>UK</button>
            </div>
            <button onClick={() => setLang(lang === 'zh' ? 'en' : 'zh')} className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white hover:bg-gray-50 transition-all shadow-sm text-xs font-bold">
              <Globe size={14} className="text-blue-500" />
              {lang === 'zh' ? 'English' : '中文'}
            </button>
            <button className="w-10 h-10 flex items-center justify-center rounded-full bg-black text-white shadow-lg"><LogIn size={18} /></button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8 space-y-12">
            <section className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-4 leading-[1.1]">
                {t.subtitle.split(' ').map((word, i) => (
                  <span key={i} className={i > 3 ? "text-gray-300" : ""}>{word} </span>
                ))}
              </h2>
              <div className="flex flex-wrap gap-2 mt-8 overflow-x-auto pb-4 scrollbar-hide">
                {IPHONE_MODELS.map(model => (
                  <button key={model.id} onClick={() => setActiveModel(model)} className={`px-8 py-3 rounded-full text-sm font-bold transition-all border-2 ${activeModel.id === model.id ? 'bg-black text-white border-black scale-105 shadow-xl' : 'bg-white text-gray-400 border-gray-100'}`}>{model.name}</button>
                ))}
              </div>
            </section>

            <section className="apple-card overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-10 bg-gray-50 flex items-center justify-center min-h-[400px]">
                  <img src={activeModel.image} alt={activeModel.name} className="w-full h-full object-cover mix-blend-multiply" />
                </div>
                <div className="p-10 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-black tracking-[0.2em] text-blue-600 uppercase block mb-2">New Generation</span>
                    <h3 className="text-3xl font-black mb-2">{activeModel.name}</h3>
                    <p className="text-gray-400 font-medium text-sm mb-8">{activeModel.specs}</p>
                    <div className="bg-gray-50 rounded-2xl p-5 border border-gray-100 space-y-2">
                      <div className="flex justify-between items-center"><span className="text-xs font-bold text-gray-400">{region} RRP</span><span className="text-lg font-black">{currencySymbol}{activeModel.basePrice[region].toLocaleString()}</span></div>
                      <div className="flex justify-between items-center text-xs text-gray-400"><span>CNY Approx.</span><span className="font-mono">¥{pricing.subtotal.toLocaleString()}</span></div>
                    </div>
                  </div>
                  <div className="mt-10 pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div><p className="text-[10px] font-black text-gray-300 uppercase mb-1">{t.estTotal}</p><p className="text-3xl font-black">¥{pricing.total.toLocaleString()}</p></div>
                    <button onClick={() => setIsOrderModalOpen(true)} className="bg-black text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-600 transition-all flex items-center gap-2 shadow-xl shadow-black/10">
                      {t.buyNow} <ArrowRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="apple-card p-8">
                <h3 className="text-lg font-black mb-6">{t.priceTrend}</h3>
                <div className="h-40">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis hide /><YAxis hide domain={['auto', 'auto']} />
                      <Line type="monotone" dataKey="price" stroke="#000" strokeWidth={4} dot={{r: 4}} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="apple-card p-8">
                <h3 className="text-lg font-black mb-6">{t.trackTitle}</h3>
                <div className="relative">
                  <input type="text" placeholder={t.trackPlaceholder} value={trackNumber} onChange={(e) => setTrackNumber(e.target.value)} className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-4 px-5 text-sm font-bold focus:outline-none" />
                  <button onClick={() => setShowTracking(true)} className="absolute right-2 top-2 w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center"><Search size={18} /></button>
                </div>
                {showTracking && <div className="mt-4 text-xs font-bold text-blue-600 flex items-center gap-2 animate-pulse"><Truck size={14} /> {t.inTransit}</div>}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4">
            <div className="sticky top-28 apple-card flex flex-col h-[calc(100vh-140px)] overflow-hidden">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-black text-xs uppercase tracking-widest">{t.chatTitle}</h3>
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-hide text-sm">
                <div className="bg-gray-50 p-4 rounded-2xl text-gray-500 font-medium">您好！我是 iGlobal AI 顾问。想了解哪款 iPhone？</div>
                {chatHistory.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] px-4 py-2 rounded-2xl font-bold ${m.role === 'user' ? 'bg-black text-white' : 'bg-gray-100 text-gray-800'}`}>{m.content}</div>
                  </div>
                ))}
                {isTyping && <div className="text-xs text-gray-400 font-bold animate-pulse">Typing...</div>}
              </div>
              <div className="p-4 border-t border-gray-100">
                <div className="relative">
                  <input type="text" value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} placeholder={t.chatPlaceholder} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-3 px-4 text-sm font-bold focus:outline-none" />
                  <button onClick={handleSendMessage} className="absolute right-2 top-1.5 w-8 h-8 bg-black text-white rounded-lg flex items-center justify-center"><ArrowRight size={14} /></button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {isOrderModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
          <div className="bg-white rounded-[3rem] w-full max-w-xl p-12 relative animate-in zoom-in-95">
            <button onClick={() => setIsOrderModalOpen(false)} className="absolute top-8 right-8 p-2 hover:bg-gray-100 rounded-full"><X size={24} /></button>
            {isOrderSuccess ? (
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto"><CheckCircle size={40} /></div>
                <h3 className="text-2xl font-black">{t.orderSuccess}</h3>
                <p className="text-gray-400 text-sm">{t.orderSuccessDesc}</p>
                <button onClick={() => setIsOrderModalOpen(false)} className="w-full bg-black text-white py-4 rounded-xl font-black">{t.close}</button>
              </div>
            ) : (
              <div className="space-y-6">
                <h3 className="text-2xl font-black">{t.orderFormTitle}</h3>
                <div className="space-y-4">
                  <input type="text" placeholder={t.fullName} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 font-bold" />
                  <input type="tel" placeholder={t.phoneNumber} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 font-bold" />
                  <textarea rows={2} placeholder={t.address} className="w-full bg-gray-50 border border-gray-100 rounded-xl py-4 px-5 font-bold resize-none" />
                </div>
                <div className="bg-gray-50 p-6 rounded-2xl flex justify-between items-center"><span className="text-gray-400 font-black text-xs uppercase">Est. Total</span><span className="text-2xl font-black">¥{pricing.total.toLocaleString()}</span></div>
                <button onClick={() => setIsOrderSuccess(true)} className="w-full bg-black text-white py-5 rounded-2xl font-black shadow-xl">确认预订</button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
