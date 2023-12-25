import { Course } from '@/types';

type Props = {} & Course;

const Card = ({
  institution,
  campus,
  course,
  cutoff_mark,
  group,
  shift,
}: Props) => {
  return (
    <div className="border box-border rounded max-w-4xl">
      <div className="flex">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-4">
          <div className="flex flex-col">
            <span className="text-xs break-words">Instituição:</span>
            <span className="text-sm break-words">{institution}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs break-words">Campus:</span>
            <span className="text-sm break-words">{campus}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs break-words">Curso:</span>
            <span className="text-sm break-words">{course}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs break-words">Nota de Corte:</span>
            <span className="text-sm break-words">{cutoff_mark}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs break-words">Grupo:</span>
            <span className="text-sm break-words">{group}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs break-words">Turno:</span>
            <span className="text-sm break-words">{shift}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
