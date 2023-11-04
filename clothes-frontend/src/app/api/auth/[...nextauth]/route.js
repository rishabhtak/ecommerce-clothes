import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcrypt";
import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";

const handler = NextAuth({
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    newUser: "/register",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        mongooseConnect();
        const { email, password } = credentials;
        let passwordCorrect = false;
        let user;
        try {
          user = await User.findOne({ email });
          if (user) {
            passwordCorrect = await compare(password, user.password);
            if (passwordCorrect) {
              return {
                id: user._id.toString(),
                email: user.email,
              };
            }
          }
        } catch (error) {
          return null;
        }

        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
