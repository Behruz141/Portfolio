"use client";

import { useState, useEffect } from "react";
import { LuRefreshCw, LuSearch } from "react-icons/lu";

export default function AdminPanel() {
  const [checking, setChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [isOpen, setIsOpen] = useState(true);
  const [statusSaving, setStatusSaving] = useState(false);

  const fetchStatus = async () => {
    try {
      const res = await fetch("/api/status", { cache: "no-store" });
      const data = await res.json();
      if (typeof data.isOpenForWork === "boolean") {
        setIsOpen(data.isOpenForWork);
      }
    } catch {}
  };

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", { cache: "no-store" });
      if (res.status === 401) {
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      if (data.success) setOrders(data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Sahifa ochilganda: cookie bor bo'lsa, qayta parol so'ramaymiz
  useEffect(() => {
    fetch("/api/admin/login", { cache: "no-store" })
      .then((r) => r.json())
      .then((d) => {
        if (d.authenticated) {
          setIsAuthenticated(true);
          fetchOrders();
          fetchStatus();
        }
      })
      .catch(() => {})
      .finally(() => setChecking(false));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setPassword("");
        setIsAuthenticated(true);
        fetchOrders();
        fetchStatus();
      } else {
        alert(data.error || "Parol noto'g'ri!");
      }
    } catch {
      alert("Serverga ulanib bo'lmadi!");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" }).catch(() => {});
    setIsAuthenticated(false);
    setOrders([]);
  };

  const toggleOpen = async () => {
    const next = !isOpen;
    setStatusSaving(true);
    try {
      const res = await fetch("/api/status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isOpenForWork: next }),
      });
      const data = await res.json();
      if (data.success) setIsOpen(next);
      else alert(data.error || "Statusni o'zgartirib bo'lmadi!");
    } catch {
      alert("Statusni o'zgartirishda xatolik!");
    } finally {
      setStatusSaving(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const res = await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) fetchOrders();
      else alert(data.error || "Statusni o'zgartirishda xatolik!");
    } catch {
      alert("Statusni o'zgartirishda xatolik!");
    }
  };

  const filteredOrders = orders.filter(
    (order) =>
      order.tracking_code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (checking) {
    return <div className="min-h-screen bg-zinc-950" />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 select-none">
        <form
          onSubmit={handleLogin}
          className="p-8 rounded-3xl bg-zinc-900 border border-white/10 max-w-sm w-full shadow-2xl space-y-4"
        >
          <div className="text-center mb-6">
            <h1 className="text-xl font-black text-white">
              Maxfiy Admin Panel
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              Kirish uchun parolni kiriting
            </p>
          </div>
          <input
            type="password"
            placeholder="Parol..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-sm rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:border-amber-500"
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 transition-colors cursor-pointer"
          >
            Kirish
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12 select-none">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl font-black">
              Buyurtmalarni Boshqarish Paneli
            </h1>
            <p className="text-xs text-zinc-400">
              Kelib tushgan barcha buyurtmalar va ularning maxfiy kodlari
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                fetchOrders();
                fetchStatus();
              }}
              className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-bold hover:bg-zinc-800 flex items-center gap-2 cursor-pointer"
            >
              <LuRefreshCw
                size={14}
                className={loading ? "animate-spin" : ""}
              />{" "}
              Yangilash
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/20 cursor-pointer"
            >
              Chiqish
            </button>
          </div>
        </div>

        {/* Ish holati belgisi */}
        <div className="flex items-center justify-between gap-4 p-5 rounded-3xl bg-zinc-900 border border-zinc-800">
          <div>
            <h2 className="text-sm font-bold">Saytdagi ish holati belgisi</h2>
            <p className="text-xs text-zinc-400 mt-1">
              Hozir:{" "}
              <span className={isOpen ? "text-emerald-400" : "text-red-400"}>
                {isOpen ? "Yangi loyihalar uchun ochiqman" : "Hozircha bandman"}
              </span>
            </p>
          </div>
          <button
            onClick={toggleOpen}
            disabled={statusSaving}
            className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer disabled:opacity-50 ${
              isOpen
                ? "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                : "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
            }`}
          >
            {statusSaving
              ? "Saqlanmoqda..."
              : isOpen
                ? "Band qilish"
                : "Ochiq qilish"}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <LuSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            size={18}
          />
          <input
            type="text"
            placeholder="6 xonali tracking kod yoki mijoz ismi bo'yicha qidirish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3.5 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors"
          />
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16 bg-zinc-900/50 rounded-3xl border border-zinc-800 text-zinc-500 text-sm">
              Hozircha buyurtmalar mavjud emas.
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition-all hover:border-zinc-700"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-mono text-xs font-bold tracking-widest border border-amber-500/20">
                      #{order.tracking_code}
                    </span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider ${
                        order.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          : order.status === "approved"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : order.status === "completed"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {order.status === "pending"
                        ? "Kutilmoqda"
                        : order.status === "approved"
                          ? "Qabul qilindi"
                          : order.status === "completed"
                            ? "Bajarildi"
                            : "Rad etildi"}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white flex items-center gap-2">
                      {order.name}{" "}
                      <span className="text-xs font-normal text-zinc-400">
                        ({order.phone})
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Email:{" "}
                      <span className="text-zinc-200">{order.email}</span> | TG:{" "}
                      <span className="text-amber-400">
                        {order.telegram || "Kiritilmagan"}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                    <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 font-semibold">
                      Tarif: {order.tier}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-300 font-semibold">
                      Chegirma: {order.discount}
                    </span>
                  </div>

                  {order.comment && (
                    <p className="text-xs text-zinc-400 bg-zinc-950 p-3 rounded-xl border border-zinc-800/80">
                      <strong className="text-zinc-300">Izoh:</strong>{" "}
                      {order.comment}
                    </p>
                  )}
                </div>

                <div className="flex flex-wrap md:flex-col gap-2 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => updateStatus(order.id, "approved")}
                    className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Qabul qilish
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, "completed")}
                    className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Bajarildi (Tugatish)
                  </button>
                  <button
                    onClick={() => updateStatus(order.id, "rejected")}
                    className="flex-1 md:flex-none px-4 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-bold transition-colors cursor-pointer"
                  >
                    Rad etish
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
