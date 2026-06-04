const JSONBIN_API_KEY = "$2a$10$akQgbAFg6h4iJ8gpZ.oa8OTRQi0ivBeMScU.UE2hcDQ2MWiKxDh6.";
const JSONBIN_BIN_ID  = "6a21ff8eda38895dfe8939b6";
const BASE = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;
const HEADERS = { "X-Master-Key": JSONBIN_API_KEY, "X-Bin-Meta": "false" };

exports.handler = async (event) => {
  try {
    if (event.httpMethod === "GET") {
      const r = await fetch(`${BASE}/latest`, { headers: HEADERS });
      const data = await r.json();
      return { statusCode: 200, headers: {"Access-Control-Allow-Origin":"*"}, body: JSON.stringify(data) };
    }
    if (event.httpMethod === "PUT") {
      const body = JSON.parse(event.body);
      const r = await fetch(BASE, {
        method: "PUT",
        headers: { ...HEADERS, "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      const data = await r.json();
      return { statusCode: 200, headers: {"Access-Control-Allow-Origin":"*"}, body: JSON.stringify(data) };
    }
    return { statusCode: 405, body: "Method not allowed" };
  } catch(e) {
    return { statusCode: 500, body: e.message };
  }
};
