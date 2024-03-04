const rectStyles = {
  stroke: "#00FF00",
  "stroke-width": 2,
};

const innerLinksStyles = {
  base: {
    stroke: "#FF0000",
  },
  paths: {},
  texts: {},
  polygons: {},
};

const outerLinksStyles = {
  base: {
    stroke: "#00FF00",
  },
  paths: {},
  texts: {},
  polygons: {},
};

const birelLinksStyles = {
  base: {
    stroke: "#0000FF",
  },
  paths: {},
  texts: {},
  polygons: {},
};

function highlightLinks(linkIds, linksMap, styles) {
  linkIds.forEach((id) => {
    const childrenElements = ["paths", "texts", "polygons"];

    childrenElements.forEach((childName) => {
      const elements = linksMap[id].children[childName];

      const baseStyle = styles.base;
      const elementStyle = styles[childName];

      elements.forEach(({ element }) => {
        Object.entries({ ...baseStyle, ...elementStyle }).forEach(
          ([key, value]) => {
            element.style?.setProperty(key, value);
          }
        );
      });
    });
  });
}

export function highlightContainer(containerData, containersMap, linksMap) {
  const { id, innerLinks, outerLinks, birelLinks } = containerData;
  const container = containersMap[id];
  const { rects } = container.children;

  rects.forEach(({ element }) => {
    Object.entries(rectStyles).forEach(([key, value]) => {
      element.style?.setProperty(key, value);
    });
  });

  highlightLinks(innerLinks, linksMap, innerLinksStyles);
  highlightLinks(outerLinks, linksMap, outerLinksStyles);
  highlightLinks(birelLinks, linksMap, birelLinksStyles);
}
