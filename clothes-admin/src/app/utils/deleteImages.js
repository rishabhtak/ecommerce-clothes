import sha1 from "sha1";

export default async function deleteImages(link) {
  const regex = /\/ecommerceclothes_folder\/([^/]+)\.webp$/;
  const publicId = link.match(regex);
  const url = "ecommerceclothes_folder/" + publicId[1];
  const timestamp = new Date().getTime();
  const string = `public_id=${url}&timestamp=${timestamp}${process.env.CLOUDINARY_API_SECRET}`;
  const signature = sha1(string);

  const formData = new FormData();
  formData.append("public_id", url);
  formData.append("signature", signature);
  formData.append("api_key", process.env.CLOUDINARY_API_KEY);
  formData.append("timestamp", timestamp);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/destroy`,
    {
      method: "POST",
      body: formData,
    }
  );
  return await res.json();
}
