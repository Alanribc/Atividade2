"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const produtosJSON = searchParams.get("produtos");

    if (produtosJSON) {
      try {
        const lista = JSON.parse(produtosJSON);
        setProdutos(lista);
      } catch (error) {
        console.error("Erro ao analisar produtos:", error);
      }
    }
  }, []);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Catálogo de Produtos</h1>
      <article>
        <h2>Produtos:</h2>

        <Link
          href={{
            pathname: "/novos-produtos",
            query: { produtos: JSON.stringify(produtos) },
          }}
        >
          <button>Cadastrar novo produto</button>
        </Link>

        {produtos.length === 0 ? (
          <p>Nenhum produto cadastrado</p>
        ) : (
          <ul>
            {produtos.map((produto, index) => (
              <li key={index}>
                <p>
                  {produto.nome} — R$ {Number(produto.preco).toFixed(2)}
                </p>
              </li>
            ))}
          </ul>
        )}
      </article>
    </main>
  );
}
