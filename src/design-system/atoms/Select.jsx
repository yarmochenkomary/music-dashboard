
import './Input.css';

export function Select({ id, value, onChange, options = [], children, ...props }) {
    return (
        <select id={id} value={value} onChange={onChange} className="ds-control" {...props}>
            {options.length > 0
                ? options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))
                : children}
        </select>
    );
}