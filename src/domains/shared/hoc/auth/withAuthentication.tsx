import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import useRouting from "../../hooks/useRouting";

export default function withAuthentication(WrappedComponent: NextPage) {
  return (props: JSX.IntrinsicAttributes) => {
    const session = useSession();
    const moveTo = useRouting("replace");

    console.log("session", session);

    useEffect(() => {
      if (!session.data) {
        moveTo("/auth/signin");
      }
    }, []);

    if (session.data) return <WrappedComponent {...props} />;
  };
}
