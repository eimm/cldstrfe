import React, { useRef } from "react";
import styles from "./FileList.module.scss";
import { File } from "@/api/dto/files.dto";
import FileCard from "../FileCard";
import Selecto from "react-selecto";

export type FileSelectedType = "selected" | "notselected";

interface FileListProps {
  items: File[];
  onFileSelect: (id: number, type: FileSelectedType) => void;
}

const FileList: React.FC<FileListProps> = ({ items, onFileSelect }) => {
  const containerRef = useRef(null);

  return (
    <div className={styles.root} ref={containerRef}>
      {items.map((item) => (
        <div data-id={item.id} key={item.id} className="file">
          <FileCard filename={item.filename} originalname={item.originalname} />
        </div>
      ))}

      <Selecto
        container={containerRef.current}
        selectableTargets={[".file"]}
        selectByClick
        hitRate={10}
        selectFromInside
        toggleContinueSelect={["shift"]}
        continueSelect={false}
        onSelect={(e) => {
          e.added.forEach((el) => {
            el.classList.add("active");
            onFileSelect(Number(el.dataset["id"]), "selected");
          });
          e.removed.forEach((el) => {
            el.classList.remove("active");
            onFileSelect(Number(el.dataset["id"]), "notselected");
          });
        }}
      />
    </div>
  );
};

export default FileList;
