import React, { useState } from "react";
import { Button, HStack, Stack, Text } from "@chakra-ui/react";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";
import { useMutation } from "react-query";

import Upload from "./Upload";
import Download from "./Download";
import Preview from "./Preview";

const { ipcRenderer } = window.require("electron");

const components = [
  { id: "Upload", component: Upload, color: "blue" },
  { id: "Download", component: Download, color: "green" },
  { id: "Preview", component: Preview, color: "purple" },
];

const ipfsConnect = async () => {
  const data = await ipcRenderer.invoke("connect-to-ipfs");
  return data;
};

function Home() {
  const [selectPage, setSelectPage] = useState("");

  const Component = components.find((c) => c.id === selectPage)?.component;

  const { mutateAsync: connect, data, isLoading } = useMutation(ipfsConnect);

  return (
    <AnimateSharedLayout>
      <Stack
        position="absolute"
        top="50%"
        left="50%"
        transform="translate(-50%, -50%)"
        spacing="2rem"
        overflowY="auto"
        maxHeight="90vh"
      >
        <Text textAlign="center" fontSize="1.5rem">
          Conun IPFS Network
        </Text>
        <Button
          type="button"
          isLoading={isLoading}
          onClick={() => connect()}
          colorScheme="orange"
        >
          Connect
        </Button>
        {data && (
          <Text maxWidth="500px" maxHeight="300px" overflowY="auto">
            Connect response:{" "}
            {data.success ? JSON.stringify(data, null, 2) : String(data.error)}
          </Text>
        )}

        <HStack justifyContent="space-around">
          {components.map((c) => (
            <motion.div key={c.id} layoutId={c.id}>
              <Button
                _focus={{ outline: "none" }}
                type="button"
                onClick={() => setSelectPage(c.id)}
                colorScheme={c.color}
              >
                {c.id}
              </Button>
            </motion.div>
          ))}
        </HStack>
      </Stack>

      <AnimatePresence>
        {/* @ts-ignore */}
        {selectPage && <Component onClose={() => setSelectPage("")} />}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
}

export default Home;
