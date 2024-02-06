import { useState } from "react";

export default function useFileHandler() {
  const [selectedFile, setSelectedFile] = useState();
  const [base64File, setBase64File] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setSelectedFile(file);
      toBase64(file).then((base64) => {
        setBase64File(base64);
      });
    } else {
      setBase64File("");
      alert("Please select an image file");
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
    selectedFile,
    base64File,
    handleFileChange,
  };
}
