import { Test, TestingModule } from "@nestjs/testing";
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from "@nestjs/common";
import * as request from "supertest";
import { AppModule } from "../../app.module"; // Adjust the path as necessary
import {
  OPEN_API_PATHS,
  OPEN_API_RESOURCES,
  OPEN_API_VERSIONS,
} from "src/core/constants/constants";
import { SIGN_IN_ERRORS } from "./sign-in.responses";
import { OPEN_API_ERRORS } from "src/core/errors/open-api.errors";

describe("Sign-In (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule], // Ensure your main app module is imported
    }).compile();

    app = moduleFixture.createNestApplication();
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: "1",
    });

    app.useGlobalPipes(
      new ValidationPipe({
        validationError: {
          target: false,
        },
        transform: true,
        transformOptions: {
          excludeExtraneousValues: true,
        },
      }),
    );
    await app.init();
  });

  afterAll(async () => {});

  it("should sign in an existing user", async () => {
    const response = await request(app.getHttpServer())
      .post(
        `${OPEN_API_VERSIONS.V1}${OPEN_API_RESOURCES.AUTH}${OPEN_API_PATHS.SIGN_IN}`,
      )
      .send({
        email: `user@test.com`,
        password: "test@123",
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token");
  });

  it("should throw an error when a new user tries to sign in.", async () => {
    const response = await request(app.getHttpServer())
      .post(
        `${OPEN_API_VERSIONS.V1}${OPEN_API_RESOURCES.AUTH}${OPEN_API_PATHS.SIGN_IN}`,
      )
      .send({
        email: `user-${Date.now()}@test.com`,
        password: "password",
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(
      SIGN_IN_ERRORS.NOT_REGISTERED_ERROR.message,
    );
  });

  it("should throw an error when password wrong.", async () => {
    const response = await request(app.getHttpServer())
      .post(
        `${OPEN_API_VERSIONS.V1}${OPEN_API_RESOURCES.AUTH}${OPEN_API_PATHS.SIGN_IN}`,
      )
      .send({
        email: `user@test.com`,
        password: "jfbvebfnrln",
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(SIGN_IN_ERRORS.PASSWORD_ERROR.message);
  });

  it("should throw a validation error when mandatory params are not present", async () => {
    const response = await request(app.getHttpServer())
      .post(
        `${OPEN_API_VERSIONS.V1}${OPEN_API_RESOURCES.AUTH}${OPEN_API_PATHS.SIGN_IN}`,
      )
      .send({
        email: `user@test.com`,
      });
    expect(response.status).toBe(400);
    expect(response.body.errorCode).toBe(
      OPEN_API_ERRORS.VALIDATION_ERROR.errorCode,
    );
  });
});
