var enrichSVG = (function (exports) {
  'use strict';

  const baseElementStyles = ["stroke", "stroke-width"];

  function convertElementToObj(el) {
    const paths = Array.from(el.getElementsByTagName("path"));
    const texts = Array.from(el.getElementsByTagName("text"));
    const polygons = Array.from(el.getElementsByTagName("polygon"));
    const rects = Array.from(el.getElementsByTagName("rect"));
    const createMapper = (el) => ({
      element: el,
      baseStyles: baseElementStyles.reduce((memo, item) => {
        memo[item] = el.style?.getPropertyValue(item);

        return memo;
      }, {}),
    });

    return {
      element: el,
      children: {
        paths: paths.map((path) => createMapper(path)),
        texts: texts.map((text) => createMapper(text)),
        polygons: polygons.map((polygon) => createMapper(polygon)),
        rects: rects.map((rect) => createMapper(rect)),
      },
    };
  }

  function createObjectMaps(objects) {
    return objects.reduce(
      ({ containerMap, linksMap }, item) => {
        const id = item.id;

        if (id.startsWith("elem_")) {
          containerMap[id] = convertElementToObj(item);
        }

        if (id.startsWith("link_")) {
          linksMap[id] = convertElementToObj(item);
        }

        return { containerMap, linksMap };
      },
      {
        containerMap: {},
        linksMap: {},
      }
    );
  }

  function createContainerData(containersMap, linksMap) {
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

  function highlightContainer(containerData, containersMap, linksMap) {
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

  function unhighlightContainer(containerData, containersMap, linksMap) {
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

  function enrichSVG() {
    const elements = Array.prototype.slice.call(
      document.getElementsByTagName("g")
    );

    const { containerMap, linksMap } = createObjectMaps(elements);

    const containerData = createContainerData(containerMap, linksMap);

    let currentContainer = null;

    containerData.forEach((data) => {
      const { id } = data;
      const { element: container } = containerMap[id];

      container.addEventListener("click", () => {
        if (currentContainer !== null) {
          unhighlightContainer(currentContainer, containerMap, linksMap);
        }

        currentContainer = currentContainer === data ? null : data;

        if (currentContainer === null) {
          return;
        }

        highlightContainer(data, containerMap, linksMap);
      });
    });
  }

  enrichSVG();

  exports.enrichSVG = enrichSVG;

  return exports;

})({});
