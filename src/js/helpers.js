export const request = async (path, options) => {
  const rawResult = await fetch(path);

  if (!rawResult.ok) {
    throw rawResult;

  }

  return await rawResult.json();
};