import { jest } from "@jest/globals";

import { highlightContainer } from "../highlight-container";

describe("highlightContainer", () => {
  it("should change style", () => {
    const rectSetProperty = jest.fn();
    const polygonSetProperty = jest.fn();
    const textSetProperty = jest.fn();
    const pathSetProperty = jest.fn();

    const containerData = {
      id: "test-container-id",
      innerLinks: ["test-inner-link-id"],
      outerLinks: ["test-outer-link-id"],
      birelLinks: ["test-birel-link-id"],
    };
    const containersMap = {
      "test-container-id": {
        element: {},
        children: {
          rects: [{ element: { style: { setProperty: rectSetProperty } } }],
        },
      },
    };
    const linksMap = {
      "test-inner-link-id": {
        element: {},
        children: {
          polygons: [
            { element: { style: { setProperty: polygonSetProperty } } },
          ],
          texts: [{ element: { style: { setProperty: textSetProperty } } }],
          paths: [{ element: { style: { setProperty: pathSetProperty } } }],
        },
      },
      "test-outer-link-id": {
        element: {},
        children: {
          polygons: [
            { element: { style: { setProperty: polygonSetProperty } } },
          ],
          texts: [{ element: { style: { setProperty: textSetProperty } } }],
          paths: [{ element: { style: { setProperty: pathSetProperty } } }],
        },
      },
      "test-birel-link-id": {
        element: {},
        children: {
          polygons: [
            { element: { style: { setProperty: polygonSetProperty } } },
          ],
          texts: [{ element: { style: { setProperty: textSetProperty } } }],
          paths: [{ element: { style: { setProperty: pathSetProperty } } }],
        },
      },
    };

    highlightContainer(containerData, containersMap, linksMap);

    expect(rectSetProperty).toHaveBeenCalledWith("stroke", "#00FF00");
    expect(rectSetProperty).toHaveBeenCalledWith("stroke-width", 2);

    expect(polygonSetProperty).toHaveBeenCalledWith("stroke", "#FF0000");
    expect(polygonSetProperty).toHaveBeenCalledWith("stroke", "#00FF00");
    expect(polygonSetProperty).toHaveBeenCalledWith("stroke", "#0000FF");

    expect(textSetProperty).toHaveBeenCalledWith("stroke", "#FF0000");
    expect(textSetProperty).toHaveBeenCalledWith("stroke", "#00FF00");
    expect(textSetProperty).toHaveBeenCalledWith("stroke", "#0000FF");

    expect(pathSetProperty).toHaveBeenCalledWith("stroke", "#FF0000");
    expect(pathSetProperty).toHaveBeenCalledWith("stroke", "#00FF00");
    expect(pathSetProperty).toHaveBeenCalledWith("stroke", "#0000FF");
  });
});
