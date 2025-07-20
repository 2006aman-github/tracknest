import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTrackBuilder } from "../../hooks/useTrackBuilder";
import { TrackSchema } from "../../services/schemas/trackSchema";
import { toast } from "sonner";

export function TrackCreator({ userId }) {
  const { items, addItem, removeItem, saveTrack } = useTrackBuilder();
  const { register, handleSubmit } = useForm({
    resolver: zodResolver(TrackSchema)
  });

  const onSubmit = async ({ title, description }) => {
    try {
      await saveTrack({ title, description, userId });
      toast.success("Track saved!");
    } catch (err) {
      toast.error("Failed to save track.");
    }
  };

  

  return (
   <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 p-4 bg-white rounded-xl shadow-md max-w-xl mx-auto">
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Track Title</label>
    <input
      {...register("title")}
      placeholder="e.g. Full Stack Web Dev"
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  </div>

  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
    <textarea
      {...register("description")}
      placeholder="Short overview of what this track covers..."
      className="w-full px-4 py-2 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={4}
    />
  </div>

  {items.length > 0 && (
    <div className="bg-gray-50 border rounded-md p-4">
      <h3 className="text-md font-semibold mb-2">Included Items</h3>
      <ul className="space-y-2">
        {items.map((i) => (
          <li
            key={i.refId}
            className="flex justify-between items-center bg-white p-2 rounded-md border"
          >
            <div>
              <p className="font-medium">{i.title} <span className="text-sm text-gray-500">({i.type})</span></p>
              <p className="text-sm text-gray-600">{i.duration} mins</p>
            </div>
            <button
              type="button"
              onClick={() => removeItem(i.refId)}
              className="text-red-500 hover:text-red-700 text-sm font-medium"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  )}

  <button
    type="submit"
    className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
  >
    Save Track
  </button>
</form>

  );
}
