import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"

const philosophyItems = [
  {
    title: "Индивидуальный подход",
    description:
      "Каждая ситуация уникальна. Мы внимательно изучаем обстоятельства каждого человека, чтобы подобрать наиболее подходящие меры поддержки.",
  },
  {
    title: "Правовая защита",
    description:
      "Помогаем разобраться в законодательстве о занятости, правах безработных и порядке получения всех положенных льгот и выплат.",
  },
  {
    title: "Скорость и доступность",
    description:
      "Вы не должны ждать месяцами. Мы оказываем помощь оперативно и понятно, без бюрократических барьеров и сложного языка.",
  },
  {
    title: "Долгосрочная поддержка",
    description: "Мы сопровождаем вас не только в получении пособий, но и в поиске новой работы и восстановлении финансовой стабильности.",
  },
]

export function Philosophy() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Number(entry.target.getAttribute("data-index"))
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])])
          }
        })
      },
      { threshold: 0.3 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="about" className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наш подход</p>
            <h2 className="text-6xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
              Помощь с
              <br />
              <HighlightedText>заботой</HighlightedText>
            </h2>

            <div className="relative hidden lg:block">
              <img
                src="https://cdn.poehali.dev/projects/746d945a-a1b6-4198-b948-3edf40a1b8c7/files/1f2ee63e-8461-41f8-841b-fd9809c6db73.jpg"
                alt="Центр социальной поддержки"
                className="opacity-90 relative z-10 w-full rounded-sm object-cover"
              />
            </div>
          </div>

          <div className="space-y-6 lg:pt-48">
            <p className="text-muted-foreground text-lg leading-relaxed max-w-md mb-12">
              Потеря работы — это стресс. Мы рядом, чтобы бесплатно помочь вам разобраться в системе социальной поддержки и получить все выплаты и льготы, на которые вы имеете право.
            </p>

            {philosophyItems.map((item, index) => (
              <div
                key={item.title}
                ref={(el) => {
                  itemRefs.current[index] = el
                }}
                data-index={index}
                className={`transition-all duration-700 ${
                  visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex gap-6">
                  <span className="text-muted-foreground/50 text-sm font-medium">0{index + 1}</span>
                  <div>
                    <h3 className="text-xl font-medium mb-3">{item.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}