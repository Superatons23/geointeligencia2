import { getAuth, signOut } from "firebase/auth";
const Dashboard = () => {
  const auth = getAuth();
  const handle=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }
  return (<>
  <h1>DASHBOARD</h1>
  <button onClick={()=>handle()}>sign out</button>
  </>);
};

export default Dashboard;
