import MenuBar from "@/components/MenuBar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
            <section>
                <MenuBar />
                <div>{children}</div>
            </section>
    );
}