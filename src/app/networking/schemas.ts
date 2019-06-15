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

export const schemas = {
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
