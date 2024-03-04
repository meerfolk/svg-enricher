export function createContainerData(containersMap, linksMap) {
  const containerIds = Object.keys(containersMap);
  const linkIds = Object.keys(linksMap);

  return containerIds.map((containerId) => {
    const cuttedId = containerId.substring(5);

    const [innerLinks, outerLinks, birelLinks] = linkIds.reduce(
      ([innerLinks, outerLinks, birelLinks], linkId) => {
        const el = linksMap[linkId];
        const isBirel = el.children.polygons.length >= 2;

        if (linkId.indexOf(cuttedId) === 5) {
          const target = isBirel ? birelLinks : outerLinks;
          target.push(linkId);
          return [innerLinks, outerLinks, birelLinks];
        }

        if (linkId.indexOf(cuttedId) > 5) {
          const target = isBirel ? birelLinks : innerLinks;
          target.push(linkId);
        }

        return [innerLinks, outerLinks, birelLinks];
      },
      [[], [], []]
    );

    return {
      id: containerId,
      innerLinks,
      outerLinks,
      birelLinks,
    };
  });
}
