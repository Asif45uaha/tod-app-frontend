import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

const UpdateTodo = () => {
  const [input, setInput] = useState({
    text: "",
  });
  const { id } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/v1/${id}`);
        setInput(res.data);
      } catch (error) {
        alert("couldn't get data");
      }
    };
    getData();
  }, [id]);
  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      await axios.put(`http://localhost:5000/api/v1/${id}`, input);
      navigate("/");
      toast({
        title: "Todo Updated Successfully!!.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } catch (error) {
      console.log(error);
      toast({
        title: "Updated already in Databse!!",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
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
        <button onClick={handleUpdate}>Update Todo</button>
      </div>
    </>
  );
};

export default UpdateTodo;
