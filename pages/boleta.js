import LayoutBoleta from "../layout/LayoutBoleta";
import BoletaPdf from "../components/PDF/BoletaPdf";
import { useRef } from "react";
import useQuiosco from "../hooks/useQuiosco";
import { useReactToPrint } from "react-to-print";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

export default function Boleta() {
  const { ordenGenerado, setOrdenGenerado } = useQuiosco();
  const componentRef = useRef();

  const router = useRouter();
  //   console.log(JSON.stringify(ordenGenerado));

  const { id } = ordenGenerado;

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `Orden_${id}`,
    onAfterPrint: () => toast.success("🚀 PDF Generado"),
    onPrintError: () => toast.error("💥 Error En PDF"),
  });

  const handleReturn = () => {
    setOrdenGenerado({});
    router.push("/");
  };

  return (
    <LayoutBoleta pagina="Boleta">
      <div className="flex gap-10 items-center justify-between">
        <div>
          <h1 className="text-4xl font-black text-center">
            Genial!! Tu Orden Es No. {id}
          </h1>
          <p className="text-2xl my-5 text-center">
            Ve con tu Orden al Final de la barra
          </p>
          <div className="flex gap-5 ">
            <button
              className="bg-sky-700 flex gap-2 px-5 py-2 text-white text-center rounded-md font-bold uppercase shadow-md w-full items-center justify-center "
              type="button"
              onClick={() => handlePrint()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
                  clipRule="evenodd"
                />
              </svg>
              IMPRIMIR
            </button>
            <button
              className="bg-red-700 flex gap-2 px-5 py-2 text-white text-center rounded-md font-bold uppercase shadow-md w-full items-center justify-center "
              type="button"
              onClick={() => handleReturn()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
              </svg>
              Regresar
            </button>
          </div>
        </div>
      </div>
      <div ref={componentRef} style={{ padding: "4rem" }}>
        <BoletaPdf />
      </div>
    </LayoutBoleta>
  );
}
