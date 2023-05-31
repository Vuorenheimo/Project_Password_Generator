import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Form, InputGroup, Button, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import style from './App.css';


const Header = ({ header }) => <h1 className='style.header'> { header } </h1>


const FormOutput = ({ postData, input, handleInput, handleCopy, handleAlert }) => {
  return (
    <>
      <Form onSubmit={ postData }>
        <Form.Group className="mb-4 mt-4" controlId="formPasswordField">

          <InputGroup className="mb-2">
            <Form.Control type="text" placeholder="Add to password" value={ input } onChange={ handleInput } />
            <Button variant="outline-secondary" onClick={ handleCopy }> Copy </Button>
          </InputGroup>

            <Form.Text>You can include characters for your password here.<br></br>
              Keep in mind that the password length is 30 characters.</Form.Text>
        </Form.Group>

        <Button variant="success" type="submit">Send</Button>
      </Form>
    </>
  )
}


const List = ({ dataReceived }) => {
  const data = dataReceived;
  const list = [];

  for (const key in data.passwords) {
    if (Object.call(data.passwords, key)) {
      const password = data.passwords[key];
      list.push(<li key={password.id}>{password.text}</li>);
    }
  }

  return (
      <ul>
        {list}
      </ul>
    );
}


const App = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
      axios.get('http://localhost:8000/api/data/get-data')
      .then(response => {
        setOutput(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(input);
    setAlert(true);
  }

  const handleAlert = () => {
    setAlert(false);
  }

  const postData = (event) => {
    event.preventDefault();
  
    const toPost = {
      data: input
    };
  
    axios.post('http://localhost:8000/api/data/post-data', toPost)
      .then(response => {
        console.log(response.data);
        setOutput('');
        fetchData();
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <>
      <Header header={ "Password Generator" } />
      <FormOutput postData={ postData } input={ input } handleInput={ handleInput } handleCopy={ handleCopy } handleAlert={ handleAlert } />
      <List dataReceived={ output } />
    </>
  );
}

export default App;
