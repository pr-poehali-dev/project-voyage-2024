import { useState } from "react"
import { HighlightedText } from "./HighlightedText"
import Icon from "@/components/ui/icon"

type FormData = {
  name: string
  phone: string
  region: string
  employmentStatus: string
  lastJobDate: string
  reason: string
  hasDocuments: string
  benefits: string[]
  comment: string
}

const benefitOptions = [
  "Пособие по безработице",
  "Субсидия на ЖКХ",
  "Льготный проезд",
  "Материальная помощь",
  "Помощь в поиске работы",
  "Переобучение / курсы",
]

export function Questionnaire() {
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    region: "",
    employmentStatus: "",
    lastJobDate: "",
    reason: "",
    hasDocuments: "",
    benefits: [],
    comment: "",
  })

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const toggleBenefit = (benefit: string) => {
    setForm((prev) => ({
      ...prev,
      benefits: prev.benefits.includes(benefit)
        ? prev.benefits.filter((b) => b !== benefit)
        : [...prev.benefits, benefit],
    }))
  }

  const canNext1 = form.name.trim() && form.phone.trim() && form.region.trim()
  const canNext2 = form.employmentStatus && form.lastJobDate && form.reason
  const canSubmit = form.hasDocuments && form.benefits.length > 0

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section id="questionnaire" className="py-32 md:py-29 bg-secondary/30">
      <div className="container mx-auto px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-16">
            <p className="text-muted-foreground text-sm tracking-[0.3em] uppercase mb-6">Первый шаг</p>
            <h2 className="text-5xl md:text-6xl font-medium leading-[1.15] tracking-tight mb-6 text-balance lg:text-7xl">
              Заполните <HighlightedText>анкету</HighlightedText>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Ответьте на несколько вопросов — это поможет нам подобрать именно те меры поддержки, которые подходят вам.
            </p>
          </div>

          {submitted ? (
            <div className="text-center py-20 space-y-6">
              <div className="w-16 h-16 bg-foreground rounded-full flex items-center justify-center mx-auto">
                <Icon name="Check" size={32} className="text-primary-foreground" />
              </div>
              <h3 className="text-3xl font-medium">Анкета отправлена!</h3>
              <p className="text-muted-foreground text-lg max-w-md mx-auto">
                Спасибо, {form.name}! Наш специалист свяжется с вами по номеру {form.phone} в течение одного рабочего дня.
              </p>
              <button
                onClick={() => { setSubmitted(false); setStep(1); setForm({ name: "", phone: "", region: "", employmentStatus: "", lastJobDate: "", reason: "", hasDocuments: "", benefits: [], comment: "" }) }}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
              >
                Заполнить новую анкету
              </button>
            </div>
          ) : (
            <div>
              {/* Progress */}
              <div className="flex items-center gap-4 mb-12">
                {[1, 2, 3].map((s) => (
                  <div key={s} className="flex items-center gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors duration-300 ${
                      s < step ? "bg-foreground text-primary-foreground" :
                      s === step ? "bg-foreground text-primary-foreground" :
                      "bg-secondary text-muted-foreground"
                    }`}>
                      {s < step ? <Icon name="Check" size={14} /> : s}
                    </div>
                    <span className={`text-sm ${s === step ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                      {s === 1 ? "Контакты" : s === 2 ? "Ситуация" : "Пожелания"}
                    </span>
                    {s < 3 && <div className={`w-12 h-px transition-colors duration-300 ${s < step ? "bg-foreground" : "bg-border"}`} />}
                  </div>
                ))}
              </div>

              <form onSubmit={handleSubmit}>
                {/* Step 1 */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Ваше имя *</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => update("name", e.target.value)}
                        placeholder="Иван Иванов"
                        className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Номер телефона *</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update("phone", e.target.value)}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Регион проживания *</label>
                      <input
                        type="text"
                        value={form.region}
                        onChange={(e) => update("region", e.target.value)}
                        placeholder="Например: Москва, Новосибирск..."
                        className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      disabled={!canNext1}
                      className="inline-flex items-center gap-3 bg-foreground text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-foreground/80 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed group"
                    >
                      Далее
                      <Icon name="ArrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                )}

                {/* Step 2 */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">Ваша текущая ситуация *</label>
                      <div className="space-y-2">
                        {[
                          "Только потерял(а) работу",
                          "Без работы 1–3 месяца",
                          "Без работы более 3 месяцев",
                          "Нахожусь под угрозой увольнения",
                          "Другое",
                        ].map((option) => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${form.employmentStatus === option ? "border-foreground bg-foreground" : "border-border group-hover:border-foreground"}`}>
                              {form.employmentStatus === option && <Icon name="Check" size={10} className="text-primary-foreground" />}
                            </div>
                            <input
                              type="radio"
                              name="employmentStatus"
                              value={option}
                              checked={form.employmentStatus === option}
                              onChange={(e) => update("employmentStatus", e.target.value)}
                              className="sr-only"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Дата последнего места работы *</label>
                      <input
                        type="month"
                        value={form.lastJobDate}
                        onChange={(e) => update("lastJobDate", e.target.value)}
                        className="w-full px-4 py-3 bg-background border border-border text-foreground focus:outline-none focus:border-foreground transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">Причина увольнения *</label>
                      <div className="space-y-2">
                        {[
                          "Сокращение штата",
                          "Ликвидация организации",
                          "Собственное желание",
                          "По соглашению сторон",
                          "Другое",
                        ].map((option) => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${form.reason === option ? "border-foreground bg-foreground" : "border-border group-hover:border-foreground"}`}>
                              {form.reason === option && <Icon name="Check" size={10} className="text-primary-foreground" />}
                            </div>
                            <input
                              type="radio"
                              name="reason"
                              value={option}
                              checked={form.reason === option}
                              onChange={(e) => update("reason", e.target.value)}
                              className="sr-only"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="inline-flex items-center gap-2 border border-border px-8 py-4 text-sm tracking-wide hover:border-foreground transition-colors duration-300 group"
                      >
                        <Icon name="ArrowLeft" size={16} className="transition-transform group-hover:-translate-x-1" />
                        Назад
                      </button>
                      <button
                        type="button"
                        onClick={() => setStep(3)}
                        disabled={!canNext2}
                        className="inline-flex items-center gap-3 bg-foreground text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-foreground/80 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed group"
                      >
                        Далее
                        <Icon name="ArrowRight" size={16} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3 */}
                {step === 3 && (
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-3">Есть ли у вас трудовая книжка и справки с работы? *</label>
                      <div className="space-y-2">
                        {[
                          "Да, все документы в наличии",
                          "Есть частично",
                          "Нет, нужна помощь с получением",
                        ].map((option) => (
                          <label key={option} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${form.hasDocuments === option ? "border-foreground bg-foreground" : "border-border group-hover:border-foreground"}`}>
                              {form.hasDocuments === option && <Icon name="Check" size={10} className="text-primary-foreground" />}
                            </div>
                            <input
                              type="radio"
                              name="hasDocuments"
                              value={option}
                              checked={form.hasDocuments === option}
                              onChange={(e) => update("hasDocuments", e.target.value)}
                              className="sr-only"
                            />
                            <span className="text-sm">{option}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-3">Какая помощь вам нужна? * (можно выбрать несколько)</label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {benefitOptions.map((benefit) => (
                          <label key={benefit} className="flex items-center gap-3 cursor-pointer group">
                            <div
                              className={`w-4 h-4 border flex items-center justify-center transition-colors ${form.benefits.includes(benefit) ? "border-foreground bg-foreground" : "border-border group-hover:border-foreground"}`}
                              onClick={() => toggleBenefit(benefit)}
                            >
                              {form.benefits.includes(benefit) && <Icon name="Check" size={10} className="text-primary-foreground" />}
                            </div>
                            <span className="text-sm" onClick={() => toggleBenefit(benefit)}>{benefit}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">Дополнительный комментарий</label>
                      <textarea
                        value={form.comment}
                        onChange={(e) => update("comment", e.target.value)}
                        rows={4}
                        placeholder="Расскажите о своей ситуации подробнее..."
                        className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors resize-none"
                      />
                    </div>

                    <p className="text-xs text-muted-foreground">
                      Нажимая «Отправить», вы соглашаетесь на обработку персональных данных в соответствии с политикой конфиденциальности.
                    </p>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(2)}
                        className="inline-flex items-center gap-2 border border-border px-8 py-4 text-sm tracking-wide hover:border-foreground transition-colors duration-300 group"
                      >
                        <Icon name="ArrowLeft" size={16} className="transition-transform group-hover:-translate-x-1" />
                        Назад
                      </button>
                      <button
                        type="submit"
                        disabled={!canSubmit}
                        className="inline-flex items-center gap-3 bg-foreground text-primary-foreground px-8 py-4 text-sm tracking-wide hover:bg-foreground/80 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed group"
                      >
                        Отправить анкету
                        <Icon name="Send" size={16} className="transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
