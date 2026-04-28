/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Check, 
  ChevronRight, 
  Star, 
  ShieldCheck, 
  Zap, 
  Plus, 
  Minus,
  Instagram,
  Facebook,
  Utensils,
  Leaf,
  Timer,
  Award,
  Quote
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Components ---

const CHECKOUT_URL = "https://pay.hotmart.com/J105422683B?checkoutMode=10&bid=1776861478856";

// Meta Pixel tracking helper
const fbPixel = {
  track: (event: string, data = {}) => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', event, data);
    }
  }
};

const SalesNotification = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const notifications = [
    { name: "Maria G.", city: "Lisboa", area: "Chiado" },
    { name: "Ana P.", city: "Porto", area: "Cedofeita" },
    { name: "Carla S.", city: "Braga", area: "Gualtar" },
    { name: "Joana M.", city: "Coimbra", area: "Alta" },
    { name: "Sandra R.", city: "Funchal", area: "Ajuda" },
    { name: "Patrícia L.", city: "Setúbal", area: "Azeitão" },
    { name: "Rita F.", city: "Almada", area: "Pragal" },
    { name: "Sofia B.", city: "Queluz", area: "Massamá" },
    { name: "Tânia D.", city: "Gondomar", area: "Rio Tinto" },
    { name: "Vera C.", city: "Barreiro", area: "Lavradio" },
    { name: "Beatriz A.", city: "Aveiro", area: "Glória" },
    { name: "Daniela V.", city: "Vila Nova de Gaia", area: "Mafamude" },
    { name: "Filipa H.", city: "Amadora", area: "Alfragide" },
    { name: "Inês Q.", city: "Rio Tinto", area: "Baguarim" },
    { name: "Marta J.", city: "Viseu", area: "Repeses" },
    { name: "Raquel T.", city: "Évora", area: "Bacelo" },
    { name: "Sara N.", city: "Faro", area: "Montenegro" },
    { name: "Sónia E.", city: "Leiria", area: "Pousos" },
    { name: "Teresa K.", city: "Santarém", area: "Almeirim" },
    { name: "Vanessa U.", city: "Ponta Delgada", area: "Arrifes" }
  ];

  useEffect(() => {
    let timeoutId: any;

    const showNext = () => {
      setIsVisible(true);
      timeoutId = setTimeout(() => {
        setIsVisible(false);
        setCurrentIndex((prev) => (prev + 1) % notifications.length);
        timeoutId = setTimeout(showNext, 8000);
      }, 2500); // Slightly longer view time for 2-line layout
    };

    timeoutId = setTimeout(showNext, 7000);

    return () => clearTimeout(timeoutId);
  }, [notifications.length]);

  const current = notifications[currentIndex];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 50 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -50, y: 50 }}
          className="fixed bottom-6 left-6 z-[100] bg-[#c1f7cc] text-brand-dark px-5 py-3 rounded-xl shadow-xl flex items-center gap-3 border border-green-200"
        >
          <div className="bg-green-600/20 p-1.5 rounded-lg flex-shrink-0">
            <Check className="w-4 h-4 text-green-700" />
          </div>
          <div className="flex flex-col">
            <p className="font-bold text-[13px] leading-tight">
              {current.name} acabou de comprar!
            </p>
            <p className="text-[11px] text-slate-600 font-medium">
              de {current.city}, {current.area}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


