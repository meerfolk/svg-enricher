import { jest } from "@jest/globals";

import { unhighlightContainer } from "../unhighlight-container";

describe("unhighlightContainer", () => {
  it("should rollback style", () => {
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
          rects: [
            {
              element: { style: { setProperty: rectSetProperty } },
              baseStyles: { stroke: "base-rect-stroke" },
            },
          ],
        },
      },
    };
    const linksMap = {
      "test-inner-link-id": {
        element: {},
        children: {
          polygons: [
            {
              element: { style: { setProperty: polygonSetProperty } },
              baseStyles: { stroke: "base-inner-polygon-stroke" },
            },
          ],
          texts: [
            {
              element: { style: { setProperty: textSetProperty } },
              baseStyles: { stroke: "base-inner-text-stroke" },
            },
          ],
          paths: [
            {
              element: { style: { setProperty: pathSetProperty } },
              baseStyles: { stroke: "base-inner-path-stroke" },
            },
          ],
        },
      },
      "test-outer-link-id": {
        element: {},
        children: {
          polygons: [
            {
              element: { style: { setProperty: polygonSetProperty } },
              baseStyles: { stroke: "base-outer-polygon-stroke" },
            },
          ],
          texts: [
            {
              element: { style: { setProperty: textSetProperty } },
              baseStyles: { stroke: "base-outer-text-stroke" },
            },
          ],
          paths: [
            {
              element: { style: { setProperty: pathSetProperty } },
              baseStyles: { stroke: "base-outer-path-stroke" },
            },
          ],
        },
      },
      "test-birel-link-id": {
        element: {},
        children: {
          polygons: [
            {
              element: { style: { setProperty: polygonSetProperty } },
              baseStyles: { stroke: "base-birel-polygon-stroke" },
            },
          ],
          texts: [
            {
              element: { style: { setProperty: textSetProperty } },
              baseStyles: { stroke: "base-birel-text-stroke" },
            },
          ],
          paths: [
            {
              element: { style: { setProperty: pathSetProperty } },
              baseStyles: { stroke: "base-birel-path-stroke" },
            },
          ],
        },
      },
    };

    unhighlightContainer(containerData, containersMap, linksMap);

    expect(rectSetProperty).toHaveBeenCalledWith("stroke", "base-rect-stroke");

    expect(polygonSetProperty).toHaveBeenCalledWith(
      "stroke",
      "base-inner-polygon-stroke"
    );
    expect(polygonSetProperty).toHaveBeenCalledWith(
      "stroke",
      "base-outer-polygon-stroke"
    );
    expect(polygonSetProperty).toHaveBeenCalledWith(
      "stroke",
      "base-birel-polygon-stroke"
    );

    expect(textSetProperty).toHaveBeenCalledWith(
      "stroke",
      "base-inner-text-stroke"
    );
    expect(textSetProperty).toHaveBeenCalledWith(
      "stroke",
      "base-outer-text-stroke"
    );
    expect(textSetProperty).toHaveBeenCalledWith(
      "stroke",
      "base-birel-text-stroke"
    );

    expect(pathSetProperty).toHaveBeenCalledWith(
      "stroke",
      "base-inner-path-stroke"
    );
    expect(pathSetProperty).toHaveBeenCalledWith(
      "stroke",
      "base-outer-path-stroke"
    );
    expect(pathSetProperty).toHaveBeenCalledWith(
      "stroke",
      "base-birel-path-stroke"
    );
  });
});
