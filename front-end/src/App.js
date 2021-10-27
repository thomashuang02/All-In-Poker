import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { useState } from 'react';
import './App.css';
import Home from './Home';
import Header from './Header';
import Login from './Login'
import Tablelist from './TableList/Tablelist';
import Tablecreate from './TableList/Tablecreate';
import Game from './Game'
import UserPage from './UserPage';
const axios = require('axios');

let isLoggedIn = false; //determines whether user profile button should say "Sign In" or "Profile"
//^ make this use state instead

const App = (props) => {

  /* generic helper function to fetch data */
  /* 
    api: path of data
    setState: function to modify relevant state variable 
  */
  const fetchData = async (api, setState) => {
    const mockarooURL = "https://my.api.mockaroo.com/";
    const mockarooAPIKey = '428573d0';
    try {
        const fetched = await axios.get(`${mockarooURL}${api}?key=${mockarooAPIKey}`)
        setState(fetched);
    } catch (err) {
        console.log(err);
    }
  }

  /* fetching mock user data */
  const mockUserInfoAPI = "userInfo.json";
  const [userInfo, setUserInfo] = useState([{
      username: 'Guest',
      avatar: './profileicon.png',
      joined_since: 'N/A',
      games_played: 0,
      games_won: 0
  }]);
  useEffect(() => {
    fetchData(mockUserInfoAPI, setUserInfo);
  }, [userInfo]);
  /* end fetching mock user data */

  /* fetching mock friend list data */
  /* each friend object follow this schema: 
  {
      name: String,
      avatar: Image (png),
      status: random choice from [Playing, Online, Away, Offline]
      id: GUID
  }*/
  const mockFriendListAPI = "friendList.json";
  const [friendList, modifyFriendList] = useState([]);
  useEffect(() => {
    fetchData(mockFriendListAPI, modifyFriendList);
  }, [friendList]);
  /* end fetching mock friend list data */

  /* fetching mock all users list data */
  /* objects identical in structure to friends */
  const mockAllUsersListAPI = "allUsersList.json";
  const [allUsersList, modifyallUsersList] = useState([]);
  useEffect(() => {
    fetchData(mockAllUsersListAPI, modifyallUsersList);
  }, [allUsersList]);
  /* end fetching mock all users list data */

  //determines whether or not user profile button should be rendered in header
  const [showUserProfileButton, toggleShowUserProfileButton] = useState(true);
  const updateUserProfileButton = (boolean) => {
    if(boolean !== showUserProfileButton) {
      toggleShowUserProfileButton(boolean);
    }
  }

  return (
    <div className="App">
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <Router>
        <Header showUserProfileButton={showUserProfileButton} isLoggedIn={isLoggedIn}/>
        <Switch>
          {/*home page*/}
          <Route exact path="/">
            <Home title="Home | All In Poker" updateUserProfileButton={updateUserProfileButton}/>
          </Route>

          {/*log in page*/}
          <Route path="/login">
            <Login title="User Profile | All In Poker" updateUserProfileButton={updateUserProfileButton}/>
          </Route>

          {/*user profile page*/}
          <Route exact path="/user">
            <UserPage title="Login | All In Poker" updateUserProfileButton={updateUserProfileButton}
              userInfo={userInfo} friendList={friendList} allUsersList={allUsersList}
            />
          </Route>

          {/*join table page*/}
          <Route exact path="/tablelist">
            <Tablelist title="Join Table | All In Poker" updateUserProfileButton={updateUserProfileButton}
              fetchData={fetchData}
            />
          </Route>

          {/*create table page*/}
          <Route exact path="/tablecreate">
            <Tablecreate title="Create Table | All In Poker" updateUserProfileButton={updateUserProfileButton}
              friendList={friendList}
            />
          </Route>

          {/*game page*/}
          <Route path="/game">
            <Game title="Game | All In Poker" updateUserProfileButton={updateUserProfileButton}/>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
