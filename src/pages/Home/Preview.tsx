import React from "react";
import { Button, Stack, Text, Grid, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import { motion } from "framer-motion";

import PreviewImage from "./PreviewImage";
import Icon from "../../components/Chakra/Icon";
import FileProps from "../../types/File";

import { ReactComponent as Close } from "../../assets/close.svg";

import axios from "axios";

interface DownloadProps {
  onClose: () => void;
}

function Preview({ onClose }: DownloadProps) {
  const { data, isLoading } = useQuery(
    "get-preview-files",
    async () => {
      const {
        data: { data },
      } = await axios.get("http://192.168.100.54:8000/api/content/get_all");

      return data;
    },
    {
      refetchOnMount: true,
      cacheTime: 0,
      staleTime: 0,
    }
  );

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
          <Icon icon={Close} width={25} />
        </Button>
        <Text fontSize="1.8rem" textAlign="center">
          Preview Files
        </Text>
        <Grid
          gridTemplateColumns="repeat(3, 1fr)"
          overflowY="auto"
          gap="1rem"
          minHeight="60vh"
        >
          {isLoading ? (
            <Spinner />
          ) : (
            data?.map((file: FileProps) => (
              <PreviewImage key={file.id} file={file} />
            ))
          )}
        </Grid>
      </Stack>
    </motion.div>
  );
}

export default Preview;
