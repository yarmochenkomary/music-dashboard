
import './Input.css';

export function Input({ id, type = 'text', value, onChange, placeholder, ...props }) {
    return (
        <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className="ds-control"
            {...props}
        />
    );
}