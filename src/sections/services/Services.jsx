"use client";

import { useState, useContext } from "react";
import { useInView } from "@/hooks/useInView";
import { LanguageContext } from "@/components/i18n/LanguageContext";
import {
  LuCheck,
  LuSparkles,
  LuSend,
  LuInfo,
  LuExternalLink,
  LuCopy,
} from "react-icons/lu";

const TIERS_DATA = [
  {
    id: "basic",
    nameKey: "tier_basic_name",
    badgeKey: "tier_basic_badge",
    tech: "HTML5, CSS3, JavaScript",
    priceRange: "2$ ~ 5$",
    popular: false,
    tasks: [
      {
        id: "b1",
        textKey: "b1_task",
        discount: 0.2,
        link: "https://t.me/justfrompeace",
      },
      {
        id: "b2",
        textKey: "b2_task",
        discount: 0.2,
        link: "https://instagram.com/gv_behruz",
      },
      {
        id: "b3",
        textKey: "b3_task",
        discount: 0.5,
        link: "https://t.me/justfrompeace",
      },
    ],
  },
  {
    id: "standard",
    nameKey: "tier_standard_name",
    badgeKey: "tier_standard_badge",
    tech: "React, Vite, CSS / Tailwind",
    priceRange: "5$ ~ 9$",
    popular: true,
    tasks: [
      {
        id: "s1",
        textKey: "s1_task",
        discount: 0.4,
        link: "https://t.me/justfrompeace",
      },
      { id: "s2", textKey: "s2_task", discount: 0.3, link: null },
      {
        id: "s3",
        textKey: "s3_task",
        discount: 0.5,
        link: "https://t.me/gvbehruz",
      },
    ],
  },
  {
    id: "premium",
    nameKey: "tier_premium_name",
    badgeKey: "tier_premium_badge",
    tech: "Next.js, TypeScript, Tailwind CSS",
    priceRange: "10$ ~ 20$",
    popular: false,
    tasks: [
      { id: "p1", textKey: "p1_task", discount: 0.7, link: null },
      {
        id: "p2",
        textKey: "p2_task",
        discount: 1.0,
        link: "https://t.me/justfrompeace",
      },
      {
        id: "p3",
        textKey: "p3_task",
        discount: 2.0,
        link: "https://t.me/gvbehruz",
      },
    ],
  },
];

