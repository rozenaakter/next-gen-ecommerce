// import bcrypt from "bcryptjs";

// import {NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import GoogleProvider from "next-auth/providers/google";
// import { dbAdapter } from "../database-adapter";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid credentials");
//         }
//         const user = await dbAdapter.getUserByEmail(credentials.email);
//         if (!user || !user.password) {
//           throw new Error("Invalid credentials");
//         }
//         if (!user.isActive) {
//           throw new Error("Account is deactivated");
//         }
//         const isPasswordValid = await bcrypt.compare(
//           credentials.password,
//           user.password
//         );
//         if (!isPasswordValid) {
//           throw new Error("Invalid credentials");
//         }
//         await dbAdapter.updateUser(user.id || user._id?.toString(), {
//           lastLoginAt: new Date(),
//         });
//         return {
//           id: user.id || user._id?.toString(),
//           email: user.email,
//           name: user.name,
//           role: user.role,
//           image: user.avatar,
//         };
//       },
//     }),
//   ],
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       if (account?.provider === "google") {
//         try {
//           const existingUser = await dbAdapter.getUserByEmail(user.email!);
//           if (existingUser) {
//             // update user
//             await dbAdapter.updateUser(
//               existingUser.id || existingUser._id?.toString(),
//               { name: user.name, avatar: user.image, LastLoginAt: new Date() }
//             );
//           } else {
//             // create user
//             await dbAdapter.createUser({
//               email: user.email,
//               name: user.name,
//               avatar: user.image,
//               role: "CUSTOMER",
//               isActive: true,
//             });
//           }
//           return true;
//         } catch (error) {
//           console.error("Sign in error:", error);
//           return false;
//         }
//       }
//       return true;
//     },
//     async jwt({ token, user, trigger, session }) {
//       // initial sing in
//       if (user) {
//         token.id = user.id;
//         token.role = user.role;
//       }
//       // Update session
//       if (trigger === "update" && session) {
//         token.name = session.name;
//         token.email = session.email;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (session.user) {
//         session.user.id = token.id as string;
//         const allowedRoles = ["ADMIN", "CUSTOMER", "STAFF"] as const;
//         if (
//           typeof token.role === "string" &&
//           (allowedRoles as readonly string[]).includes(token.role)
//         ) {
//           session.user.role = token.role as (typeof allowedRoles)[number];
//         }
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//     signOut: "/",
//     error: "/login",
//   },
//   session: {
//     strategy: "jwt",
//     maxAge: 30 * 24 * 60 * 60, // 30 days
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };


import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { dbAdapter } from "../database-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await dbAdapter.getUserByEmail(credentials.email);

        if (!user || !user.password) {
          throw new Error("Invalid credentials");
        }

        if (user.isActive === false) {
          throw new Error("Account is deactivated");
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        await dbAdapter.updateUser(user._id.toString(), {
          lastLoginAt: new Date(),
        });

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role || "CUSTOMER",
          image: user.avatar,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const existingUser = await dbAdapter.getUserByEmail(user.email!);

          if (existingUser) {
            await dbAdapter.updateUser(existingUser._id.toString(), {
              name: user.name,
              avatar: user.image,
              lastLoginAt: new Date(),
            });
          } else {
            await dbAdapter.createUser({
              email: user.email,
              name: user.name,
              avatar: user.image,
              role: "CUSTOMER",
              isActive: true,
              lastLoginAt: new Date(),
            });
          }

          return true;
        } catch (error) {
          console.error("Google Sign-in Error:", error);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role || "CUSTOMER";
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },

  secret: process.env.NEXTAUTH_SECRET,
};
