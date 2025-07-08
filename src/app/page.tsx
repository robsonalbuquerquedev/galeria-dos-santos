"use client";

import Image from "next/image";
import { useState } from "react";
import { santos } from "@/data/santos";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [mensagemAtual, setMensagemAtual] = useState<{ [key: string]: string }>({});

  const sortearMensagem = (id: string, mensagens: string[]) => {
    const nova = mensagens[Math.floor(Math.random() * mensagens.length)];
    setMensagemAtual((prev) => ({ ...prev, [id]: nova }));
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] text-[#1f2937]">
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
  );
}
