'use client';
import MenuBar from "@/components/MenuBar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";

type UserProps = {
    user: string | null;
    error: Error | null;
};

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const [success, setSuccess] = useState<boolean>(false);
    const router = useRouter()

    useEffect(() => {
        (async () => {
            // const { user, error } = await getUser();
            const { error } = await getUser();

            if (error) {
                router.push('/');
                return
            }

            //If teh error did not occur, set success to true
            setSuccess(true);
        })();
    }, [router])

    if (!success) {
        return <Loading />;
    }
    return (
        <section>
            <MenuBar />
            <div>{children}</div>
        </section>
    );
}

async function getUser(): Promise<UserProps> {
    try {
        const res = await fetch("/api/auth/login", {
            method: "GET",
            credentials: "include",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch user");
        }
        const data = await res.json();

        return {
            user: data,
            error: null,
        }
    } catch (error) {
        return {
            user: null,
            error: error as Error,
        }
    }
}