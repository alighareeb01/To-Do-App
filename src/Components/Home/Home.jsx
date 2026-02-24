import React, { useContext, useEffect, useState } from "react";
import Register from "../Register/Register";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { UserContext } from "../Context/UserContextProvider";
import toast from "react-hot-toast";

export default function Home() {
  let user = useContext(UserContext);
  let [isLoading, setIsloading] = useState(false);
  const [toDos, setToDos] = useState([]);
  let [currentToDo, setCurrentToDo] = useState({});

  let schema = z.object({
    title: z.string().min(3, "at least 3").max(30, "at max 30"),
    description: z.string().min(3, "at least 3").max(30, "at max 30"),
  });
  let createForm = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(schema),
  });
  let { register, handleSubmit, formState, reset } = createForm;

  function handleCreate(data) {
    setIsloading(true);
    // console.log(data);
    axios
      .post("https://todo-nti.vercel.app/todo/create", data, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res);
        setIsloading(false);
        toast.success("Successfully added");
        getAllToDo();
      })
      .catch((err) => {
        console.log(err);
        setIsloading(false);
        toast.error("This didn't work.");
      });
    reset();
  }

  function getAllToDo() {
    axios
      .get("https://todo-nti.vercel.app/todo/get-all", {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res.data.todos);
        setToDos(res.data.todos);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    if (user.token) getAllToDo();
  }, []);

  function handleDelete(id) {
    // console.log(id);
    axios
      .delete(`https://todo-nti.vercel.app/todo/delete-todo/${id}`, {
        headers: {
          token: localStorage.getItem("userToken"),
        },
      })
      .then((res) => {
        console.log(res);
        toast.success("Deleted successfully");
        getAllToDo();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        getAllToDo();
      });
  }

  function handleEdit(todo) {
    setCurrentToDo(todo);
    console.log(currentToDo);
  }
  return (
    <>
      <div className="container mx-auto p-5">
        {user.token ? (
          <>
            {/* Create Todo Form */}
            <div className="container mx-auto p-5 m-5">
              <form
                className="max-w-sm mx-auto"
                onSubmit={handleSubmit(handleCreate)}
              >
                <div className="mb-5">
                  <label
                    htmlFor="title"
                    className="block mb-2.5 text-sm font-medium text-heading"
                  >
                    title
                  </label>
                  <input
                    type="text"
                    id="title"
                    className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
                    required
                    {...register("title")}
                  />
                  {formState.errors.title && (
                    <p className="messageRed ">
                      wrong title ,less than 3 max 30
                    </p>
                  )}
                </div>

                <label
                  htmlFor="message"
                  className="block mb-2.5 text-sm font-medium text-heading"
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  rows="4"
                  className="bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body"
                  placeholder="Write your thoughts here..."
                  {...register("description")}
                ></textarea>
                {formState.errors.description && (
                  <p className="messageRed ">wrong description </p>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className={`text-white  ${
                    isLoading ? "btn-disabled" : ""
                  } bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none block w-full flex justify-center items-center gap-2`}
                >
                  {isLoading ? (
                    <>
                      Adding <i className="fa fa-spinner fa-spin"></i>
                    </>
                  ) : (
                    "Add"
                  )}
                </button>
              </form>
            </div>

            {/* Todos Grid */}
            <div className="grid grid-cols-4 gap-6 mt-10">
              {toDos.length > 0 ? (
                toDos.map((todo) => (
                  <div
                    key={todo._id}
                    className="border border-default rounded-lg p-4 shadow hover:shadow-lg transition"
                  >
                    <h2 className="text-lg font-semibold mb-2">{todo.title}</h2>
                    <p className="text-body">{todo.description}</p>
                    <div className="btns flex justify-center gap-5 mt-3">
                      <button
                        onClick={() => handleDelete(todo._id)}
                        type="button"
                        className="text-white bg-brand px-4 py-2 rounded hover:bg-brand-strong"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(todo)}
                        type="button"
                        className="text-white bg-brand px-4 py-2 rounded hover:bg-brand-strong"
                      >
                        Update
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No todos yet.</p>
              )}
            </div>
          </>
        ) : (
          <Register />
        )}
      </div>
    </>
  );
}
