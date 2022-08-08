import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import { getUsers, Profile } from "../../lib/query";

type UsersPageProps = {
  users: Profile[];
};

const UsersPage: NextPage<UsersPageProps> = ({ users }) => {
  return (
    <main style={{ padding: "24px" }}>
      <ul style={{ display: "flex", gap: "16px", flexDirection: "column" }}>
        {users.map((profile) => (
          <li key={profile.userId}>
            <Link href={`/users/${profile.userId}`}>{profile.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default UsersPage;

export const getServerSideProps: GetServerSideProps<
  UsersPageProps
> = async () => {
  const users = await getUsers();

  return { props: { users } };
};
