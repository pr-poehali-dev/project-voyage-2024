import { useState, useEffect, useRef } from "react"
import Icon from "@/components/ui/icon"

const steps = [
  {
    id: 1,
    title: "Подайте анкету",
    category: "Шаг 1",
    description: "Заполните короткую анкету онлайн — это займёт не более 5 минут. Полностью бесплатно.",
    image: "https://cdn.poehali.dev/projects/746d945a-a1b6-4198-b948-3edf40a1b8c7/files/01e78ce2-e8c3-4ddf-b491-d854e1bb3f56.jpg",
  },
  {
    id: 2,
    title: "Бесплатная консультация",
    category: "Шаг 2",
    description: "Специалист свяжется с вами и бесплатно расскажет о всех доступных мерах поддержки",
    image: "https://cdn.poehali.dev/projects/746d945a-a1b6-4198-b948-3edf40a1b8c7/files/603b0865-d0fb-42d4-b45f-dfb8c371f81a.jpg",
  },
  {
    id: 3,
    title: "Помощь с документами",
    category: "Шаг 3",
    description: "Бесплатно поможем собрать и подать все необходимые документы в государственные органы",
    image: "https://cdn.poehali.dev/projects/746d945a-a1b6-4198-b948-3edf40a1b8c7/files/68318b8a-90c9-41c8-9f3e-86cdefabfd61.jpg",
  },
  {
    id: 4,
    title: "Получите выплаты",
    category: "Шаг 4",
    description: "Начнёте получать пособия и льготы, на которые имеете право по закону",
    image: "https://cdn.poehali.dev/projects/746d945a-a1b6-4198-b948-3edf40a1b8c7/files/ec73efe1-12b5-40bb-87e6-5708422e137a.jpg",
  },
]

export function Projects() {
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const [revealedImages, setRevealedImages] = useState<Set<number>>(new Set())
  const imageRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target as HTMLDivElement)
            if (index !== -1) {
              setRevealedImages((prev) => new Set(prev).add(steps[index].id))
            }
          }
        })
      },
      { threshold: 0.2 },
    )

    imageRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects" className="py-32 md:py-29 bg-secondary/50">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Как это работает</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight">4 шага к помощи</h2>
          </div>
          <a
            href="#questionnaire"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
          >
            Начать сейчас
            <Icon name="ArrowUpRight" size={16} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>

        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {steps.map((step, index) => (
            <article
              key={step.id}
              className="group cursor-pointer"
              onMouseEnter={() => setHoveredId(step.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div ref={(el) => (imageRefs.current[index] = el)} className="relative overflow-hidden aspect-[4/3] mb-6">
                <img
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    hoveredId === step.id ? "scale-105" : "scale-100"
                  }`}
                />
                <div
                  className="absolute inset-0 bg-primary origin-top"
                  style={{
                    transform: revealedImages.has(step.id) ? "scaleY(0)" : "scaleY(1)",
                    transition: "transform 1.5s cubic-bezier(0.76, 0, 0.24, 1)",
                  }}
                />
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-medium mb-2 group-hover:underline underline-offset-4">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </div>
                <span className="text-muted-foreground/60 text-sm font-medium whitespace-nowrap">{step.category}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}