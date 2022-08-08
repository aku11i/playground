import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Script from "next/script";
import { useId } from "react";
import { getUsers, Profile } from "../../lib/query";

type UsersPageProps = {
  users: Profile[];
  browserTimingScript: string;
};

const UsersPage: NextPage<UsersPageProps> = ({
  users,
  browserTimingScript,
}) => {
  const id = useId();

  return (
    <main style={{ padding: "24px" }}>
      <Script id={id} strategy="afterInteractive">
        {browserTimingScript}
      </Script>

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

  const newrelic = await import("newrelic");
  const browserTimingScript = await newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
  });

  return { props: { users, browserTimingScript } };
};
