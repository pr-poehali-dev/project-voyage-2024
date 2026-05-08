import { useState, useEffect, useRef } from "react"
import Icon from "@/components/ui/icon"

const steps = [
  {
    id: 1,
    title: "Подайте анкету",
    category: "Шаг 1",
    description: "Заполните короткую анкету онлайн — это займёт не более 5 минут",
    image: "/images/hously-1.png",
  },
  {
    id: 2,
    title: "Получите консультацию",
    category: "Шаг 2",
    description: "Наш специалист свяжется с вами и расскажет о доступных мерах поддержки",
    image: "/images/hously-2.png",
  },
  {
    id: 3,
    title: "Оформите документы",
    category: "Шаг 3",
    description: "Поможем собрать и подать все необходимые документы в государственные органы",
    image: "/images/hously-3.png",
  },
  {
    id: 4,
    title: "Получите выплаты",
    category: "Шаг 4",
    description: "Начнёте получать пособия и льготы, на которые имеете право по закону",
    image: "/images/hously-4.png",
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
