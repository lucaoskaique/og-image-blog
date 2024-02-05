import { IncomingMessage } from "http";
import { ParsedRequest } from "./types";
import { URL } from "node:url";

export function parseRequest(req: IncomingMessage) {
  console.log("HTTP " + req.url);
  const { pathname } = new URL(req.url || "/");

  const arr = (pathname || "/").slice(1).split(".");
  let extension = "";
  let text = "";
  if (arr.length === 0) {
    text = "";
  } else if (arr.length === 1) {
    text = arr[0];
  } else {
    extension = arr.pop() as string;
    text = arr.join(".");
  }

  const parsedRequest: ParsedRequest = {
    fileType: extension === "jpeg" ? extension : "png",
    text: decodeURIComponent(text),
  };

  return parsedRequest;
}
