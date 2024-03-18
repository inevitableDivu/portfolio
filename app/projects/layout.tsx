import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Projects",
};

function layout({ children }: React.PropsWithChildren) {
    return <>{children}</>;
}

export default layout;
