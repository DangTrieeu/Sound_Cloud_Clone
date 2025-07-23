import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, response: NextResponse) {
    const url = new URL(request.url);
    const search = new URLSearchParams(url.search);
    const fileName = search.get("audio")
    //console.log(">>file name: ", fileName);

    return await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/${fileName}`)
}