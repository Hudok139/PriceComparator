import { useEffect, useState } from "react";
import { Product } from "../models/product.model";
import { PriceChart } from "./PriceChart";

interface SlidingTabsProps {
  products: Product[];
}

export default function SlidingTabs({ products }: SlidingTabsProps) {
  const [active, setActive] = useState(0);
  console.log("products vale: ", products);
  return (
    <div className="w-full flex flex-col items-center mt-10">
      {/* Tabs */}
      <div className="relative flex bg-blue-900/40 backdrop-blur-md rounded-full p-1 w-[320px] border border-white/10 shadow-2xl">
        {/* Indicador deslizante */}
        <div
          className="absolute top-1 bottom-1 w-1/2 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500 transition-all duration-300 ease-in-out shadow-[0_0_15px_rgba(37,99,235,0.5)]"
          style={{
            transform: `translateX(${active * 100}%)`,
          }}
        />

        {/* Botões */}
        <button
          onClick={() => setActive(0)}
          className={`relative z-10 w-1/2 py-2 text-sm font-bold transition-colors ${
            active === 0 ? "text-white" : "text-blue-200 hover:text-white"
          }`}
        >
          Preços
        </button>

        <button
          onClick={() => setActive(1)}
          className={`relative z-10 w-1/2 py-2 text-sm font-bold transition-colors ${
            active === 1 ? "text-white" : "text-blue-200 hover:text-white"
          }`}
        >
          Histórico
        </button>
      </div>

      {/* Conteúdo dinâmico */}
      <div className="mt-10 w-full">
        {active === 0 ? (
          /* Grid de Produtos */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
            {products && products.length > 0 ? (
              products.map((product) => (
                <div
                  key={product.id}
                  className="bg-white/5 backdrop-blur-sm border border-white/10 p-5 rounded-3xl hover:bg-white/10 transition-all group"
                >
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-cyan-400 bg-cyan-400/10 px-2 py-1 rounded">
                      {product.brand || "Oferta"}
                    </span>
                  </div>

                  <h3 className="text-slate-200 font-medium leading-snug h-12 line-clamp-2 mb-4 group-hover:text-white transition-colors">
                    {product.name}
                  </h3>

                  <div className="flex flex-col mb-4">
                    <span className="text-xs text-blue-300/60 uppercase">
                      Preço atual
                    </span>
                    <span className="text-2xl font-black text-white">
                      R${" "}
                      {product.current_price.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                      })}
                    </span>
                  </div>

                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-3 bg-white/10 hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 text-white rounded-2xl font-bold text-xs transition-all border border-white/5"
                  >
                    ACESSAR PRODUTO
                  </a>
                </div>
              ))
            ) : (
              <div className="text-blue-200/50 italic py-10">
                Nenhum produto encontrado.
              </div>
            )}
          </div>
        ) : (
          /* Seção B - Gráfico */
          <div className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 min-h-[400px] flex items-center justify-center">
            <div className="text-center">
              <p className="text-blue-200 font-medium">
                Análise de variação temporal
              </p>

              {active === 1 && (
                <div className="w-full mt-4">
                  {products && products.length > 0 ? (
                    <PriceChart products={products} />
                  ) : (
                    <p className="text-white text-center">
                      Aguardando dados...
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
