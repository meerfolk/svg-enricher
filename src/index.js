import { createObjectMaps } from "./create-object-maps.js";
import { createContainerData } from "./create-container-data.js";
import { highlightContainer } from "./highlight-container.js";
import { unhighlightContainer } from "./unhighlight-container.js";

export function enrichSVG() {
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
