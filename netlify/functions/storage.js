const JSONBIN_API_KEY = "$2a$10$XXsJUgI7fVNUwMa9M6uo0OY8RNjRPjbA.jbuVd6Y0Dom850V3Un4a";
const JSONBIN_BIN_ID  = "6a21ff8eda38895dfe8939b6";
const BASE = `https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`;
const HEADERS = { "X-Master-Key": JSONBIN_API_KEY, "X-Bin-Meta": "false" };

exports.handler = async (event) => {
  const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "Content-Type" };

  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: cors, body: "" };
  }

  try {
    if (event.httpMethod === "GET") {
      const r = await fetch(`${BASE}/latest`, { headers: HEADERS });
      const text = await r.text();
      console.log("GET response:", r.status, text.substring(0, 200));
      if (!r.ok) return { statusCode: r.status, headers: cors, body: text };
      const data = JSON.parse(text);
      return { statusCode: 200, headers: { ...cors, "Content-Type": "application/json" }, body: JSON.stringify(data) };
    }

    if (event.httpMethod === "PUT") {
      const body = event.body;
      console.log("PUT body length:", body?.length, "preview:", body?.substring(0, 100));
      const r = await fetch(BASE, {
        method: "PUT",
        headers: { ...HEADERS, "Content-Type": "application/json" },
        body: body
      });
      const text = await r.text();
      console.log("PUT response:", r.status, text.substring(0, 200));
      if (!r.ok) return { statusCode: r.status, headers: cors, body: text };
      return { statusCode: 200, headers: { ...cors, "Content-Type": "application/json" }, body: text };
    }

    return { statusCode: 405, headers: cors, body: "Method not allowed" };
  } catch(e) {
    console.error("Function error:", e);
    return { statusCode: 500, headers: cors, body: e.message };
  }
};
