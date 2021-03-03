import React from "react";
import { BoxProps } from "@chakra-ui/react";

import Box from "../Box";
import MotionWrapper from "../MotionWrapper";

interface PageBoxProps extends BoxProps {
  children: React.ReactNode;
}

function PageBox({ children, ...props }: PageBoxProps) {
  return (
    <MotionWrapper
      initial={{ y: 400, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -400, opacity: 0 }}
      transition={{
        duration: 0.5,
        damping: 12,
        stiffness: 100,
      }}
    >
      <Box
        elevation={2}
        p="1rem"
        width={["95vw", "95vw", "90vw"]}
        height="100%"
        {...props}
      >
        {children}
      </Box>
    </MotionWrapper>
  );
}

export default PageBox;
