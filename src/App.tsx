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

const CountdownBanner = () => {
  const [timeLeft, setTimeLeft] = useState(3600 + 45 * 60 + 30); // 1h 45m 30s

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return { h, m, s };
  };

  const { h, m, s } = formatTime(timeLeft);

  return (
    <div className="bg-brand-dark text-white py-1.5 md:py-2 px-4 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto flex flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-1.5 md:gap-2">
          <span className="bg-brand-secondary text-[8px] md:text-[10px] font-black px-1.5 md:px-2 py-0.5 rounded-full uppercase tracking-tighter md:tracking-wider whitespace-nowrap">
            Oferta Especial
          </span>
          <p className="text-[10px] md:text-sm font-medium leading-none">Aproveite o desconto de 65%</p>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex gap-1 md:gap-2 text-center">
            {[h, m, s].map((val, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="bg-white/10 rounded w-6 h-6 md:w-8 md:h-8 flex items-center justify-center font-mono font-bold text-sm md:text-lg leading-none">
                  {val.toString().padStart(2, '0')}
                </span>
                <span className="text-[7px] md:text-[10px] uppercase opacity-60">
                  {['h', 'm', 's'][i]}
                </span>
              </div>
            ))}
          </div>
          <a 
            href={CHECKOUT_URL}
            className="bg-brand-primary hover:bg-brand-primary/90 text-brand-dark px-3 md:px-4 py-1 md:py-1.5 rounded-full text-[9px] md:text-xs font-black transition-all shadow-sm whitespace-nowrap inline-block text-center"
          >
            PREÇO ESPECIAL
          </a>
        </div>
      </div>
    </div>
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

export default function App() {
  return (
    <div className="min-h-screen selection:bg-brand-primary/30 selection:text-white">
      <CountdownBanner />
      <SalesNotification />

      {/* Hero Section */}
      <section className="relative pt-12 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-primary/5 -skew-x-12 transform origin-top translate-x-20 hidden lg:block" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-dark px-3 py-1 rounded-full text-xs font-bold mb-6"
              >
                <Utensils className="w-3 h-3" />
                <span>250 Receitas Saudáveis para Congelar</span>
              </motion.div>
              
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl font-bold leading-tight mb-6"
              >
                A sua nova rotina na cozinha começa aqui
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg md:text-xl text-slate-600 mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium"
              >
                Organize as suas refeições, poupe tempo e tenha sempre opções saudáveis prontas — sem complicações.
                <br /><br />
                Adquira hoje o Freezer Inteligente – 250 Receitas Saudáveis para Congelar e receba todos os bónus de imediato.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-8"
              >
                <a 
                  href={CHECKOUT_URL}
                  className="w-full sm:w-auto bg-brand-secondary hover:bg-brand-secondary/90 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl shadow-brand-secondary/20 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
                >
                  SIM, QUERO COMEÇAR AGORA
                  <ChevronRight className="w-5 h-5" />
                </a>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-4"
              >
                {[
                  { icon: <ShieldCheck className="w-4 h-4" />, text: "Compra segura" },
                  { icon: <Star className="w-4 h-4" />, text: "Garantia de satisfação" },
                  { icon: <Award className="w-4 h-4" />, text: "Acesso sem limite de tempo" },
                  { icon: <Timer className="w-4 h-4" />, text: "Poupe tempo no dia a dia" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-2 text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                    <span className="text-brand-primary">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              className="relative mt-12 lg:mt-0 max-w-[320px] sm:max-w-md mx-auto lg:max-w-none"
            >
              <div className="absolute inset-0 bg-brand-secondary/10 rounded-[3rem] blur-3xl" />
              <img 
                src="https://iili.io/B4KKyTN.png" 
                alt="Meal Prep" 
                className="relative rounded-3xl shadow-2xl z-10 border-4 md:border-8 border-white object-cover w-full h-auto"
              />
              <div className="absolute -bottom-4 -left-4 md:-bottom-6 md:-left-6 bg-white p-3 md:p-4 rounded-2xl shadow-xl z-20 flex items-center gap-2 md:gap-3 border border-slate-100">
                <div className="bg-brand-primary/20 p-2 rounded-lg">
                  <Leaf className="w-5 h-5 md:w-6 md:h-6 text-brand-dark" />
                </div>
                <div>
                  <p className="text-sm md:text-lg font-bold text-brand-dark">+250 Receitas</p>
                </div>
              </div>
              <div className="absolute -top-16 -right-2 md:-top-20 md:-right-10 bg-brand-secondary text-white p-2 md:p-4 rounded-full shadow-xl z-20 w-20 h-20 md:w-32 md:h-32 flex flex-col items-center justify-center rotate-12">
                <p className="text-[6px] md:text-[10px] font-bold uppercase tracking-tight">De € 29</p>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-lg md:text-3xl font-black">€ 10</span>
                </div>
                <p className="text-[5px] md:text-[10px] font-bold uppercase tracking-tight mt-0.5 leading-none text-center">Pagamento Único</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features List Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle="Muito mais do que um simples livro de receitas. É um método completo para transformar a sua rotina e melhorar a sua saúde.">
            O que vai encontrar neste livro?
          </SectionHeading>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <BenefitCard 
              icon={<Utensils />}
              title="250 Receitas Prontas a Congelar"
              description="Receitas completas, testadas e pensadas para manter sabor, textura e valor nutricional mesmo após congelação."
            />
            <BenefitCard 
              icon={<Leaf />}
              title="Opções para Diferentes Alimentações"
              description="Receitas identificadas de forma clara: sem glúten, sem lactose e opções vegetarianas — fácil de adaptar ao seu dia a dia."
            />
            <BenefitCard 
              icon={<Timer />}
              title="Poupe Tempo e Dinheiro"
              description="Prepare tudo de uma só vez e evite desperdícios — menos idas ao supermercado e menos refeições fora."
            />
            <BenefitCard 
              icon={<ShieldCheck />}
              title="Controlo de Calorias Simplificado"
              description="Saiba exatamente o que está a comer, com refeições equilibradas e pensadas para o seu bem-estar."
            />
            <BenefitCard 
              icon={<Zap />}
              title="Método Freezer Inteligente"
              description="Aprenda a planear, preparar e congelar refeições que se mantêm frescas e saborosas durante semanas."
            />
            <BenefitCard 
              icon={<Award />}
              title="Guia Prático de Conservação"
              description="Descubra como armazenar corretamente os alimentos para garantir qualidade, segurança e durabilidade."
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
              <div className="p-12 md:p-16 relative z-10 flex flex-col justify-center">
                <p className="text-brand-primary font-bold tracking-widest text-sm mb-4 uppercase">A sua rotina vai mudar</p>
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                  Tudo pensado para o seu <span className="text-brand-primary italic">bem-estar</span>
                </h2>
                <ul className="space-y-4 mb-10 text-white/80">
                  <li className="flex items-start gap-3">
                    <div className="bg-brand-primary/20 p-1 rounded-full mt-1 flex-shrink-0"><Check className="w-4 h-4 text-brand-primary" /></div>
                    <span>Planeamento semanal inteligente em menos de 15 minutos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-brand-primary/20 p-1 rounded-full mt-1 flex-shrink-0"><Check className="w-4 h-4 text-brand-primary" /></div>
                    <span>Como organizar o seu frigorífico para máxima frescura e higiene</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="bg-brand-primary/20 p-1 rounded-full mt-1 flex-shrink-0"><Check className="w-4 h-4 text-brand-primary" /></div>
                    <span>Snacks saudáveis que pode levar para o trabalho ou para fora de casa</span>
                  </li>
                </ul>
                <div className="flex flex-col sm:flex-row gap-4">
                   <a 
                    href={CHECKOUT_URL}
                    className="bg-brand-primary text-brand-dark px-8 py-4 rounded-full font-bold hover:bg-brand-primary/90 transition-all flex items-center justify-center gap-2"
                   >
                    OBTER O MÉTODO AGORA
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

      {/* Bonus Section */}
      <section className="py-24 bg-brand-primary/5">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle="Ao garantir hoje o seu acesso, recebe estes bónus exclusivos avaliados em mais de 50€.">
            Bónus Especiais Gratuitos
          </SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { 
                tag: "Bónus 1",
                title: "Guia de Marinadas", 
                subtitle: "Dê mais sabor às suas refeições em poucos minutos",
                description: "Aprenda combinações simples e práticas para transformar carnes, peixes e legumes antes de congelar ou cozinhar.",
                image: "https://iili.io/B4KSc5N.webp"
              },
              { 
                tag: "Bónus 2",
                title: "Snacks Saudáveis", 
                subtitle: "Tenha sempre opções rápidas e nutritivas à mão",
                description: "Receitas práticas para snacks do dia a dia — perfeitas para levar consigo ou manter prontos em casa.",
                image: "https://iili.io/B4KSMss.webp"
              },
              { 
                tag: "Bónus 3",
                title: "Planeamento + Lista de Compras", 
                subtitle: "Organize a sua semana sem complicações",
                description: "Um sistema simples para planear refeições e fazer compras de forma eficiente.",
                image: "https://iili.io/B4KSEzX.webp"
              }
            ].map((bonus, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-md border border-brand-primary/10"
              >
                <div className="h-48 bg-slate-200">
                  <img 
                    src={bonus.image} 
                    alt={bonus.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <span className="text-[10px] font-black text-brand-secondary uppercase tracking-widest bg-brand-secondary/10 px-2 py-1 rounded">{bonus.tag}</span>
                  <h3 className="text-xl font-bold mt-3 mb-1 text-brand-dark">{bonus.title}</h3>
                  <p className="text-sm font-bold text-slate-900 mb-3 leading-tight">{bonus.subtitle}</p>
                  <p className="text-slate-600 text-sm mb-4 leading-relaxed">{bonus.description}</p>
                  <div className="flex items-center gap-1 text-brand-dark font-bold text-xs">
                    <Check className="w-3 h-3 text-brand-primary" /> INCLUÍDO NO PACOTE
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeading subtitle="Veja o testemunho de quem já transformou a sua relação com a cozinha">
            Resultados de quem já utiliza o método
          </SectionHeading>
          
          <div className="grid md:grid-cols-3 gap-8">
             {[
               { 
                 name: "Ana Martins", 
                 location: "Lisboa",
                 content: "O meu frigorífico nunca esteve tão organizado. Agora chego a casa cansada e em poucos minutos tenho uma refeição pronta. Faz mesmo diferença no dia a dia.",
                 avatar: "https://iili.io/B4KZeWl.png" 
               },
               { 
                 name: "Catarina Silva", 
                 location: "Porto",
                 content: "Como mãe de dois filhos pequenos, o tempo é muito limitado. Este método ajudou-me imenso a organizar as refeições e a reduzir o stress na cozinha.",
                 avatar: "https://iili.io/B4f98jn.png" 
               },
               { 
                 name: "Nelson Augusto", 
                 location: "Coimbra",
                 content: "Deixei de recorrer a comida pronta ou encomendas por falta de tempo. Assim é muito mais fácil manter uma alimentação equilibrada.",
                 avatar: "https://iili.io/B4f2I8Q.png" 
               }
             ].map((t, i) => (
               <div key={i} className="bg-slate-50 p-8 rounded-3xl relative border border-slate-100">
                 <Quote className="absolute top-6 right-6 w-12 h-12 text-slate-200" />
                 <div className="flex items-center gap-4 mb-6">
                   <img src={t.avatar} className="w-12 h-12 rounded-full border-2 border-brand-primary" alt={t.name} />
                   <div>
                     <p className="font-bold text-slate-900">{t.name}</p>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{t.location}</p>
                     <div className="flex gap-0.5 mt-1">
                       {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-brand-secondary text-brand-secondary" />)}
                     </div>
                   </div>
                 </div>
                 <p className="text-slate-600 italic leading-relaxed">"{t.content}"</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-24 bg-brand-dark text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full bg-checkered opacity-5" />
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-8 border-4 border-brand-secondary shadow-2xl shadow-brand-secondary/20"
          >
            <ShieldCheck className="w-16 h-16 text-brand-secondary" />
          </motion.div>
          <h2 className="text-4xl font-bold mb-6">Risco Zero: Garantia Incondicional de 7 Dias</h2>
          <p className="text-lg text-white/70 mb-10 leading-relaxed max-w-3xl mx-auto">
            Se, por algum motivo, sentir que este método não é para si, basta enviar um <span className="whitespace-nowrap">e-mail</span>. Devolvemos 100% do valor pago de forma imediata — sem perguntas, sem burocracias.
          </p>
          <div className="flex flex-col items-center">
            <a 
              href={CHECKOUT_URL}
              className="bg-brand-secondary text-white px-12 py-5 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-brand-secondary/40 mb-6"
            >
              QUERO EXPERIMENTAR 7 DIAS SEM RISCO
            </a>
            <div className="flex items-center gap-2 opacity-60 text-sm font-medium">
              🔒 Pagamento seguro | Acesso imediato | Garantia de 7 dias
            </div>
          </div>
        </div>
      </section>

      {/* Final Offer Section */}
      <section id="checkout" className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-slate-900">A sua nova rotina na cozinha começa aqui</h2>
              <p className="text-brand-dark font-bold mb-4 text-lg">Organize as suas refeições, poupe tempo e tenha sempre opções saudáveis prontas — sem complicações.</p>
              <p className="text-slate-600 mb-8 text-md font-medium">Adquira hoje o Freezer Inteligente – 250 Receitas Saudáveis para Congelar e receba todos os bónus de imediato.</p>
              <div className="space-y-4 mb-8">
                {[
                  "Acesso imediato ao livro com 250 receitas prontas a congelar",
                  "Bónus: Guia de Marinadas",
                  "Bónus: Snacks Saudáveis",
                  "Bónus: Planeamento + Lista de Compras",
                  "Acesso vitalício + futuras atualizações incluídas"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="bg-brand-primary rounded-full p-1 flex-shrink-0"><Check className="w-4 h-4 text-brand-dark" /></div>
                    <span className="font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl overflow-hidden relative">
                 <div className="absolute top-0 right-0 bg-brand-primary text-brand-dark px-4 py-1 font-bold text-[10px] uppercase rounded-bl-xl">MAIS VENDIDO</div>
                 <div className="flex items-baseline gap-2 mb-2">
                   <span className="text-sm text-slate-400 line-through">De 29€</span>
                   <span className="text-brand-secondary font-bold text-sm">Oferta de lançamento:</span>
                 </div>
                 <div className="text-7xl font-black mb-6 text-slate-900 flex items-baseline gap-1">
                   <span className="text-3xl font-bold">10€</span>
                 </div>
                  <a 
                    href={CHECKOUT_URL}
                    className="w-full bg-brand-dark hover:bg-black text-white py-5 rounded-2xl font-bold text-xl transition-all shadow-xl shadow-brand-dark/20 flex items-center justify-center gap-2"
                  >
                    SIM, QUERO COMEÇAR AGORA
                    <ChevronRight className="w-6 h-6" />
                  </a>
                 <div className="text-center mt-4 text-slate-500 text-sm font-medium">
                   🔒 Pagamento seguro | Acesso imediato | Garantia de 7 dias
                 </div>
              </div>
            </div>
            <div className="relative mt-12 lg:mt-0">
               <div className="absolute -inset-10 bg-brand-primary/10 rounded-full blur-[120px] -z-10" />
               <img 
                 src="https://iili.io/B4FyTEQ.png" 
                 alt="Final Call" 
                 className="rounded-3xl shadow-2xl ring-4 md:ring-8 ring-white w-full max-w-md mx-auto" 
               />
            </div>
          </div>
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
