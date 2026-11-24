
export function FormField({ label, htmlFor, children }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-xs)' }}>
            {label && (
                <label
                    htmlFor={htmlFor}
                    style={{
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 600,
                        color: 'var(--color-text-muted)'
                    }}
                >
                    {label}
                </label>
            )}
            {children}
        </div>
    );
}