import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { z } from "zod";

export default function Register() {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  // let schema = z
  //   .object({
  //     name: z
  //       .string()
  //       .min(3, "At least 3 characters")
  //       .max(30, "Max 30 characters"),

  //     email: z.string().email("Please enter a valid email"),

  //     password: z
  //       .string()
  //       .min(8, "Password must be at least 8 characters")
  //       .regex(/[A-Z]/, "Must include at least one uppercase letter")
  //       .regex(/[a-z]/, "Must include at least one lowercase letter")
  //       .regex(/[0-9]/, "Must include at least one number")
  //       .regex(/[^A-Za-z0-9]/, "Must include at least one special character"),

  //     confirmPassword: z.string(),
  //   })
  //   .refine((data) => data.password === data.confirmPassword, {
  //     message: "Passwords do not match",
  //     path: ["confirmPassword"],
  //   });
  let schema = z
    .object({
      name: z.string().min(3, "at least 3").max(30, "at max 30"),
      email: z.string().email("please enter correct email"),
      password: z.string().min(6, "min 6 char"),
      confirmPassword: z.string().min(6, "min 6 char"),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });

  let regForm = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(schema),
  });
  // console.log(regForm);

  let nav = useNavigate();

  let { register, handleSubmit, formState, reset } = regForm;

  function handleRegister(formBody) {
    setIsLoading(true);
    // console.log(formBody);
    axios
      .post("https://todo-nti.vercel.app/user/signup", formBody)
      .then((res) => {
        console.log(res);
        setSuccessMsg(res.data.message);
        setErrorMsg("");
        setIsLoading(false);
        setTimeout(() => {
          nav("/login");
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
        setErrorMsg(err.data.message);
        setSuccessMsg("");
        setIsLoading(true);
      });
    // setIsLoading(false);
    reset();
  }

  return (
    <>
      {/* <Helmet>
        <title>Hello World</title>
      </Helmet> */}
      <div className="border-2 border-gray-400 rounded-3xl p-6 my-12 max-w-4xl mx-auto form-style">
        <form
          className="w-full form-style"
          onSubmit={handleSubmit(handleRegister)}
        >
          {/* {successMsg && <div className="messageGreen">{successMsg}</div>}
        {successMsg && <p>{errorMsg}</p>} */}
          <div className="mb-5">
            <label
              htmlFor="name"
              className="name-in block mb-2.5 text-sm font-medium "
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-neutral-secondary-medium border border-default-medium  text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              required
              autoComplete="name"
              {...register("name")}
            />
            {formState.errors.name && (
              <p className="messageRed ">
                wrong name , at least 3 char , max 30
              </p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="email"
              className="name-in block mb-2.5 text-sm font-medium "
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              className="bg-neutral-secondary-medium border border-default-medium  text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
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
              className="name-in block mb-2.5 text-sm font-medium "
            >
              Your password
            </label>
            <input
              type="password"
              id="password"
              className="bg-neutral-secondary-medium border border-default-medium  text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              required
              autoComplete="new-password"
              {...register("password")}
            />
            {formState.errors.password && (
              <p className="messageRed ">wrong password</p>
            )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className=" name-in block mb-2.5 text-sm font-medium "
            >
              Confirm Your Password
            </label>

            <input
              type="password"
              id="confirmPassword"
              className="bg-neutral-secondary-medium border border-default-medium  text-sm rounded-base focus:ring-brand focus:border-brand block w-full px-3 py-2.5 shadow-xs placeholder:text-body"
              required
              autoComplete="new-password"
              {...register("confirmPassword")}
            />
          </div>
          {formState.errors.confirmPassword && (
            <p className="messageRed ">passwords are not matched</p>
          )}
          <button
            type="submit"
            disabled={isLoading}
            className={` btn-in text-white  ${isLoading ? "btn-disabled" : ""} bg-brand box-border border border-transparent hover:bg-brand-strong focus:ring-4 focus:ring-brand-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none block w-full flex justify-center items-center gap-2`}
          >
            {isLoading ? (
              <>
                Submitting <i className="fa fa-spinner fa-spin"></i>
              </>
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </>
  );
}
