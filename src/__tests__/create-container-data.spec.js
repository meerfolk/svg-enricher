import { createContainerData } from "../create-container-data.js";

describe("createContainerData", () => {
  it("should create empty container data", () => {
    const result = createContainerData({}, {});

    expect(result).toEqual([]);
  });

  it("should create container data", () => {
    const containersMap = { elem_test_container: { children: {} } };
    const linksMap = {
      link_test_container_some_container: { children: { polygons: [] } },
      link_some_container_test_container: { children: { polygons: [] } },
      link_else_container_test_container: { children: { polygons: [{}, {}] } },
    };

    const containerData = createContainerData(containersMap, linksMap);

    expect(containerData).toEqual([
      {
        id: "elem_test_container",
        innerLinks: ["link_some_container_test_container"],
        outerLinks: ["link_test_container_some_container"],
        birelLinks: ["link_else_container_test_container"],
      },
    ]);
  });
});
