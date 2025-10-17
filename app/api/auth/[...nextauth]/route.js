import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

import Axios from "../../../components/Axios";

const handler = NextAuth({
  // adapter: MongoDBAdapter(mongoose.connection),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      httpOptions: {
        timeout: 10000, // 10 seconds
      },
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      httpOptions: {
        timeout: 10000, // 10 seconds
      },
    }),

    // Email/Password
    CredentialsProvider({
      name: "credentials",
      credentials: {
        userName: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Forward credentials to Express for validation
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("Request timeout")), 8000)
        );

        const axiosPromise = Axios.post("/login/user", credentials);

        const { data } = await Promise.race([axiosPromise, timeoutPromise]);

        let user = data.user;
        user.sessionToken = data.user?.authentication.sessionToken;
        return user || null;
      },
    }),
  ],
  callbacks: {
    async signIn({ user, profile, account }) {
      if (account.provider === "credentials") {
        return true; // Already handled in authorize
      }

      try {
        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error("OAuth timeout")), 5000)
        );

        const axiosPromise = Axios.post(`/login/auth`, {
          email: profile?.email || user.email,
          name: profile?.name || user.name,
          accountType: account.provider,
        });

        const { data } = await Promise.race([axiosPromise, timeoutPromise]);
        user.sessionToken = data.user?.authentication.sessionToken;
      } catch (err) {
        console.log(err);
      }

      if (user.sessionToken) {
        return user;
      } else {
        return null;
      }
    },

    async jwt({ token, user, account }) {
      if (user && account) {
        token.sessionToken = user.sessionToken;
        token.accessToken = account.access_token;
      }
      return token; // Minimal example
    },

    async session({ session, token }) {
      // Make token available in session
      session.user.id = token.sessionToken;
      session.accessToken = token.accessToken;
      return session;
    },
  },

  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },
  jwt: {
    secret: process.env.AUTH_SECRET,
    encryption: false,
    maxAge: 60 * 60,
  },
  pages: {
    signIn: "/",
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "None", // Required for cross-site
        path: "/",
        secure: true, // Requires HTTPS in production
      },
    },
  },
});

export { handler as GET, handler as POST };
