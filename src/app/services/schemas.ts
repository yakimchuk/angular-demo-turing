// @todo (by-needs): Split external interfaces from inner interfaces and make adapters

export interface ITax {
  tax_id: number;
  tax_type: string;
  tax_percentage: string;
}

export interface IShippingRegion {
  shipping_region_id: number;
  shipping_region: string;
}

export interface IShippingVariant {
  shipping_id: number;
  shipping_type: string;
  shipping_cost: string;
  shipping_region_id: number;
}

export interface IDepartment {
  department_id: number,
  name: string,
  description: string
}

export interface ICategory {
  category_id: number,
  name: string,
  description: string,
  department_id: number
}

export interface IProduct {
  product_id: number,
  name: string,
  description: string,
  price: number,
  discounted_price?: number,
  thumbnail: string
}

export interface IListResponse <T> {
  count: number,
  rows: T[]
}

export interface ICartItem {
  item_id: number,
  name: string,
  attributes: string,
  product_id: number,
  price: string,
  quantity: number,
  image: string,
  subtotal: string
}

export interface ICartId {
  cart_id: string
}

export const schemas = {
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
    get: {
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
