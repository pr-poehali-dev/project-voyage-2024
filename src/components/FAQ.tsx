import { useState } from "react"
import { Plus } from "lucide-react"

const faqs = [
  {
    question: "Кто может обратиться за помощью?",
    answer:
      "Помощь оказывается всем гражданам России, потерявшим работу или находящимся под угрозой увольнения. Неважно, сколько времени вы уже без работы — мы поможем на любом этапе.",
  },
  {
    question: "Сколько стоят ваши услуги?",
    answer:
      "Все услуги — абсолютно бесплатно. Консультации, помощь с документами, сопровождение в центр занятости, помощь в поиске работы — за всё это вы не платите ни рубля.",
  },
  {
    question: "Как быстро можно получить пособие?",
    answer:
      "При правильно оформленных документах пособие назначается в течение 10 рабочих дней после постановки на учёт в центре занятости. Мы помогаем избежать типичных ошибок, которые затягивают этот процесс.",
  },
  {
    question: "Какие документы нужны для оформления?",
    answer:
      "Базовый пакет: паспорт, трудовая книжка, справка о зарплате за последние 3 месяца. Точный список зависит от вашей ситуации — мы составим индивидуальный перечень после анкетирования.",
  },
  {
    question: "Можно ли получить помощь в другом городе?",
    answer:
      "Да, мы работаем по всей России. Консультации проводятся онлайн — через звонок или видеосвязь. Для оформления документов в вашем городе мы подготовим всё необходимое удалённо.",
  },
  {
    question: "Что делать, если в пособии уже отказали?",
    answer:
      "Отказ можно оспорить. Мы изучим причину отказа, поможем исправить ошибки и при необходимости подготовим жалобу в вышестоящие органы. Многие отказы удаётся успешно обжаловать.",
  },
]

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section id="faq" className="py-20 md:py-29">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-16">
          <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Вопросы</p>
          <h2 className="text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
            Частые вопросы
          </h2>
        </div>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-border">
              <button
                onClick={() => toggleQuestion(index)}
                className="w-full py-6 flex items-start justify-between gap-6 text-left group"
              >
                <span className="text-lg font-medium text-foreground transition-colors group-hover:text-foreground/70">
                  {faq.question}
                </span>
                <Plus
                  className={`w-6 h-6 text-foreground flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? "rotate-45" : "rotate-0"
                  }`}
                  strokeWidth={1.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-muted-foreground leading-relaxed pb-6 pr-12">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}