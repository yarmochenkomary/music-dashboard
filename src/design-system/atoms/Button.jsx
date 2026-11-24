
import './Button.css';

export function Button({
                           children,
                           variant = 'primary',
                           size = 'md',
                           disabled = false,
                           type = 'button',
                           onClick,
                           ...props
                       }) {
    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`ds-btn ds-btn--${variant} ds-btn--${size}`}
            {...props}
        >
            {children}
        </button>
    );
}