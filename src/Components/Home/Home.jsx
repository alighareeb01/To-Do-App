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

  let [updateTask, setUpdateTask] = useState(false);

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
  let updateForm = useForm({
    defaultValues: {
      title: "",
      description: "",
    },
    resolver: zodResolver(schema),
  });

  function onSubmit(data) {
    if (updateTask) {
      handleUpdate(data);
    } else {
      handleCreate(data);
    }
  }

  //  console.log(updateForm.register);

  console.log(updateForm);

  let { register, handleSubmit, formState, reset } = createForm;

  let {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: formState2,
    reset: resetForm,
  } = updateForm;

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

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // Perform the delete request
        axios
          .delete(`https://todo-nti.vercel.app/todo/delete-todo/${id}`, {
            headers: {
              token: localStorage.getItem("userToken"),
            },
          })
          .then((res) => {
            // Success feedback
            Swal.fire({
              title: "Deleted!",
              text: "Your item has been deleted.",
              icon: "success",
            });
            toast.success("Deleted successfully");
            getAllToDo();
          })
          .catch((err) => {
            // Error feedback
            Swal.fire({
              title: "Error!",
              text: "Something went wrong.",
              icon: "error",
            });
            toast.error("Something went wrong");
            console.log(err);
            getAllToDo();
          });
      }
    });
    // Swal.fire("You sure you want to delete")
    //   .then(() => {
    //     axios
    //       .delete(`https://todo-nti.vercel.app/todo/delete-todo/${id}`, {
    //         headers: {
    //           token: localStorage.getItem("userToken"),
    //         },
    //       })
    //       .then((res) => {
    //         console.log(res);
    //         toast.success("Deleted successfully");
    //         getAllToDo();
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //         toast.error("Something went wrong");
    //         getAllToDo();
    //       });
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  }

  function handleSetup(todo) {
    resetForm({
      title: todo.title,
      description: todo.description,
    });

    // resetForm({ title: todo.title });

    setCurrentToDo(todo);
    setUpdateTask(true);
  }

  function handleUpdate(data) {
    // setIsloading(true);

    // setCurrentToDo(todo);
    console.log(currentToDo);
    axios
      .patch(
        `https://todo-nti.vercel.app/todo/update-todo/${currentToDo._id}`,
        data,

        {
          headers: {
            token: localStorage.getItem("userToken"),
          },
        },
      )
      .then((res) => {
        console.log(res);
        toast.success("updated");
        setUpdateTask(false);
        resetForm();
        getAllToDo();
      })
      .catch((err) => {
        console.log(err);
        toast.error("Something went wrong");
        // setUpdateTask(false);
        getAllToDo();
      });
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
                onSubmit={
                  updateTask
                    ? handleSubmit2(handleUpdate)
                    : handleSubmit(handleCreate)
                }
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
                    // {...register("title")}
                    // {updateTask && {...register2("title")}}
                    {...(updateTask ? register2("title") : register("title"))}
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
                  // {...register("description")}
                  //  {...register2("description")}
                  {...(updateTask
                    ? register2("description")
                    : register("description"))}
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
                        onClick={() => {
                          handleDelete(todo._id);
                        }}
                        type="button"
                        className="text-white bg-brand px-4 py-2 rounded hover:bg-brand-strong"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          handleSetup(todo);
                          setUpdateTask(true);
                          // handleUpdate(todo);
                        }}
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
