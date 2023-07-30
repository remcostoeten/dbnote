function PostIntro({ title, text }) {
  return (
    <div className="grid gap-1">
      <h1 className="font-heading text-3xl md:text-4xl">{title}</h1>
      <p className="text-lg text-muted-foreground">{text}</p>
    </div>
  )
}

export default PostIntro
