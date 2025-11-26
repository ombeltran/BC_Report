import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET as string;

if (!SECRET_KEY) {
  throw new Error("JWT_SECRET is not defined");
}

export function generateToken(payload: object): string {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1d" });
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch {
    return null;
  }
}
