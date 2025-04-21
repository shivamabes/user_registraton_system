"use client";
import React, { useState, useEffect } from "react";

export default function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("users");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const addUser = (name, age) => {
    const id = data.length + 1;
    const newData = [...data, { id, name, age }];
    setData(newData);

    localStorage.setItem("users", JSON.stringify(newData));
  };
  const deleteuser = (ids) => {
    const parsedId = parseInt(ids, 10);
    setData(data.filter((user) => user.id !== parsedId));
  };

  return (
    <>
      <h1 className="text-center my-4 text-3xl font-bold underline">
        User Registration System
      </h1>

      <div className="w-[80%] mx-auto font-bold underline">
        <h1 className="text-xl">User Register</h1>
        <form
          className="my-4"
          onSubmit={(e) => {
            e.preventDefault();
            const name = e.target.elements.name.value;
            const age = e.target.elements.age.value;
            addUser(name, age);
            e.target.reset();
          }}
        >
          <label htmlFor="name">Name</label>
          <input
            className="bg-gray-500 mx-4 p-1"
            type="text"
            name="name"
            id="name"
            required
          />
          <label htmlFor="age">Age</label>
          <input
            className="bg-gray-500 mx-4 p-1"
            type="number"
            name="age"
            id="age"
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>

      <div className="w-[80%] mx-auto my-20">
        <h2 className="text-xl font-bold">Delete Users:</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const ids = e.target.elements.ids.value;
            deleteuser(ids);
            e.target.reset();
          }}
        >
          <input
            type="number"
            name="ids"
            className="bg-gray-500 mx-4 p-1"
            required
          />
          <button type="submit">Delete user</button>
        </form>
      </div>

      <div className="w-[80%] mx-auto mt-4">
        <h2 className="text-xl font-bold">Registered Users:</h2>
        <table className="table-auto w-full border-collapse border border-gray-500">
          <thead>
            <tr>
              <th className="border border-gray-500 px-4 py-2">ID</th>
              <th className="border border-gray-500 px-4 py-2">Name</th>
              <th className="border border-gray-500 px-4 py-2">Age</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={index}>
                <td className="border border-gray-500 px-4 py-2 text-center">
                  {user.id}
                </td>
                <td className="border border-gray-500 px-4 py-2 text-center">
                  {user.name}
                </td>
                <td className="border border-gray-500 px-4 py-2 text-center">
                  {user.age}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
