export default function Logo(props: { class?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      class={props.class ?? "h-8 w-8"}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mmo-logo-g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" class="[stop-color:var(--color-brand-500)]" />
          <stop offset="1" class="[stop-color:var(--color-accent-500)]" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#mmo-logo-g)" />
      <path
        d="M8 22V10l5 6 5-6 5 6v6"
        stroke="white"
        stroke-width="2.2"
        fill="none"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
}
