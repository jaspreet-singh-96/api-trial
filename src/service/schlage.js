export const lockDoor = async (data) => {
  // Secret or API key used to authorize with Seam API
  const seamSecret = process.env.SEAM_SECRET;
  const url = `${process.env.SEAM_API_URL}/locks/lock_door`;

  const headers = new Headers();
  // Add secret key to authorization header
  headers.append("authorization", `Bearer ${seamSecret}`);

  try {
    const res = await fetch(url, {
      method: "POST",
      body: data,
      headers,
    });

    return await res.json();
  } catch (error) {
    // If api fails throw an error
    throw new Error("Failed to lock door", error);
  }
};
