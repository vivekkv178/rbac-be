import { registerAs } from "@nestjs/config";
import { join } from "path";

export const DATABASE_RBAC = "rbac";
export const DATABASES = "databases";

export default registerAs(DATABASES, () => ({
  rbac: {
    type: "mongodb",
    url: process.env.MONGO_URL?.replace("<dbname>", DATABASE_RBAC),
    database: DATABASE_RBAC,
    entities: [join(__dirname, "..", "..", "rbac", "entities", "*.{ts,js}")],
  },
}));
