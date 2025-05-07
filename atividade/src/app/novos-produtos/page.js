"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function NovoProduto() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [produtosExistentes, setProdutosExistentes] = useState([]);

  useEffect(() => {
    const produtosQuery = searchParams.get("produtos");
    if (produtosQuery) {
      try {
        setProdutosExistentes(JSON.parse(produtosQuery));
      } catch (error) {
        console.error("Erro ao analisar produtos:", error);
      }
    }
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoProduto = {
      nome,
      preco: parseFloat(preco),
    };

    const listaAtualizada = [...produtosExistentes, novoProduto];


    router.push(`/?produtos=${encodeURIComponent(JSON.stringify(listaAtualizada))}`);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Cadastrar Produto</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label><br />
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Preço:</label><br />
          <input
            type="number"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
            step="0.01"
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "1rem" }}>
          Cadastrar
        </button>
      </form>
    </main>
  );
}
