import { useState } from 'react';
import { Event } from '../types';
import { fmt, parse } from '../lib/date';

type Props = {
  initialDate: Date;
  event?: Event | null;
  onClose: () => void;
  onSave: (e: Event) => void;
  onDelete: (id: string) => void;
};

export default function EventForm({
  initialDate,
  event,
  onClose,
  onSave,
  onDelete,
}: Props) {
  const isEdit = !!event;
  const [title, setTitle] = useState(event?.title || '');
  const [start, setStart] = useState(
    event?.start || initialDate.toISOString()
  );
  const [end, setEnd] = useState(
    event?.end || new Date(initialDate.getTime() + 60 * 60 * 1000).toISOString()
  );
  const [location, setLocation] = useState(event?.location || '');
  const [description, setDescription] = useState(event?.description || '');
  const [color, setColor] = useState(event?.color || '#3b82f6');
  const [remind, setRemind] = useState(
    event?.remindMinutesBefore?.toString() || ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const s = new Date(start);
    const en = new Date(end);
    if (!title || en < s) return;
    onSave({
      ...(event ? { id: event.id } : {}),
      title,
      start: s.toISOString(),
      end: en.toISOString(),
      location: location || undefined,
      description: description || undefined,
      color: color || undefined,
      remindMinutesBefore: remind ? parseInt(remind) : undefined,
    } as Event);
    window.alert(isEdit ? 'Evento atualizado' : 'Evento criado');
    onClose();
  };

  const handleDelete = () => {
    if (event) {
      onDelete(event.id);
      window.alert('Evento excluído');
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      role="dialog"
      aria-modal="true"
    >
      <form
        className="bg-white p-4 rounded w-80 space-y-2"
        onSubmit={handleSubmit}
      >
        <h2 className="font-semibold">
          {isEdit ? 'Editar evento' : 'Novo evento'}
        </h2>
        <label className="block text-sm">
          Título*
          <input
            className="mt-1 w-full border p-1"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </label>
        <label className="block text-sm">
          Início
          <input
            type="datetime-local"
            className="mt-1 w-full border p-1"
            value={fmt(parse(start), "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => setStart(new Date(e.target.value).toISOString())}
            required
          />
        </label>
        <label className="block text-sm">
          Fim
          <input
            type="datetime-local"
            className="mt-1 w-full border p-1"
            value={fmt(parse(end), "yyyy-MM-dd'T'HH:mm")}
            onChange={(e) => setEnd(new Date(e.target.value).toISOString())}
            required
          />
        </label>
        <label className="block text-sm">
          Local
          <input
            className="mt-1 w-full border p-1"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          Descrição
          <textarea
            className="mt-1 w-full border p-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          Cor
          <input
            type="color"
            className="mt-1 w-full border p-1"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </label>
        <label className="block text-sm">
          Lembrar (min antes)
          <input
            type="number"
            className="mt-1 w-full border p-1"
            value={remind}
            onChange={(e) => setRemind(e.target.value)}
          />
        </label>
        <div className="flex justify-between pt-2">
          {isEdit && (
            <button
              type="button"
              onClick={handleDelete}
              className="text-red-600"
            >
              Excluir
            </button>
          )}
          <div className="ml-auto space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-2 py-1 border"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-2 py-1 bg-blue-600 text-white"
            >
              Salvar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
