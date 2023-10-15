import React from "react";
import TextInput from "./TextInput";

function RegisterForm({ className }: { className?: string }) {
  return (
    <form className={`flex flex-col gap-2 ${className}`}>
      <TextInput
        label="Age"
        onChange={(e) => {
          console.log(e);
        }}
        className=" w-full"
      />
      <TextInput
        label="Income"
        onChange={(e) => {
          console.log(e);
        }}
        className=" w-full"
      />
      <TextInput
        label="Location"
        onChange={(e) => {
          console.log(e);
        }}
        className=" w-full"
      />
    </form>
  );
}

export default RegisterForm;