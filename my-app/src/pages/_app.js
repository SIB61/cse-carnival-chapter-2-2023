import { Layout } from "@/components/layout";
import { SocketProvider } from "@/components/socket-provider";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <SocketProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SocketProvider>
    </SessionProvider>
  );
}
