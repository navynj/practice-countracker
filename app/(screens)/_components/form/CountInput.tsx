import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { CheckCircle } from '../content/CheckTable';

interface CountInputProps<T extends FieldValues> {
  title: string;
  form: UseFormReturn<T>;
  fieldName: Path<T>;
}

const CountInput = <T extends FieldValues>({
  title,
  form,
  fieldName,
}: CountInputProps<T>) => {
  return (
    <div className="flex flex-col items-center gap-2 my-4 max-w-40 w-full">
      <label htmlFor="defaultGoal" className="font-extrabold text-sm">
        {title}
      </label>
      <div className="flex gap-8 text-xl text-gray-400">
        <button
          type="button"
          onClick={() => {
            const prev = +form.getValues(fieldName);
            form.setValue(fieldName, (prev > 0 ? prev - 1 : 0) as any);
          }}
        >
          -
        </button>
        <input
          id="defaultGoal"
          type="number"
          className="text-4xl field-sizing-content text-primary"
          {...form.register(fieldName)}
        />
        <button
          type="button"
          onClick={() => {
            form.setValue(fieldName, (form.getValues(fieldName) + 1) as any);
          }}
        >
          +
        </button>
      </div>
      <div className="flex gap-1 flex-wrap">
        {Array.from(new Array(form.watch(fieldName))).map((_, i) => (
          <CheckCircle key={i} checked={false} />
        ))}
      </div>
    </div>
  );
};

export default CountInput;
