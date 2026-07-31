interface QuantityStepperProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  ariaLabel?: string;
}

export const QuantityStepper = ({
  quantity,
  onChange,
  min = 1,
  ariaLabel = "Quantity",
}: QuantityStepperProps) => (
  <div
    className="flex items-center border border-gray-300 rounded-lg"
    role="group"
    aria-label={ariaLabel}
  >
    <button
      type="button"
      onClick={() => onChange(Math.max(min, quantity - 1))}
      disabled={quantity <= min}
      aria-label="Decrease quantity"
      className="w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100 disabled:text-gray-300 disabled:hover:bg-transparent"
    >
      −
    </button>
    <span className="w-10 text-center font-semibold" aria-live="polite">
      {quantity}
    </span>
    <button
      type="button"
      onClick={() => onChange(quantity + 1)}
      aria-label="Increase quantity"
      className="w-9 h-9 flex items-center justify-center text-gray-700 hover:bg-gray-100"
    >
      +
    </button>
  </div>
);
