figma.showUI(__html__, {
  width: 326,
  height: 550,
});

let images = [];
let imagePositions = {};
let pageId;

function getImageHashFromFills(fills, node) {
  if (!Array.isArray(fills)) return;
  for (const fill of fills) {
    if (fill.type === "IMAGE") {
      if (!imagePositions[fill.imageHash]) imagePositions[fill.imageHash] = [];
      imagePositions[fill.imageHash].push({ id: node.id, pageId });

      // @ts-ignore
      if (!images.includes(fill.imageHash)) {
        // @ts-ignore
        images.push(fill.imageHash);
      }
    }
  }
}

function getImage(node) {
  if (node.fills) getImageHashFromFills(node.fills, node);
  if (node.children) {
    for (const child of node.children) {
      getImage(child);
    }
  }
}

figma.ui.onmessage = (msg) => {
  if (msg.type === "get-images") {
    const nodes = figma.root.children;
    for (const node of nodes) {
      pageId = node.id;
      getImage(node);
    }

    if (images.length > 0) {
      figma.ui.postMessage({
        type: "images",
        data: { images, imagePositions },
      });
    }

    images = [];
    imagePositions = {};
    pageId = undefined;
  }

  if (msg.type === "image-position") {
    const page = figma.getNodeById(msg.data.pageId);
    const node = figma.getNodeById(msg.data.id);
    if (page && node) {
      // @ts-ignore
      figma.currentPage = page;
      // @ts-ignore
      page.selection = [node];
      figma.viewport.scrollAndZoomIntoView([node]);
    }
  }
};
