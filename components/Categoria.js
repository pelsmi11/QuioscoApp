import React from "react";
import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";

const Categoria = ({ categoria }) => {
  const { categoriaActual, handleClickCategoria } = useQuiosco();
  const { nombre, icono, id } = categoria;
  return (
    <div
      className={`${
        categoriaActual?.id === id ? "bg-amber-400" : ""
      }  border  md:hover:bg-amber-400 `}
    >
      <button
        type="button"
        className="text-2xl font-bold hover:cursor-pointer w-full"
        onClick={() => handleClickCategoria(id)}
      >
        <div className=" flex items-center gap-4 p-5">
          <Image
            width={70}
            height={70}
            src={`/assets/img/icono_${icono}.svg`}
            alt="Imagen Icono"
          />
          {nombre}
        </div>
      </button>
    </div>
  );
};

export default Categoria;
