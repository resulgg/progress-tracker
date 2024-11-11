import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import db from "./db";
import * as schema from "./db/schema";
import authConfig from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db, {
    usersTable: schema.users,
    accountsTable: schema.accounts,
    verificationTokensTable: schema.verificationTokens,
  }),
  session: {
    strategy: "jwt",
  },
  trustHost: true,
  ...authConfig,
});
