import React,  {type MouseEvent} from "react";
interface ButtonProps {
    label: string;
    onClick: (event: MouseEvent<HTMLButtonElement>) => void;
    className: string;
}
const Button: React.FC<ButtonProps> = ({
    label, onClick, className
}) => {
    return(
        <button 
        type="button"
        className={`Simple-button ${className || ''}`}
        onClick={onClick}>{label}</button>
    );
};

export default Button;