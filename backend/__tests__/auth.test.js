const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const { app } = require("../server");
const User = require("../src/models/User.model");

let mongo;

beforeAll(async () => {
  process.env.JWT_SECRET = process.env.JWT_SECRET || "test-secret";

  mongo = await MongoMemoryServer.create();
  await mongoose.connect(mongo.getUri());
});

afterEach(async () => {
  await mongoose.connection.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
  if (mongo) {
    await mongo.stop();
  }
});

describe("Auth routes", () => {
  const baseUser = {
    name: "Test User",
    email: "test@example.com",
    password: "Password123!",
    role: "admin",
  };

  it("registers a user and returns id/email", async () => {
    const res = await request(app).post("/api/auth/register").send(baseUser);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "User registered successfully",
      data: { email: baseUser.email },
    });
    expect(res.body.data.id).toBeTruthy();

    const userInDb = await User.findOne({ email: baseUser.email });
    expect(userInDb).not.toBeNull();
  });

  it("logs in and returns a token", async () => {
    await request(app).post("/api/auth/register").send(baseUser);

    const res = await request(app).post("/api/auth/login").send({
      email: baseUser.email,
      password: baseUser.password,
    });

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      success: true,
      message: "Login successful",
    });
    expect(typeof res.body.data.token).toBe("string");
    expect(res.body.data.token.length).toBeGreaterThan(10);
  });

  it("rejects invalid credentials", async () => {
    await request(app).post("/api/auth/register").send(baseUser);

    const res = await request(app).post("/api/auth/login").send({
      email: baseUser.email,
      password: "wrong-password",
    });

    expect(res.status).toBe(401);
    expect(res.body).toMatchObject({
      success: false,
      message: "Invalid credentials",
    });
  });
});
