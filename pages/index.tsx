import { ShopLayout } from "../components/layouts/";
import { Typography } from "@mui/material";
import { ProductList } from "../components/products/";
import { useProducts } from "../hooks/useProducts";
import { LoadingPage } from "../components/ui";

export default function Home() {
  const { products, isLoading } = useProducts("/products");

  return (
    <ShopLayout title="Teslo | Shop" description="Home page of Teslo shop">
      <Typography variant="h1">Teslo</Typography>

      <Typography variant="h2" marginBottom={4}>
        Tienda de ropa
      </Typography>

      {isLoading ? <LoadingPage /> : <ProductList products={products} />}
    </ShopLayout>
  );
}
