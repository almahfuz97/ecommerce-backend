import { OrderModel } from "./order.model";

const createOrderInDB = async (order: object) => {
  const result = await OrderModel.create(order);
  return result;
};

export const OrderServices = {
  createOrderInDB,
};
