import React from "react";
import { PencilIcon, PlusIcon, TrashIcon, BookOpenIcon } from "@heroicons/react/24/outline";
import "./Button.css";

// Define a type for the button props
interface ButtonProps {
  onClick: () => void; // The onClick prop should be a function with no arguments and no return value
}

export const CreateButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      <span className="btn-text">Create Book</span>{" "}
      <PlusIcon className="btn-icon" />
    </button>
  );
};

export const ViewButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      <span className="btn-text">View Book</span>{" "}
      <BookOpenIcon className="btn-icon" />
    </button>
  );
};

export const EditButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      <span className="btn-text">Edit Book</span>{" "}
      <PencilIcon className="btn-icon" />
    </button>
  );
};

export const DeleteButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      <span className="btn-text">Delete Book</span>{" "}
      <TrashIcon className="btn-icon" />
    </button>
  );
};
