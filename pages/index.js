import Head from "next/head";
import Image from "next/image";
import Layout from "../layout/Layout";
import useQuiosco from "../hooks/useQuiosco";
import Avanzar from "../components/Avanzar";
import Producto from "../components/Producto";

export default function Home() {
  const { categoriaActual } = useQuiosco();
  return (
    <div>
      <Layout pagina={`Menú ${categoriaActual?.nombre || ""}`}>
        <div className="flex gap-10 items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold ">{categoriaActual?.nombre}</h1>
            <p className="text-2xl my-10">
              Elige y personaliza tu pedido a continuación
            </p>
          </div>
          <div>
            <Avanzar />
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4">
          {categoriaActual?.productos?.map((producto) => (
            <Producto key={producto.id} producto={producto} />
          ))}
        </div>
      </Layout>
    </div>
  );
}
