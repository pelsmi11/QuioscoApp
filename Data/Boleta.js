const boleta =
  '{"id":6,"nombre":"kimberly","fecha":"2022-07-30T23:39:55.817Z","total":119.8,"pedido":[{"id":1,"imagen":"cafe_01","nombre":"Café Caramel con Chocolate","precio":59.9,"cantidad":2}]}';

const boletaObjeto = {
  id: 6,
  nombre: "kimberly",
  fecha: "2022-07-30T23:39:55.817Z",
  total: 119.8,
  pedido: [
    {
      id: 1,
      imagen: "cafe_01",
      nombre: "Café Caramel con Chocolate",
      precio: 59.9,
      cantidad: 2,
    },
    {
      id: 2,
      imagen: "cafe_01",
      nombre: "Café negro",
      precio: 36.5,
      cantidad: 3,
    },
  ],
};

export { boleta, boletaObjeto };
