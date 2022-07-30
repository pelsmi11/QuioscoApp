import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function hander(req, res) {
  const body = req.body;

  if (req.method === "POST") {
    try {
      const orden = await prisma.orden.create({
        data: {
          nombre: body.nombre,
          total: body.total,
          pedido: body.pedido,
          fecha: body.fecha,
        },
      });
      res.json(orden);
    } catch (error) {
      console.error(error);
    }
  } else {
    res.json({ hola: "mundo" });
  }
}
