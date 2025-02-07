// app/product/[id]/page.tsx

import { createClient } from "@sanity/client";
import Image from "next/image";

// Sanity Client Configuration
const sanity = createClient({
  projectId: "v93gtixd",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-01-01",
});

// Product Interface
interface Product {
  _id: string;
  title: string;
  price: number;
  description: string;
  discountPercentage: number;
  imageUrl: string;
  tags: string[];
}

const ProductPage: React.FC<{ product: Product | null }> = ({ product }) => {
  // If the product is not found
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-center text-slate-800 mt-4 mb-4">{product.title}</h2>
      <div className="flex flex-col sm:flex-row items-center">
        <Image
          src={product.imageUrl}
          alt={product.title}
          width={800}
          height={600}
          quality={50}
          loading="lazy"
          className="w-full sm:w-1/2 h-48 sm:h-80 object-cover rounded-md"
        />
        <div className="sm:ml-8 mt-4 sm:mt-0">
          <p className="text-lg font-semibold text-slate-800">${product.price.toFixed(2)}</p>
          {product.discountPercentage > 0 && (
            <p className="text-sm text-green-600 mt-2">
              {product.discountPercentage}% OFF
            </p>
          )}
          <p className="mt-4 text-slate-800">{product.description}</p>
          <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

// Generate static paths for the dynamic product pages
export async function generateStaticParams() {
  const query = `*[_type == "product"]{_id}`;
  const products = await sanity.fetch(query);

  // Generate the params for each product
  return products.map((product: { _id: string }) => ({
    id: product._id,
  }));
}

// Fetch the product data based on the dynamic id parameter
export async function fetchProduct(id: string) {
  const query = `*[_type == "product" && _id == $id][0]{
    _id,
    title,
    price,
    description,
    discountPercentage,
    "imageUrl": productImage.asset->url,
    tags
  }`;

  const product = await sanity.fetch(query, { id });
  return product || null;
}

export default async function ProductPageWrapper({ params }: { params: { id: string } }) {
  const product = await fetchProduct(params.id);

  return <ProductPage product={product} />;
}
