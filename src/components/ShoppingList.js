import React, { useState, useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);

  useEffect( () => {
    fetch("http://localhost:4000/items")
    .then(res => res.json())
    .then(data => setItems(data))
  }, [])

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleAddItem(item){
    setItems([...items, item])
  }

  function handleAddToCart(changedItem){
    setItems(items.map( item => {
      if(item.id === changedItem.id){ return changedItem }
      return item
    }))
  }

  function handleDeleteItem(item){
    const newArray = items.filter( currItem => {
      return(currItem.id !== item.id)
    })
    setItems(newArray)
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item 
          key={item.id} 
          item={item} 
          onAddToCart={handleAddToCart} 
          onDelete={handleDeleteItem}/>
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
