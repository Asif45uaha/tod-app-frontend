import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
const Home = () => {
  const [input, setInput] = useState({
    text: "",
  });
  const [todos, setTodos] = useState([]);
  const [render, setRender] = useState(false);
  const toast = useToast();
  const handleAdd = async (e) => {
    try {
      e.preventDefault();
      //console.log(input);
      await axios.post("http://localhost:5000/api/v1", input);
      setRender(true);
      setInput({
        text: "",
      });
      toast({
        title: "Todo created successfully!!",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Error in Creating A Todo!!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };
  useEffect(() => {
    const fetchTodos = async () => {
      const res = await axios.get("http://localhost:5000/api/v1");
      //console.log(res.data);
      setTodos(res.data);
    };
    fetchTodos();
  }, [render]);
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/api/v1/${id}`);
    const newTodos = todos.filter((item) => {
      return item._id !== id;
    });
    setTodos(newTodos);
    toast({
      title: "Deleted Todo!!",
      status: "success",
      duration: 5000,
      isClosable: true,
      position: "top",
    });
  };

  return (
    <>
      <div className="todoContainer">
        <input
          type="text"
          name="text"
          value={input.text}
          onChange={(e) => {
            e.preventDefault();
            setInput({ ...input, [e.target.name]: e.target.value });
          }}
          placeholder="Enter a todo..."
          required
        />
        <button onClick={handleAdd}>Add Todo</button>
        <div className="alltodos">
          <table>
            <thead>
              <tr>
                <th>Todos</th>
                <th>Operations</th>
              </tr>
            </thead>
            <tbody>
              {todos.map((todo) => (
                <tr key={todo._id}>
                  <td>{todo.text}</td>
                  <td>
                    <Link to={`/${todo._id}`}>
                      <button>Update</button>
                    </Link>
                    <button onClick={() => handleDelete(todo._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Home;
