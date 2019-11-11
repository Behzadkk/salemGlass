export const sendFile = file => {
  const formData = new FormData();
  formData.append("myFile", file);
  fetch(`http://localhost:5000/image-upload`, {
    method: "POST",
    body: formData
  });
};
