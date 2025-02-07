// "use client";
// import Image from "next/image";
// import { useEffect, useState } from "react";
// import { client } from "../../sanity/lib/client"; // Import your Sanity client
// import { Product } from "../../types";

// const FeatureProducts: React.FC = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Sanity query to fetch products
//         const query = `*[_type == "product"]{
//           _id,
//           "productImageUrl": productImage.asset->url, // Fetch the image URL from Sanity
//           price
//         }`;

//         const data: Product[] = await client.fetch(query);
//         console.log("Fetched products from Sanity:", data);

//         if (Array.isArray(data) && data.length > 0) {
//           setProducts(data);
//         } else {
//           setError("No products available.");
//         }
//       } catch (error) {
//         console.error("Error fetching products:", error);
//         setError("There was an error fetching the products.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) {
//     return <div>Loading products...</div>;
//   }

//   if (error) {
//     return <div>{error}</div>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center text-center mt-28 mb-7 overflow-x-hidden">
//       <div>
//         <h3 className="text-[#737373] text-[20px]">Featured Products</h3>
//         <h2 className="text-[#252B42] text-[24px] font-bold mt-2">
//           BESTSELLER PRODUCTS
//         </h2>
//         <p className="text-[#737373] text-[14px] mt-2">
//           Problems trying to resolve the conflict between
//         </p>
//       </div>

//       {/* Product Card Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-1 mt-6 w-full">
//         {products.map((product) => (
//           <div key={product._id} className="flex flex-col items-center">
//             {/* Check if productImageUrl is not empty or invalid */}
//             {product.productimageUrl ? (
//               <Image
//                 src={product.productimageUrl}
//                 alt={`Product ${product._id}`}
//                 width={200}
//                 height={200}
//                 className="object-cover"
//               />
//             ) : (
//               <div className="w-[200px] h-[200px] bg-gray-300 flex items-center justify-center text-white">
//                 No Image Available
//               </div>
//             )}
//             <h1 className="mt-2 font-semibold text-lg">${product.price}</h1>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FeatureProducts;
