import { NextPageWithLayout } from "@/pages/_app";
import { User } from "@/api/dto/auth.dto";
import { Button } from "antd";
import { Layout } from "@/layouts/Layout";
import { GetServerSidePropsContext } from "next";
import { checkAuth } from "@/utils/checkAuth";
import * as Api from "@/api";

import styles from "@/styles/Profile.module.scss";
import { ReactElement } from "react";
import DashboardPage from ".";

interface ComponentProps {
  user: User;
}

const DasboardProfilePage: NextPageWithLayout<ComponentProps> = ({ user }) => {
  const logoutHandler = () => {
    if (window.confirm("are you sure you want to logout?")) {
      Api.auth.logout();
      location.assign("/");
    }
  };
  return (
    <main>
      <div className={styles.root}>
        <h1>User Profile</h1>
        <br />
        <p>
          UserId: <b>{user.id}</b>
        </p>
        <p>
          Email: <b>{user.email}</b>
        </p>
        <p>
          Username: <b>{user.fullname}</b>
        </p>
        <br />
        <Button type="primary" danger onClick={logoutHandler}>
          Logout
        </Button>
      </div>
    </main>
  );
};

DasboardProfilePage.getLayout = (page: ReactElement) => {
  return <Layout title="Profile">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  const user = await Api.auth.getMe();

  return { props: { user } };
};

export default DasboardProfilePage;
