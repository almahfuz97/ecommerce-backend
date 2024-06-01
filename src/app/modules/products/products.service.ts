import { ProductsModel } from "./products.model"

const getProductsFromDB = async () => {
    const result = await ProductsModel.find();
    return result;
}

export const ProductServices = {
    getProductsFromDB
}