function unhighlightLinks(linkIds, linksMap) {
  linkIds.forEach((id) => {
    const childrenElements = ["paths", "texts", "polygons"];

    childrenElements.forEach((childName) => {
      const elements = linksMap[id].children[childName];

      elements.forEach(({ element, baseStyles }) => {
        Object.entries(baseStyles).forEach(([key, value]) => {
          element.style?.setProperty(key, value);
        });
      });
    });
  });
}

export function unhighlightContainer(containerData, containersMap, linksMap) {
  const { id, innerLinks, outerLinks, birelLinks } = containerData;
  const container = containersMap[id];
  const { rects } = container.children;

  rects.forEach(({ element, baseStyles }) => {
    Object.entries(baseStyles).forEach(([key, value]) => {
      element.style?.setProperty(key, value);
    });
  });

  unhighlightLinks(innerLinks, linksMap);
  unhighlightLinks(outerLinks, linksMap);
  unhighlightLinks(birelLinks, linksMap);
}
