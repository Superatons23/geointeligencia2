import { getAuth, signOut } from "firebase/auth";
const Twitter = () => {
  const auth = getAuth();
  const handle = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <>
      <h1>Twitter</h1>
      <button onClick={() => handle()}>sign out</button>
    </>
  );
};

export default Twitter;
