import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { placeOrder } from "./trade";

// Create an MCP server
const server = new McpServer({
  name: "Demo",
  version: "1.0.0"
});

// Add an addition tool
server.tool("add",
  { a: z.number(), b: z.number() },
  async ({ a, b }) => ({
    content: [{ type: "text", text: String(a + b) }]
  })
);

// Factorial Tool
server.tool("factorial",
    { a: z.number() },
    async ({ a}) => {
        let ans=1;
        for(let i=2;i<=a;i++){
            ans*=i;
        }
        return{
        content: [{ type: "text", text: String(ans) }]
    }
}
);

server.tool("buy-stock", "the stock has been bouhjy for the user on the zerodha platform",
    { tradingsymbol: z.string(), quantity: z.number() },
    async ({ tradingsymbol, quantity }) => {
        await placeOrder(tradingsymbol, quantity, "BUY");
        return{
            content: [{ type: "text", text: "Buy Order Placed successfully" }]
        }
    }
);

server.tool("sell-stock", "the stock has been sold for the user on the zerodha platform",
    { tradingsymbol: z.string(), quantity: z.number() },
    async ({ tradingsymbol, quantity }) => {
        await placeOrder(tradingsymbol, quantity,  "SELL");
        return{
            content: [{ type: "text", text: "Sell Order Placed successfully" }]
        }
    }
);

const transport = new StdioServerTransport();
await server.connect(transport);

