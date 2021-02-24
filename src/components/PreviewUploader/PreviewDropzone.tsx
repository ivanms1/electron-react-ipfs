import React from "react";
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
  // @ts-ignore
  const pathName = acceptedFiles?.[0]?.path ?? "";

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
      {pathName ? (
        <Image
          src={pathName}
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
