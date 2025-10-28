import type { ChangeEvent } from "react";

interface InputProps {
    value: string;
    onChange:(event: ChangeEvent <HTMLInputElement>) => void;
    type?: 'text'|'number'|'email'|'password';
    placeholder?: string;
    label: string;
}

const Input : React.FC <InputProps> = ({
    value, onChange, type='text' , placeholder, label 
}) => {
    return (
        <div className="Form-group">
            <label htmlFor={label.toLowerCase().replace(/\s/g,'_')}>{label}</label>
            <input 
            id={label.toLowerCase().replace(/\s/g,'_')}
            type = {type}
            value = {value}
            onChange={onChange}
            placeholder={placeholder}
            className="simple-input" />
        </div>
    );
};
export default Input;