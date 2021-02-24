import React, { useState } from "react";
import { useMutation } from "react-query";
import {
  Button,
  HStack,
  Spinner,
  Stack,
  Text,
  useToast,
  Image,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Controller, useForm } from "react-hook-form";

import Dropzone from "../../components/Dropzone";

import PreviewUploader from "../../components/PreviewUploader";

import close from "../../assets/close.svg";
import getMyFiles from "../../helpers/getMyFiles";
import setMyFiles from "../../helpers/setMyFiles";

const { ipcRenderer } = window.require("electron");

const uploadFiles = async (info: FormData) => {
  const preview = {
    name: info.preview?.name,
    path: info.preview?.path,
  };

  const file = {
    name: info.file?.name,
    path: info.file?.path,
  };
  const data = await ipcRenderer.invoke("upload-file", {
    description: info.description,
    preview,
    file,
  });

  return data;
};

type FormData = {
  file: any;
  preview: any;
  description: string;
};

interface UploadProps {
  onClose: () => void;
}

function Upload({ onClose }: UploadProps) {
  // @ts-ignore
  const { mutateAsync: upload, isLoading } = useMutation<any>(uploadFiles);

  const { register, handleSubmit, control, reset } = useForm();
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
        maxHeight="90vh"
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
          <Image src={close} alt="close" width={25} />
        </Button>
        <Text fontSize="1.8rem" textAlign="center">
          Upload your file
        </Text>
        <Stack as="form" onSubmit={onSubmit} spacing="1rem">
          <Controller
            name="file"
            control={control}
            render={({ onChange }) => (
              <Dropzone onDrop={(files) => onChange(files?.[0])} />
            )}
          />

          <Controller
            name="preview"
            control={control}
            render={({ onChange }) => (
              <PreviewUploader onDrop={(files) => onChange(files?.[0])} />
            )}
          />
          <Textarea
            name="description"
            placeholder="Description..."
            ref={register}
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
