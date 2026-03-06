import { useEffect, useState } from "react";

const useHeroSection = () => {
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("products vale: ", products);
  }, [products]);

  const handleSearch = async () => {
    if (!productName) return;
    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/products/search?q=${productName}`,
      );
      const data = await response.json();

      console.log("Produtos recebidos:", data.results);

      setProducts(data.results);
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
