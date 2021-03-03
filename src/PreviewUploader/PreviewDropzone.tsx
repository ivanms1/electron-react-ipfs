import React, { useEffect, useState } from "react";
import { Stack, Image, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

interface DropzoneProps {
  onDrop: (file: any) => void;
}

function PreviewDropzone({ onDrop }: DropzoneProps) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
  });

  const acceptedFile = acceptedFiles?.[0] ?? null;

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      border="1px dashed #97BEFF"
      padding="1rem"
      backgroundColor="#FBFBFF"
      borderRadius="10px"
      color="#C8C7C8"
      _focus={{ outline: "none" }}
      cursor="pointer"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      {acceptedFile ? (
        <Image
          src={URL.createObjectURL(acceptedFile)}
          marginTop="0  !important"
          width="500px"
          maxHeight="250px"
          objectFit="contain"
          alt="folder"
        />
      ) : (
        <Text>Upload a Preview Image</Text>
      )}
    </Stack>
  );
}

export default PreviewDropzone;
