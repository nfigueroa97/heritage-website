function Brand({ name, size }) {
  if (name === 'google') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.4h6.4a5.5 5.5 0 0 1-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.7z" />
        <path fill="#34A853" d="M12 24c3.2 0 5.9-1.1 7.9-2.9l-3.9-3c-1.1.7-2.4 1.2-4 1.2-3.1 0-5.7-2.1-6.6-4.9H1.4v3.1C3.4 21.4 7.4 24 12 24z" />
        <path fill="#FBBC05" d="M5.4 14.4A7.2 7.2 0 0 1 5 12c0-.8.1-1.6.4-2.4V6.5H1.4A12 12 0 0 0 0 12c0 1.9.5 3.8 1.4 5.5l4-3.1z" />
        <path fill="#EA4335" d="M12 4.8c1.7 0 3.3.6 4.5 1.7l3.4-3.4C17.9 1.1 15.2 0 12 0 7.4 0 3.4 2.6 1.4 6.5l4 3.1C6.3 6.9 8.9 4.8 12 4.8z" />
      </svg>
    )
  }

  if (name === 'facebook') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#1877F2" />
        <path fill="#fff" d="M13.4 18.5v-6.1h2l.3-2.3h-2.3V8.6c0-.7.2-1.1 1.2-1.1H16V5.4c-.2 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.1v1.7H9.1v2.3h2.1v6.1h2.2z" />
      </svg>
    )
  }

  if (name === 'yelp') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="12" fill="#E10600" />
        <path fill="#fff" d="M12.2 13.2c.5.8.2 1.5-.6 1.8l-2.3.8c-.7.3-1.3-.1-1.4-.8l-.2-2.4c0-.8.6-1.3 1.4-1.1l2.2.5c.8.2 1.1.6.9 1.2zm2.4-1.5c.8-.2 1.5.2 1.6 1l.3 2.4c.1.8-.5 1.3-1.2 1.2l-2.2-.6c-.8-.2-1.1-.9-.8-1.6l.9-2c.3-.7.9-.9 1.4-.4zM11 7.2l1.6 1.8c.5.6.4 1.3-.3 1.6l-2.1.8c-.7.3-1.4-.1-1.5-.8L8.4 8.2c-.1-.7.4-1.3 1.1-1.4l1.2-.1c.2 0 .3.2.3.5zM14.8 6.4l.2 2.4c0 .8-.6 1.3-1.4 1.2l-2-.4c-.7-.2-1.1-.9-.8-1.6l.8-2c.3-.6.9-.9 1.5-.6l1.3.4c.2.1.4.4.4.6zM12.6 17.2l.6 1.8c.2.7-.2 1.3-.9 1.4l-1.6.2c-.7.1-1.3-.4-1.4-1.1l-.2-1.8c-.1-.6.3-1.2 1-1.3l1.6-.2c.4 0 .8.4.9 1z" />
      </svg>
    )
  }

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" />
    </svg>
  )
}

