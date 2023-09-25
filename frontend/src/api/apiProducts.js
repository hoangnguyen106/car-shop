import axiosInstance from "./axios";

async function getAllProducts() {
  return axiosInstance.get('/products');
}

async function getProducts(category, manufacturer, page) {
  let pageZero;
  if (page < 1) {
    pageZero = 1;
  } else {
    pageZero = page;
  }
  return axiosInstance.get(`/products?category=${category}&manufacturer=${manufacturer}&page=${pageZero}`);
}

async function getProductsDetail(id) {
  if (!id) {
    return '';
  }
  return axiosInstance.get(`/products/${id}`);
}

async function getProductsSuggested(id) {
  if (!id) {
    return '';
  }
  return axiosInstance.get(`/products/suggest/${id}`);
}

async function createProduct(formData) {
  const createProducts = await axiosInstance.post(`/products`, formData);
  return createProducts;
}

async function searchProductName(name) {
  let nameSearch;
  if (!name) {
    nameSearch = '';
  } else {
    nameSearch = name;
  }
  return axiosInstance.get(`/products?name=${nameSearch}`);
}

async function deleteProducts(id) {
  const deleteProduct = await axiosInstance.delete(`/products/${id}`);
  return deleteProduct;
}

export {
  getAllProducts,
  getProducts,
  getProductsDetail,
  getProductsSuggested,
  createProduct,
  deleteProducts,
  searchProductName,
};
