import { useParams } from "react-router-dom";
import { getProductById } from "@/api/products";
import { useQuery } from "@tanstack/react-query";

const ElectronicDetails = () => {
  const { id } = useParams<{ id?: string }>();

  const {
    data: productById,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["productById", id],
    queryFn: () =>
      id ? getProductById(Number(id)) : Promise.reject("ID is undefined"),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>; // Muestra un mensaje de carga
  }

  if (error) {
    return (
      <div>
        Error: {error instanceof Error ? error.message : "Something went wrong"}
      </div>
    ); // Manejo de errores
  }

  if (!productById?.product) {
    return <div>No product found</div>; // Manejo de caso en que no se encuentra el producto
  }

  return (
    <div className="grid grid-cols-2 max-md:grid-cols-1 h-screen p-24">
      <div className="grid col-span-1">
        <img
          src={
            productById.product.ProductCoverImage?.imageProduct ||
            "fallback-image-url"
          } // Añade una URL de imagen de respaldo
          alt={productById.product.name || "Product Image"}
          className="w-full h-auto object-cover"
        />
      </div>
      <div className="grid col-span-1">
        <div className="flex flex-col gap-8">
          <h2 className="text-4xl font-bold">{productById.product.name}</h2>
          <span className="text-lg">{productById.product.description}</span>
          <span className="text-2xl text-[#139dba] font-bold">
            ${productById.product.salePrice}
          </span>
          <button className="bg-[#139dba] text-white px-4 py-2 rounded-md w-40">
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ElectronicDetails;
