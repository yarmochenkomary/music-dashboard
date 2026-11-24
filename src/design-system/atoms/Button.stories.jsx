
import { Button } from './Button';

export default {
    title: 'Design System/Atoms/Button',
    component: Button,
    argTypes: {
        variant: { control: 'select', options: ['primary', 'secondary', 'danger', 'ghost'] },
        size: { control: 'select', options: ['sm', 'md', 'lg'] },
        disabled: { control: 'boolean' }
    }
};

export const Primary = { args: { children: 'Primary Button', variant: 'primary', size: 'md' } };
export const Secondary = { args: { children: 'Скинути фільтри', variant: 'secondary', size: 'md' } };
export const Danger = { args: { children: '❤️ В обраному', variant: 'danger', size: 'md' } };
export const Disabled = { args: { children: 'Недоступно', variant: 'primary', disabled: true } };