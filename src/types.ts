// Define the type for a product
export interface Product {
  _id: string; // Unique identifier for the product
  title: string; // Product title
  description: string; // Product description
  productimageUrl: string; // Resolved URL for the product image
  price: number; // Product price
  tags?: string[]; // Array of tags (optional)
  dicountPercentage?: number; // Discount percentage (optional)
  isNew?: boolean; // Indicates if the product is new (optional)
}

// Define the type for the fetched product data response
export interface ProductResponse {
  result: Product[]; // Array of products
}







// // export interface Product {
// //     image: string;
// //     name: string;
// //     department: string;
// //     originalPrice: string;
// //     discountedPrice: string;
// //     colors: string[];
// //   }

// // types.ts
// export interface Product {
//   _id: string;
//   title: string;
//   description: string;
//   productImageUrl: string;
//   price: number;
//   tags: string[];
//   discountPercentage: number;
//   isNew: boolean;

// }
