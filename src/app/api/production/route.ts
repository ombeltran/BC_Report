import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma"


export async function GET() {
    const productionRecord = await prisma.production.findMany()
    // console.log(productionRecord);

    return NextResponse.json(productionRecord)
}

export async function POST(request: Request) {

    const { brand, model, seria_N, category, note, complete, userId } = await request.json()
    const newProdRecord = await prisma.production.create({
        data: {
            brand,
            model,
            seria_N,
            category,
            note,
            complete,
            userId
        }
    })
return NextResponse.json(newProdRecord)
}