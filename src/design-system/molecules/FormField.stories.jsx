
import { FormField } from './FormField';
import { Input } from '../atoms/Input';

export default {
    title: 'Design System/Molecules/FormField',
    component: FormField
};

export const WithInput = {
    render: () => (
        <FormField label="Пошук треку:" htmlFor="demo-search">
            <Input id="demo-search" placeholder="Назва або виконавець..." />
        </FormField>
    )
};