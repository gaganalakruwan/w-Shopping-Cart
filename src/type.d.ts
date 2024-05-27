export declare type productAllDataType = {
  allProductData: productDataType[];
  isProductLoading: boolean;
};

export declare type productDataType = {
  id: string;
  SKU: string;
  name: string;
  brandName: string;
  mainImage: string;
  price: {
    amount: string;
    currency: string;
  };
  sizes: string[];
  stockStatus: string;
  colour: string;
  description: string;
};
export declare type cartDataType = {
  id: string;
  SKU: string;
  name: string;
  brandName: string;
  mainImage: string;
  price: {
    amount: string;
    currency: string;
  };
  sizes: string;
  stockStatus: string;
  colour: string;
  description: string;
  quantity: string;
};

export declare type cartSliceType = {
  cartItems: cartDataType[];
};
