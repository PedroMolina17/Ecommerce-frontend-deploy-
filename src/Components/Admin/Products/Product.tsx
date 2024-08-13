// Product.tsx
import useProductStore from "./store/ProductStore";
import CreateProduct from "./CreateProduct";
import ProductsTable from "./ProductsTable";
import UpdateProduct from "./UpdateProduct";

const Product = () => {
  const { operation, productId } = useProductStore();

  return (
    <div>
      {operation === "Create" ? (
        <CreateProduct />
      ) : operation === "ViewProduct" ? (
        <ProductsTable />
      ) : operation === "Edit" ? (
        productId !== null ? (
          <UpdateProduct productId={productId} />
        ) : (
          <div>No product ID available for editing</div>
        )
      ) : (
        <CreateProduct /> 
      )}
    </div>
  );
};

export default Product;
