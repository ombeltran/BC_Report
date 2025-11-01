import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma"; // Ajusta la ruta según tu proyecto
import { parse } from "json2csv";

export async function GET() {
  try {
    // 1️⃣ Obtén todos los registros de la tabla Production
    const productionData = await prisma.production.findMany();

    // 2️⃣ Convierte los datos a CSV
    const csv = parse(productionData);

    // 3️⃣ Devuelve el CSV como descarga
    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": 'attachment; filename="production_data.csv"',
      },
    });
  } catch (error) {
    console.error("❌ Error exportando CSV:", error);
    return NextResponse.json({ error: "Error exportando CSV" }, { status: 500 });
  }
}
