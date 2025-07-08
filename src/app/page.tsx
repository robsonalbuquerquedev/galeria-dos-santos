"use client";

import Image from "next/image";
import { useState } from "react";
import { santos } from "@/data/santos";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

export default function Home() {
  const [mensagemAtual, setMensagemAtual] = useState<{ [key: string]: string }>({});

  const sortearMensagem = (id: string, mensagens: string[]) => {
    const nova = mensagens[Math.floor(Math.random() * mensagens.length)];
    setMensagemAtual((prev) => ({ ...prev, [id]: nova }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f9fafb] text-[#1f2937]">
      <div className="flex-grow">
        {/* Header fixo do grupo */}
        <header className="bg-[#264D73] text-white py-6 shadow-md text-center">
          <h1 className="text-3xl font-bold">Grupo de Oração Jovem São Francisco - GOJ</h1>
        </header>
        {/* Conteúdo principal centralizado */}
        <section className="max-w-7xl mx-auto px-4 py-10">
          {/* Título abaixo do header */}
          <h2 className="text-2xl font-semibold text-center mb-8">
            Escolha um santo para receber uma mensagem
          </h2>
          {/* Grid dos santos */}
          <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 border-t border-l">
            {santos.map((santo, index) => (
              <motion.div
                key={santo.id}
                className="text-center border-r border-b p-4 bg-white rounded-md shadow-md"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                {/* Imagem com animação no hover */}
                <motion.div
                  className="relative w-full aspect-square overflow-hidden rounded bg-white flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Image
                    src={santo.imagem}
                    alt={santo.nome}
                    fill
                    className="object-contain p-4 cursor-pointer"
                    onClick={() => sortearMensagem(santo.id, santo.mensagens)}
                  />
                </motion.div>
                <h3 className="mt-4 font-bold text-xl">{santo.nome}</h3>
                <AnimatePresence mode="wait">
                  {mensagemAtual[santo.id] && (
                    <motion.p
                      key={mensagemAtual[santo.id]}
                      className="mt-2 text-gray-600 italic"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      “{mensagemAtual[santo.id]}”
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </main>
        </section>
      </div>
      <footer className="border-t mt-12 pt-6 pb-8 bg-white w-full">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-gray-600 mb-4 text-sm">
            © {new Date().getFullYear()} Robson Albuquerque. Todos os direitos reservados.
          </p>

          <div className="flex justify-center gap-6 text-2xl text-[#264D73] flex-wrap">
            {[
              {
                href: "https://github.com/robsonalbuquerquedev",
                label: "GitHub",
                icon: <FaGithub />,
                color: "#333",
              },
              {
                href: "https://www.linkedin.com/in/robson-monteiro-de-albuquerque-8b3853230/",
                label: "LinkedIn",
                icon: <FaLinkedin />,
                color: "#0077B5",
              },
              {
                href: "https://www.instagram.com/robson.albuquerque_cm/",
                label: "Instagram",
                icon: <FaInstagram />,
                color: "#E4405F",
              },
              {
                href: "https://wa.me/5581971168633",
                label: "WhatsApp",
                icon: <FaWhatsapp />,
                color: "#25D366",
              },
            ].map((item, index) => (
              <motion.a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.label}
                className="transition-colors"
                whileHover={{ scale: 1.3, color: item.color }}
                whileTap={{ scale: 0.95 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
