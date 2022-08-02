import React from "react";
import useQuiosco from "../../hooks/useQuiosco";
import { boletaObjeto } from "../../Data/Boleta";
import { formatearFecha, formatearDinero } from "../../helpers";

const BoletaPdf = () => {
  const { ordenGenerado } = useQuiosco();
  const { id, nombre, fecha, total, pedido } = ordenGenerado;
  return (
    <>
      <div className="bg-white ">
        <div className="flex items-center flex-col border border-gray-900">
          <p className="text-2xl font-black">Numero de Orden: {id}</p>
          <p className="text-xl font-black">Cliente: {nombre}</p>
          <p className="text-xl font-black">Total: {formatearDinero(total)}</p>
          <p className="text-xl font-black" suppressHydrationWarning>
            Fecha: {formatearFecha(fecha)}
          </p>
        </div>
        <div className="p-4 border border-gray-900 ">
          {pedido?.map((producto) => (
            <div key={producto.id} className="flex gap-4 justify-between ">
              <div className="mb-2">
                <p>Producto: {producto?.nombre}</p>
                <p>Cantidad: {producto?.cantidad}</p>
              </div>
              <div className="flex flex-col items-between">
                <div className="flex gap-2 justify-between">
                  <p>Precio: </p>
                  <p>{formatearDinero(producto?.precio || 0)}</p>
                </div>

                <div className="flex  gap-2  justify-between">
                  <p>SubTotal: </p>
                  <p>
                    {formatearDinero(
                      (producto?.cantidad || 0) * (producto?.precio || 0)
                    )}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BoletaPdf;
