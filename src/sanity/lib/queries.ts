import { defineQuery } from "next-sanity";

// Query for fetching all products
export const allproducts = defineQuery(`
  *[_type == "product"]{
    _id,
    title,
    description,
    price,
    discountPercentage,
    priceWithoutDiscount,
    rating,
    ratingCount,
    tags,
    sizes,
    "productImageUrl": productImage.asset->url
  }
`);

// Query for fetching only the first four products
export const fourPro = defineQuery(`
  *[_type == "product"]{
    _id,
    title,
    description,
    price,
    discountPercentage,
    priceWithoutDiscount,
    rating,
    ratingCount,
    tags,
    sizes,
    "productImageUrl": productImage.asset->url
  }
`);
