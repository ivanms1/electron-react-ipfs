import React, { useState } from "react";
import { useQuery } from "react-query";
import { Center, Image, Spinner, Stack, Text } from "@chakra-ui/react";

import FileProps from "../../types/File";
import Drawer from "../../components/Drawer";
import Button from "../../components/Button";

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
  file: FileProps;
}

function PreviewImage({ file }: PreviewImageProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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
    <>
      <Stack spacing="1rem">
        <Button
          type="button"
          variant="unstyled"
          pure
          onClick={() => setIsDrawerOpen(true)}
          _focus={{ outline: 0 }}
          height="auto"
        >
          <Image
            width="360px"
            height="202px"
            objectFit="contain"
            src={data?.preview}
          />
          <Text textAlign="center">{file.title}</Text>
        </Button>
      </Stack>
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        size="md"
        title={file.title}
        closable
      >
        <Stack spacing="1rem">
          <Image src={data?.preview} borderRadius="10px" />
          <Text textAlign="center">{data?.description}</Text>
          <Button type="button" colorScheme="green">
            Download
          </Button>
        </Stack>
      </Drawer>
    </>
  );
}

export default PreviewImage;
