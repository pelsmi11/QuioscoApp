import { useState, useEffect, createContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/router";

const QuioscoContext = createContext();

const QuioscoProvider = ({ children }) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaActual, setCategoriaActual] = useState({});
  const [producto, setProducto] = useState({});
  const [modal, setModal] = useState(false);
  const [cargandoCategorias, setCargandoCategorias] = useState(false);
  const [pedido, setPedido] = useState([]);
  const [nombre, setNombre] = useState("");
  const [total, setTotal] = useState(0);
  const [ordenGenerado, setOrdenGenerado] = useState({});

  const router = useRouter();

  const obtenerCategorias = async () => {
    setCargandoCategorias(true);
    setModal(false);
    const { data } = await axios("/api/categorias");
    setCategorias(data);
    setCargandoCategorias(false);
  };

  useEffect(() => {
    obtenerCategorias();
  }, []);

  useEffect(() => {
    setCategoriaActual(categorias[0]);
  }, [categorias]);

  useEffect(() => {
    const nuevoTotal = pedido.reduce(
      (total, producto) => producto.precio * producto.cantidad + total,
      0
    );
    setTotal(nuevoTotal);
  }, [pedido]);

  const handleClickCategoria = (id) => {
    const categoria = categorias.filter((categori) => categori.id === id);
    setCategoriaActual(categoria[0]);
    router.push("/");
  };

  const handleSetProducto = (producto) => {
    setProducto(producto);
  };

  const handleChangeModal = () => {
    setModal(!modal);
  };

  const handleAgregarPedido = ({ categoriaId, ...producto }) => {
    if (pedido.some((productoState) => productoState.id === producto.id)) {
      //Actualizar la cantidad
      const pedidoActualizado = pedido.map((productoState) =>
        productoState.id === producto.id ? producto : productoState
      );
      setPedido(pedidoActualizado);
      toast.success("👌 Guardado Correctamente!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      setPedido([...pedido, producto]);
      toast.success("🙌 Agregando al Pedido!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    setModal(!modal);
    router.push("/resumen");
  };

  const handleEditarCantidades = (id) => {
    const productoActualizar = pedido.filter((producto) => producto.id === id);
    setProducto(productoActualizar[0]);

    setModal(!modal);
  };

  const handleEliminarProducto = (id) => {
    const pedidoActualizado = pedido.filter((producto) => producto.id !== id);
    setPedido(pedidoActualizado);
  };

  const colocarOrden = async () => {
    try {
      const { data } = await axios.post("/api/ordenes", {
        pedido,
        nombre: nombre.trim(),
        total,
        fecha: new Date().toISOString(),
        // fecha: Date.now().toString(),
      });
      setOrdenGenerado(data);

      // Resetear la application
      resetContest();

      //toast
      toast.success("Pedido Realizado Correctamente");
      setTimeout(() => {
        router.push("/boleta");
      }, 3000);
    } catch (error) {
      console.error(error);
    }
  };

  const resetContest = () => {
    setCategoriaActual([0]);
    setPedido([]);
    setNombre("");
    setTotal(0);
  };

  return (
    <QuioscoContext.Provider
      value={{
        categorias,
        cargandoCategorias,
        categoriaActual,
        producto,
        modal,
        pedido,
        nombre,
        total,
        ordenGenerado,
        handleClickCategoria,
        handleSetProducto,
        handleChangeModal,
        handleAgregarPedido,
        handleEditarCantidades,
        handleEliminarProducto,
        setNombre,
        setOrdenGenerado,
        colocarOrden,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  );
};

export { QuioscoProvider };

export default QuioscoContext;
