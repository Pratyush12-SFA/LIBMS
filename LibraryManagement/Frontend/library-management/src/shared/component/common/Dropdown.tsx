import type { ChangeEvent } from "react";

interface DropdownOption{
    value: string;
    label:string;
}

interface DropdownProps {
    label:string;
    options: DropdownOption[];
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    placeholder: string;
}

const Dropdown:React.FC<DropdownProps> = ({
    label, options, value, onChange, placeholder
}) => {
    return(
        <div className="dropdown-group">
            <label htmlFor={label.toLowerCase().replace(/\s/g,'_')}>{label}</label>
            <select 
            id={label.toLowerCase().replace(/\s/g,'_')}
            value={value}
            onChange={onChange}
            className="simple-dropdown">
                {
                    placeholder && (
                        <option value = "" disabled >
                            {placeholder}
                        </option>
                    ) 
                }
                {options.map((option) =>(
                    <option key = {option.value} value = {option.value}>{option.label}</option>
                ) )}
            </select>
        </div>
    );
};

export default Dropdown;