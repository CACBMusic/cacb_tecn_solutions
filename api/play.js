import crypto from "crypto";

export default function handler(req, res) {

  const SECRET = "CACB_ULTRA_SECRET";

  const { path } = req.query;

  if (!path) {
    return res.status(400).json({ error: "Missing path" });
  }

  const expires = Math.floor(Date.now() / 1000) + 120; // 2 minutos

  const data = `${path}:${expires}`;

  const token = crypto
    .createHmac("sha256", SECRET)
    .update(data)
    .digest("hex");

  const url = `https://cdn.cacbmusica.com${path}?token=${token}&expires=${expires}`;

  res.json({ url });
}