import type {
  GetServerSidePropsContext,
  InferGetServerSidePropsType,
} from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]";
import DefaultLayout from "@/domains/shared/component/layout/DefaultLayout";
import Image from "next/image";
import { css } from "@emotion/react";

export default function SignIn({
  providers,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <DefaultLayout>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button
            css={(theme) => css`
              border: 0;
              background: ${theme.background.default};
            `}
            onClick={() => signIn(provider.id)}
          >
            <Image
              src="/images/naver_login_banner.png"
              width={300}
              height={82}
              alt="네이버 로그인 배너"
            />
          </button>
        </div>
      ))}
    </DefaultLayout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
