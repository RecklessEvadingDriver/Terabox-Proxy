import axios from "axios";

const API_URL = "https://api.iteraplay.com";
const HEADERS = {
  "Accept": "application/json, text/plain, */*",
  "Accept-Language": "en-US,en;q=0.9",
  "Cache-Control": "no-cache",
  "Connection": "keep-alive",
  "Content-Type": "application/json",
  "Origin": "https://www.teraboxdownloader.pro",
  "Referer": "https://www.teraboxdownloader.pro/",
  "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  "X-API-Key": "terabox_pro_api_2025_premium",
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { link } = req.body;
  if (!link) {
    res.status(400).json({ error: "No link provided" });
    return;
  }

  try {
    const response = await axios.post(API_URL, { link }, { headers: HEADERS });
    res.status(response.status).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({
      error: error.message,
      details: error.response?.data || null
    });
  }
}
