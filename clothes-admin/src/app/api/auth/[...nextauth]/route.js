import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth";
import { getServerSession } from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      if (user.email === process.env.ADMIN_EMAIL) {
        return Promise.resolve(true);
      }
      return Promise.resolve(false);
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export async function isAdminRequest() {
  const session = await getServerSession(authOptions);
  if (session?.user?.email !== process.env.ADMIN_EMAIL) {
    throw "not an admin";
  }
}
