import { KiteConnect } from "kiteconnect";
import dotenv from "dotenv";
dotenv.config();

const apiKey = process.env.API_KEY as string;
let accessToken = process.env.ACCESS_TOKEN as string;

const kc = new KiteConnect({ api_key: apiKey });

console.log(kc.getLoginURL()); //login url to get the request token 

async function init() {
    kc.setAccessToken(accessToken);
    try {
        const profile = await kc.placeOrder("regular", {
          exchange: "NSE",
          tradingsymbol: "HDFCBANK",
          quantity: 1,
          price: 100,
          transaction_type: "BUY",
          product: "CNC",
          order_type: "MARKET",
        });
      } catch (err) {
        console.error(err);
      }
}

// async function generateSession() {
//   try {
//     const response = await kc.generateSession(requestToken, apiSecret);
//     console.log(response.access_token);

//     kc.setAccessToken(response.access_token);
//     console.log("Session generated:", response);
//   } catch (err) {
//     console.error("Error generating session:", err);
//   }
// }


// Initialize the API calls
init();