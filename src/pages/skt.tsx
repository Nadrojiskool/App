import Head from 'next/head';

if (typeof window !== 'undefined') {
  const server = new WebSocket('ws://' + 'localhost' + ':9001');
  
  server.onmessage = function (event) {
    const message = event.data;
    console.log('received message', message);
  };
  
  server.onopen = function (event) {
    console.log("connection open!");
    server.send('first');
  };
}

const Page = () => {

  return (
    <>
      <Head>
        <title>
          NFT Sample App | Asset Layer
        </title>
      </Head>
      <main>
        
      </main>
    </>
  );
};

export default Page;
