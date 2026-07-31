interface IconProps {
  className?: string;
}

export const CartIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <circle cx="9" cy="20" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="17" cy="20" r="1.4" fill="currentColor" stroke="none" />
    <path d="M2.5 3h2l2.2 11.6a2 2 0 0 0 2 1.65h7.7a2 2 0 0 0 1.96-1.6L20 8H6" />
  </svg>
);

export const MenuIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M3 6h18M3 12h18M3 18h18" />
  </svg>
);

export const CloseIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

export const CheckIcon = ({ className = "w-6 h-6" }: IconProps) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M5 13l4 4L19 7" />
  </svg>
);
