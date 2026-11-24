
import { Card } from './Card';

export default {
    title: 'Design System/Molecules/Card',
    component: Card,
    argTypes: {
        padding: { control: 'select', options: ['sm', 'md', 'lg'] }
    }
};

export const Default = {
    args: {
        padding: 'md',
        children: 'Базовий контейнер картки на дизайн-токенах'
    }
};