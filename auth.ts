import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";
import { author_by_github_id_query } from "./sanity/lib/query";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({
      user,
      profile
    }) {
      const existingUser = await client
        .withConfig({ useCdn: false })
        .fetch(author_by_github_id_query, {
          id:profile?.id
        });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          name: user?.name || profile?.login,
          email: user?.email,
          id: profile?.id,
          username: profile?.login,
          image: user?.image,
        });
      }
      return true;
    },
    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client
          .withConfig({ useCdn: false })
          .fetch(author_by_github_id_query, {
            id: profile?.id,
          });
        token.id = user?._id;
      }

      return token;
    },
    async session({ session, token }) {
      Object.assign(session, { id: token.id });
      return session;
    },
  },
});