// import { FaImage } from "react-icons/fa";
import {
  MdOutlineAttachMoney,
  MdOutlineProductionQuantityLimits,
  MdLocalOffer,
  MdOutlineLocalOffer,
} from "react-icons/md";
import { useEffect } from "react";
import { getAllCategory } from "../../../api/category";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { useImageCover } from "@/hooks/useImageCover";

// import {
//   IResponseCreateProduct,
//   IcreateProduct,
// } from "../../../types/products.type";
import { updateProduct, getProductById } from "../../../api/products";
import { getAllBrands } from "../../../api/brands";
import { useOpenFormStoreProduct } from "./store/ActionStore";
import useProductStore from "./store/ProductStore";
import { IDUpdateProduct } from "@/types/products.type";

interface UpdateProductProps {
  productId: number;
}
const UpdateProduct: React.FC<UpdateProductProps> = ({ productId }) => {
  const { updateImageCoverMutation } = useImageCover();
  const { setOperation } = useProductStore();

  interface FormularioProductoProps {
    id: number;
    name: string;
    categoryId: number;
    purchasePrice: number;
    salePrice: number;
    image: string | null;
    categories: { id: number; name: string }[];
    description: string;
    stock: number;
    status: boolean;
    promotion: boolean;
    promotionPrice: number;
    promotionDescription?: string;
    brandId: number;
    imageProductCover: any;
    imageId: any;
    brands: { id: number; name: string }[];
  }

  //Crear Categoria
  const updateProductMutation = useMutation({
    mutationFn: async (data: IDUpdateProduct) => await updateProduct(data),
  });

  //Obtener product por Id
  const { data: productById, isLoading } = useQuery({
    queryKey: ["productById"],
    queryFn: () => getProductById(productId),
  });

  //Obtener Categoria
  const { data: categoriesData } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => await getAllCategory(),
  });
  const categories = categoriesData?.data || [];

  //Obtener Marcas
  const { data: brandsData } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => await getAllBrands(),
  });
  const brands = brandsData?.data || [];

  //Leer y Mostar imagen
  // const fileInputRef = useRef(null);

  // const handleButtonClick = () => {
  //   fileInputRef.current.click();
  // };

  // const handleFileChange = (event) => {
  //   const file = event.target.files[0];
  //   const reader = new FileReader();
  //   reader.onload = () => {
  //     setPreviewImage(reader.result);
  //   };
  //   reader.readAsDataURL(file);
  // };

  //Cambiar vista
  const toggleView = (operation: any) => {
    setOperation(operation);
  };
  //Enviar Datos
  const onSubmit = async (data: any) => {
    try {
      const {
        name,
        categoryId,
        purchasePrice,
        salePrice,
        description,
        stock,
        promotionPrice,
        promotionDescription,
        brandId,
        imageProductCover,
        imageId,
      } = data;

      const updatedDataProduct: any = {
        id: Number(productId),
        name,
        categoryId: parseInt(categoryId, 10),
        purchasePrice,
        salePrice,
        description,
        stock,
        promotionPrice,
        promotionDescription,
        brandId,
      };

      const updatedImageData: any = new FormData();
      updatedImageData.append("imageProductCover", imageProductCover[0]);
      updatedImageData.append("imageId", imageId);

      updateProductMutation.mutate(updatedDataProduct);

      updateImageCoverMutation.mutate(updatedImageData);
      toggleView("ViewProduct");
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
    }
  };

  useEffect(() => {
    if (!isLoading && productById && productById.product) {
      reset({
        name: productById.product.name,
        description: productById.product.description,
        purchasePrice: productById.product.purchasePrice,
        salePrice: productById.product.salePrice,
        promotionPrice: productById.product.promotionPrice,
        categoryId: productById.product.categoryId,
        brandId: productById.product.brandId,
        stock: productById.product.stock,
        promotionDescription: productById.product.promotionDescription,
        imageId: productById?.product?.ProductCoverImage?.id,
        id: productById.product.id,
      });
    }
  }, [productById, isLoading]);

  const { handleSubmit, register, reset } = useForm<FormularioProductoProps>(
    {}
  );

  const { setOpenForm } = useOpenFormStoreProduct();

  return isLoading ? (
    <div>cargando</div>
  ) : (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register("id")} value={8} defaultValue={8} />
      <input type="hidden" {...register("id")} value={8} defaultValue={8} />

      <div className="flex text-darkSecondary flex-col">
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <h1 className="text-4xl block my-4">Update Product</h1>
            <img
              src={productById?.product?.ProductCoverImage?.imageProduct}
              alt="Preview"
              className="h-24 border border-darkPrimary object-contain opacity-75"
            />
          </div>
          <div className="flex gap-4 items-center justify-center font-bold">
            <button
              className="bg-blue-600 p-6  h-8 rounded-md flex items-center "
              type="submit"
              onClick={() => setOpenForm("create")}
            >
              Agregar
            </button>
            <button
              className="bg-red-600 p-6 h-8 rounded-md flex items-center"
              onClick={() => toggleView("ViewProduct")}
            >
              Cancelar
            </button>
          </div>
        </div>

        <div className="w-full grid grid-cols-12 gap-8">
          <div className="grid col-span-8">
            <div className="flex flex-col gap-8">
              <label className="flex flex-col gap-2">
                <p className="text-xl">Producto</p>
                <input
                  type="text"
                  {...register("name", { required: "Campo obligatorio" })}
                  className=" bg-darkSecondary rounded-sm h-8 text-darkPrimary p-1"
                />
              </label>
              <label className="flex flex-col gap-2">
                <p className="text-xl">Descripcion</p>
                <textarea
                  {...register("description", {
                    required: "Campo obligatorio",
                  })}
                  className=" bg-darkSecondary rounded-sm h-48 text-darkPrimary p-1"
                />
              </label>
              <div className="flex flex-col gap-2">
                <p className="text-xl">Inventario</p>
                <div className="border p-4 flex flex-col gap-4 text-lg">
                  <label className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdOutlineAttachMoney /> Precio de Compra
                    </div>
                    <input
                      {...register("purchasePrice", {
                        required: "Campo obligatorio",
                      })}
                      type="number"
                      className="w-96 rounded-sm text-black p-1"
                      placeholder="$0.00"
                      step="0.01"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdOutlineAttachMoney /> Precio de Venta
                    </div>
                    <input
                      {...register("salePrice", {
                        required: "Campo obligatorio",
                      })}
                      type="number"
                      className="w-96 rounded-sm text-black p-1"
                      placeholder="$0.00"
                      step="0.01"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdOutlineProductionQuantityLimits /> Cantidad
                    </div>
                    <input
                      {...register("stock", { required: "Campo obligatorio" })}
                      type="number"
                      className="w-96 rounded-sm text-black p-1"
                      placeholder="0"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdLocalOffer /> Precio en promocion
                    </div>
                    <input
                      type="number"
                      {...register("promotionPrice")}
                      placeholder="$0.00"
                      className="w-96 rounded-sm text-black p-1"
                    />
                  </label>
                  <label className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <MdOutlineLocalOffer /> Descripcion en promocion
                    </div>
                    <input
                      type="text"
                      {...register("promotionDescription")}
                      placeholder="Descripcion"
                      className="w-96 rounded-sm text-black p-1"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
          <div className=" col-span-4 flex flex-col gap-8">
            <div className="bg-darkThird p-4 rounded-md">
              <h2 className="text-3xl mb-4">Organizar</h2>
              <div className="flex flex-col gap-8 my-8">
                <label className="flex flex-col gap-2">
                  Categoria
                  <select
                    {...register("categoryId", {
                      required: "Campo obligatorio",
                    })}
                    className="h-8 text-darkPrimary"
                  >
                    <option value="">Seleccione una categoría</option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  Marca
                  <select
                    {...register("brandId", { required: "Campo obligatorio" })}
                    className="h-8 text-darkPrimary"
                  >
                    <option value="">Seleccione una marca</option>
                    {brands.map((brand) => (
                      <option key={brand.id} value={brand.id}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="flex flex-col gap-2">
                  Etiquetas
                  <select className="h-8 text-darkPrimary">
                    <option>Valor 1</option>
                    <option>Valor 2</option>
                  </select>
                </label>
              </div>
            </div>
            <div className="bg-darkThird p-4 rounded-md">
              <h2 className="text-3xl mb-4">Imagenes</h2>
              <div className="flex flex-col gap-8 my-8">
                <label className="flex flex-col gap-2">
                  Imagen de Portada
                  {/* <button
                    className="text-darkPrimary flex text-4xl justify-center items-center border h-24 border-darkPrimary"
                    onClick={handleButtonClick}
                  >
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        className="h-24 border border-darkPrimary"
                      />
                    ) : (
                      <FaImage />
                    )}
                    <input
                      {...register("image")}
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    ></input>
                  </button> */}
                </label>
                <input className="hidden" {...register("imageId")}></input>
                <input type="file" {...register("imageProductCover")}></input>

                {/* <label className="flex flex-col gap-2">
                  Imagen de Exibhicion
                  <button
                    className="text-darkPrimary flex text-4xl justify-center items-center border h-24 border-darkPrimary"
                    onClick={handleButtonClick}
                  >
                    {previewImage ? (
                      <img
                        src={
                          productById?.product.ProductCoverImage.imageProduct
                        }
                        alt="Preview"
                        className="h-24 border border-darkPrimary"
                      />
                    ) : (
                      <FaImage />
                    )}
                    <input
                      type="file"
                      ref={fileInputRef}
                      className="hidden"
                      onChange={handleFileChange}
                    ></input>
                  </button>
                </label> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateProduct;
