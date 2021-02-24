import React from 'react';
import { Stack, Text } from '@chakra-ui/react';

import PreviewDropzone from './PreviewDropzone';

interface PreviewUploaderProps {
  onDrop: (files: any) => void;
}

function PreviewUploader({ onDrop }: PreviewUploaderProps) {
  return (
    <Stack>
      <Text>Upload a preview of your file</Text>
      <PreviewDropzone onDrop={onDrop} />
    </Stack>
  );
}

export default PreviewUploader;
