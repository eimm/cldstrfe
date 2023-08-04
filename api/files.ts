import axios from "@/foundation/axios";
import { File, FileType } from "./dto/files.dto";
import { UploadProps } from "antd";
import { UploadRequestError } from "rc-upload/lib/interface";

interface onProgressParam {
  percent: number;
}

export const getAll = async (type: FileType = "all"): Promise<File[]> => {
  return (await axios.get("/files?type=" + type)).data;
};

export const deleteFile = (ids: number[]): Promise<void> => {
  return axios.delete("/files?id=" + ids);
};

export const uploadFile: UploadProps["customRequest"] = async (params) => {
  const { onSuccess, onProgress, onError, file } = params;

  if (
    onSuccess === undefined ||
    onProgress === undefined ||
    onError === undefined ||
    file === undefined
  ) {
    console.log("error with upload");
    return;
  }

  const formData = new FormData();
  formData.append("file", file);

  const config = {
    headers: { "Config-Type": "multipart/form-data" },
    onProgress: (event: ProgressEvent) => {
      onProgress({ percent: (event.loaded / event.total) * 100 });
    },
  };

  try {
    const { data } = await axios.post("files", formData, config);

    onSuccess(data);
    return data;
  } catch (e) {
    const error = e as UploadRequestError;
    onError(error);
  }
};
