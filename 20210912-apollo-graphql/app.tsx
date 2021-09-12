import { VoidFunctionComponent } from "react";
import {
  useAddUserMutation,
  useGetUserLazyQuery,
  useGetUsersQuery,
} from "./generated/client";
import * as faker from "faker";

export const App: VoidFunctionComponent = () => {
  const {
    loading: loadingUsers,
    data: dataUsers,
    refetch: refetchUsers,
  } = useGetUsersQuery();

  const [loadUser, { loading: loadingUser, data: dataUser }] =
    useGetUserLazyQuery();

  const [addUser] = useAddUserMutation();

  const handleAdd = () => {
    const name = faker.name.firstName();
    const age = faker.datatype.number({ min: 0, max: 100 });
    const gender = faker.name.gender();

    addUser({
      variables: {
        input: { name, age, gender },
      },
    }).then(() => {
      refetchUsers();
    });
  };

  return (
    <>
      <header>
        <h2>Users</h2>
      </header>
      <main>
        {loadingUsers ? (
          <p>loading users...</p>
        ) : (
          <ul>
            {dataUsers?.users.map((_) => (
              <li>
                <button onClick={() => loadUser({ variables: { id: _.id } })}>
                  ?
                </button>{" "}
                {_.name} ({_.id})
              </li>
            ))}
          </ul>
        )}

        <h2>Detail</h2>

        {loadingUser ? (
          <p>loading user...</p>
        ) : (
          dataUser?.user && (
            <p>
              <ul>
                <li>id: {dataUser.user.id}</li>
                <li>name: {dataUser.user.name}</li>
                <li>age: {dataUser.user.age}</li>
                <li>gender: {dataUser.user.gender}</li>
              </ul>
            </p>
          )
        )}

        <h2>Add user</h2>

        <button onClick={handleAdd}>ADD</button>
      </main>
    </>
  );
};
