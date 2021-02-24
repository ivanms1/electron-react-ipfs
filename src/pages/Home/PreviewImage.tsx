import React from "react";
import { useQuery } from "react-query";
import { Center, Image, Spinner, Stack, Text } from "@chakra-ui/react";

const { ipcRenderer } = window.require("electron");

const previewImage = async (file: any) => {
  const data = await ipcRenderer.invoke("get-image-preview", file);

  const preview = new Blob([data.preview.buffer]);
  const description = new TextDecoder("utf-8").decode(data.description);

  return {
    description,
    preview: URL.createObjectURL(preview),
  };
};

interface PreviewImageProps {
  file: {
    description: {
      hash: string;
    };
    preview: {
      hash: string;
    };
    file: {
      hash: string;
    };
  };
}

function PreviewImage({ file }: PreviewImageProps) {
  const { data, isLoading } = useQuery(
    ["get-preview", file],
    () => previewImage(file),
    { enabled: !!file }
  );

  return isLoading ? (
    <Center>
      <Spinner />
    </Center>
  ) : (
    <Stack>
      <Image
        width="360px"
        height="202px"
        objectFit="contain"
        src={data?.preview}
      />
      <Text textAlign="center">{data?.description}</Text>
    </Stack>
  );
}

export default PreviewImage;
