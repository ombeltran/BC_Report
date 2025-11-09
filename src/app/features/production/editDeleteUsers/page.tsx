import EditDeleteUsers from "@/app/features/production/editDeleteUsers/EditDeleteUsers";

async function getUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/auth/register`, {
    cache: "no-cache", 
  });

  if (!res.ok) throw new Error("Failed fetching users");

  return res.json();
}

export default async function Page() {
  const users = await getUsers();

  return <EditDeleteUsers users={users} />
}
