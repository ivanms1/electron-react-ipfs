import React, { useRef, useState } from "react";
import {
  Button,
  HStack,
  Input,
  Stack,
  Text,
  Link,
  Image,
  useToast,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useMutation } from "react-query";

import close from "../../assets/close.svg";

const { ipcRenderer } = window.require("electron");

const downloadFile = async (hash: string) => {
  const data = await ipcRenderer.invoke("download-file", hash);

  return data;
};

interface DownloadProps {
  onClose: () => void;
}

function Download({ onClose }: DownloadProps) {
  const [hash, setHash] = useState("");

  const { mutateAsync: download, isLoading } = useMutation(downloadFile);

  const downloadRef = useRef<HTMLElement | null>(null);

  const toast = useToast();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await download(hash);

    if (res?.success) {
      const newFile = new Blob(res.file);

      // @ts-ignore
      downloadRef.current.href = URL.createObjectURL(newFile);
      // @ts-ignore
      downloadRef.current.download = "file";
      // @ts-ignore
      downloadRef.current.click();

      toast({
        title: "File downloaded",
        status: "success",
        duration: 500,
      });
    } else {
      toast({
        title: "An error happened",
        status: "error",
        duration: 500,
      });
    }
  };

  return (
    <motion.div layoutId="Download">
      <Link
        href="placedholder"
        // @ts-ignore
        ref={downloadRef}
        isExternal
        aria-label="download file"
        display="none"
      />
      <Stack
        spacing="2rem"
        backgroundColor="#FFFFFF"
        padding="4rem 4rem"
        borderRadius="25px"
        boxShadow="0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20)"
        minWidth="40rem"
        minHeight="391px"
        position="relative"
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
          Download files
        </Text>
        <form onSubmit={handleSubmit}>
          <HStack>
            <Input
              value={hash}
              onChange={(e) => setHash(e.target.value)}
              placeholder="File Hash"
            />
            <Button type="submit" colorScheme="green" isLoading={isLoading}>
              Download
            </Button>
          </HStack>
        </form>
      </Stack>
    </motion.div>
  );
}

export default Download;
