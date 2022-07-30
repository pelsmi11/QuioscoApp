import Layout from "../layout/Layout";
import { useEffect, useCallback } from "react";
import useQuiosco from "../hooks/useQuiosco";
import ResumenProducto from "../components/ResumenProducto";
import Avanzar from "../components/Avanzar";

export default function Resumen() {
  const { pedido } = useQuiosco();

  const comprobarPedido = useCallback(() => {
    return pedido.length === 0;
  }, [pedido]);

  useEffect(() => {
    comprobarPedido();
  }, [pedido, comprobarPedido]);

  return (
    <Layout pagina="Resumen">
      <div className="flex gap-10 items-center justify-between">
        <div>
          <h1 className="text-4xl font-black">Resumen</h1>
          <p className="text-2xl my-5">Revisa tu Pedido</p>
        </div>
        <div>
          <Avanzar />
        </div>
      </div>

      {pedido.length === 0 ? (
        <p className="text-center text-2xl">No hay elementos en tu pedido</p>
      ) : (
        pedido.map((producto) => (
          <ResumenProducto producto={producto} key={producto.id} />
        ))
      )}
    </Layout>
  );
}
