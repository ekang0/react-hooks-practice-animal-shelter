import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  function handleChangeType(filterValue){
    //console.log("App filterValue is", filterValue);
    setFilters( { type: filterValue } );
  };

  function onFindPetsClick() {
    const url = "http://localhost:3001/pets";

    if (filters.type === "all") {
      fetch(url)
      .then(r => r.json())
      .then(allPets => setPets(allPets))
    } else {
      fetch(url+`?type=${filters.type}`)
      .then(r => r.json())
      .then(petType => setPets(petType))
    };
    
  };

  function handlePetAdoption(id){
    //console.log("adopted/not adopted pets id", id);
        // find the matching pet in the pets array in App, and set the isAdopted property to true
    const updatedPetsList = pets.map((pet) => (pet.id === id ? {...pet, "isAdopted": true} : pet ));
    setPets(updatedPetsList);
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters onChangeType={handleChangeType} onFindPetsClick={onFindPetsClick}/>
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={handlePetAdoption}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
