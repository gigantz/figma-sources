const linkPattern = /https\:\/\/www\.figma\.com\/(file|design|board)\/.*/gi;

export function checkSharedLink(url: string) {
  if (!url || !url.trim()) return false;
  return linkPattern.test(url);
}

export function getFileKey(sharedLink: string) {
  const splittedLink = sharedLink.split("/");
  let fileIndex;

  if (splittedLink.indexOf("file") !== -1) {
    fileIndex = splittedLink.indexOf("file");
  } else if (splittedLink.indexOf("design") !== -1) {
    fileIndex = splittedLink.indexOf("design");
  } else {
    fileIndex = splittedLink.indexOf("board");
  }

  const fileKey = splittedLink[fileIndex + 1];

  if (fileIndex > -1) {
    return fileKey;
  }

  return null;
}

export function generateImgSrcUrl(fileKey, imageHash) {
  return `https://www.figma.com/file/${fileKey}/image/${imageHash}`;
}

export function generateSecuredUrl(originalUrl) {
  const generated = `https://www.figma.com/exit?url=${encodeURIComponent(
    originalUrl
  )}`;
  return generated;
}

export function generateShellScript(fileKey, images) {
  const type = "${type%%;*}";
  const base = "${f}";
  const folder = `figma_files_${fileKey}`;
  const green = "\u001b[0;32m";
  const end = "\u001b[0m";

  return `
#! /usr/bin/env bash
echo '${green}⚡️ Figma File Sources are downloading...${end}'
mkdir ./${folder};
cd ${folder};

${images
  .map((hash) => `curl -O -L ${generateImgSrcUrl(fileKey, hash)}`)
  .join("\n")}

for f in ./*; do
    type=$(file --mime-type -b "$f")
    type=${type}
    base=${base}
    final=
    case "$type" in
        image/gif)       final="$base".gif ;;
        image/png)       final="$base".png ;;
        image/jpeg)       final="$base".jpeg ;;
        image/jpg)       final="$base".jpg ;;
    esac
    if [ "$final" ]; then
      mv -f "$f" "$final"
    fi
done
echo ''
echo '${green}${images.length} images downloaded${end}'
echo ''
echo '${green}Folder with sources:${end}'
pwd
echo ''
echo '${green}Files:${end}'
ls
echo ''
echo '${green}Done!${end}'
  `.trim();
}
