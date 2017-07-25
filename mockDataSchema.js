export const schema = {
  "type": "object",
  "properties": {
		"rooms": {
			"type": "array",
      "minItems": 3,
      "maxItems": 5,
      "items": {
				"type": "object",
				"properties": {
					"name": {
						"type": "string",
						"unique": true,
						"faker": "name.firstName"
					},
					 "users": {
							"type": "array",
							"minItems": 3,
							"maxItems": 5,
							"items": {
								"type": "string",
								"faker": "internet.email"
							}
          },
          "songs": {
           "type": "array",
							"minItems": 3,
							"maxItems": 5,
							"items": {
								"type": "object",
								"properties": {
									"name": {
										"type": "string",
										"unique": true
									},
									"length": {
										"type": "integer",
										"minimum": 1
									},
									"requester": {
										"type": "string",
										"unique": true,
										"faker": "internet.email"
									},
									"required": ["name", "length", "requester"]
								}
							}
          }
				},
				"required": ["name", "users", "songs"]
			}
		}
	},
  "required": ["rooms"]
};
