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
import { SIGN_UP_ERRORS } from "./sign-up.responses";
import { OPEN_API_ERRORS } from "src/core/errors/open-api.errors";

describe("Sign-Up (e2e)", () => {
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

  it("should sign up a new user", async () => {
    const response = await request(app.getHttpServer())
      .post(
        `${OPEN_API_VERSIONS.V1}${OPEN_API_RESOURCES.AUTH}${OPEN_API_PATHS.SIGN_UP}`,
      )
      .send({
        email: `test-${Date.now()}@example.com`,
        password: "password",
        name: "Test User",
      });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("access_token");
  });

  it("should throw an error when a existing user tries to register again", async () => {
    const response = await request(app.getHttpServer())
      .post(
        `${OPEN_API_VERSIONS.V1}${OPEN_API_RESOURCES.AUTH}${OPEN_API_PATHS.SIGN_UP}`,
      )
      .send({
        email: `user@test.com`,
        password: "password",
        name: "Test User",
      });
    expect(response.status).toBe(400);
    expect(response.body.message).toBe(SIGN_UP_ERRORS.DUPLICATE_ERROR.message);
  });

  it("should throw a validation error when mandatory params are not present", async () => {
    const response = await request(app.getHttpServer())
      .post(
        `${OPEN_API_VERSIONS.V1}${OPEN_API_RESOURCES.AUTH}${OPEN_API_PATHS.SIGN_UP}`,
      )
      .send({
        email: `user@test.com`,
        name: "Test User",
      });
    expect(response.status).toBe(400);
    expect(response.body.errorCode).toBe(
      OPEN_API_ERRORS.VALIDATION_ERROR.errorCode,
    );
  });
});
