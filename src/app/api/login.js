// pages/api/login.js
export default function handler(req, res) {
  const { sessionId, token } = req.body;

  // Retrieve expected token from session
  const expectedToken = userSessions[sessionId];

  if (token === expectedToken) {
    // Token is valid, proceed with login
    res.status(200).json({ success: true });
  } else {
    // Token is invalid, reject login
    res.status(401).json({ success: false });
  }
}
