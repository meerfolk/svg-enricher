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

export function createObjectMaps(objects) {
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
