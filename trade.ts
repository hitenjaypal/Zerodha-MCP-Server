import { KiteConnect } from "kiteconnect";

const apiKey = "your_api_key";
let accessToken = "your_accessToken";

const kc = new KiteConnect({ api_key: apiKey });
kc.setAccessToken(accessToken);

export async function placeOrder(tradingsymbol: string, quantity: number, type: "BUY" | "SELL") {
  try {
    kc.setAccessToken(accessToken);
    const profile = await kc.placeOrder("regular",{
      exchange: "BSE",
      tradingsymbol,
      transaction_type: type,
      quantity,
      product: "CNC",
      order_type: "MARKET"
    });
  } catch (err) {
    console.error(err);
  }
}

export async function getPositions() {
    const holdings = await kc.getPositions();

    let allHoldings = "";
    holdings.net.map((holding) => {
        allHoldings += `stock: ${holding.tradingsymbol} , qty: ${holding.quantity} , currentPrice:${holding.last_price}`;
    })
    return allHoldings;
}
