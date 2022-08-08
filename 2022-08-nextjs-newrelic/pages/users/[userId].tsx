import { GetServerSideProps, NextPage } from "next";
import { useMemo } from "react";
import { getProfile, Profile } from "../../lib/query";

type ProfilePageProps = {
  profile: Profile;
};

const ProfilePage: NextPage<ProfilePageProps> = ({ profile }) => {
  const json = useMemo(() => JSON.stringify(profile, null, 2), [profile]);

  return (
    <main style={{ padding: "24px" }}>
      <p style={{ whiteSpace: "pre-wrap" }}>{json}</p>
    </main>
  );
};

export default ProfilePage;

export const getServerSideProps: GetServerSideProps<ProfilePageProps> = async ({
  query,
}) => {
  const { userId } = query;

  if (typeof userId !== "string") {
    return { notFound: true };
  }

  const profile = await getProfile(userId);

  if (!profile) {
    return { notFound: true };
  }

  return { props: { profile } };
};
