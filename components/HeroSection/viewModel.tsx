import { useEffect, useState } from "react";

const useHeroSection = () => {
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!productName) return;
    setLoading(true);

    // 1. Pegamos a base da URL da variável de ambiente
    // 2. Adicionamos um fallback para localhost caso a variável não exista
    const apiBase = import.meta.env.VITE_API_URL
      ? `https://${import.meta.env.VITE_API_URL.replace("https://", "")}`
      : "http://127.0.0.1:8000";

    try {
      const response = await fetch(
        `${apiBase}/products/search?q=${productName}`,
      );
      const data = await response.json();

      console.log("Produtos recebidos:", data.results);
      setProducts(data.results || []);
    } catch (e) {
      console.error("Erro ao buscar dados:", e);
    } finally {
      setLoading(false);
    }
  };

  return {
    productName,
    products,
    loading,
    setProductName,
    handleSearch,
  };
};

export default useHeroSection;
