import Image from "next/image";
import useQuiosco from "../hooks/useQuiosco";
import Categoria from "../components/Categoria";

const Sidebar = () => {
  const { categorias } = useQuiosco();
  return (
    <div className=" md:h-screen">
      <div className="pt-6  md:h-1/4 ">
        <Image
          width={300}
          height={100}
          src="/assets/img/logo.svg"
          alt="imagen logotipo"
        />
      </div>

      <div className="md:h-3/4  md:overflow-y-scroll">
        <nav className="mt-10 ">
          {categorias.map((categoria) => (
            <Categoria categoria={categoria} key={categoria.id} />
          ))}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
