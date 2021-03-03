import React from "react";
import {
  Drawer as ChakraDrawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerProps as ChakraDrawerProps,
} from "@chakra-ui/react";

interface DrawerProps extends ChakraDrawerProps {
  closable?: boolean;
  title?: string;
  children: React.ReactNode;
}

function Drawer({ closable, title, children, ...props }: DrawerProps) {
  return (
    <ChakraDrawer {...props}>
      <DrawerOverlay>
        <DrawerContent>
          {closable && <DrawerCloseButton />}
          {title && <DrawerHeader>{title}</DrawerHeader>}
          <DrawerBody>{children}</DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </ChakraDrawer>
  );
}

export default Drawer;
