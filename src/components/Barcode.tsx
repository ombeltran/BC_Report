'use client';
import { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";

import React from 'react'

export default function Barcode({ value }: { value: string }) {
    const svgRef = useRef<SVGSVGElement  | null>(null);

    useEffect(() => {
        if (svgRef.current) {
            JsBarcode(svgRef.current, value, {
                format: "CODE128",
                width: 2,
                height: 60,
                displayValue: true,
            })
        }
    }
        , [value])

    return <svg ref={svgRef}></svg>
    
}
