import React, { useCallback, useEffect, useRef } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { checkImage, imageUpload } from "../../utils";

const Editor = ({ text, setText }) => {
  const quillRef = useRef();

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["link", "image", "video"],

      ["clean"],
    ],
  };

  const handleChangeImage = useCallback(() => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const files = input.files;

      if (!files) return toast.error("فایل وجود ندارد");

      const file = files[0];
      const check = checkImage(file);
      if (check.length !== 0) return toast.error(check[0]);

      const id = toast.loading("Image Updloading...");
      const image = await imageUpload(file);

      const quill = quillRef.current;
      const Rang = quill?.getEditor().getSelection()?.index;
      if (Rang !== undefined) {
        quill?.getEditor().insertEmbed(Rang, "image", image.url);
      }

      toast.update(id, {
        isLoading: false,
        render: "Upload Success",
        type: "success",
        autoClose: 5000,
        closeOnClick: true,
      });
    };
  }, []);

  useEffect(() => {
    const quill = quillRef.current;
    if (!quill) return;

    let toolbar = quill.getEditor().getModule("toolbar");
    toolbar.addHandler("image", handleChangeImage);
  }, [handleChangeImage]);

  return (
      <ReactQuill
        theme="snow"
        modules={modules}
        value={text}
        ref={quillRef}
        onChange={(value) => setText(value)}
      />
  );
};

export default Editor;
