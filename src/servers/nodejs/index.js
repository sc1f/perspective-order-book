const WebSocket = require("ws");
const perspective = require("@finos/perspective");
const schema = require("./schema");
const { WebSocketServer, table } = perspective;
const perspectiveHost = new WebSocketServer({ port: 8080 });

perspective.initialize_profile_thread();

(async (schema, symbol) => {
  const viewTable = await table(schema);
  const URL = `wss://api.sandbox.gemini.com/v1/marketdata/${symbol}?bids=true&offers=true&trades=false`;
  const wsFeed = new WebSocket(URL);

  wsFeed.on("open", async () => {
    console.log(`${"*".repeat(12)} Websocket Feed Connection Open ${"*".repeat(12)} `);
  });

  wsFeed.on("message", async (data) => {
    console.log(`${"*".repeat(12)} Data Feed ${"*".repeat(12)}`);
    const feedData = JSON.parse(data.toString());
    const { events } = feedData;
    const tableData = events
      .map(data => (
        {
          ...data,
          symbol,
          timestamp: new Date()
        })
      );

    await viewTable.update(tableData);
  });

  return viewTable;
})(schema, "ethusd")
  .then(
    (table) => perspectiveHost.host_table("order_book", table)
  );
