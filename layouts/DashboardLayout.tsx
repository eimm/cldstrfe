import { useRouter } from "next/router";
import { Menu } from "antd";
import {
  DeleteOutlined,
  FileImageOutlined,
  FileOutlined,
} from "@ant-design/icons";

import styles from "@/styles/Home.module.scss";
import { UploadButton } from "@/components/UploadButton";

const DashboardLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const router = useRouter();
  const selectedMenu = router.pathname;

  return (
    <main className={styles.filescontainer}>
      <div className={styles.sidebar}>
        <UploadButton />
        <Menu
          className={styles.menu}
          mode="inline"
          selectedKeys={[selectedMenu]}
          items={[
            {
              key: "/dashboard",
              icon: <FileOutlined />,
              label: "files",
              onClick: () => router.push("/dashboard"),
            },
            {
              key: "/dashboard/images",
              icon: <FileImageOutlined />,
              label: "images",
              onClick: () => router.push("/dashboard/images"),
            },
            {
              key: "/dashboard/bin",
              icon: <DeleteOutlined />,
              label: "bin",
              onClick: () => router.push("/dashboard/bin"),
            },
          ]}
        />
      </div>
      <div className="container">{children}</div>
    </main>
  );
};

export default DashboardLayout;
