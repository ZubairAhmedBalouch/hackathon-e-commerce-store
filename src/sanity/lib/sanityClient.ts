import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'v93gtixd',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2025-01-13',
  token: 'sknbwyxl7mqWCJCqWBo6aGdgrRzbtBoVBYxPCrBKW136UUMtriPEXAl46KJaw0cyV638WexvDgBhm1W2tC64UybOhxsCUfHzb3nreNLWM8yijM1Gpn3fZPr8V6wZ2qglg6JLqwfWZdB3nzBthCOwdHgbf1yQjkco516R6puBLGdGcbmOoCzA',
});

// Fixing the typo: dicountPercentage -> discountPercentage
interface Product {
  imageUrl: string;
  title: string;
  price: number;
  tags: string[];
  discountPercentage: number;  // Corrected
  description: string;
  isNew: boolean;
  productImageUrl: string;  // Ensure this is the correct field for image URL
}

async function uploadImageToSanity(imageUrl: string): Promise<string | null> {
  try {
    console.log(`Uploading image: ${imageUrl}`);

    // Ensure that imageUrl is a valid string and fetch the image
    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${imageUrl}`);
    }

    const buffer = await response.arrayBuffer();
    const bufferImage = Buffer.from(buffer);

    // Upload image to Sanity
    const asset = await client.assets.upload('image', bufferImage, {
      filename: imageUrl.split('/').pop(), // Extract the filename from the URL
    });

    console.log(`Image uploaded successfully: ${asset._id}`);
    return asset._id;
  } catch (error) {
    console.error('Failed to upload image:', imageUrl, error);
    return null;
  }
}

async function uploadProduct(product: Product) {
  try {
    const imageId = await uploadImageToSanity(product.imageUrl);

    if (imageId) {
      const document = {
        _type: 'product',
        title: product.title,
        price: product.price,
        productImage: {
          _type: 'image',
          asset: {
            _ref: imageId,
          },
        },
        tags: product.tags,
        discountPercentage: product.discountPercentage, // Fixed typo here
        description: product.description,
        isNew: product.isNew,
      };

      // Create product document in Sanity
      const createdProduct = await client.create(document);
      console.log(`Product ${product.title} uploaded successfully:`, createdProduct);
    } else {
      console.log(`Product ${product.title} skipped due to image upload failure.`);
    }
  } catch (error) {
    console.error('Error uploading product:', error);
  }
}

async function importProducts() {
  try {
    const response = await fetch('https://template6-six.vercel.app/api/products');
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    
    const products: Product[] = await response.json(); // Ensure type is `Product[]`

    for (const product of products) {
      await uploadProduct(product);
    }
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

importProducts();
