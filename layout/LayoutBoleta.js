import Head from "next/head";
import Spinner from "../components/Spinner/Spinner";
import useQuiosco from "../hooks/useQuiosco";
import Modal from "react-modal";
import ModalProducto from "../components/ModalProducto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#__next");

export default function Layout({ children, pagina }) {
  const { cargandoCategorias, modal } = useQuiosco();
  return (
    <>
      <Head>
        <title>Café - {pagina}</title>
        <meta name="description" content="Quiosco Cafetería" />
      </Head>
      <div className="md:flex flex-col items-center bg-amber-300 h-screen p-5">
        {children}
      </div>

      {modal && (
        <Modal isOpen={modal} style={customStyles}>
          <ModalProducto />
        </Modal>
      )}
      <ToastContainer />
    </>
  );
}
