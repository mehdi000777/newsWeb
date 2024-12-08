export const ellipsis = (content, number) => {
  let newContent;
  if (content?.length > number) {
    newContent = content.slice(0, number) + " [ ... ]";
  }
  return newContent;
};

export const checkImage = (file) => {
  let errors = [];

  if (!file) errors.push("File does not exist.");

  if (file.type !== "image/png" && file.type !== "image/jpeg")
    errors.push("File format inncorect.");

  if (file.size > 2 * 1024 * 1024) errors.push("The largest file size is 2m.");

  return errors;
};

export const imageUpload = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "ml_default");
  formData.append("cloud_name", "dzu0qa4fr");

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/dzu0qa4fr/upload",
    {
      method: "post",
      body: formData,
    }
  );

  const data = await res.json();
  return { public_id: data.public_id, url: data.secure_url };
};
