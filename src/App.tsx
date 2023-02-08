
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const App : React.FC = () => {

	const [firstCharacter, setFirstCharacter] = useState<string>("");
  

  const getFirstCharacter = async () => {
    
    const apiResponse = await axios.get(`http://swapi.dev/api/people/1`);
        
    setFirstCharacter(apiResponse.data.name);
  };

  useEffect(() => {
    getFirstCharacter();
  }, []);

	return (
		<>      
      <label>First Star Wars Character</label>
      <h1>{firstCharacter}</h1>
    </>
	);
}

export default App;
