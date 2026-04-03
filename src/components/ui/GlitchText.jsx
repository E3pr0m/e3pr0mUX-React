export default function GlitchText({ text, className = '', as: Tag = 'span' }) {
  return (
    <Tag
      className={`glitch-text relative inline-block ${className}`}
      data-text={text}
    >
      {text}
    </Tag>
  )
}
