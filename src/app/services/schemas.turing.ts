/* tslint:disable:object-literal-key-quotes quotemark max-line-length */

export interface TuringProductAttribute {
  attribute_name: string;
  attribute_value_id: number;
  attribute_value: string;
}

export interface TuringTax {
  tax_id: number;
  tax_type: string;
  tax_percentage: string;
}

export interface TuringShippingRegion {
  shipping_region_id: number;
  shipping_region: string;
}

export interface TuringShippingVariant {
  shipping_id: number;
  shipping_type: string;
  shipping_cost: string;
  shipping_region_id: number;
}

export interface TuringDepartment {
  department_id: number;
  name: string;
  description: string;
}

export interface TuringCategory {
  category_id: number;
  name: string;
  description: string;
  department_id: number;
}

export interface TuringProduct {
  product_id: number;
  name: string;
  description: string;
  price: number;
  discounted_price?: number;
  thumbnail: string;
}

export interface TuringProductDetails {
  product_id: number;
  name: string;
  description: string;
  price: number;
  discounted_price?: number;
  image: string;
  image_2: string;
}

export type AuthenticationToken = string;

export interface TuringUserPersonalData {
  name: string;
  email: string;
  day_phone: string;
  eve_phone: string;
  mob_phone: string;
}

export interface TuringUserAddress {
  address_1: string;
  address_2: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;
  shipping_region_id: number;
}

export interface TuringUser extends TuringUserPersonalData, TuringUserAddress {
  customer_id: number;
  credit_card: string;
}

export interface TuringAuthenticationCredentials {
  customer: TuringUser;
  accessToken: AuthenticationToken;
  expires_in: string;
}

export interface TuringListResponse <T> {
  count: number;
  rows: T[];
}

export interface TuringCartItem {
  item_id: number;
  name: string;
  attributes: string;
  product_id: number;
  price: string;
  quantity: number;
  image: string;
  subtotal: string;
}

export interface TuringCartId {
  cart_id: string;
}

export interface TuringOrder {
  order_id: number;
  total_amount: string;
  created_on: string;
  shipped_on: string;
  status: number;
  name: string;
}

export interface TuringOrderItem {
  order_id: number;
  product_id: number;
  attributes: string;
  product_name: string;
  quantity: number;
  unit_cost: string;
  subtotal: string;
}

export interface TuringPaymentResponse {
  paid: boolean;
}

export interface TuringReview {
  name: string;
  review: string;
  rating: number;
  created_on: string;
}

