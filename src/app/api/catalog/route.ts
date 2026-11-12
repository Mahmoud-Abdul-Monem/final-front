import { NextRequest, NextResponse } from "next/server";
import { getProductPageByCategory, getProductPageData } from "@/services/products";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = Number(params.get("page") || 1);
  const categoryId = params.get("category");

  if (!Number.isInteger(page) || page < 1) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }

  const result = categoryId
    ? await getProductPageByCategory(categoryId, page, 25)
    : await getProductPageData(page, 25);

  return NextResponse.json(result);
}
