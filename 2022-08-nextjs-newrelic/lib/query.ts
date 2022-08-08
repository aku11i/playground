import { faker } from "@faker-js/faker";
import { sleep } from "./sleep";

export type Profile = {
  userId: string;
  name: string;
};

const users: Profile[] = Array(10)
  .fill(null)
  .map((_, i) => ({
    userId: String(i + 1),
    name: [faker.name.firstName(), faker.name.lastName()].join(" "),
  }));

export const getUsers = async (): Promise<Profile[]> => {
  await makeRandomLatency();

  return users;
};

export const getProfile = async (
  userId: string
): Promise<Profile | undefined> => {
  await makeRandomLatency();

  return users.find((_) => _.userId === userId);
};

function makeRandomLatency(max = 2000): Promise<void> {
  const latency = 10 + Math.floor(Math.random() * max);
  return sleep(latency);
}