export default function Services() {
  const { t } = useContext(LanguageContext);
  const [sectionRef, isVisible] = useInView();
  const [selectedTier, setSelectedTier] = useState(TIERS_DATA[1]);
  const [completedTasks, setCompletedTasks] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    telegram: "",
    comment: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [trackingCode, setTrackingCode] = useState(null);
  const [copied, setCopied] = useState(false);

  const toggleTask = (taskId) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId],
    );
  };

  const handleSelectTier = (tier) => {
    setSelectedTier(tier);
    setCompletedTasks([]);
  };

  const isAllTasksCompleted =
    completedTasks.length === selectedTier.tasks.length;
  const standardDiscount = selectedTier.tasks
    .filter((task) => completedTasks.includes(task.id))
    .reduce((sum, item) => sum + item.discount, 0);

  const discountAmount = isAllTasksCompleted
    ? "50% MAX"
    : standardDiscount > 0
      ? `-${standardDiscount.toFixed(2)}$`
      : "0$";

  // Buyurtmani yuborish logikasi
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setTrackingCode(null);

    const payload = {
      ...formData,
      tier: t(selectedTier.nameKey),
      tech: selectedTier.tech,
      discount: discountAmount,
    };

    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok && data.success) {
        setTrackingCode(data.tracking_code);
        setSubmitStatus({
          ok: true,
          msg: "Buyurtmangiz muvaffaqiyatli qabul qilindi!",
        });
        setFormData({
          name: "",
          phone: "",
          email: "",
          telegram: "",
          comment: "",
        });
        setCompletedTasks([]);
      } else {
        setSubmitStatus({
          ok: false,
          msg: data.message || "Xatolik yuz berdi.",
        });
      }
    } catch {
      setSubmitStatus({
        ok: false,
        msg: "Server bilan bog'lanishda xatolik yuz berdi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyCode = () => {
    if (trackingCode) {
      navigator.clipboard.writeText(trackingCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section ref={sectionRef} className="w-full py-12 px-4 md:px-8 select-none">
      <div className="mx-auto max-w-6xl">
        {/* Sarlavha */}
        <div
          className={`mb-12 text-center transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <LuSparkles /> {t("services_badge")}
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
            {t("services_title")}
          </h2>
          <p className="max-w-2xl mx-auto text-sm md:text-base text-gray-600 dark:text-gray-400">
            {t("services_subtitle")}
          </p>
        </div>

        {/* 3 ta Tarif Kartasi */}
        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {TIERS_DATA.map((tier) => {
            const isSelected = selectedTier.id === tier.id;
            return (
              <div
                key={tier.id}
                onClick={() => handleSelectTier(tier)}
                className={`relative flex flex-col justify-between p-6 rounded-3xl cursor-pointer border backdrop-blur-md transform-gpu transition-all duration-200 ease-out ${
                  isSelected
                    ? "border-amber-500 bg-amber-500/10 dark:bg-amber-500/15 shadow-lg shadow-amber-500/15 -translate-y-2 ring-2 ring-amber-500"
                    : "border-gray-200 dark:border-white/10 bg-white/60 dark:bg-[#18181b]/60 hover:border-amber-500/50 hover:-translate-y-1 hover:shadow-md"
                } active:scale-[0.98]`}
              >
                {tier.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                    {t("popular_badge")}
                  </span>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-gray-300">
                      {t(tier.badgeKey)}
                    </span>
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center border transition-colors duration-150 ${
                        isSelected
                          ? "bg-amber-500 border-amber-500 text-white"
                          : "border-gray-300 dark:border-zinc-700"
                      }`}
                    >
                      {isSelected && <LuCheck size={12} className="stroke-3" />}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                    {t(tier.nameKey)}
                  </h3>
                  <p className="text-xs font-mono text-gray-500 dark:text-gray-400 mb-5">
                    {tier.tech}
                  </p>

                  <div className="mb-6">
                    <span className="text-3xl font-extrabold text-gray-900 dark:text-white">
                      {tier.priceRange}
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">
                      {t("per_project")}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className={`w-full py-2.5 rounded-xl font-bold text-sm transition-colors duration-150 ${
                    isSelected
                      ? "bg-amber-500 text-white shadow-md shadow-amber-500/25 hover:bg-amber-600"
                      : "bg-gray-100 dark:bg-zinc-800 text-gray-700 dark:text-zinc-300 hover:bg-amber-500/10 hover:text-amber-500"
                  }`}
                >
                  {isSelected ? t("tier_selected") : t("tier_select")}
                </button>
              </div>
            );
          })}
        </div>

        {/* Shartlar & Chegirma Kalkulyatori */}
        <div
          className={`p-6 md:p-8 rounded-3xl bg-white/60 dark:bg-[#18181b]/60 backdrop-blur-md border border-gray-200 dark:border-white/10 mb-8 shadow-xs transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-gray-200 dark:border-white/10">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <LuSparkles className="text-amber-500" />
                {t("task_section_title")}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
                {t("task_selected_tier")}:{" "}
                <span className="font-bold text-amber-500">
                  {t(selectedTier.nameKey)}
                </span>
                . {t("task_desc")}
              </p>
            </div>

            <div className="bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/30 px-4 py-2.5 rounded-2xl flex items-center gap-3">
              <div>
                <div className="text-[11px] uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold">
                  {t("your_discount")}
                </div>
                <div className="text-lg font-black text-amber-600 dark:text-amber-400">
                  {discountAmount}
                </div>
              </div>
              {isAllTasksCompleted && (
                <span className="text-xs bg-amber-500 text-white font-bold px-2 py-0.5 rounded-full animate-bounce">
                  {t("max_bonus")}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            {selectedTier.tasks.map((task, index) => {
              const isChecked = completedTasks.includes(task.id);
              return (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transform-gpu transition-all duration-150 ease-out flex flex-col justify-between ${
                    isChecked
                      ? "border-green-500 bg-green-500/10 dark:bg-green-500/15 shadow-sm"
                      : "border-gray-200 dark:border-white/5 bg-gray-50/50 dark:bg-zinc-900/50 hover:border-amber-500/40 hover:-translate-y-0.5"
                  } active:scale-[0.98]`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-xs font-bold text-gray-400">
                      0{index + 1}
                      {t("condition_label")}
                    </span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      -{task.discount}$
                    </span>
                  </div>

                  <p className="text-sm font-medium text-gray-800 dark:text-zinc-200 mb-3">
                    {t(task.textKey)}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-white/5">
                    {task.link ? (
                      <a
                        href={task.link}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                      >
                        {t("link_text")} <LuExternalLink size={11} />
                      </a>
                    ) : (
                      <span className="text-xs text-gray-400 font-medium">
                        {t("screenshot_text")}
                      </span>
                    )}

                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors duration-150 ${
                        isChecked
                          ? "bg-green-500 border-green-500 text-white"
                          : "border-gray-300 dark:border-zinc-700"
                      }`}
                    >
                      {isChecked && <LuCheck size={12} className="stroke-3" />}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex items-start gap-3 p-3.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-600 dark:text-blue-400 text-xs">
            <LuInfo size={18} className="shrink-0 mt-0.5" />
            <div className="leading-relaxed">{t("pricing_notice")}</div>
          </div>
        </div>

        {/* BUYURTMA FORMASI */}
        <div
          className={`p-6 md:p-8 rounded-3xl bg-white/60 dark:bg-[#18181b]/60 backdrop-blur-md border border-gray-200 dark:border-white/10 shadow-xs transition-all duration-700 ease-out transform ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
              {t("form_title")}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {t("form_subtitle")}
            </p>
          </div>

          {trackingCode ? (
            <div className="p-6 rounded-2xl bg-green-500/10 border border-green-500/30 text-center space-y-4">
              <div className="text-green-600 dark:text-green-400 font-bold text-base">
                🎉 Buyurtmangiz muvaffaqiyatli qabul qilindi!
              </div>
              <p className="text-xs text-zinc-600 dark:text-zinc-300">
                Sizning maxfiy tracking kodingiz (uni saqlab qo`ying, faqat
                sizga ko`rinadi):
              </p>
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-zinc-900 text-amber-400 font-mono text-xl font-bold tracking-widest">
                {trackingCode}
                <button
                  onClick={copyCode}
                  className="text-xs text-white hover:text-amber-400 flex items-center gap-1 bg-zinc-800 px-3 py-1.5 rounded-lg"
                >
                  <LuCopy size={14} /> {copied ? "Nusxalandi!" : "Nusxalash"}
                </button>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Kutish vaqtini kamaytirish uchun Telegram orqali menga
                yozishingiz mumkin:{" "}
                <a
                  href="https://t.me/gvbehruz"
                  target="_blank"
                  className="text-amber-500 font-bold underline"
                >
                  @gvbehruz
                </a>
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="space-y-4 max-w-2xl mx-auto"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                    {t("form_name")}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder={t("form_name_ph")}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-gray-300 dark:border-zinc-700 focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                    {t("form_phone")}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+998 90 123 45 67"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-gray-300 dark:border-zinc-700 focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                    {t("form_email")}
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="sizningnomingiz@gmail.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-gray-300 dark:border-zinc-700 focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 text-gray-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                    {t("form_tg")}
                  </label>
                  <input
                    type="text"
                    placeholder="@username"
                    value={formData.telegram}
                    onChange={(e) =>
                      setFormData({ ...formData, telegram: e.target.value })
                    }
                    className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-gray-300 dark:border-zinc-700 focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 text-gray-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-zinc-300 mb-1">
                  {t("form_comment")}
                </label>
                <textarea
                  rows={3}
                  placeholder={t("form_comment_ph")}
                  value={formData.comment}
                  onChange={(e) =>
                    setFormData({ ...formData, comment: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-gray-300 dark:border-zinc-700 focus:outline-none focus:border-amber-500 dark:focus:border-amber-500 text-gray-900 dark:text-white"
                />
              </div>

              {submitStatus && (
                <div
                  className={`p-3 rounded-xl text-xs font-semibold ${
                    submitStatus.ok
                      ? "bg-green-500/10 text-green-600 border border-green-500/20"
                      : "bg-red-500/10 text-red-600 border border-red-500/20"
                  }`}
                >
                  {submitStatus.msg}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-6 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 active:scale-[0.99] shadow-md shadow-amber-500/20 transition-all duration-150 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
              >
                <LuSend size={16} />
                {isSubmitting ? "Yuborilmoqda..." : "Buyurtmani Tasdiqlash"}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
