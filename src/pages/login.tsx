import { NextPage } from "next";
import { useSession, signIn, signOut } from "next-auth/react";

const Login: NextPage = () => {
  const result = useSession();

  if (result.data) {
    return (
      <>
        Signed in as {result.data.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
};
export default Login;
