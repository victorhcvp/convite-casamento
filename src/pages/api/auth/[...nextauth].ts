import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";

const _url =
  process.env.NODE_ENV !== "production"
    ? process.env.MAIN_URL_DEV
    : process.env.MAIN_URL_PRD;

interface ILogin {
  logged: boolean;
}

interface IAdminCheck {
  isAdmin: boolean;
  relation: string;
}

export default NextAuth({
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_AUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET || "",
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_AUTH_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_AUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      const res = await fetch(`${_url}/api/login`, {
        method: "POST",
        body: JSON.stringify({
          email: user.email,
        }),
      });
      const data = (await res.json()) as ILogin;

      return data.logged;
    },
    async session({ session, user }) {
      const res = await fetch(`${_url}/api/admin/check`, {
        method: "POST",
        body: JSON.stringify({
          email: session.user?.email,
        }),
      });
      const data = (await res.json()) as IAdminCheck;
      session.admin = data.isAdmin;
      session.relation = data.relation;
      return session;
    },
  },
});
