import axiosInstance from "./axios";

async function getCategories() {
  const categories = await axiosInstance.get('/category');
  console.log(categories);
  return categories;
}
async function getManufacturers() {
  const manufacturer = await axiosInstance.get('/manufacturer');
  console.log(manufacturer);
  return manufacturer;
}
async function getManufacturerByCategory(id) {
  const manufacturerbycategory = await axiosInstance.get(`/category/${id}`);
  console.log(manufacturerbycategory);
  return manufacturerbycategory;
}

export { getCategories, getManufacturers, getManufacturerByCategory };
