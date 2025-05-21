import { placeOrder , getPositions } from "./trade";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

server.tool("buy-stock","Buys the stock on zerodha exchange for the users. It executes a real order for the user on the exchange",
  { stock: z.string(), qty: z.number() },
  async ({ stock, qty }) => {
     placeOrder(stock, qty, "BUY");
      return {
        content: [{ type: "text", text: `Bought ${qty} shares of ${stock}` }],
      
    }
  }
)

server.tool("sell-stock","Sells the stock on zerodha exchange for the users. It executes a real order to sell the stock for the user on the exchange",
  { stock: z.string(), qty: z.number() },
  async ({ stock, qty }) => {
    placeOrder(stock, qty, "SELL");
      return {
        content: [{ type: "text", text: `Sell ${qty} shares of ${stock}` }],
    }
  }
)

server.tool("show-portfolio","Shows my complete portfolio in zerodha",
  { },
  async () => {
     const holdings = await getPositions();
      return {
        content: [{ type: "text", text: holdings }],
    }
  }
)

const transport = new StdioServerTransport();
await server.connect(transport);
