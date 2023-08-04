import { LoginForm } from "@/components/authorization/LoginForm";
import { RegForm } from "@/components/authorization/RegForm";
import { Tabs } from "antd";
import { NextPage } from "next";
import Head from "next/head";

const AuthPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <main>
        <Tabs
          items={[
            {
              label: "Login",
              key: "1",
              children: <LoginForm />,
            },
            { label: "Register", key: "2", children: <RegForm /> },
          ]}
        />
      </main>
    </>
  );
};

export default AuthPage;
