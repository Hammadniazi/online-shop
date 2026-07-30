interface TagFilterProps {
  tags: string[];
  selectedTags: string[];
  onToggleTag: (tag: string) => void;
  onClear: () => void;
}

export const TagFilter = ({
  tags,
  selectedTags,
  onToggleTag,
  onClear,
}: TagFilterProps) => {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2">
      {tags.map((tag) => {
        const isActive = selectedTags.includes(tag);
        return (
          <button
            key={tag}
            type="button"
            onClick={() => onToggleTag(tag)}
            aria-pressed={isActive}
            className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
              isActive
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {tag}
          </button>
        );
      })}
      {selectedTags.length > 0 && (
        <button
          type="button"
          onClick={onClear}
          className="text-sm text-gray-500 hover:text-gray-700 underline ml-2"
        >
          Clear filters
        </button>
      )}
    </div>
  );
};
