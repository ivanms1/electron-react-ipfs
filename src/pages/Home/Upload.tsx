import React from "react";
import { useMutation } from "react-query";
import { Button, Stack, Text, useToast, Textarea } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";

import Dropzone from "../../components/Dropzone";
import Input from "../../components/Form/Chakra/Input";

import PreviewUploader from "../../components/PreviewUploader";
import Icon from "../../components/Chakra/Icon";

import { ReactComponent as Close } from "../../assets/close.svg";

import getMyFiles from "../../helpers/getMyFiles";
import setMyFiles from "../../helpers/setMyFiles";

const { ipcRenderer } = window.require("electron");

type FormData = {
  title: string;
  file: any;
  preview: any;
  description: string;
};

const uploadFiles = async (info: FormData) => {
  const preview = {
    name: info.preview?.name,
    path: info.preview?.path,
  };

  const file = {
    title: info.title,
    name: info.file?.name,
    path: info.file?.path,
    size: String(info.file?.size),
    ext: info.file?.name.slice(
      ((info.file?.name.lastIndexOf(".") - 1) >>> 0) + 2
    ),
  };
  const data = await ipcRenderer.invoke("upload-file", {
    description: info.description,
    preview,
    file,
  });
  return data;
};

interface UploadProps {
  onClose: () => void;
}

function Upload({ onClose }: UploadProps) {
  // @ts-ignore
  const { mutateAsync: upload, isLoading } = useMutation<any>(uploadFiles);

  const { register, handleSubmit, control, reset, errors } = useForm();
  const toast = useToast();

  const onSubmit = handleSubmit(async (values) => {
    const { success, ...data } = await upload(values);

    if (success) {
      const myFiles = getMyFiles();
      setMyFiles([...myFiles, data]);
      toast({
        status: "success",
        title: "File added",
        duration: 3000,
        position: "top",
      });
      reset();
      onClose();
    } else {
      toast({
        status: "error",
        title: "Oops",
        description: String(data?.error),
        duration: 2000,
        position: "top",
      });
    }
  });

  return (
    <motion.div layoutId="Upload">
      <Stack
        backgroundColor="#FFFFFF"
        padding="1rem 4rem"
        borderRadius="25px"
        boxShadow="0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20)"
        minWidth="40rem"
        position="relative"
        overflowY="auto"
        maxHeight="80vh"
      >
        <Button
          type="button"
          onClick={onClose}
          position="absolute"
          variant="ghost"
          top="2%"
          right="2%"
          size="sm"
        >
          <Icon icon={Close} width={25} />
        </Button>
        <Text fontSize="1.8rem" textAlign="center">
          Upload your file
        </Text>
        <Stack as="form" onSubmit={onSubmit} spacing="1rem">
          <Input
            name="title"
            placeholder="File title"
            formRef={register({
              required: { value: true, message: "A title is required" },
            })}
            error={errors.title}
          />
          <Controller
            name="file"
            control={control}
            defaultValue=""
            render={({ onChange }) => (
              <Dropzone onDrop={(files) => onChange(files?.[0])} />
            )}
          />

          <Controller
            name="preview"
            control={control}
            defaultValue=""
            render={({ onChange }) => (
              <PreviewUploader onDrop={(files) => onChange(files?.[0])} />
            )}
          />
          <Textarea
            name="description"
            placeholder="Description..."
            ref={register({
              required: { value: true, message: "A description is required" },
            })}
          />
          <Button type="submit" colorScheme="blue" isLoading={isLoading}>
            Submit
          </Button>
        </Stack>
      </Stack>
    </motion.div>
  );
}

export default Upload;
