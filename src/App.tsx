
import './App.css';
import React, { useEffect, useState } from 'react';

const App : React.FC = () => {

	const [firstCharacter, setFirstCharacter] = useState<string>("");
  

  const getFirstCharacter = async () => {
        
    const apiResponse = await fetch(`http://swapi.dev/api/people/1`);
    if (!apiResponse.ok) {
      throw new Error(`Request failed with status code ${apiResponse.status}`);
    }

    const data = await apiResponse.json();
        
    setFirstCharacter(data.name);
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
