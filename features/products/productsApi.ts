import { IProduct } from "@/interfaces/IProduct";

// Fetch all products
export default async function getProducts(): Promise<IProduct[]> {
  const result = await fetch(`https://api.foodvela.com/api/v1/foods`);
  if (!result.ok) {
    throw new Error('Failed to fetch products');
  }
  return result.json();
}

// Fetch product details by ID
export async function getProductDetails(id: string): Promise<IProduct> {
  const result = await fetch(`https://api.foodvela.com/api/v1/food/${id}`);
  if (!result.ok) {
    throw new Error('Failed to fetch product details');
  }
  return result.json();
}

// Create a new product
export async function createProduct(product: IProduct): Promise<IProduct> {
  const response = await fetch('https://api.foodvela.com/api/v1/food/create', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to create product');
  }

  return response.json();
}

// Update an existing product
export async function updateProduct(product: IProduct): Promise<IProduct> {
  const response = await fetch(`https://api.foodvela.com/api/v1/food/${product._id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error('Failed to update product');
  }

  return response.json();
}

// Delete a product by ID
export async function deleteProduct(id: string): Promise<{ message: string }> {
  const result = await fetch(`https://api.foodvela.com/api/v1/food/${id}`, {
    method: 'DELETE',
  });

  if (!result.ok) {
    throw new Error('Failed to delete product');
  }

  return result.json();
}
