import { createObjectMaps } from "../create-object-maps.js";

describe("createObjectMaps", () => {
  it("should create empty maps", () => {
    const { containerMap, linksMap } = createObjectMaps([]);

    expect(Object.keys(containerMap)).toHaveLength(0);
    expect(Object.keys(linksMap)).toHaveLength(0);
  });

  it("should create maps", () => {
    const getElementsByTagName = (tag) => [
      {
        id: `${tag}-test`,
        style: {
          getPropertyValue: (style) => `${tag}-${style}-test`,
        },
      },
    ];
    const container = {
      id: "elem_test",
      getElementsByTagName,
    };
    const link = { id: "link_test", getElementsByTagName };
    const elements = [container, { id: "additional" }, link];

    const { containerMap, linksMap } = createObjectMaps(elements);

    const children = {
      paths: [
        {
          element: {
            id: "path-test",
          },
          baseStyles: {
            stroke: "path-stroke-test",
            "stroke-width": "path-stroke-width-test",
          },
        },
      ],
      texts: [
        {
          element: {
            id: "text-test",
          },
          baseStyles: {
            stroke: "text-stroke-test",
            "stroke-width": "text-stroke-width-test",
          },
        },
      ],
      polygons: [
        {
          element: {
            id: "polygon-test",
          },
          baseStyles: {
            stroke: "polygon-stroke-test",
            "stroke-width": "polygon-stroke-width-test",
          },
        },
      ],
      rects: [
        {
          element: {
            id: "rect-test",
          },
          baseStyles: {
            stroke: "rect-stroke-test",
            "stroke-width": "rect-stroke-width-test",
          },
        },
      ],
    };
    expect(Object.keys(containerMap)).toHaveLength(1);
    expect(containerMap[container.id].element).toBe(container);
    expect(containerMap[container.id].children).toMatchObject(children);

    expect(Object.keys(linksMap)).toHaveLength(1);
    expect(linksMap[link.id].element).toBe(link);
    expect(linksMap[link.id].children).toMatchObject(children);
  });
});
