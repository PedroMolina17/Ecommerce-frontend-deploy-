import { IoIosStar } from "react-icons/io";
import { IoIosStarHalf } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../../hooks/useProducts";
import { useEffect, useState } from "react";
import { useCart } from "@/hooks/useCart";
import { jwtDecode } from "jwt-decode";
import { Toaster } from "react-hot-toast";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Cookies from "js-cookie";
import SkeletonProduct from "./SkeletonProducts";

interface Product {
  id: number;
  name: string;
  imagen?: string;
  salePrice: number;
  descripcion?: string;
  rating: number;
  ProductCoverImage?: any | null;
}

const Products = () => {
  const [userId, setUserId] = useState<string | null>(null);
  const { useGetCart } = useCart();
  const { useGetAllProducts } = useProduct();
  const [products, setProducts] = useState<Product[]>([]);
  const { data: dataProducts, isLoading: isLoadingProducts } =
    useGetAllProducts();
  const { data: dataCart } = useGetCart(Number(userId));
  const firstCart = dataCart ? dataCart.userCart[0]?.id : null;
  const { addCartMutation } = useCart();

  useEffect(() => {
    if (!isLoadingProducts && dataProducts) {
      const transformedProducts = dataProducts.results.map((result: any) => ({
        id: result.id,
        name: result.name,
        imagen: result.imagen,
        salePrice: result.salePrice ?? 0,
        descripcion: result.descripcion,
        rating: result.rating ?? 0,
        ProductCoverImage: result.ProductCoverImage || null,
      }));
      setProducts(transformedProducts);
    }
  }, [isLoadingProducts, dataProducts]);

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(<IoIosStar key={i} className="text-yellow-500" />);
      } else if (hasHalfStar && i === fullStars + 1) {
        stars.push(<IoIosStarHalf key={i} className="text-yellow-500" />);
      } else {
        stars.push(<IoIosStar key={i} className="text-gray-400" />);
      }
    }

    return stars;
  };

  useEffect(() => {
    const userCookie = Cookies.get("accessToken");
    if (userCookie) {
      try {
        const decodedToken: any = jwtDecode(userCookie);
        setUserId(decodedToken.user.id || "id");
      } catch (error) {
        console.error("Error al decodificar el token", error);
      }
    }
  }, []);

  const navigate = useNavigate();
  const handleAddToCart = (product: Product) => {
    const cartItemData = {
      cartId: firstCart as number,
      productId: product.id,
      quantity: 1,
      unitPrice: product.salePrice,
      totalItemPrice: product.salePrice * 1,
    };
    addCartMutation.mutate(cartItemData);
  };

  const navigateToProductDetails = (productId: number) => {
    navigate(`/electronics/${productId.toString()}`);
  };

  return isLoadingProducts ? (
    <div className="w-full grid grid-cols-4 gap-y-12 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2 mt-16 h-svh">
      {Array.from({ length: 24 }).map((_, index) => (
        <SkeletonProduct key={index} />
      ))}
    </div>
  ) : (
    products && (
      <div className="grid grid-cols-4 gap-y-12 max-md:grid-cols-2 max-sm:grid-cols-1 gap-2 mt-16 w-full">
        {products.map((product): any => (
          <div key={product.id} className="col-span-1 border rounded-md group">
            <div className="border-b-4 flex justify-center items-center  ">
              <LazyLoadImage
                src={product.ProductCoverImage?.imageProduct}
                placeholderSrc="/public/images/placeholderProducts.png"
                alt={product.name}
                className="rounded-md h-40 object-contain transition-transform transform group-hover:scale-110 group-hover:-translate-y-8"
              />
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <div className="flex gap-1 items-center ">
                {renderStars(product.rating)}
              </div>
              <p className="text-slate-500">{product.name}</p>
              <p className="text-[#139dba] font-bold">${product.salePrice}</p>
              <button
                className="py-2 text-center bg-[#cccccc] rounded-md min-w-8"
                onClick={() => navigateToProductDetails(product.id)}
              >
                Ver Mas
              </button>
              <button
                className="py-2 text-center bg-[#139dba] rounded-md min-w-8 transition-transform"
                onClick={() => handleAddToCart(product)}
              >
                <Toaster position="top-right" reverseOrder={true} />
                Add Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  );
};

export default Products;
