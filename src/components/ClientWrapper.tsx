"use client";

import React from "react";

export default function ClientWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}
