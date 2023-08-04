import React, { useEffect, useState } from "react";
import { FileActions } from "../FileActions";
import { File } from "@/api/dto/files.dto";
import FileList, { FileSelectedType } from "../FileList";
import { Empty } from "antd";
import * as Api from "@/api";

interface FileProps {
  items: File[];
  withActions?: boolean;
}

const Files: React.FC<FileProps> = ({ items, withActions }) => {
  const [files, setFiles] = useState(items || []);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const onFileSelect = (id: number, type: FileSelectedType) => {
    if (type === "selected") {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  };
  const onClickRemove = () => {
    setSelectedIds([]);
    setFiles((prev) => prev.filter((f) => !selectedIds.includes(f.id)));
    Api.files.deleteFile(selectedIds);
  };
  const onClickShare = () => {
    alert("share");
  };

  useEffect(() => {
    setFiles(items);
  }, [items]);

  return (
    <div>
      {files.length ? (
        <>
          {withActions && (
            <FileActions
              onClickRemove={onClickRemove}
              onClickShare={onClickShare}
              isActive={selectedIds.length > 0}
            />
          )}
          <FileList items={files} onFileSelect={onFileSelect} />
        </>
      ) : (
        <Empty className="empty-block" description="the list is empty" />
      )}
    </div>
  );
};

export default Files;
