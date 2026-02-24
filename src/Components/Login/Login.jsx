import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { fa } from "zod/locales";
import { UserContext } from "../Context/UserContextProvider";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

export default function Login() {
  let user = useContext(UserContext);

  let [isLoading, setIsLoading] = useState(false);
  let schema = z.object({
    email: z.string().email("please enter correct email"),
    password: z.string().min(6, "min 6 char"),
  });
  let regForm = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(schema),
  });
  let nav = useNavigate();

  let { register, handleSubmit, formState, reset } = regForm;
  function handleLogin(formBody) {
    setIsLoading(true);
    const payload = {
      email: formBody.email,
      password: formBody.password,
    };
    // console.log(formBody);
    axios
      .post("https://todo-nti.vercel.app/user/login", payload)
      .then((res) => {
        // console.log(res.data.user);
        console.log(res);

        localStorage.setItem("userToken", res.data.token);
        localStorage.setItem("userData", JSON.stringify(res.data.user));
        setIsLoading(false);
        user.setToken(res.data.token);
        nav("/");
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
    // setIsLoading(false);
    reset();
  }
  // console.log(regForm);

  return (
    <div className="border-2 border-gray-400 rounded-3xl p-6 my-12 max-w-4xl mx-auto form-style">
      <form className="w-full form-style" onSubmit={handleSubmit(handleLogin)}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="main block mb-2.5 text-sm font-medium text-heading"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            className="name-in bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
            autoComplete="email"
            {...register("email")}
          />
          {formState.errors.email && (
            <p className="messageRed ">wrong email </p>
          )}
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className=" main block mb-2.5 text-sm font-medium text-heading"
          >
            Your password
          </label>
          <input
            type="password"
            id="password"
            className="name-in bg-neutral-secondary-medium border border-default-medium text-heading text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
            required
            autoComplete="password"
            {...register("password")}
          />
          {formState.errors.password && (
            <p className="messageRed ">wrong password </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`btn-in text-white  ${isLoading ? "btn-disabled" : ""} bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none block w-full flex justify-center items-center gap-2`}
        >
          {isLoading ? (
            <>
              Logging <i className="fa fa-spinner fa-spin"></i>
            </>
          ) : (
            "login"
          )}
        </button>
      </form>
    </div>
  );
}
