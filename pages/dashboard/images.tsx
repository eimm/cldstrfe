import { GetServerSidePropsContext } from "next";
import { checkAuth } from "@/utils/checkAuth";
import Files from "@/components/Files";
import { NextPageWithLayout } from "@/pages/_app";
import { Layout } from "@/layouts/Layout";
import { ReactElement, useContext, useState } from "react";
import * as Api from "@/api";
import DashboardLayout from "@/layouts/DashboardLayout";

import { File } from "@/api/dto/files.dto";
import { UpdateContext } from "@/foundation/updateContext";
import { useUpdate } from "@/utils/useUpdate";

interface Props {
  items: File[];
}

const ImagesPage: NextPageWithLayout<Props> = ({ items }) => {
  const [files, setFiles] = useState(items);
  const { update, setUpdate } = useContext(UpdateContext);
  useUpdate(update, setFiles, setUpdate, "images");
  return (
    <DashboardLayout>
      <Files items={files} withActions />
    </DashboardLayout>
  );
};

ImagesPage.getLayout = (page: ReactElement) => {
  return <Layout title="Dashboard">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ("redirect" in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll("images");

    return {
      props: {
        items,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        items: [],
      },
    };
  }
};

export default ImagesPage;
