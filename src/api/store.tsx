export async function fetchProductCategories() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  const data = await response.json();
  return data;
}
