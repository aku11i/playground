import { GetServerSideProps, NextPage } from "next";
import Script from "next/script";
import { useId, useMemo } from "react";
import { getProfile, Profile } from "../../lib/query";

type ProfilePageProps = {
  profile: Profile;
  browserTimingScript: string;
};

const ProfilePage: NextPage<ProfilePageProps> = ({
  profile,
  browserTimingScript,
}) => {
  const id = useId();

  const json = useMemo(() => JSON.stringify(profile, null, 2), [profile]);

  return (
    <main style={{ padding: "24px" }}>
      <Script id={id} strategy="afterInteractive">
        {browserTimingScript}
      </Script>

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

  const newrelic = await import("newrelic");
  const browserTimingScript = await newrelic.getBrowserTimingHeader({
    hasToRemoveScriptWrapper: true,
  });

  return { props: { profile, browserTimingScript } };
};
