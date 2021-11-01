import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl;

function productUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getProducts() {
  return http.get(apiEndpoint);
}

export function getProduct(productId) {
  return http.get(productUrl(productId));
}

export function saveProduct(product) {
  if (product.productId) {
    const body = { ...product };
    delete body.productId;
    return http.put(productUrl(product.productId), body);
  }

  return http.post(apiEndpoint, product);
}

export function deleteProduct(productId) {
  return http.delete(productUrl(productId));
}
