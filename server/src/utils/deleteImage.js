import fs from 'fs/promises';

/**
 * Deletes a file from the given path.
 * Ignores if the file does not exist.
 */
export const deleteImage = async (filePath) => {
  try {
    await fs.unlink(filePath);
  } catch (err) {
    if (err.code !== 'ENOENT') {
      console.error(`Failed to delete file at ${filePath}:`, err.message);
    }
  }
};
