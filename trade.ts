import { KiteConnect } from "kiteconnect";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY as string;
let accessToken = process.env.ACCESS_TOKEN as string;
// let requestToken = process.env.REQUEST_TOKEN as string;
// const apiSecret = process.env.API_SECRET as string;

const kc = new KiteConnect({ api_key: apiKey });
kc.setAccessToken(accessToken);

//console.log(kc.getLoginURL()); //login url to get the request token 

export async function placeOrder(tradingsymbol: string, quantity: number, type: "BUY" | "SELL") {
    // const response = await kc.generateSession(requestToken, apiSecret);
    // console.log(response.access_token);
    try {
        const profile = await kc.placeOrder("regular", {
          exchange: "NSE",
          tradingsymbol,
          quantity,
          transaction_type: type,
          product: "CNC",
          order_type: "MARKET",
        });
      } catch (err) {
        console.error(err);
      }
}

export async function getPortfolio(){
    const holdings = await kc.getHoldings();
    let allHoldings = ""
    holdings.map(holding=>{
        allHoldings+= `stock: ${holding.tradingsymbol}, quantity: ${holding.quantity}, price: ${holding.last_price}`
    })
    return allHoldings;
}


