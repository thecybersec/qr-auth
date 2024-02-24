// pages/api/generate-session.js

// Function to generate a random string
const generateRandomString = (length) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Function to generate a session ID
const generateSessionId = () => {
  const timestamp = Date.now().toString(36); // Convert timestamp to base36 string
  const randomString = generateRandomString(6); // Generate a random string
  return `${timestamp}-${randomString}`;
};

export default async (req, res) => {
  // Generate and return a unique session ID or token
  const sessionId = generateSessionId();
  res.status(200).json({ sessionId });
};
