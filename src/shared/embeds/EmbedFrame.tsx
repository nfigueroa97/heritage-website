type EmbedFrameProps = {
  title: string
  src: string
  fallbackHref: string
  fallbackLabel: string
}

export function EmbedFrame({ title, src, fallbackHref, fallbackLabel }: EmbedFrameProps) {
  return (
    <>
      <iframe title={title} src={src} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      <a className="embed-fallback" href={fallbackHref} target="_blank" rel="noreferrer">
        {fallbackLabel}
      </a>
    </>
  )
}
