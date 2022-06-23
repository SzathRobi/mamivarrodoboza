/* eslint-disable max-len */
import {
  getProviders,
  signIn,
  getSession,
  getCsrfToken,
} from 'next-auth/react';
import Image from 'next/image';

export default function SignIn({ providers }) {
  return (
    <section className="relative w-full h-screen flex flex-col gap-8 items-center">
      <Image
        src="/images/signin.jpg"
        layout="fill"
        alt="Boat on a river"
        className="absolute left-0 w-full h-full"
      />
      <div className="rounded-lg w-96 shadow-md p-8 h-80 absolute top-1/2 right-64 transform -translate-y-1/2 z-10 bg-white bg-opacity-50 backdrop-filter backdrop-blur-sm bg-clip-padding border border-gray-300 flex flex-col items-center justify-evenly">
        <h1 className="text-3xl">Bejelentkezés</h1>
        {Object.values(providers).map((provider) => (
          <div key={provider.name}>
            <button type="button" onClick={() => signIn(provider.id)}>
              Sign in with {provider.name}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export async function getServerSideProps(context) {
  const { req } = context;
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: { destination: '/' },
    };
  }
  const providers = await getProviders();
  return {
    props: { providers, csrfToken: await getCsrfToken(context) },
  };
}
