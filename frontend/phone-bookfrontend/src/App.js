import {useState, useEffect} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import "./App.css";
import AddUser from "./AddUser";

function App() {
  return (
    <div className="App">
      <AddUser />
    </div>
  );
}

// export default App;

// function App() {

//   const [users, setUser] = useState([])
//   useEffect (() => {
//     setUser([
//       {
//         First_Name:'John',
//         Last_Name: 'Doe',
//         // starring: 'Damian Lewis, Paul Giamatt',
//       },
//       {
//         First_Name:'Jane',
//         Last_Name: 'Doe',
//         // starring: 'Leleti Khumalo',
//       },
    
//     ])
//   }, [])
//   return (
//     <div className="App">
//       {/* const {users} = users */}
//       {users.map((user, index) => {
//         return(
//           <div className="users">
//             <h2>{user.First_Name}</h2>
//             <h3>{user.Last_Name}</h3>
//             {/* <h4>{movie.starring}</h4> */}
//           </div>
//         )
//       }
//       )}
//     </div>
//   );  
//     }
export default App;