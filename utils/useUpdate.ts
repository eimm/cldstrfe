import { useEffect } from "react";
import * as Api from "@/api";
import { File, FileType } from "@/api/dto/files.dto";

export const useUpdate = (
  update: boolean,
  setFiles: (value: File[]) => void,
  setUpdate: (update: boolean) => void,
  type: FileType
) => {
  useEffect(() => {
    if (update) {
      const fetchFiles = async () => {
        const data = await Api.files.getAll(type);
        setFiles(data);
      };
      fetchFiles();
    }
    setUpdate(false);
  }, [update]);
};
