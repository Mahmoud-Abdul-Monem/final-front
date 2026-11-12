import { NextRequest, NextResponse } from "next/server";
import { getProductPageByCategories, getProductPageData } from "@/services/products";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const page = Number(params.get("page") || 1);
  const categoryIds = (params.get("category") || "")
    .split(",")
    .filter(Boolean);

  if (!Number.isInteger(page) || page < 1) {
    return NextResponse.json({ error: "Invalid page" }, { status: 400 });
  }

  if (categoryIds.some((id) => !/^\d+$/.test(id))) {
    return NextResponse.json({ error: "Invalid category" }, { status: 400 });
  }

  const result = categoryIds.length
    ? await getProductPageByCategories(categoryIds, page)
    : await getProductPageData(page);

  return NextResponse.json(result);
}
