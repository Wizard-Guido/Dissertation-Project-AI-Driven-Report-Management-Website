import React, {useState, useEffect} from 'react'
import {Route, Routes, useLocation} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import DashBoard from './pages/Home/DashBoard'
import Upload from './pages/Home/Upload'
import Profile from './pages/Home/Profile'
import Management from './pages/Home/Management'
import Edit from './pages/Home/Management/Edit'
import axios from 'axios'
import './App.css'
import PublicView from './pages/Home/PublicView'
import SignUp from './pages/SignUp'
import Recommendation from './pages/Home/Recommend'

export default function App() {
  const [userId, setUser] = useState(null);
  const [isAuth, setAuth] = useState(false);

  const location = useLocation();
  
  // detect if router location is changed and if it is, send request again and check the authentication
  useEffect(() => {
                  const token = sessionStorage.getItem('token');
                  if (token) {
                    axios.get('/api1/models', {headers:{"Authorization": "Bearer " + token}})
                        .then(res => {
                          keepStatus();
                        })
                        .catch(e => {
                          if (e.response && e.response.status === 401) {
                            setAuth(false);
                            setUser(null);
                            sessionStorage.clear();
                          }
                        });
                  }
                  }, [location]
            )
  
  // set token in state
  const setupToken = (token) => {
    sessionStorage.setItem('token', token);
    const userId = JSON.parse(window.atob(token.split('.')[1]))['user_id'];
    console.log('userId', userId)
    setUser(userId);
    setAuth(true);
    console.log('setAuth')
    console.log('setUser')
  };

  // keep authenticated status
  const keepStatus = () => {
    const token = sessionStorage.getItem('token');
    const userId = JSON.parse(window.atob(token.split('.')[1]))['user_id'];
    setUser(userId);
    setAuth(true);
  }

  // clear token in state
  const clearupToken = () => {
    console.log('clearupToken')
    sessionStorage.clear();
    setAuth(false);
    setUser(null);
  }

  console.log('isAuth', isAuth)
  if (!isAuth) {
    return (
      <div className="bigcontainer">
        <Routes>
          <Route path="/register" element={<SignUp />} />
          <Route path="*" element={<Login setupToken={setupToken} />} />
        </Routes>
      </div>
    ) 
  }

  return (
      <Routes>
        <Route path="/" element={<Home clearupToken={clearupToken} userId={userId} />}>
          
          <Route path='' element={<DashBoard  clearupToken={clearupToken} userId={userId} />} />
          <Route path='recommendation' element={<Recommendation clearupToken={clearupToken} userId={userId} />} />
          <Route path='upload' element={<Upload clearupToken={clearupToken} userId={userId} />} />
          <Route path='profile' element={<Profile clearupToken={clearupToken} userId={userId} />} />
          <Route path='view/:id' element={<PublicView clearupToken={clearupToken} userId={userId} />} />
          <Route path='management' element={<Management clearupToken={clearupToken} userId={userId} />} />
          <Route path='management/edit/:id' element={<Edit clearupToken={clearupToken} userId={userId} />} />
        </Route>
      </Routes>
  )
}























// import React, { Component } from 'react'
// import {Route, Routes} from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import DashBoard from './pages/Home/DashBoard'
// import Upload from './pages/Home/Upload'
// import Profile from './pages/Home/Profile'
// import Management from './pages/Home/Management'
// import './App.css'

// export default class App extends Component {
//   state = {
//     token: null,
//   }

//   setToken = (token) => {
//     sessionStorage.setItem('token', JSON.stringify(token));
//     this.setState({token});
//   }

//   getToken = () => {
//     const tokenString = sessionStorage.getItem('token');
//     const token = JSON.parse(tokenString);
//     return token;
//   }

//   render() {
//     const token = this.getToken();

    
//     if (!token) {
//       return (
//         <div className="bigcontainer">
//           <Login setToken={this.setToken} />
//         </div>
//       ) 
//     }


//     return (
//       <Routes>
//         <Route path="/" element={<Home />}>
//           <Route path='' element={<DashBoard />} />
//           <Route path='upload' element={<Upload />} />
//           <Route path='profile' element={<Profile />} />
//           <Route path='management' element={<Management />} />
//         </Route>
//       </Routes>
//     )
//   }
// }





