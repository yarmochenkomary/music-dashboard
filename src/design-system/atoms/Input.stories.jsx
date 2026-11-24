
import { Input } from './Input';
import { Select } from './Select';

export default {
    title: 'Design System/Atoms/Input & Select',
    component: Input
};

export const TextInput = {
    args: { placeholder: 'Введіть назву треку...' }
};

export const SelectField = {
    render: () => (
        <Select
            options={[
                { value: 'All', label: 'Усі жанри' },
                { value: 'Rock', label: 'Rock' },
                { value: 'Electronic', label: 'Electronic' }
            ]}
        />
    )
};