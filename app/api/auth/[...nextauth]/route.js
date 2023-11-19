import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from 'axios';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
const getUserFromDB = async (userId) => {
  // Call the REST API endpoint to get the latest user data
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/user/${userId}`
  );

  // Return the user data
  // console.log(response.data.user);
  return response.data.user;
};
export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      async authorize(credentials) {
        const phone = credentials.phone;
        const password = credentials.password;
        const data = await SignIn(phone, password);
        // console.log(data);

        if (!data.data.token) {
          throw new Error(data);
        }

        return { token: data.data.token, ...data };
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ account, profile }) {
      if (account.provider === 'google') {
        // add your user in DB here with profile data (profile.email, profile.name)
        console.log('what what ');
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/sociallogin`,
          {
            email: profile.email,
            name: profile.given_name,
            last_name: profile.family_name,
          }
        );
        // console.log(response);
      }
      return true;
    },
    jwt({ token, user }) {
      /* Step 1: update the token based on the user object update token for backend  */
      if (user) {
        token.token = user.token;
        token.user = { ...user };
      }

      return token;
    },

    session: async ({ session, token, account }) => {
      // console.log(account);
      // console.log('sadjhlkadsf');
      if (token && session.user) {
        session.user.token = token.token;
        session.user = token.user;
      }
      if (token) {
        if (session.user.data) {
          const user = await getUserFromDB(token.user.data.user.id);

          session.user.data.user = user;
          // console.log('.....');
        }

        // console.log('token....');
      }
      if (token) {
        if (session.user.email) {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/sociallogin`,
            {
              email: session.user.email,
              name: session.user.name,
              last_name: session.user.name,
            }
          );
          // console.log(response.data);

          session.user = response.data.data;
          // console.log('.....');
          // console.log(session.user.email);
        }
      }

      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const SignIn = async (phone, password) => {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/login`,
      { phone, password },
      { headers: { 'content-type': 'application/json' } }
    );
    // console.log(res);
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
