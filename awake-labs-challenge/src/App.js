
import './App.css';
import firebase from './firebase';
import { getDatabase, ref, onValue, push, remove } from 'firebase/database'
import { useEffect, useState } from 'react';

function App() {

  //initize our stateful variable
  const [alias, setAlias] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [addressBook, setAddressBook] = useState([]);

  //this event will handle the user typing in the input. 
  //when the user types in the input box
  //grab the contents of the box
  //set it to the userInput variable
  const handleAliasChange = (event) => {
    setAlias(event.target.value);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  }

  const handleLocationChange = (event) => {
    setLocation(event.target.value);
  }

  //this event will handle the user clicking 'add my info'
  const handleSubmit = (event) => {
    //prevent default (page from refreshing)
    event.preventDefault();

    const person = {
      alias: alias,
      email: email,
      location: location
    }

    //create a reference to the database
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    //push the value of userInput state to the database
    push(dbRef, person);

    setAlias('');
    setLocation('');
    setEmail('');
  }

  //create an event listener that will handle the user clicking "remove"
  const handleRemove = (infoId) => {
    console.log(infoId);
    //this funtion will take an argument which is the id of the book we want to remove
    //create a reference tot he database - in this case, the specific node we want to remove
    const database = getDatabase(firebase);
    const dbRef = ref(database, `/${infoId}`);
    //using the firebase remove() module, we remove the node specific to the book id
    remove(dbRef);
  }


  //ON PAGELOAD (initial render/ component mount)
  useEffect(() => {
    // console.log('intialized this dope app');
    //create a variable that holds our database details (getDatabase)
    const database = getDatabase(firebase);
    //create a variable that makes a reference to our database (ref)
    const dbRef = ref(database);

    //we need to add our onValue event listener, so that it will run some code whenever our database value changes
    onValue(dbRef, (response) => {
      //get our database values
      //.val() is a firebase module that gets us the information we want from the response
      const data = response.val();
      //our data is an object, so we need to iterate through it suing a for in loop to access each person's name and turn it into an array

      const newAddressBook = [];

      for (let key in data) {

        //inside our loop, we push each book name to our newState array which we have already created
        const tempObject = data[key];
        tempObject.key = key;
        newAddressBook.push(tempObject);
      }
      setAddressBook(newAddressBook);
    });
  }, []);

  console.log(addressBook);

  return (
    <div>
      <h1>Look, people!</h1>
      <form action="submit">
        <label htmlFor="newInfo">Add a person to your address book!</label>
        <input
          required
          type="text"
          id="alias"
          placeholder="Alias"
          onChange={handleAliasChange}
          value={alias}
        />
        <label htmlFor="email">What's their email?</label>
        <input
          required
          placeholder="Email"
          id="email"
          onChange={handleEmailChange}
          value={email}
          type="email" />

        <label htmlFor="email">What's their email?</label>
        <input
          required
          placeholder="Location"
          id="location"
          onChange={handleLocationChange}
          value={location}
          type="text" />

        <button onClick={handleSubmit}>Add person</button>
      </form>
      <ul>
        {
          //map through our info state to put them on the page
          addressBook.map((info) => {
            return (
              <li key={info.key}>
                <p>{info.alias}</p>
                <p>{info.email}</p>
                <p>{info.location}</p>
                <button onClick={() => handleRemove(info.key)}>Remove</button>
              </li>
            )
          })
        }
      </ul>
    </div >
  );
}

export default App;
