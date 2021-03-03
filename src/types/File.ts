interface FileProps {
  id: number;
  title: string;
  info: {
    ccid: string;
    created_at: string;
    desc: string;
    ext: string;
    thumbnail: string;
  };
}

export default FileProps;
