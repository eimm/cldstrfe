import React from "react";
import styles from "./FileCard.module.scss";
import { getExtFromName } from "@/utils/getExtFromName";
import { isImage } from "@/utils/isImage";
import { Extension, getExtColour } from "@/utils/getExtColour";
import { FileTextOutlined } from "@ant-design/icons";
import Image from "next/image";

interface FileCardProps {
  filename: string;
  originalname: string;
}

const FileCard: React.FC<FileCardProps> = ({ originalname, filename }) => {
  const ext = getExtFromName(filename);
  const isImg = isImage(ext);
  const imageUrl = isImg ? "http://localhost:7777/uploads/" + filename : "";

  const colour = getExtColour(ext as Extension);
  const classColour = styles[colour];

  return (
    <div className={styles.root}>
      <div className={styles.icon}>
        <i className={classColour}>{ext}</i>
        {isImg ? (
          <div className={styles.image}>
            <Image src={imageUrl} alt="File" fill />
          </div>
        ) : (
          <FileTextOutlined />
        )}
      </div>
      <span>{originalname}</span>
    </div>
  );
};

export default FileCard;
