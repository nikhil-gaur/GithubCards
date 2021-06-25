import React, {useState, useEffect} from 'react';
import './App.css';
import db from "./firebase";
import Card from './Card.js';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
toast.configure()


function App() {

  const [users, setUsers] = useState([]);
  const [input, setInput] = useState("");
  const [selectedOption, setSelectedOption] = useState("name");
  const [order, setOrder] = useState("asc")

  useEffect(() => {

    console.log(selectedOption);
    // if(selectedOption == "followers"){
    //   setOrder("desc");
    // }
    console.log(order);
        
    db.collection("users")
    .orderBy(selectedOption, order)
    .onSnapshot( 
        (snapshot) => setUsers(snapshot.docs.map( (doc) => ({ id:doc.id, data:doc.data() }) ))
    );

  }, [selectedOption]);

  const fetchCards = async(e) => {
    
    e.preventDefault();
    const res = await fetch(`https://api.github.com/users/${input}`)
    const data = await res.json()
    console.log(data);

    if(data.message){
      toast.error('User not found for given Login !!', {position: toast.POSITION.BOTTOM_LEFT, autoClose:4000})
      }else{
      db.collection("users").add(

        {
            name: data.name,
            profilePic: data.avatar_url,
            location: data.location,
            followers: data.followers,
            bio: data.bio,
            profileURL: data.html_url,
        }

      );
      toast.success('User Added Successfully', {position: toast.POSITION.BOTTOM_LEFT, autoClose:4000})
    }


        setInput("");
  }

  return (
    <div className="App">
      <div className="adder">
        <form>
          <input 
              value= {input}
              onChange={ (e) => setInput(e.target.value) }
              placeholder={`  github login`}
          />

          <button disabled={!input} onClick={fetchCards} type="submit">
              Add
          </button>
        </form>
      </div>

      <hr className="seprator"/>

      <div className="sorter">
        <h1>Sort By:</h1>
        <select
          onChange={(e) => {
            const selectedCriteria = e.target.value;
            setSelectedOption(selectedCriteria);
            if(selectedCriteria == "followers"){
              setOrder("desc");
            }
            else{
              setOrder("asc");
            }

          }}
        >
          <option value="name">Name</option>
          <option value="location">Location</option>
          <option value="followers">Followers</option>
        </select>
      </div>

      <div className="userCards">
        {users.map(
                  (user) => (
                      <Card
                          Key={user.id}
                          userId={user.id}
                          profilePic={user.data.profilePic}
                          name={user.data.name}
                          location={user.data.location}
                          followers={user.data.followers}
                          bio={user.data.bio}
                          profileURL={user.data.profileURL}
                      />
                  )

              )}
      </div>

      


    </div>
  );
  }

export default App;
