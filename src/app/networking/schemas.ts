export interface Department {
  department_id: number,
  name: string,
  description: string
}

export interface Category {
  category_id: number,
  name: string,
  description: string,
  department_id: number
}

export interface Product {
  product_id: number,
  name: string,
  description: string,
  price: number,
  discounted_price?: number,
  thumbnail: string
}

export interface ListResponse <T> {
  count: number,
  rows: T[]
}

const productsListSchema = {
  "definitions": {},
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://example.com/root.json",
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
};

export const schemas = {
  products: {
    get: productsListSchema
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
