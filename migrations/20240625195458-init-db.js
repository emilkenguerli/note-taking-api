module.exports = {
  async up(db, client) {
    // Create Categories collection
    await db.createCollection("categories", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["name"],
          properties: {
            name: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            description: {
              bsonType: "string",
              description: "must be a string",
            },
            createdAt: {
              bsonType: "date",
              description: "must be a date",
            },
            updatedAt: {
              bsonType: "date",
              description: "must be a date",
            },
            deletedAt: {
              bsonType: ["date", "null"],
              description: "must be a date or null",
            },
          },
        },
      },
    });
    await db
      .collection("categories")
      .createIndex({ name: 1 }, { unique: true });

    // Create Notes collection
    await db.createCollection("notes", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title", "description", "user"],
          properties: {
            title: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            description: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            category: {
              bsonType: "objectId",
              description: "must be an ObjectId and refer to a Category",
            },
            public: {
              bsonType: "bool",
              description: "must be a boolean and defaults to true",
            },
            user: {
              bsonType: "objectId",
              description: "must be an ObjectId and refer to a User",
            },
            createdAt: {
              bsonType: "date",
              description: "must be a date",
            },
            updatedAt: {
              bsonType: "date",
              description: "must be a date",
            },
            deletedAt: {
              bsonType: ["date", "null"],
              description: "must be a date or null",
            },
          },
        },
      },
    });

    // Create Users collection
    await db.createCollection("users", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["firstName", "lastName", "username", "email", "password"],
          properties: {
            firstName: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            lastName: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            username: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            email: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            password: {
              bsonType: "string",
              description: "must be a string and is required",
            },
            deletedAt: {
              bsonType: ["date", "null"],
              description: "must be a date or null",
            },
            createdAt: {
              bsonType: "date",
              description: "must be a date",
            },
            updatedAt: {
              bsonType: "date",
              description: "must be a date",
            },
          },
        },
      },
    });
    await db.collection("users").createIndex({ username: 1 }, { unique: true });
    await db.collection("users").createIndex({ email: 1 }, { unique: true });

    // Seed Categories
    const categories = [
      {
        name: "Work",
        description: "Work related notes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Personal",
        description: "Personal notes",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await db.collection("categories").insertMany(categories);

    // Seed Users
    const users = [
      {
        firstName: "John",
        lastName: "Doe",
        username: "johndoe",
        email: "johndoe@example.com",
        password: "password123", // In a real application, passwords should be hashed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        username: "janesmith",
        email: "janesmith@example.com",
        password: "password123", // In a real application, passwords should be hashed
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await db.collection("users").insertMany(users);

    // Seed Notes
    const userIds = await db.collection("users").find({}, { _id: 1 }).toArray();
    const categoryIds = await db
      .collection("categories")
      .find({}, { _id: 1 })
      .toArray();
    const notes = [
      {
        title: "Meeting Notes",
        description: "Notes from the client meeting",
        category: categoryIds[0]._id,
        public: true,
        user: userIds[0]._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Grocery List",
        description: "List of groceries to buy",
        category: categoryIds[1]._id,
        public: false,
        user: userIds[1]._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await db.collection("notes").insertMany(notes);
  },

  async down(db, client) {
    // Drop the collections to rollback the migration
    await db.collection("categories").drop();
    await db.collection("notes").drop();
    await db.collection("users").drop();
  },
};
