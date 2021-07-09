# Visualizing Order Books with Perspective

![GIF of ETHUSD Order Book Dashboard using Perspective](https://i.imgur.com/TKYRDh2.gif)

Using [Perspective](https://perspective.finos.org), we can create interactive
visualizations on a streaming order book, analyzing and dissecting it as new
orders come in and the state of the book changes to reflect the market.

We use [Gemini](https://docs.gemini.com/websocket-api/) for the order book data
(using their Sandbox), and create a datasource in Python that feeds data into
a `perspective-python` Tornado server. In the browser, we use `@finos/perspective-workspace`
to create a dynamic, user-configurable dashboard that allows us to analyse,
visualize, and transform the data in real-time.

Using a [Client-server replicated](https://perspective.finos.org/docs/md/server.html#clientserver-replicated) Perspective configuration, our dashboard performs and scales well across multiple clients, all of whom are
kept in sync with the server automatically.

### Dependencies

Install the JS and Python dependencies:

```bash
yarn
python3 -m pip install perspective-python websocket-client
```

### Build and Run

The server and client need to be run in separate processes:

```bash
yarn start
```

and in another terminal window:

```bash
yarn start:server
```
