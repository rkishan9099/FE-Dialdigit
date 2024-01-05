import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        return  {
    _id: "659111e8a3e94fca82aeb95c",
    firstName: "kishan",
    lastName: "ramani",
    email: "masteradmin@gmail.com",
    mobile: "9099448614",
    roles: {
      _id: "659111d2a3e94fca82aeb959",
      name: "Master Admin",
      role: "MASTER_ADMIN"
    },
    status: 1,
    createdAt: "2023-12-31T07:02:00.875Z",
    updatedAt: "2024-01-05T15:43:37.015Z",
    id: "659111e8a3e94fca82aeb95c",
    name: "kishan ramani",
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkxMTFlOGEzZTk0ZmNhODJhZWI5NWMiLCJlbWFpbCI6Im1hc3RlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwNDQ2OTQxNywiZXhwIjoxNzA1MDc0MjE3fQ.RKd3Kvdk-QTPa5zRrubbhxHd2EfRs_76GlBgvX4pawE",
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTkxMTFlOGEzZTk0ZmNhODJhZWI5NWMiLCJlbWFpbCI6Im1hc3RlcmFkbWluQGdtYWlsLmNvbSIsImlhdCI6MTcwNDQ2OTQxNywiZXhwIjoxNzA1MDc0MjE3fQ.UYArVkHvqx3yHnt4Rxw4_A5OYaywc1oPDov-d7kTIrU"
  };
      }
    })
  ],
} satisfies NextAuthConfig