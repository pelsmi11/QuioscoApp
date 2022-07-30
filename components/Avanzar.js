import React from "react";
import { useEffect, useCallback } from "react";
import useQuiosco from "../hooks/useQuiosco";
import { useRouter } from "next/router";

const Avanzar = () => {
  const router = useRouter();
  const { pedido } = useQuiosco();

  const comprobarPedido = useCallback(() => {
    return pedido.length === 0;
  }, [pedido]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  const decirRuta = () => {
    let valor;
    switch (router.pathname) {
      case "/resumen":
        valor = "/total";
        break;
      case "/total":
        valor = "/resumen";
        break;
      case "/":
        valor = "/resumen";
        break;
      default:
        valor = "/";
    }
    return valor;
  };

  const avance = () => {
    router.push(decirRuta());
  };

  return (
    <>
      <button
        className={`bg-amber-500 hover:bg-amber-600 flex gap-2  px-5 py-2 text-white text-center rounded-md font-bold uppercase shadow-md w-full `}
        type="button"
        onClick={() => avance()}
      >
        {router.pathname === "/total" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        )}
      </button>
    </>
  );
};

export default Avanzar;
