import { useState } from "react";

export default function useFiles() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [base64Files, setBase64Files] = useState([]);

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length > 0) {
      const newSelectedFiles = [];
      const newBase64Files = [];

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        if (file.type.startsWith("image/")) {
          newSelectedFiles.push(file);
          toBase64(file).then((base64) => {
            newBase64Files.push(base64);

            // If all files are processed, update the state
            if (newBase64Files.length === files.length) {
              setSelectedFiles(newSelectedFiles);
              setBase64Files(newBase64Files);
            }
          });
        } else {
          alert(`File ${file.name} is not an image. Please select image files only.`);
        }
      }
    } else {
      setSelectedFiles([]);
      setBase64Files([]);
    }
  };

  const toBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  return {
    selectedFiles,
    base64Files,
    handleFileChange,
  };
}
