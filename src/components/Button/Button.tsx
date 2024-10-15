import React from "react";
import {
  PencilIcon,
  PlusIcon,
  TrashIcon,
  BookOpenIcon,
  BookmarkIcon,
  ArrowLeftIcon

} from "@heroicons/react/24/outline";
import "./Button.css";

// Define a type for the button props
interface ButtonProps {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
  children?: React.ReactNode;
}

export const CreateButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="btn" onClick={onClick}>
      <span className="btn-text">Create Book</span>
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

export const CustomButton: React.FC<ButtonProps> = ({
  onClick,
  type,
  children
}) => {
  return (
    <button type={type} className="btn" onClick={onClick}>
      <span className="btn-text">{children}</span>
      <BookmarkIcon className="btn-icon" />
    </button>
  );
};

export const CloseButton: React.FC<ButtonProps> = ({ onClick }) => {
  return (
    <button className="close-btn" onClick={onClick}>
      <span className="btn-text">Close</span>
      <ArrowLeftIcon className="btn-icon" />
    </button>
  );
};
