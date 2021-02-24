import React from "react";
import { Button, Stack, Text, Image, Grid } from "@chakra-ui/react";
import { motion } from "framer-motion";

import PreviewImage from "./PreviewImage";

import close from "../../assets/close.svg";

import { previewImages } from "../../const";

interface DownloadProps {
  onClose: () => void;
}

function Preview({ onClose }: DownloadProps) {
  return (
    <motion.div layoutId="Preview">
      <Stack
        backgroundColor="#FFFFFF"
        padding="4rem 4rem"
        borderRadius="25px"
        boxShadow="0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.20)"
        minWidth="40rem"
        minHeight="391px"
        maxHeight="90vh"
        position="relative"
        overflowY="auto"
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
          Preview Files
        </Text>
        <Grid gridTemplateColumns="repeat(3, 1fr)" overflowY="auto" gap="1rem">
          {previewImages.map((file) => (
            <PreviewImage key={file.description.hash} file={file} />
          ))}
        </Grid>
      </Stack>
    </motion.div>
  );
}

export default Preview;
