import { NextMiddleware, NextResponse } from "next/server";
import { sleep } from "./lib/sleep";

export const middleware: NextMiddleware = async () => {
  await sleep(500);

  return NextResponse.next();
};
