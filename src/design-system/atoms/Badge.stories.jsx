
import { Badge } from './Badge';

export default {
    title: 'Design System/Atoms/Badge',
    component: Badge,
    argTypes: {
        variant: { control: 'select', options: ['primary', 'success', 'neutral'] }
    }
};

export const Primary = { args: { children: 'Rock', variant: 'primary' } };
export const Success = { args: { children: 'Jamendo Live', variant: 'success' } };
export const Neutral = { args: { children: 'ID: 101', variant: 'neutral' } };