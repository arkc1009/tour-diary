import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import useSWR from 'swr';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const Home: NextPage = () => {
  const { data } = useSWR('/api/hello', fetcher);

  console.log(data);

  if (!data) return <div>Loading...</div>;

  return (
    <div className='flex min-h-screen flex-col items-center justify-center py-2'>
      <Head>
        <title>{data.name}</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <main className='flex w-full flex-1 flex-col items-center justify-center px-20 text-center'>
        hello! webhook!
      </main>
    </div>
  );
};

export default Home;
