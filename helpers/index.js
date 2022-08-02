const formatearDinero = (cantidad) => {
  return cantidad.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
};

const formatearFecha = (fecha) => {
  const fechaNueva = new Date(fecha);

  const opciones = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };

  return fechaNueva.toLocaleDateString("es-ES", opciones);
};

export { formatearDinero, formatearFecha };