// @todo: Replace with fine JSON schemas from Turing
export const schemas = {
  attributes: {
    product: {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "attributes.product",
      "type": "array",
      "title": "The Root Schema",
      "items": {
        "$id": "#/items",
        "type": "object",
        "title": "The Items Schema",
        "required": [
          "attribute_name",
          "attribute_value_id",
          "attribute_value"
        ],
        "properties": {
          "attribute_name": {
            "$id": "#/items/properties/attribute_name",
            "type": "string",
            "title": "The Attribute_name Schema",
            "default": "",
            "examples": [
              "Color"
            ],
            "pattern": "^(.*)$"
          },
          "attribute_value_id": {
            "$id": "#/items/properties/attribute_value_id",
            "type": "integer",
            "title": "The Attribute_value_id Schema",
            "default": 0,
            "examples": [
              6
            ]
          },
          "attribute_value": {
            "$id": "#/items/properties/attribute_value",
            "type": "string",
            "title": "The Attribute_value Schema",
            "default": "",
            "examples": [
              "White"
            ],
            "pattern": "^(.*)$"
          }
        }
      }
    }
  },
  orders: {
    info: {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "orders.info",
      "type": "array",
      "title": "The Root Schema",
      "items": {
        "$id": "#/items",
        "type": "object",
        "title": "The Items Schema",
        "required": [
          "order_id",
          "product_id",
          "attributes",
          "product_name",
          "quantity",
          "unit_cost",
          "subtotal"
        ],
        "properties": {
          "order_id": {
            "$id": "#/items/properties/order_id",
            "type": "integer",
            "title": "The Order_id Schema",
            "default": 0,
            "examples": [
              1
            ]
          },
          "product_id": {
            "$id": "#/items/properties/product_id",
            "type": "integer",
            "title": "The Product_id Schema",
            "default": 0,
            "examples": [
              1
            ]
          },
          "attributes": {
            "$id": "#/items/properties/attributes",
            "type": "string",
            "title": "The Attributes Schema",
            "default": "",
            "examples": [
              "LG, Red"
            ],
            "pattern": "^(.*)$"
          },
          "product_name": {
            "$id": "#/items/properties/product_name",
            "type": "string",
            "title": "The Product_name Schema",
            "default": "",
            "examples": [
              "Arc d'Triomphe"
            ],
            "pattern": "^(.*)$"
          },
          "quantity": {
            "$id": "#/items/properties/quantity",
            "type": "integer",
            "title": "The Quantity Schema",
            "default": 0,
            "examples": [
              1
            ]
          },
          "unit_cost": {
            "$id": "#/items/properties/unit_cost",
            "type": "string",
            "title": "The Unit_cost Schema",
            "default": "",
            "examples": [
              "14.99"
            ],
            "pattern": "^(.*)$"
          },
          "subtotal": {
            "$id": "#/items/properties/subtotal",
            "type": "string",
            "title": "The Subtotal Schema",
            "default": "",
            "examples": [
              "14.99"
            ],
            "pattern": "^(.*)$"
          }
        }
      }
    },
    create: {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "orders.create",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "orderId"
      ],
      "properties": {
        "orderId": {
          "$id": "#/properties/orderId",
          "type": "integer",
          "title": "The Orderid Schema",
          "default": 0,
          "examples": [
            1
          ]
        }
      }
    },
    byCustomer: {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "orders.byCustomer",
      "type": "array",
      "title": "The Root Schema",
      "items": {
        "$id": "#/items",
        "type": "object",
        "title": "The Items Schema",
        "required": [
          "order_id",
          "total_amount",
          "created_on",
          "shipped_on",
          "status",
          "name"
        ],
        "properties": {
          "order_id": {
            "$id": "#/items/properties/order_id",
            "type": "integer",
            "title": "The Order_id Schema",
            "default": 0,
            "examples": [
              1
            ]
          },
          "total_amount": {
            "$id": "#/items/properties/total_amount",
            "type": "string",
            "title": "The Total_amount Schema",
            "default": "",
            "examples": [
              "0.00"
            ]
          },
          "created_on": {
            "$id": "#/items/properties/created_on",
            "type": "string",
            "title": "The Created_on Schema",
            "default": "",
            "examples": [
              ""
            ],
            "pattern": "^(.*)$"
          },
          "shipped_on": {
            "$id": "#/items/properties/shipped_on",
            "type": ["string", "null"],
            "title": "The Shipped_on Schema",
            "default": "",
            "examples": [
              ""
            ],
            "pattern": "^(.*)$"
          },
          "status": {
            "$id": "#/items/properties/status",
            "type": "number",
            "title": "The Status Schema",
            "default": 0,
            "examples": [
              0
            ],
            "pattern": "^(.*)$"
          },
          "name": {
            "$id": "#/items/properties/name",
            "type": "string",
            "title": "The Name Schema",
            "default": "",
            "examples": [
              "Test"
            ],
            "pattern": "^(.*)$"
          }
        }
      }
    }
  },
  customers: {
    login: {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "customers.login",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "customer",
        "accessToken",
        "expires_in"
      ],
      "properties": {
        "customer": {
          "$id": "#/properties/customer",
          "type": "object",
          "title": "The Customer Schema",
          "properties": {
            "customer_id": {
              "$id": "#/properties/customer/properties/schema/properties/customer_id",
              "type": "integer",
              "title": "The Customer_id Schema",
              "default": 0,
              "examples": [
                1
              ]
            },
            "name": {
              "$id": "#/properties/customer/properties/schema/properties/name",
              "type": "string",
              "title": "The Name Schema",
              "default": "",
              "examples": [
                "Lannucci"
              ],
              "pattern": "^(.*)$"
            },
            "email": {
              "$id": "#/properties/customer/properties/schema/properties/email",
              "type": "string",
              "title": "The Email Schema",
              "default": "",
              "examples": [
                "lannucci@hotmail.com"
              ],
              "pattern": "^(.*)$"
            },
            "address_1": {
              "$id": "#/properties/customer/properties/schema/properties/address_1",
              "type": ["string", "null"],
              "title": "The Address_1 Schema",
              "default": "",
              "examples": [
                "QI 19"
              ],
              "pattern": "^(.*)$"
            },
            "address_2": {
              "$id": "#/properties/customer/properties/schema/properties/address_2",
              "type": ["string", "null"],
              "title": "The Address_2 Schema",
              "default": "",
              "examples": [
                ""
              ],
              "pattern": "^(.*)$"
            },
            "city": {
              "$id": "#/properties/customer/properties/schema/properties/city",
              "type": ["string", "null"],
              "title": "The City Schema",
              "default": "",
              "examples": [
                ""
              ],
              "pattern": "^(.*)$"
            },
            "region": {
              "$id": "#/properties/customer/properties/schema/properties/region",
              "type": ["string", "null"],
              "title": "The Region Schema",
              "default": "",
              "examples": [
                ""
              ],
              "pattern": "^(.*)$"
            },
            "postal_code": {
              "$id": "#/properties/customer/properties/schema/properties/postal_code",
              "type": ["string", "null"],
              "title": "The Postal_code Schema",
              "default": "",
              "examples": [
                ""
              ],
              "pattern": "^(.*)$"
            },
            "country": {
              "$id": "#/properties/customer/properties/schema/properties/country",
              "type": ["string", "null"],
              "title": "The Country Schema",
              "default": "",
              "examples": [
                ""
              ],
              "pattern": "^(.*)$"
            },
            "shipping_region_id": {
              "$id": "#/properties/customer/properties/schema/properties/shipping_region_id",
              "type": "integer",
              "title": "The Shipping_region_id Schema",
              "default": 0,
              "examples": [
                1
              ]
            },
            "day_phone": {
              "$id": "#/properties/customer/properties/schema/properties/day_phone",
              "type": ["string", "null"],
              "title": "The Day_phone Schema",
              "default": "",
              "examples": [
                "+351323213511235"
              ],
              "pattern": "^(.*)$"
            },
            "eve_phone": {
              "$id": "#/properties/customer/properties/schema/properties/eve_phone",
              "type": ["string", "null"],
              "title": "The Eve_phone Schema",
              "default": "",
              "examples": [
                "+452436143246123"
              ],
              "pattern": "^(.*)$"
            },
            "mob_phone": {
              "$id": "#/properties/customer/properties/schema/properties/mob_phone",
              "type": ["string", "null"],
              "title": "The Mob_phone Schema",
              "default": "",
              "examples": [
                "+351323213511235"
              ],
              "pattern": "^(.*)$"
            },
            "credit_card": {
              "$id": "#/properties/customer/properties/schema/properties/credit_card",
              "type": ["string", "null"],
              "title": "The Credit_card Schema",
              "default": "",
              "examples": [
                "XXXXXXXX5100"
              ],
              "pattern": "^(.*)$"
            }
          }
        },
        "accessToken": {
          "$id": "#/properties/accessToken",
          "type": "string",
          "title": "The Accesstoken Schema",
          "default": "",
          "examples": [
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE1NTA0MjQ0OTgsImV4cCI6MTU1MDUxMDg5OH0.aEFrNUPRWuRWx0IOEL-_A4J4Ti39iXEHAScm6GI61RR"
          ],
          "pattern": "^(.*)$"
        },
        "expires_in": {
          "$id": "#/properties/expires_in",
          "type": "string",
          "title": "The Expires_in Schema",
          "default": "",
          "examples": [
            "24h"
          ],
          "pattern": "^(.*)$"
        }
      }
    },
    create: {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "customers.create",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "accessToken"
      ],
      "properties": {
        "accessToken": {
          "$id": "#/properties/accessToken",
          "type": "string",
          "title": "The Accesstoken Schema",
          "default": "",
          "examples": [
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiY3VzdG9tZXIiLCJpYXQiOjE1NTA0MjQ0OTgsImV4cCI6MTU1MDUxMDg5OH0.aEFrNUPRWuRWx0IOEL-_A4J4Ti39iXEHAScm6GI61RR"
          ],
          "pattern": "^(.*)$"
        }
      }
    },
    get: {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "customers.get",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "customer_id",
        "name",
        "email",
        "address_1",
        "address_2",
        "city",
        "region",
        "postal_code",
        "country",
        "shipping_region_id",
        "day_phone",
        "eve_phone",
        "mob_phone",
        "credit_card"
      ],
      "properties": {
        "customer_id": {
          "$id": "#/properties/customer/properties/schema/properties/customer_id",
          "type": "integer",
          "title": "The Customer_id Schema",
          "default": 0,
          "examples": [
            1
          ]
        },
        "name": {
          "$id": "#/properties/customer/properties/schema/properties/name",
          "type": "string",
          "title": "The Name Schema",
          "default": "",
          "examples": [
            "Lannucci"
          ],
          "pattern": "^(.*)$"
        },
        "email": {
          "$id": "#/properties/customer/properties/schema/properties/email",
          "type": "string",
          "title": "The Email Schema",
          "default": "",
          "examples": [
            "lannucci@hotmail.com"
          ],
          "pattern": "^(.*)$"
        },
        "address_1": {
          "$id": "#/properties/customer/properties/schema/properties/address_1",
          "type": ["string", "null"],
          "title": "The Address_1 Schema",
          "default": "",
          "examples": [
            "QI 19"
          ],
          "pattern": "^(.*)$"
        },
        "address_2": {
          "$id": "#/properties/customer/properties/schema/properties/address_2",
          "type": ["string", "null"],
          "title": "The Address_2 Schema",
          "default": "",
          "examples": [
            ""
          ],
          "pattern": "^(.*)$"
        },
        "city": {
          "$id": "#/properties/customer/properties/schema/properties/city",
          "type": ["string", "null"],
          "title": "The City Schema",
          "default": "",
          "examples": [
            ""
          ],
          "pattern": "^(.*)$"
        },
        "region": {
          "$id": "#/properties/customer/properties/schema/properties/region",
          "type": ["string", "null"],
          "title": "The Region Schema",
          "default": "",
          "examples": [
            ""
          ],
          "pattern": "^(.*)$"
        },
        "postal_code": {
          "$id": "#/properties/customer/properties/schema/properties/postal_code",
          "type": ["string", "null"],
          "title": "The Postal_code Schema",
          "default": "",
          "examples": [
            ""
          ],
          "pattern": "^(.*)$"
        },
        "country": {
          "$id": "#/properties/customer/properties/schema/properties/country",
          "type": ["string", "null"],
          "title": "The Country Schema",
          "default": "",
          "examples": [
            ""
          ],
          "pattern": "^(.*)$"
        },
        "shipping_region_id": {
          "$id": "#/properties/customer/properties/schema/properties/shipping_region_id",
          "type": "integer",
          "title": "The Shipping_region_id Schema",
          "default": 0,
          "examples": [
            1
          ]
        },
        "day_phone": {
          "$id": "#/properties/customer/properties/schema/properties/day_phone",
          "type": ["string", "null"],
          "title": "The Day_phone Schema",
          "default": "",
          "examples": [
            "+351323213511235"
          ],
          "pattern": "^(.*)$"
        },
        "eve_phone": {
          "$id": "#/properties/customer/properties/schema/properties/eve_phone",
          "type": ["string", "null"],
          "title": "The Eve_phone Schema",
          "default": "",
          "examples": [
            "+452436143246123"
          ],
          "pattern": "^(.*)$"
        },
        "mob_phone": {
          "$id": "#/properties/customer/properties/schema/properties/mob_phone",
          "type": ["string", "null"],
          "title": "The Mob_phone Schema",
          "default": "",
          "examples": [
            "+351323213511235"
          ],
          "pattern": "^(.*)$"
        },
        "credit_card": {
          "$id": "#/properties/customer/properties/schema/properties/credit_card",
          "type": ["string", "null"],
          "title": "The Credit_card Schema",
          "default": "",
          "examples": [
            "XXXXXXXX5100"
          ],
          "pattern": "^(.*)$"
        }
      }
    }
  },
  shipping: {
    regions: {
      concrete: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "shipping.regions.concrete",
        "type": "array",
        "title": "The Root Schema",
        "items": {
          "$id": "#/items",
          "type": "object",
          "title": "The Items Schema",
          "required": [
            "shipping_id",
            "shipping_type",
            "shipping_cost",
            "shipping_region_id"
          ],
          "properties": {
            "shipping_id": {
              "$id": "#/items/properties/shipping_id",
              "type": "integer",
              "title": "The Shipping_id Schema",
              "default": 0,
              "examples": [
                1
              ]
            },
            "shipping_type": {
              "$id": "#/items/properties/shipping_type",
              "type": "string",
              "title": "The Shipping_type Schema",
              "default": "",
              "examples": [
                "Next Day Delivery ($20)"
              ],
              "pattern": "^(.*)$"
            },
            "shipping_cost": {
              "$id": "#/items/properties/shipping_cost",
              "type": "string",
              "title": "The Shipping_cost Schema",
              "default": "",
              "examples": [
                "20.00"
              ],
              "pattern": "^(.*)$"
            },
            "shipping_region_id": {
              "$id": "#/items/properties/shipping_region_id",
              "type": "integer",
              "title": "The Shipping_region_id Schema",
              "default": 0,
              "examples": [
                2
              ]
            }
          }
        }
      },
      all: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "shipping.regions.all",
        "type": "array",
        "title": "The Root Schema",
        "items": {
          "$id": "#/items",
          "type": "object",
          "title": "The Items Schema",
          "required": [
            "shipping_region_id",
            "shipping_region"
          ],
          "properties": {
            "shipping_region_id": {
              "$id": "#/items/properties/shipping_region_id",
              "type": "integer",
              "title": "The Shipping_region_id Schema",
              "default": 0,
              "examples": [
                1
              ]
            },
            "shipping_region": {
              "$id": "#/items/properties/shipping_region",
              "type": "string",
              "title": "The Shipping_region Schema",
              "default": "",
              "examples": [
                "Please Select"
              ],
              "pattern": "^(.*)$"
            }
          }
        }
      }
    }
  },
  tax: {
    get: {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "tax.get",
      "type": "array",
      "title": "The Root Schema",
      "items": {
        "$id": "#/items",
        "type": "object",
        "title": "The Items Schema",
        "required": [
          "tax_id",
          "tax_type",
          "tax_percentage"
        ],
        "properties": {
          "tax_id": {
            "$id": "#/items/properties/tax_id",
            "type": "integer",
            "title": "The Tax_id Schema",
            "default": 0,
            "examples": [
              1
            ]
          },
          "tax_type": {
            "$id": "#/items/properties/tax_type",
            "type": "string",
            "title": "The Tax_type Schema",
            "default": "",
            "examples": [
              "Sales Tax at 8.5%"
            ],
            "pattern": "^(.*)$"
          },
          "tax_percentage": {
            "$id": "#/items/properties/tax_percentage",
            "type": "string",
            "title": "The Tax_percentage Schema",
            "default": "",
            "examples": [
              "8.50"
            ],
            "pattern": "^(.*)$"
          }
        }
      }
    }
  },
  shoppingcart: {
    add: {
      post: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "cart.add.post",
        "type": "array",
        "title": "The Root Schema"
      }
    },
    removeProduct: {
      delete: {}
    },
    update: {
      put: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "cart.update.post",
        "type": "array",
        "title": "The Root Schema"
      }
    },
    items: {
      get: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "cart.items.get",
        "type": "array",
        "title": "The Root Schema",
        "items": {
          "$id": "#/items",
          "type": "object",
          "title": "The Items Schema",
          "required": [
            "item_id",
            "name",
            "attributes",
            "product_id",
            "price",
            "quantity",
            "image",
            "subtotal"
          ],
          "properties": {
            "item_id": {
              "$id": "#/items/properties/item_id",
              "type": "integer",
              "title": "The Item_id Schema",
              "default": 0,
              "examples": [
                2
              ]
            },
            "name": {
              "$id": "#/items/properties/name",
              "type": "string",
              "title": "The Name Schema",
              "default": "",
              "examples": [
                "Arc d'Triomphe"
              ],
              "pattern": "^(.*)$"
            },
            "attributes": {
              "$id": "#/items/properties/attributes",
              "type": "string",
              "title": "The Attributes Schema",
              "default": "",
              "examples": [
                "LG, red"
              ],
              "pattern": "^(.*)$"
            },
            "product_id": {
              "$id": "#/items/properties/product_id",
              "type": "integer",
              "title": "The Product_id Schema",
              "default": 0,
              "examples": [
                2
              ]
            },
            "price": {
              "$id": "#/items/properties/price",
              "type": "string",
              "title": "The Price Schema",
              "default": "",
              "examples": [
                "14.99"
              ],
              "pattern": "^(.*)$"
            },
            "quantity": {
              "$id": "#/items/properties/quantity",
              "type": "integer",
              "title": "The Quantity Schema",
              "default": 0,
              "examples": [
                1
              ]
            },
            "image": {
              "$id": "#/items/properties/image",
              "type": "string",
              "title": "The Image Schema",
              "default": "",
              "examples": [
                "arc-d-triomphe.gif"
              ],
              "pattern": "^(.*)$"
            },
            "subtotal": {
              "$id": "#/items/properties/subtotal",
              "type": "string",
              "title": "The Subtotal Schema",
              "default": "",
              "examples": [
                "14.99"
              ],
              "pattern": "^(.*)$"
            }
          }
        }
      }
    },
    generateUniqueId: {
      get: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "cart.generateUniqueId",
        "type": "object",
        "title": "The Root Schema",
        "required": [
          "cart_id"
        ],
        "properties": {
          "cart_id": {
            "$id": "#/properties/cart_id",
            "type": "string",
            "title": "The Cart_id Schema",
            "default": "",
            "examples": [
              "mu1js99v9n1"
            ],
            "pattern": "^(.*)$"
          }
        }
      }

    }
  },
  products: {
    reviews: {
      list: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "products.reviews.list",
        "type": "array",
        "title": "The Root Schema",
        "items": {
          "$id": "#/items",
          "type": "object",
          "title": "The Items Schema",
          "required": [
            "name",
            "review",
            "rating",
            "created_on"
          ],
          "properties": {
            "name": {
              "$id": "#/items/properties/name",
              "type": "string",
              "title": "The Name Schema",
              "default": "",
              "examples": [
                "Eder Taveira"
              ],
              "pattern": "^(.*)$"
            },
            "review": {
              "$id": "#/items/properties/review",
              "type": "string",
              "title": "The Review Schema",
              "default": "",
              "examples": [
                "That's a good product. The best for me."
              ],
              "pattern": ".*"
            },
            "rating": {
              "$id": "#/items/properties/rating",
              "type": "integer",
              "title": "The Rating Schema",
              "default": 0,
              "examples": [
                5
              ]
            },
            "created_on": {
              "$id": "#/items/properties/created_on",
              "type": "string",
              "title": "The Created_on Schema",
              "default": "",
              "examples": [
                "2019-02-17 13:57:29"
              ],
              "pattern": "^(.*)$"
            }
          }
        }
      }
    },
    single: {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "products.single",
      "type": "array",
      "title": "The Root Schema",
      "items": {
        "$id": "#/items",
        "type": "object",
        "title": "The Items Schema",
        "required": [
          "product_id",
          "name",
          "description",
          "price",
          "discounted_price",
          "image",
          "image_2"
        ],
        "properties": {
          "product_id": {
            "$id": "#/items/properties/product_id",
            "type": "integer",
            "title": "The Product_id Schema",
            "default": 0,
            "examples": [
              10
            ]
          },
          "name": {
            "$id": "#/items/properties/name",
            "type": "string",
            "title": "The Name Schema",
            "default": "",
            "examples": [
              "Haute Couture"
            ],
            "pattern": "^(.*)$"
          },
          "description": {
            "$id": "#/items/properties/description",
            "type": "string",
            "title": "The Description Schema",
            "default": "",
            "examples": [
              "This stamp publicized the dress making industry. Use it to celebrate the T-shirt industry!"
            ],
            "pattern": "^(.*)$"
          },
          "price": {
            "$id": "#/items/properties/price",
            "type": "string",
            "title": "The Price Schema",
            "default": "",
            "examples": [
              "15.99"
            ],
            "pattern": "^(.*)$"
          },
          "discounted_price": {
            "$id": "#/items/properties/discounted_price",
            "type": "string",
            "title": "The Discounted_price Schema",
            "default": "",
            "examples": [
              "14.95"
            ],
            "pattern": "^(.*)$"
          },
          "image": {
            "$id": "#/items/properties/image",
            "type": "string",
            "title": "The Image Schema",
            "default": "",
            "examples": [
              "haute-couture.gif"
            ],
            "pattern": "^(.*)$"
          },
          "image_2": {
            "$id": "#/items/properties/image_2",
            "type": "string",
            "title": "The Image_2 Schema",
            "default": "",
            "examples": [
              "haute-couture-2.gif"
            ],
            "pattern": "^(.*)$"
          }
        }
      }
    },
    list: {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "products.get",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "count",
        "rows"
      ],
      "properties": {
        "count": {
          "$id": "#/properties/count",
          "type": "integer",
          "title": "The Count Schema",
          "default": 0,
          "examples": [
            101
          ]
        },
        "rows": {
          "$id": "#/properties/rows",
          "type": "array",
          "title": "The Rows Schema",
          "items": {
            "$id": "#/properties/rows/items",
            "type": "object",
            "title": "The Items Schema",
            "required": [
              "product_id",
              "name",
              "description",
              "price",
              "discounted_price",
              "thumbnail"
            ],
            "properties": {
              "product_id": {
                "$id": "#/properties/rows/items/properties/product_id",
                "type": "integer",
                "title": "The Product_id Schema",
                "default": 0,
                "examples": [
                  1
                ]
              },
              "name": {
                "$id": "#/properties/rows/items/properties/name",
                "type": "string",
                "title": "The Name Schema",
                "default": "",
                "examples": [
                  "Arc d'Triomphe"
                ],
                "pattern": "^(.*)$"
              },
              "description": {
                "$id": "#/properties/rows/items/properties/description",
                "type": "string",
                "title": "The Description Schema",
                "default": "",
                "examples": [
                  "This beautiful and iconic T-shirt will no doubt lead you to your own triumph."
                ],
                "pattern": "^(.*)$"
              },
              "price": {
                "$id": "#/properties/rows/items/properties/price",
                "type": "string",
                "title": "The Price Schema",
                "default": "",
                "examples": [
                  "14.99"
                ],
                "pattern": "^(.*)$"
              },
              "discounted_price": {
                "$id": "#/properties/rows/items/properties/discounted_price",
                "type": "string",
                "title": "The Discounted_price Schema",
                "default": "",
                "examples": [
                  "0.00"
                ],
                "pattern": "^(.*)$"
              },
              "thumbnail": {
                "$id": "#/properties/rows/items/properties/thumbnail",
                "type": "string",
                "title": "The Thumbnail Schema",
                "default": "",
                "examples": [
                  "arc-d-triomphe-thumbnail.gif"
                ],
                "pattern": "^(.*)$"
              }
            }
          }
        }
      }
    }
  },
  categories: {
    get: {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "categories.get",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "category_id",
        "name",
        "description",
        "department_id"
      ],
      "properties": {
        "category_id": {
          "$id": "#/properties/category_id",
          "type": "integer",
          "title": "The Category_id Schema",
          "default": 0,
          "examples": [
            1
          ]
        },
        "name": {
          "$id": "#/properties/name",
          "type": "string",
          "title": "The Name Schema",
          "default": "",
          "examples": [
            "French"
          ],
          "pattern": "^(.*)$"
        },
        "description": {
          "$id": "#/properties/description",
          "type": "string",
          "title": "The Description Schema",
          "default": "",
          "examples": [
            "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don't forget to go all the way to the bottom - you don't want to miss any of them!"
          ],
          "pattern": "^(.*)$"
        },
        "department_id": {
          "$id": "#/properties/department_id",
          "type": "integer",
          "title": "The Department_id Schema",
          "default": 0,
          "examples": [
            1
          ]
        }
      }
    },
    byDepartment: {
      get: {
        "definitions": {},
        "$schema": "http://json-schema.org/draft-07/schema#",
        "$id": "/categories/inDepartment",
        "type": "array",
        "title": "The Root Schema",
        "items": {
          "$id": "#/items",
          "type": "object",
          "title": "The Items Schema",
          "required": [
            "category_id",
            "name",
            "description",
            "department_id"
          ],
          "properties": {
            "category_id": {
              "$id": "#/items/properties/category_id",
              "type": "integer",
              "title": "The Category_id Schema",
              "default": 0,
              "examples": [
                1
              ]
            },
            "name": {
              "$id": "#/items/properties/name",
              "type": "string",
              "title": "The Name Schema",
              "default": "",
              "examples": [
                "French"
              ],
              "pattern": "^(.*)$"
            },
            "description": {
              "$id": "#/items/properties/description",
              "type": "string",
              "title": "The Description Schema",
              "default": "",
              "examples": [
                "The French have always had an eye for beauty. One look at the T-shirts below and you'll see that same appreciation has been applied abundantly to their postage stamps. Below are some of our most beautiful and colorful T-shirts, so browse away! And don't forget to go all the way to the bottom - you don't want to miss any of them!"
              ],
              "pattern": "^(.*)$"
            },
            "department_id": {
              "$id": "#/items/properties/department_id",
              "type": "integer",
              "title": "The Department_id Schema",
              "default": 0,
              "examples": [
                1
              ]
            }
          }
        }
      }
    }
  },
  departments: {
    get: {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "departments.get",
      "type": "object",
      "title": "The Root Schema",
      "required": [
        "department_id",
        "name",
        "description"
      ],
      "properties": {
        "department_id": {
          "$id": "#/properties/department_id",
          "type": "integer",
          "title": "The Department_id Schema",
          "default": 0,
          "examples": [
            1
          ]
        },
        "name": {
          "$id": "#/properties/name",
          "type": "string",
          "title": "The Name Schema",
          "default": "",
          "examples": [
            "Regional"
          ],
          "pattern": "^(.*)$"
        },
        "description": {
          "$id": "#/properties/description",
          "type": "string",
          "title": "The Description Schema",
          "default": "",
          "examples": [
            "Proud of your country? Wear a T-shirt with a national symbol stamp!"
          ],
          "pattern": "^(.*)$"
        }
      }
    },
    all: {
      "definitions": {},
      "$schema": "http://json-schema.org/draft-07/schema#",
      "$id": "/departments",
      "type": "array",
      "title": "The Root Schema",
      "items": {
        "$id": "#/items",
        "type": "object",
        "title": "The Items Schema",
        "required": [
          "department_id",
          "name",
          "description"
        ],
        "properties": {
          "department_id": {
            "$id": "#/items/properties/department_id",
            "type": "integer",
            "title": "The Department_id Schema",
            "default": 0,
            "examples": [
              1
            ]
          },
          "name": {
            "$id": "#/items/properties/name",
            "type": "string",
            "title": "The Name Schema",
            "default": "",
            "examples": [
              "Regional"
            ],
            "pattern": "^(.*)$"
          },
          "description": {
            "$id": "#/items/properties/description",
            "type": "string",
            "title": "The Description Schema",
            "default": "",
            "examples": [
              "Proud of your country? Wear a T-shirt with a national symbol stamp!"
            ],
            "pattern": "^(.*)$"
          }
        }
      }
    }
  }
};
