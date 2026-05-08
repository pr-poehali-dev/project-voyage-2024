import { useEffect, useRef, useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

const expertiseAreas = [
  {
    title: "Пособие по безработице — бесплатно",
    description: "Бесплатно помогаем оформить пособие по безработице в максимально короткие сроки. Рассчитаем сумму выплат и подготовим все документы.",
    icon: "Banknote",
  },
  {
    title: "Постановка на учёт — бесплатно",
    description: "Бесплатно сопроводим при постановке на учёт в центр занятости, поможем подготовить документы и пройти все необходимые процедуры.",
    icon: "Building2",
  },
  {
    title: "Льготы и субсидии — бесплатно",
    description: "Бесплатная консультация по всем льготам: скидки на ЖКХ, льготный проезд, материальная помощь и другие меры государственной поддержки.",
    icon: "HandHeart",
  },
  {
    title: "Помощь в поиске работы — бесплатно",
    description: "Бесплатно поможем составить резюме, подготовиться к собеседованию и найти вакансии через биржи труда и программы переобучения.",
    icon: "Briefcase",
  },
]

export function Expertise() {
  const [visibleItems, setVisibleItems] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)
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
      { threshold: 0.2 },
    )

    itemRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="py-32 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Наши услуги</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-8xl">
            <HighlightedText>Поддержка</HighlightedText> на каждом
            <br />
            этапе
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Все услуги — абсолютно бесплатно. Мы знаем систему социального обеспечения изнутри и помогаем получить все положенные выплаты и льготы без лишних сложностей.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
          {expertiseAreas.map((area, index) => (
            <div
              key={area.title}
              ref={(el) => {
                itemRefs.current[index] = el
              }}
              data-index={index}
              className={`relative pl-8 border-l border-border transition-all duration-700 ${
                visibleItems.includes(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div
                className={`transition-all duration-1000 ${
                  visibleItems.includes(index) ? "animate-draw-stroke" : ""
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <Icon name={area.icon} size={40} className="mb-4 text-foreground" fallback="CircleHelp" />
              </div>
              <h3 className="text-xl font-medium mb-4">{area.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{area.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}