import perspective from "@finos/perspective";
import "@finos/perspective-viewer-datagrid";
import "@finos/perspective-viewer-d3fc";
import "@finos/perspective-workspace";

import "./index.less";

const URL = "ws://localhost:8081/websocket";

const websocket = perspective.websocket(URL);
const worker = perspective.shared_worker();

/**
 * Returns a local Perspective table that mirrors the state of the table
 * on the server.
 *
 * @param {String} table_name 
 * @returns 
 */
const datasource = async function(table_name) {
    // Open the table on the server, and create a view on the server.
    const server_table = websocket.open_table(table_name);
    const server_view = await server_table.view();

    // Create a table in the browser which mirrors the table on the server.
    const limit = await server_table.get_limit();
    const config = {}

    if (limit) config.limit = limit;

    // By passing the view into `worker.table`, Perspective automatically
    // sets up the callbacks to pipe new updates on the server to the client.
    // Thus, the two tables are always kept in sync.
    const table = await worker.table(server_view, config);

    // Clears the progress bar and overlay - added for user experience.
    const progress_bar = document.getElementById("progress");
    if (progress_bar) progress_bar.remove();

    return table;
};

/**
 * Load our tables, and load the workspace configuration from localStorage.
 */
window.addEventListener("load", async () => {
    const order_book = await datasource("order_book");

    // Register the client-side table we just created.
    window.workspace.tables.set("order_book", order_book);

    window.workspace.addEventListener("workspace-layout-update", async function() {
        localStorage.setItem("layout", JSON.stringify(await window.workspace.save()))
    });

    window.workspace.restore(JSON.parse(localStorage.getItem("layout")));
});
