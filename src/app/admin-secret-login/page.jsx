"use client";

import { useState, useEffect } from "react";
import {
  LuSearch,
  LuCheck,
  LuX,
  LuRotateCcw,
  LuLogOut,
  LuShoppingBag,
} from "react-icons/lu";
import { supabase } from "@/lib/supabase";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const SECRET_PASSWORD = "behruz2025"; // O'zingizning parolingiz

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      alert("Parol noto'g'ri!");
    }
  };

  const fetchOrders = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setOrders(data || []);
    setLoading(false);
  };

  // Statusni o'zgartirish (qabul qilish, rad etish, tugatish)
  const updateOrderStatus = async (id, newStatus) => {
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus })
      .eq("id", id);

    if (!error) {
      fetchOrders();
    } else {
      alert("Xatolik yuz berdi!");
    }
  };

  // Qidiruv (6 xonali kod yoki ism bo'yicha)
  const filteredOrders = orders.filter(
    (order) =>
      order.tracking_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4">
        <form
          onSubmit={handleLogin}
          className="p-8 rounded-3xl bg-zinc-900 border border-white/10 max-w-sm w-full shadow-2xl space-y-4"
        >
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-white">Maxfiy Admin Panel</h1>
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
            className="w-full py-3 rounded-xl font-bold text-white bg-amber-500 hover:bg-amber-600 transition-colors"
          >
            Kirish
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-6">
          <div>
            <h1 className="text-2xl font-black flex items-center gap-2">
              <LuShoppingBag className="text-amber-500" /> Buyurtmalar
              Boshqaruvi
            </h1>
            <p className="text-xs text-zinc-400">
              Jami buyurtmalar: {orders.length} ta
            </p>
          </div>
          <button
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/20"
          >
            <LuLogOut size={14} /> Chiqish
          </button>
        </div>

        {/* Search qismi */}
        <div className="relative">
          <LuSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
            size={18}
          />
          <input
            type="text"
            placeholder="6 xonali kod, Ism yoki Email bo'yicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 text-sm text-white focus:outline-none focus:border-amber-500"
          />
        </div>

        {/* Buyurtmalar ro'yxati */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-zinc-500">
              Yuklanmoqda...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 bg-zinc-900/50 rounded-3xl border border-zinc-800">
              Buyurtmalar topilmadi.
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-3xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-mono text-xs font-bold tracking-widest border border-amber-500/20">
                      #{order.tracking_code}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        order.status === "approved"
                          ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                          : order.status === "completed"
                            ? "bg-green-500/10 text-green-400 border border-green-500/20"
                            : order.status === "rejected"
                              ? "bg-red-500/10 text-red-400 border border-red-500/20"
                              : "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                      }`}
                    >
                      {order.status.toUpperCase()}
                    </span>
                    <span className="text-xs text-zinc-500">
                      {new Date(order.created_at).toLocaleString()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {order.name}{" "}
                      <span className="text-xs font-normal text-zinc-400">
                        ({order.tier})
                      </span>
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Tel:{" "}
                      <a href={`tel:${order.phone}`} className="text-amber-400">
                        {order.phone}
                      </a>{" "}
                      | Email: {order.email} | TG: {order.telegram || "Yo'q"}
                    </p>
                    <p className="text-xs text-zinc-300 mt-2 bg-zinc-950 p-3 rounded-xl border border-zinc-800/80">
                      <strong>Izoh:</strong>{" "}
                      {order.comment || "Izoh yozilmagan"}
                    </p>
                  </div>
                </div>

                {/* Boshqaruv tugmalari */}
                <div className="flex items-center gap-2 shrink-0">
                  {order.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateOrderStatus(order.id, "approved")}
                        className="px-4 py-2 rounded-xl bg-blue-500 text-white text-xs font-bold hover:bg-blue-600 flex items-center gap-1"
                      >
                        <LuCheck size={14} /> Qabul qilish
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, "rejected")}
                        className="px-4 py-2 rounded-xl bg-red-500/10 text-red-400 text-xs font-bold hover:bg-red-500/20 flex items-center gap-1"
                      >
                        <LuX size={14} /> Rad etish
                      </button>
                    </>
                  )}

                  {order.status === "approved" && (
                    <>
                      <button
                        onClick={() => updateOrderStatus(order.id, "completed")}
                        className="px-4 py-2 rounded-xl bg-green-500 text-white text-xs font-bold hover:bg-green-600 flex items-center gap-1"
                      >
                        <LuCheck size={14} /> Bajarildi deb belgilash
                      </button>
                      <button
                        onClick={() => updateOrderStatus(order.id, "pending")}
                        className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold hover:bg-zinc-700 flex items-center gap-1"
                      >
                        <LuRotateCcw size={14} /> Bekor qilish
                      </button>
                    </>
                  )}

                  {(order.status === "completed" ||
                    order.status === "rejected") && (
                    <button
                      onClick={() => updateOrderStatus(order.id, "pending")}
                      className="px-4 py-2 rounded-xl bg-zinc-800 text-zinc-300 text-xs font-bold hover:bg-zinc-700 flex items-center gap-1"
                    >
                      <LuRotateCcw size={14} /> Qaytadan ochish
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