const SectionHeading = ({ children, subtitle, light = false }: { children: React.ReactNode, subtitle?: string, light?: boolean }) => (
  <div className="text-center mb-12">
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-3xl md:text-5xl font-bold mb-4 ${light ? 'text-white' : 'text-slate-900'}`}
    >
      {children}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className={`text-lg max-w-2xl mx-auto ${light ? 'text-white/80' : 'text-slate-600'}`}
      >
        {subtitle}
      </motion.p>
    )}
    <div className={`w-24 h-1 mx-auto mt-6 rounded-full ${light ? 'bg-white/20' : 'bg-brand-primary/30'}`} />
  </div>
);

const BenefitCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
  >
    <div className="w-12 h-12 bg-brand-primary/10 text-brand-primary rounded-xl flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 font-sans">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
  </motion.div>
);

const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-slate-200">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex items-center justify-between text-left group"
      >
        <span className="font-bold text-lg group-hover:text-brand-secondary transition-colors">{question}</span>
        {isOpen ? <Minus className="w-5 h-5 text-brand-secondary" /> : <Plus className="w-5 h-5 text-slate-400" />}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-slate-600 leading-relaxed text-sm">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface FacebookTestimonialCardProps {
  key?: React.Key | number;
  name: string;
  content: string;
  avatar: string;
  location: string;
  timestamp: string;
  postImage: string;
}

const FacebookTestimonialCard = ({ name, content, avatar, location, timestamp, postImage }: FacebookTestimonialCardProps) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden text-left"
  >
    {/* Header */}
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img src={avatar} className="w-10 h-10 rounded-full border border-slate-100 object-cover" alt={name} />
        <div>
          <div className="flex items-center gap-1">
            <span className="font-bold text-[15px] text-[#1c1e21] hover:underline cursor-pointer">{name}</span>
            <div className="bg-[#1877F2] rounded-full p-0.5">
              <Check className="w-2 h-2 text-white" />
            </div>
          </div>
          <div className="flex items-center gap-1 text-[13px] text-[#65676b]">
            <span className="font-medium text-brand-dark/60">{location}</span>
            <span>•</span>
            <span>{timestamp}</span>
            <span>•</span>
            <Facebook className="w-3 h-3" />
          </div>
        </div>
      </div>
      <button className="text-[#65676b] hover:bg-slate-100 p-2 rounded-full transition-colors">
        <Plus className="w-5 h-5 rotate-45" />
      </button>
    </div>

    {/* Content */}
    <div className="px-4 pb-4">
      <p className="text-[15px] text-[#1c1e21] leading-normal">{content}</p>
    </div>

    {/* Post Image */}
    <div className="border-y border-slate-100 bg-slate-50">
      <img 
        src={postImage} 
        className="w-full h-64 object-cover" 
        alt="Post visual" 
      />
    </div>

    {/* Interaction Counts */}
    <div className="px-4 py-3 flex items-center justify-between border-b border-slate-100 mx-4 px-0">
      <div className="flex items-center gap-1.5">
        <div className="flex -space-x-1">
          <div className="bg-[#1877F2] rounded-full p-1 border-2 border-white">
            <ThumbsUp className="w-2.5 h-2.5 text-white fill-white" />
          </div>
          <div className="bg-[#fa3e3e] rounded-full p-1 border-2 border-white">
            <Heart className="w-2.5 h-2.5 text-white fill-white" />
          </div>
        </div>
        <span className="text-[13px] text-[#65676b]">{Math.floor(Math.random() * 20) + 12}</span>
      </div>
      <div className="text-[13px] text-[#65676b] hover:underline cursor-pointer">
        {Math.floor(Math.random() * 5) + 1} comentários
      </div>
    </div>

    {/* Action Buttons */}
    <div className="px-4 py-1 flex items-center justify-between text-[#65676b] font-semibold text-[13px] md:text-[14px]">
      <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-100 rounded-md transition-colors">
        <ThumbsUp className="w-5 h-5" />
        <span>Amei</span>
      </button>
      <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-100 rounded-md transition-colors">
        <MessageSquare className="w-5 h-5" />
        <span>Comentar</span>
      </button>
      <button className="flex-1 flex items-center justify-center gap-2 py-2 hover:bg-slate-100 rounded-md transition-colors">
        <Share2 className="w-5 h-5" />
        <span>Compartilhar</span>
      </button>
    </div>

    {/* Comment Footer */}
    <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
       <div className="flex items-center gap-2 mb-2">
         <span className="text-[12px] font-bold text-[#65676b] hover:underline cursor-pointer">Ver mais {Math.floor(Math.random() * 5) + 1} comentários</span>
       </div>
       <div className="flex items-start gap-2">
         <img src="https://iili.io/B4KZeWl.png" className="w-8 h-8 rounded-full object-cover mt-1" alt="Me" />
         <div className="flex-1 relative">
           <input 
            type="text" 
            placeholder="Escreva um comentário..." 
            className="w-full bg-[#f0f2f5] rounded-2xl px-4 py-2 text-[13px] border-none focus:ring-0"
           />
         </div>
       </div>
    </div>
  </motion.div>
);

const Heart = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

const MessageSquare = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const Share2 = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" x2="15.42" y1="13.51" y2="17.49" />
    <line x1="15.41" x2="8.59" y1="6.51" y2="10.49" />
  </svg>
);

const ThumbsUp = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 10v12" />
    <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
  </svg>
);

export default function App() {
  const handleCheckoutClick = () => {
    fbPixel.track('InitiateCheckout');
  };
  return (
    <div className="min-h-screen selection:bg-brand-primary/30 selection:text-white">
      <SalesNotification />

      {/* Hero Section */}
      <section className="relative pt-12 md:pt-14 pb-16 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-brand-primary/5 hidden lg:block" />
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl md:text-5xl font-bold leading-tight mb-3 md:mb-4 text-brand-primary"
          >
            Deixe de ser refém da cozinha.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-base md:text-lg text-slate-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-normal font-medium px-2"
          >
            Pare de perder horas todos os dias a pensar no que cozinhar, a preparar refeições e a lidar com o stress de não ter nada pronto.
            <br className="hidden md:block" />
            Organize tudo de uma vez, poupe tempo durante a semana e tenha sempre refeições saudáveis à mão — sem complicações.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mb-6 md:mb-10 max-w-lg md:max-w-xl mx-auto"
          >
            <div className="absolute inset-x-0 inset-y-10 bg-brand-secondary/10 rounded-[3rem] blur-3xl" />
            <img 
              src="https://iili.io/B4KKyTN.png" 
              alt="Meal Prep" 
              className="relative rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.2)] z-10 object-cover w-full h-auto"
            />
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center gap-6 mb-8 px-2"
          >
            <a 
              href="#checkout"
              className="w-full sm:w-auto bg-brand-secondary hover:bg-brand-secondary/90 text-white px-6 md:px-8 py-4 rounded-full font-black text-base md:text-lg shadow-2xl shadow-brand-secondary/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 md:gap-3 uppercase tracking-wide whitespace-nowrap"
            >
              QUERO MAIS TEMPO NA COZINHA
              <ChevronRight className="w-6 h-6 flex-shrink-0" />
            </a>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-6"
            >
              {[
                { icon: <ShieldCheck className="w-4 h-4" />, text: "Compra segura" },
                { icon: <Star className="w-4 h-4" />, text: "Garantia de satisfação" },
                { icon: <Award className="w-4 h-4" />, text: "Acesso vitalício" },
                { icon: <Timer className="w-4 h-4" />, text: "Poupe tempo" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  <span className="text-brand-primary">{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle={
            <>
              Chega ao fim do dia cansada, sem ideias e ainda com a responsabilidade de preparar tudo do zero.
              <br />
              Não é falta de organização... é falta de um sistema que funcione para si.
            </>
          }>
            O problema não é cozinhar… é ter de cozinhar todos os dias.
          </SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<span className="text-2xl">⏱</span>}
              title="Falta de tempo todos os dias"
              description="Depois de um dia inteiro, ainda precisa de pensar no que fazer para o jantar e passar tempo na cozinha."
            />
            <BenefitCard 
              icon={<span className="text-2xl">😩</span>}
              title="Cansaço mental constante"
              description="Decidir refeições todos os dias desgasta — e muitas vezes acaba por escolher o mais rápido, não o melhor."
            />
            <BenefitCard 
              icon={<span className="text-2xl">💸</span>}
              title="Gastos desnecessários"
              description="Vai ao supermercado várias vezes por semana, desperdiça comida e recorre mais vezes a refeições fora de casa."
            />
            <BenefitCard 
              icon={<span className="text-2xl">🥗</span>}
              title="Alimentação inconsistente"
              description="Quer comer melhor, mas sem planeamento acaba por cair na desorganização."
            />
            <BenefitCard 
              icon={<span className="text-2xl">🔁</span>}
              title="Rotina repetitiva e cansativa"
              description="Cozinhar deixa de ser algo prazeroso e passa a ser apenas mais uma obrigação."
            />
            <BenefitCard 
              icon={<span className="text-2xl">❌</span>}
              title="Sensação de falta de controlo"
              description="Sente que anda sempre a correr atrás das refeições… em vez de ter tudo organizado."
            />
          </div>
        </div>
      </section>

      {/* Visual Content Block */}
      <section className="py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-brand-dark rounded-3xl overflow-hidden shadow-2xl relative">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
            <div className="grid lg:grid-cols-2">
              <div className="p-6 md:p-16 relative z-10 flex flex-col justify-center">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                  Não precisa de cozinhar todos os <br className="hidden md:block" /> dias.
                </h2>
                <p className="text-lg text-white/90 mb-8 leading-relaxed font-medium">
                  Com o método Freezer Inteligente, deixa de viver no improviso e passa a ter controlo total sobre a sua alimentação.
                </p>
                <ul className="grid sm:grid-cols-1 md:grid-cols-1 gap-y-4 mb-10 text-white/80">
                  {[
                    "Método Freezer Inteligente – 250 Receitas Saudáveis para Congelar",
                    "Bônus 1 - Guia de Marinados Express",
                    "Bônus 2 - Snacks Saudáveis",
                    "Bônus 3 - Planejamento + Lista de compras",
                    "Acesso vitalício com todas as atualizações incluídas"
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="bg-brand-primary/20 p-1 rounded-full mt-1 flex-shrink-0">
                        <Check className="w-4 h-4 text-brand-primary" />
                      </div>
                      <span className="text-sm md:text-base font-medium">{benefit}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-col sm:flex-row gap-4 text-center">
                   <a 
                    href={CHECKOUT_URL}
                    onClick={handleCheckoutClick}
                    className="w-full sm:w-auto bg-brand-secondary hover:bg-brand-secondary/90 text-white px-6 md:px-10 py-4 rounded-full font-black text-base md:text-lg shadow-2xl shadow-brand-secondary/30 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-wide whitespace-nowrap"
                   >
                    OBTER O MÉTODO AGORA
                    <ChevronRight className="w-6 h-6 flex-shrink-0" />
                  </a>
                </div>
              </div>
              <div className="h-64 lg:h-auto overflow-hidden">
                <img 
                  src="https://iili.io/B4FyTEQ.png" 
                  alt="Healthy Cooking" 
                  className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recipe Preview Section */}
      <section className="py-24 bg-brand-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle="Estas são apenas algumas das mais de 250 receitas que terá acesso imediato.">
            Um pequeno exemplo do que vai receber
          </SectionHeading>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { title: "Almôndegas de Peru com Molho de Tomate", image: "https://iili.io/BidQQZ7.jpg" },
              { title: "Arroz de Atum Saudável com Legumes", image: "https://iili.io/BidQb6u.jpg" },
              { title: "Arroz de Frango com Legumes", image: "https://iili.io/BidZq6g.jpg" },
              { title: "Frango com legumes e arroz integral", image: "https://iili.io/BidZutI.jpg" },
              { title: "Grão de Bico Estufado com Espinafres", image: "https://iili.io/BidZMtS.jpg" },
              { title: "Massa Integral com Atum e Espinafres", image: "https://iili.io/Bidtcs1.jpg" },
              { title: "Puré de Batata e Couve Flor com Carne Picada", image: "https://iili.io/BidDap4.jpg" },
              { title: "Salmão no Forno com Legumes Assados", image: "https://iili.io/BidDU6F.jpg" }
            ].map((recipe, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-brand-primary/10 group"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img 
                    src={recipe.image} 
                    alt={recipe.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-sm md:text-base font-bold text-slate-800 leading-snug">{recipe.title}</h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle="Veja o testemunho de quem já transformou a sua relação com a cozinha">
            Resultados de quem já utiliza o método
          </SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { 
                 name: "Ana Martins", 
                 location: "Lisboa",
                 timestamp: "Há 2 dias",
                 content: "O meu frigorífico nunca esteve tão organizado. Agora chego a casa cansada e em poucos minutos tenho uma refeição pronta. Faz mesmo diferença no dia a dia.",
                 avatar: "https://iili.io/B4KZeWl.png",
                 postImage: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=800"
               },
               { 
                 name: "Catarina Silva", 
                 location: "Porto",
                 timestamp: "Há 5 dias",
                 content: "Como mãe de dois filhos pequenos, o tempo é muito limitado. Este método ajudou-me imenso a organizar as refeições e a reduzir o stress na cozinha.",
                 avatar: "https://iili.io/B4f98jn.png",
                 postImage: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=800"
               },
               { 
                 name: "Nelson Augusto", 
                 location: "Coimbra",
                 timestamp: "Há 1 semana",
                 content: "Deixei de recorrer a comida pronta ou encomendas por falta de tempo. Assim é muito mais fácil manter uma alimentação equilibrada.",
                 avatar: "https://iili.io/B4f2I8Q.png",
                 postImage: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800"
               }
             ].map((t, i) => (
               <FacebookTestimonialCard 
                 key={i}
                 name={t.name}
                 content={t.content}
                 avatar={t.avatar}
                 location={t.location}
                 timestamp={t.timestamp}
                 postImage={t.postImage}
               />
             ))}
          </div>
        </div>
      </section>

      {/* Author Section */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-brand-primary/10 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute inset-4 bg-brand-secondary/10 rounded-3xl -rotate-3" />
              <img 
                src="https://iili.io/B4fWNl1.png" 
                alt="Mariana Silva" 
                className="relative rounded-3xl shadow-2xl z-10 border-4 border-white"
              />
            </div>
            <div>
              <span className="text-brand-secondary font-black uppercase tracking-widest text-xs mb-4 block">A Fundadora</span>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">Quem é Mariana Silva?</h2>
              <p className="text-slate-600 leading-relaxed mb-6 font-medium">
                Sou apaixonada por organização alimentar e por ajudar pessoas a simplificar a sua rotina na cozinha.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Ao longo dos últimos anos, percebi que o maior desafio não é saber cozinhar — é ter tempo, organização e consistência no dia a dia.
              </p>
              <p className="text-slate-600 leading-relaxed mb-6">
                Foi por isso que desenvolvi o método Freezer Inteligente: uma forma prática de preparar refeições com antecedência, eliminar o stress de decidir “o que cozinhar hoje” e garantir que tem sempre comida caseira e equilibrada pronta a consumir.
              </p>
              <p className="text-slate-600 leading-relaxed mb-0">
                Hoje, ajudo diariamente pessoas a poupar tempo, a reduzir o desperdício alimentar e a criar uma rotina mais simples e sustentável na cozinha — sem complicações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Bonus Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading>
            Bónus exclusivos para simplificar ainda mais a sua rotina
          </SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { 
                title: "Bónus 1 — Guia de Marinadas", 
                description: "Dê mais sabor às suas refeições sem complicar. Aprenda combinações simples e práticas para transformar carnes, peixes e legumes em pratos mais saborosos — prontos a congelar.",
                image: "https://iili.io/Bi2ALOJ.png"
              },
              { 
                title: "Bónus 2 — Snacks Saudáveis", 
                description: "Tenha sempre opções rápidas e equilibradas à mão. Ideias práticas para lanches que pode preparar com antecedência e evitar escolhas pouco saudáveis no dia a dia.",
                image: "https://iili.io/Bi2RkdX.png"
              },
              { 
                title: "Bónus 3 — Planeamento + Lista de Compras", 
                description: "Organize toda a sua semana sem esforço. Um método simples para planear refeições e uma lista de compras pronta a usar, para poupar tempo e evitar desperdícios.",
                image: "https://iili.io/Bi250Cl.png"
              }
            ].map((bonus, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 flex flex-col h-full group transition-all duration-300 hover:shadow-2xl"
              >
                <div className="h-64 overflow-hidden bg-slate-100 relative">
                  <img 
                    src={bonus.image} 
                    alt={bonus.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 bg-brand-secondary text-white px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">
                    Grátis
                  </div>
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <h3 className="text-xl font-bold mb-4 text-brand-dark leading-tight">{bonus.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed flex-1">
                    {bonus.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Offer Summary Section */}
      <section id="checkout-summary" className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-brand-dark leading-tight font-serif italic">
              Em resumo, é isto que vai receber hoje:
            </h2>
          </div>

          <div className="space-y-0 mb-12">
            {[
              { text: "Método Freezer Inteligente – 250 Receitas Saudáveis para Congelar", label: "Incluído", isMain: true },
              { text: "Bónus 1 — Guia de Marinados Express", label: "Bónus Grátis" },
              { text: "Bónus 2 — Snacks Saudáveis", label: "Bónus Grátis" },
              { text: "Bónus 3 — Planeamento + Lista de compras", label: "Bónus Grátis" },
              { text: "Acesso vitalício e direito a todas as atualizações", label: "Bónus Grátis" }
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-6 border-b border-slate-100 last:border-0 hover:bg-slate-50/30 transition-colors px-2">
                <div className="flex items-center gap-4">
                  {item.isMain ? (
                    <div className="w-8 h-8 rounded-full border-2 border-green-500 flex items-center justify-center flex-shrink-0 bg-green-50/50">
                      <Check className="w-5 h-5 text-green-500 stroke-[3px]" />
                    </div>
                  ) : (
                    <Plus className="w-8 h-8 text-slate-200 flex-shrink-0" />
                  )}
                  <span className={`text-base md:text-xl font-bold ${item.isMain ? 'text-brand-dark' : 'text-slate-600'}`}>
                    {item.text}
                  </span>
                </div>
                <span className={`text-sm font-bold whitespace-nowrap ml-4 ${item.isMain ? 'text-green-600' : 'text-slate-400 opacity-70'}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-10 border-t-2 border-brand-dark flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-black text-brand-dark uppercase tracking-tight">
                VALOR TOTAL DESTA OFERTA
              </h3>
            </div>
            <div className="text-center md:text-right">
              <p className="text-5xl md:text-6xl text-slate-400 line-through font-medium leading-none mb-2">77.00€</p>
              <p className="text-green-600 font-bold text-xs uppercase tracking-widest">VALOR ESTIMADO</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Stack Card Checklist Section */}
      <section id="checkout" className="py-24 bg-[#0055ff] border-t border-blue-600 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4">
          {/* Card Container */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] border-4 border-white overflow-hidden relative"
          >
            {/* Top Banners */}
            <div className="bg-[#1cc800] text-white text-center py-3 font-black text-lg md:text-xl uppercase tracking-[0.2em] shadow-inner">
              PLANO COMPLETO
            </div>
            <div className="bg-[#ff0000] text-white text-center py-4 font-black text-xl md:text-3xl uppercase tracking-wider relative">
              COMBO COMPLETO + TODOS OS BÔNUS
            </div>

            {/* Visual Image Banner */}
            <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
              <img 
                src="https://iili.io/B4KKyTN.png" 
                alt="Pack Completo" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-40" />
            </div>

            {/* Top Pricing Callout */}
            <div className="p-8 text-center border-b border-slate-100">
              <p className="text-[#ff3b30] font-black text-xl md:text-2xl line-through mb-1">Valor Total: 77,00€</p>
              <p className="text-slate-800 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4">HOJE PAGAMENTO ÚNICO</p>
              <div className="text-8xl md:text-[8rem] font-black text-[#1cc800] tracking-tighter mb-2 flex justify-center items-start leading-[0.85]">
                <span className="text-4xl mt-4">€</span>10
              </div>
            </div>

            {/* Detailed Item List */}
            <div className="px-6 md:px-12 py-12 space-y-10 bg-white">
              {[
                { 
                  title: "MÉTODO FREEZER INTELIGENTE:", 
                  desc: "250 Receitas Saudáveis para Congelar. O guia completo para transformar a sua rotina.",
                },
                { 
                  title: "BÔNUS 1 — GUIA DE MARINADOS EXPRESS:", 
                  desc: "Dê mais sabor às suas refeições sem complicar. Aprenda combinações simples e práticas.",
                },
                { 
                  title: "BÔNUS 2 — SNACKS SAUDÁVEIS:", 
                  desc: "Tenha sempre opções rápidas e equilibradas à mão. Ideias práticas para lanches.",
                },
                { 
                  title: "BÔNUS 3 — PLANEAMENTO + LISTA DE COMPRAS:", 
                  desc: "Organize toda a sua semana sem esforço. Método simples para planear refeições.",
                },
                { 
                  title: "DIREITO A TODAS AS ATUALIZAÇÕES + ACESSO VITALÍCIO", 
                  desc: "Tem acesso para sempre ao conteúdo, incluindo todas as melhorias e novas receitas futuras.",
                }
              ].map((item, i) => (
                <div key={i} className="flex gap-4 items-start group">
                  <div className="w-8 h-8 rounded-full bg-[#1cc800] flex-shrink-0 flex items-center justify-center mt-1 shadow-lg shadow-green-100">
                    <Check className="w-5 h-5 text-white stroke-[4px]" />
                  </div>
                  <div>
                    <h4 className="font-black text-brand-dark text-base md:text-lg leading-tight uppercase tracking-tight">
                      {item.title}
                    </h4>
                    <p className="text-slate-500 text-sm md:text-base mt-2 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Final Pricing & CTA */}
            <div className="p-8 md:p-12 bg-slate-50 border-t border-slate-100 text-center">
              <p className="text-[#ff3b30] font-black text-xl md:text-2xl line-through mb-1">Valor Total: 77,00€</p>
              <p className="text-slate-800 font-bold uppercase tracking-widest text-[10px] md:text-xs mb-4">HOJE PAGAMENTO ÚNICO</p>
              <div className="text-8xl md:text-[8rem] font-black text-[#1cc800] tracking-tighter mb-8 flex justify-center items-start leading-[0.85]">
                <span className="text-4xl mt-4">€</span>10
              </div>
              
              <a 
                href={CHECKOUT_URL}
                onClick={handleCheckoutClick}
                className="w-full bg-[#1cc800] hover:bg-[#16a300] text-white py-6 md:py-8 rounded-full font-black text-xl md:text-4xl transition-all shadow-2xl shadow-green-200 flex items-center justify-center gap-2 transform hover:scale-105 active:scale-95 uppercase tracking-tight"
              >
                SIM, QUERO O PLANO COMPLETO!
              </a>
              <p className="mt-8 text-slate-400 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] px-4">
                APROVEITE AGORA: <span className="text-slate-700">VOCÊ NÃO VAI ENCONTRAR ESSE PREÇO DEPOIS.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Guarantee Section */}
      <section className="py-32 bg-[#114227] relative overflow-hidden">
        {/* Dotted Pattern Background matching Screenshot 2 */}
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full border-4 border-orange-500/30 bg-orange-500/10 mb-10 transform -rotate-12">
              <ShieldCheck className="w-12 h-12 text-orange-500" strokeWidth={1.5} />
            </div>

            <h2 className="text-4xl md:text-6xl font-black text-white leading-tight mb-8">
              Risco Zero: <span className="font-serif italic font-bold">Garantia Incondicional de 14 Dias</span>
            </h2>

            <p className="text-emerald-50/80 text-lg md:text-2xl leading-relaxed mb-12 max-w-3xl mx-auto">
              Se, por qualquer motivo, sentir que este método não é para si, basta solicitar o reembolso de forma automática. Devolvemos <span className="text-white font-bold">100% do valor pago</span> de imediato — sem perguntas, sem burocracias. <br className="hidden md:block" /> O risco é totalmente nosso.
            </p>

            <a 
              href={CHECKOUT_URL}
              onClick={handleCheckoutClick}
              className="inline-flex items-center gap-3 bg-[#f97316] hover:bg-[#ea580c] text-white px-12 py-6 rounded-full font-black text-xl md:text-2xl transition-all shadow-2xl shadow-orange-950/40 transform hover:scale-105 active:scale-95 uppercase tracking-tight group"
            >
              QUERO EXPERIMENTAR 14 DIAS SEM RISCO
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </a>

            <div className="mt-10 flex flex-wrap justify-center items-center gap-6 text-[10px] md:text-xs font-bold uppercase tracking-widest text-emerald-400/60">
              <div className="flex items-center gap-2">
                <span>🔒</span> PAGAMENTO SEGURO
              </div>
              <div className="w-px h-4 bg-emerald-500/20" />
              <div className="flex items-center gap-2">
                <span>✅</span> ACESSO IMEDIATO
              </div>
              <div className="w-px h-4 bg-emerald-500/20" />
              <div className="flex items-center gap-2">
                <span>🛡️</span> GARANTIA DE 14 DIAS
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeading>Perguntas Frequentes</SectionHeading>
          <div className="mt-8 bg-slate-50/50 rounded-3xl p-4 md:p-8 border border-slate-100">
            <FAQItem 
              question="Como recebo o acesso ao livro?"
              answer="O acesso é totalmente digital e imediato após a confirmação do pagamento. Receberá um e-mail automático com os dados de acesso para descarregar o livro principal e todos os bónus em formato PDF de alta qualidade."
            />
            <FAQItem 
              question="Os ingredientes são fáceis de encontrar?"
              answer="Sim, sem dúvida. As receitas foram adaptadas à realidade em Portugal. Encontrará tudo o que precisa em supermercados ou no seu comércio local."
            />
            <FAQItem 
              question="Não tenho um congelador grande. Funciona para mim?"
              answer="Sim. O método foi pensado para otimizar o espaço disponível. Vai aprender a utilizar recipientes e técnicas que ajudam a organizar melhor o congelador, independentemente do tamanho — seja um frigorífico combinado ou um modelo maior."
            />
            <FAQItem 
              question="Durante quanto tempo tenho acesso?"
              answer="O acesso é vitalício. Depois de adquirir, o conteúdo é seu para sempre, incluindo futuras atualizações que venham a ser adicionadas."
            />
          </div>
        </div>
      </section>

      {/* Final Bottom CTA */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <a 
              href={CHECKOUT_URL}
              onClick={handleCheckoutClick}
              className="inline-flex items-center gap-3 bg-[#1cc800] hover:bg-[#16a300] text-white px-16 py-8 rounded-full font-black text-2xl md:text-4xl transition-all shadow-2xl shadow-green-200 transform hover:scale-105 active:scale-95 uppercase tracking-tighter"
            >
              COMPRAR AGORA
              <ChevronRight className="w-8 h-8 md:w-12 md:h-12 flex-shrink-0" />
            </a>
            <p className="mt-8 text-slate-400 text-xs font-bold uppercase tracking-[0.2em]">
               🔒 Pagamento 100% Seguro | Acesso Imediato
            </p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-slate-200 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-2 font-serif text-2xl font-bold italic text-brand-dark">
              <Utensils className="text-brand-primary" />
              Freezer Inteligente
            </div>
          </div>
          <p className="text-sm text-slate-400 mb-8 max-w-lg mx-auto">
            Ajudando milhares de pessoas a poupar tempo e a manter uma alimentação equilibrada através de um método simples e prático.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-xs text-slate-500 font-bold uppercase tracking-widest mb-12">
            <a href="#" className="hover:text-brand-secondary transition-colors">TERMOS DE UTILIZAÇÃO</a>
            <a href="#" className="hover:text-brand-secondary transition-colors">POLÍTICA DE PRIVACIDADE</a>
          </div>
          <div className="w-full h-px bg-slate-100 mb-12" />
          <div className="text-[10px] text-slate-300 max-w-3xl mx-auto leading-relaxed space-y-4">
            <p>
              © 2026 Freezer Inteligente – Mariana Silva. Todos os direitos reservados. 
            </p>
            <p>
              Este site não faz parte do Facebook ou da Meta Platforms, Inc., nem é por estes patrocinado. 
              Facebook é uma marca registada da Meta Platforms, Inc.
            </p>
            <p>
              Os resultados podem variar de pessoa para pessoa. Este conteúdo tem fins informativos e não substitui aconselhamento profissional.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
