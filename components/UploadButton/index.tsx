import React, { use, useContext, useState } from "react";
import styles from "@/styles/Home.module.scss";
import { Button, Upload, notification, UploadFile } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { UploadProps } from "antd";
import { UpdateContext } from "@/foundation/updateContext";
import * as Api from "@/api";

export const UploadButton: React.FC = () => {
  const [fileList, setFilelist] = useState<UploadFile[]>([]);
  const { setUpdate } = useContext(UpdateContext);

  const onUploadSuccess: UploadProps["customRequest"] = async (options) => {
    try {
      if (!Api.files.uploadFile) return;
      const file = await Api.files.uploadFile(options);
      setUpdate(true);

      setFilelist([]);
    } catch (e) {
      notification.error({
        message: "error",
        description: "file load unsuccessful",
        duration: 2,
      });
    }
  };

  return (
    <Upload
      className={styles.upload}
      customRequest={onUploadSuccess}
      fileList={fileList}
      onChange={({ fileList }) => setFilelist(fileList)}
    >
      <Button type="primary" icon={<CloudUploadOutlined />} size="large">
        Upload
      </Button>
    </Upload>
  );
};
