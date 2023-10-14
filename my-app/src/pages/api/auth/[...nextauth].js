import connectDb from "@/lib/db/connect";
import User from "@/models/user";
import { compareSync } from "bcrypt";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const createOptions = (req) => ({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        await connectDb();
        // const { email, password } = credentials;
        // if (!email && !password) {
        //   const token = await getToken({ req });
        //   if (token) {
        //     const user = await getUserByEmail(token.email);
        //     return user;
        //   }
        // }
        const user = await User.findOne({ email: credentials.email }).lean();
        console.log(user, credentials);
        if (!user) throw new Error("not fount");
        const isAuthenticated = compareSync(
          credentials.password,
          user.password
        );
        if (!isAuthenticated) throw new Error("unauthenticated");
        const { password, ...userData } = user;
        console.log(userData);
        return userData;
      },
    }),

    // GitHubProvider({
    //   clientId: process.env.GITHUB_ID,
    //   clientSecret: process.env.GITHUB_SECRET,
    // }),
  ],

  pages: {
    signIn: "/sign-in",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = user;
      }
      return token;
    },

    async session({ session, token, params }) {
      session.user = token;
      return session;
    },

    // async signIn({ user, account }) {
    //   if (account) {
    //     try {
    //       const { email, name, image } = user;
    //       await dbConnect();
    //       const existingUser = await UserModel.findOne({ email });
    //       if (!existingUser) {
    //         await UserModel.create({
    //           username: email.split("@")[0],
    //           email,
    //           name,
    //           image,
    //           isVerified: true,
    //         });
    //       } else if (!existingUser.isVerified) {
    //         existingUser.isVerified = true;
    //         existingUser.verificationToken = undefined;
    //         await existingUser.save();
    //       }
    //       return true;
    //     } catch (err) {
    //       return false;
    //     }
    //   }
    //   return true;
    // },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export default (req, res) => NextAuth(req, res, createOptions(req));
