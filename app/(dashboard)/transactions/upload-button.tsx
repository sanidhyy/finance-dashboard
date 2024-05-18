import { Upload } from "lucide-react";
import { useCSVReader } from "react-papaparse";

import { Button } from "@/components/ui/button";

type UploadButtonProps = {
  onUpload: (results: any) => void;
};

export const UploadButton = ({ onUpload }: UploadButtonProps) => {
  const { CSVReader } = useCSVReader();

  return (
    <CSVReader onUploadAccepted={onUpload}>
      {({ getRootProps }: any) => (
        <Button size="sm" className="w-full lg:w-auto" {...getRootProps()}>
          <Upload className="mr-2 size-4" />
          Import
        </Button>
      )}
    </CSVReader>
  );
};
