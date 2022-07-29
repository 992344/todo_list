import React, { useEffect, useState } from "react";
import "./styles.css";

//get back localstrorage data back

const localStorageData = () => {
  const list = localStorage.getItem("myTodoList");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputValue, setinputValue] = useState("");
  const [items, setItems] = useState(localStorageData);
  const [edited, setedited] = useState("");
  const [toggle, settoggle] = useState(false);

  //adding items in list
  const additems = () => {
    if (!inputValue) {
      alert("please inter some items");
    } else if (inputValue && toggle) {
      setItems(
        items.map((currentEle) => {
          if (currentEle.id === edited) {
            return { ...currentEle, name: inputValue };
          }
          return currentEle;
        })
      );
      setinputValue([]);
      setedited(null);
      settoggle(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputValue
      };
      setItems([...items, myNewInputData]);
      setinputValue("");
    }
  };

  // delete items
  const deletItem = (index) => {
    const updatedItems = items.filter((currentEle) => {
      return currentEle.id !== index;
    });
    setItems(updatedItems);
  };

  //remove all
  const removeall = () => {
    setItems([]);
  };
  //line through after complete
  // const [style, setStyle] = useState("text1");

  const changeStyle = (index) => {
    const newItems = [...items];
    newItems[index].isCompleted = true;
    setItems(newItems);
  };

  //adding data to local storage
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(items));
  }, [items]);

  // edit items
  const editItem = (index) => {
    const itemsEdited = items.find((currentEle) => {
      return currentEle.id === index;
    });
    setinputValue(itemsEdited.name);
    setedited(index);
    settoggle(true);
  };

  return (
    <>
      <header>
        <h1>To Do list</h1>
        <div id="newTaskForm">
          <input
            type="text"
            clssName="newTaskInput"
            id="newTaskInput"
            placeholder="What you want to plan?"
            value={inputValue}
            onChange={(e) => setinputValue(e.target.value)}
          />

          {toggle ? (
            <button
              type="button"
              id="newTaskSubmit1"
              value="Save"
              onClick={additems}
            >
              save
            </button>
          ) : (
            <button
              type="button"
              id="newTaskSubmit2"
              value="Add task"
              onClick={additems}
            >
              add tasks
            </button>
          )}

          {/* <input 
     type="button"
     id="newTaskSubmit" 
     value="Add task"
                 onClick={additems} />
                  */}
        </div>
      </header>
      <main>
        <section className="task-list">
          <h2>To Do list</h2>
          <h5>Click on list after task got completed</h5>
          <br />
          {items.map((currentEle, i) => {
            return (
              <div id="tasks" key={currentEle.id}>
                <div className="task">
                  <div className="content">
                    <input
                      type="text"
                      className={currentEle.isCompleted ? "text2" : "text1"}
                      value={currentEle.name}
                    />
                  </div>

                  <div className="actions">
                    <button
                      className="completed"
                      id="completed"
                      onClick={() => changeStyle(i)}
                    >
                      complete
                    </button>
                    <button
                      className="edit"
                      onClick={() => editItem(currentEle.id)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete"
                      onClick={() => deletItem(currentEle.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          ;
          <button className="removeAll" onClick={removeall}>
            Remove All
          </button>
        </section>
      </main>
    </>
  );
};

export default Todo;
