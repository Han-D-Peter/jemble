import DefaultLayout from "@/domains/shared/component/layout/DefaultLayout";
import Spinner from "@/domains/shared/component/Spinner";
import withAuthentication from "@/domains/shared/hoc/auth/withAuthentication";
import UnionContainer from "@/domains/union/layouts/UnionContainer";
import { NextPage } from "next";
import { Suspense } from "react";

const Union: NextPage = () => {
  return (
    <DefaultLayout isLogined>
      <Suspense fallback={<Spinner size="lg" />}>
        <UnionContainer />
      </Suspense>
    </DefaultLayout>
  );
};

export default withAuthentication(Union);
