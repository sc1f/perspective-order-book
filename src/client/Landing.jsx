import React, { useRef, useEffect } from "react";

import perspective from "@finos/perspective";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";
import "@finos/perspective-workspace";

const worker = perspective.shared_worker();
const url = "ws://localhost:8081/websocket";
const websocket = perspective.websocket(url);

function Landing() {
  const perspectiveViewerRef = useRef();

  useEffect(() => {
    (async () => {
      const config = {};
      const serverTable = await websocket.open_table("order_book");
      const serverView = await serverTable.view();
      const limit = await serverTable.get_limit();

      if (limit) {
        config.limit = limit;
      }

      const table = await worker.table(serverView, config);
      await perspectiveViewerRef.current.load(table);
    })();
  }, []);

  return (
    <div>
      <perspective-viewer ref={perspectiveViewerRef} />
    </div>
  );
}

export { Landing };