export function Icon({ name, size = 22, filled = false }) {
  if (name === 'google' || name === 'facebook' || name === 'yelp' || name === 'instagram') {
    return <Brand name={name} size={size} />
  }

  const props = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  }

  return (
    <svg {...props}>
      {name === 'search' && (
        <>
          <circle cx="11" cy="11" r="6.5" />
          <path d="M16 16.5 20 20.5" />
        </>
      )}
      {name === 'phone' && (
        <path d="M8 3.5h2.2l1.2 3-1.8 1.1a12 12 0 0 0 5.8 5.8l1.1-1.8 3 1.2V18a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 4 6.7 2 2 0 0 1 6 4.5H8z" />
      )}
      {name === 'pin' && (
        <>
          <path d="M12 21s7-6.1 7-11a7 7 0 1 0-14 0c0 4.9 7 11 7 11z" />
          <circle cx="12" cy="10" r="2.2" />
        </>
      )}
      {name === 'clock' && (
        <>
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v4.5l3 2" />
        </>
      )}
      {name === 'shield' && (
        <path d="M12 3 5 6v6.2c0 4.2 2.8 6.8 7 8.8 4.2-2 7-4.6 7-8.8V6l-7-3z" />
      )}
      {name === 'users' && (
        <>
          <path d="M8.5 12.5a3 3 0 1 0-3-3 3 3 0 0 0 3 3zM16.2 11.8a2.5 2.5 0 1 0-2.4-2.5 2.5 2.5 0 0 0 2.4 2.5z" />
          <path d="M3.5 19v-1.2A3.8 3.8 0 0 1 7.3 14h2.4a3.8 3.8 0 0 1 3.8 3.8V19" />
          <path d="M14 14.2h1.2A3.3 3.3 0 0 1 18.5 17.5V19" />
        </>
      )}
      {name === 'car' && (
        <>
          <path d="M4 15v2M20 15v2" />
          <path d="M5 15h14l-1.2-4.2a2 2 0 0 0-1.9-1.4H8.1a2 2 0 0 0-1.9 1.4L5 15z" />
          <path d="M3 15h18v2.5a1.5 1.5 0 0 1-1.5 1.5h-15A1.5 1.5 0 0 1 3 17.5V15z" />
          <circle cx="7.5" cy="17.2" r="0.8" fill="currentColor" />
          <circle cx="16.5" cy="17.2" r="0.8" fill="currentColor" />
        </>
      )}
      {name === 'star' && (
        <path
          d="m12 3.4 2.4 4.8 5.3.8-3.8 3.7.9 5.3L12 15.6 7.2 18l.9-5.3L4.3 9l5.3-.8L12 3.4z"
          fill={filled ? 'currentColor' : 'none'}
        />
      )}
      {name === 'calendar' && (
        <>
          <rect x="3.5" y="5" width="17" height="15" rx="2" />
          <path d="M3.5 10h17M8 3.5V6.5M16 3.5V6.5" />
        </>
      )}
      {name === 'arrow' && <path d="M5 12h14M13 6l6 6-6 6" />}
      {name === 'chevronLeft' && <path d="M14.5 6 8.5 12l6 6" />}
      {name === 'chevronRight' && <path d="M9.5 6l6 6-6 6" />}
      {name === 'check' && <path d="m5 12.5 4.2 4.2L19 7.5" />}
      {name === 'menu' && <path d="M4 7h16M4 12h16M4 17h16" />}
      {name === 'close' && <path d="M6 6l12 12M18 6 6 18" />}
      {name === 'wrench' && (
        <path d="M14.7 6.3a4.2 4.2 0 0 0-5.8 5.8L4 17l3 3 4.9-4.9a4.2 4.2 0 0 0 5.8-5.8L15 12l-3-3 2.7-2.7z" />
      )}
      {name === 'gauge' && (
        <>
          <path d="M4.5 16.5a8 8 0 1 1 15 0" />
          <path d="M12 14.5 16 9.5" />
          <path d="M5 19h14" />
        </>
      )}
      {name === 'snow' && (
        <>
          <path d="M12 3v18M3 12h18M6 6l12 12M18 6 6 18" />
          <path d="M12 6.5 10.2 4.2M12 6.5l1.8-2.3M12 17.5 10.2 19.8M12 17.5l1.8 2.3" />
        </>
      )}
      {name === 'scan' && (
        <>
          <rect x="3" y="4" width="18" height="12" rx="2" />
          <path d="M8 20h8M12 16v4" />
        </>
      )}
      {name === 'brake' && (
        <>
          <circle cx="12" cy="12" r="7.5" />
          <circle cx="12" cy="12" r="2.2" />
          <path d="M12 4.5V2.5M12 21.5V19.5M4.5 12H2.5M21.5 12H19.5" />
        </>
      )}
      {name === 'truck' && (
        <>
          <path d="M3 8h10v7H3z" />
          <path d="M13 11h4.2L20 14v1h-7" />
          <circle cx="7" cy="17.5" r="1.5" />
          <circle cx="16.5" cy="17.5" r="1.5" />
        </>
      )}
      {name === 'eye' && (
        <>
          <path d="M2.5 12S6 6.5 12 6.5 21.5 12 21.5 12 18 17.5 12 17.5 2.5 12 2.5 12z" />
          <circle cx="12" cy="12" r="2.4" />
        </>
      )}
      {name === 'gear' && (
        <>
          <circle cx="12" cy="12" r="3" />
          <path d="M12 3.5v2.2M12 18.3v2.2M3.5 12h2.2M18.3 12h2.2M6 6l1.6 1.6M16.4 16.4 18 18M18 6l-1.6 1.6M7.6 16.4 6 18" />
        </>
      )}
      {name === 'mail' && (
        <>
          <rect x="3" y="5.5" width="18" height="13" rx="2" />
          <path d="m4 7 8 6 8-6" />
        </>
      )}
      {name === 'chat' && (
        <path d="M6 17.5 3.5 20.5 8 18h8.5a3 3 0 0 0 3-3V7.5a3 3 0 0 0-3-3h-11a3 3 0 0 0-3 3V15a2.5 2.5 0 0 0 2 2.5z" />
      )}
    </svg>
  )
}
