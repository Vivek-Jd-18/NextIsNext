import { connectToDb } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/user";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session(session: any) {
      const sesssionUser = await User.findOne({
        email: session.user.email,
      });
      session.user.id = sesssionUser._id.toString();
      return session;
    },
    async signIn(profile: any) {
      try {
        await connectToDb();

        const _user = await User.findOne({ email: profile.email });
        // check if user exists
        if (!_user) {
          await User.create({
            email: profile.email,
            username: profile.name?.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});

export { handler as GET, handler as POST };
