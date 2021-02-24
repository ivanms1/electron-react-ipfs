import React from "react";
import { Stack, Image, Text } from "@chakra-ui/react";
import { useDropzone } from "react-dropzone";

import folder from "../../assets/folder.svg";

interface DropzoneProps {
  onDrop: (file: any) => void;
}

function Dropzone({ onDrop }: DropzoneProps) {
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    multiple: false,
  });

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      border="1px dashed #97BEFF"
      padding="0.5rem 10rem"
      backgroundColor="#FBFBFF"
      borderRadius="10px"
      color="#C8C7C8"
      spacing="0.5rem"
      _focus={{ outline: "none" }}
      cursor="pointer"
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Image src={folder} width="50px" alt="folder" />
      {acceptedFiles?.[0]?.name ? (
        <Text>{acceptedFiles?.[0]?.name}</Text>
      ) : (
        <Text>Drop your file</Text>
      )}
    </Stack>
  );
}

export default Dropzone;
