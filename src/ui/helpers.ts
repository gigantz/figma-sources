const linkPattern = /https\:\/\/www\.figma\.com\/file\/.*/gi;

export function checkSharedLink(url: string) {
  if (!url || !url.trim()) return false;
  return linkPattern.test(url);
}

export function getFileKey(sharedLink: string) {
  const splittedLink = sharedLink.split("/");
  const fileIndex = splittedLink.indexOf("file");
  const fileKey = splittedLink[fileIndex + 1];
  if (fileIndex > -1) {
    return fileKey;
  }

  return null;
}

export function generateImgSrcUrl(fileKey, imageHash) {
  return `https://www.figma.com/file/${fileKey}/image/${imageHash}`;
}
