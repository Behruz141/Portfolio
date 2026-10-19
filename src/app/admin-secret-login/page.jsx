"use client";

import { useState, useEffect, useCallback, useSyncExternalStore } from "react";
import { getAllOrders, updateOrderStatus } from "@/lib/orders";
import { LuSearch, LuLogOut } from "react-icons/lu";

const SECRET_PASSWORD = "behruz2025"; // O'zingizning parolingiz
const AUTH_EVENT = "admin-auth-change";

// localStorage dagi "admin_auth" qiymatini kuzatish uchun
function subscribe(callback) {
  window.addEventListener("storage", callback);
  window.addEventListener(AUTH_EVENT, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(AUTH_EVENT, callback);
  };
}

const getSnapshot = () => localStorage.getItem("admin_auth") === "true";
const getServerSnapshot = () => false;

export default function AdminPanel() {
  const isAuthenticated = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const loadOrders = useCallback(async () => {
    try {
      const data = await getAllOrders();
      setOrders(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Login bo'lganda (yoki sahifa yangilanganda) buyurtmalarni yuklaydi
  useEffect(() => {
    if (!isAuthenticated) return;

    let cancelled = false;
    getAllOrders()
      .then((data) => {
        if (!cancelled) setOrders(data);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [isAuthenticated]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === SECRET_PASSWORD) {
      localStorage.setItem("admin_auth", "true");
      window.dispatchEvent(new Event(AUTH_EVENT)); // holatni yangilaydi
    } else {
      alert("Parol noto'g'ri!");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_auth");
    window.dispatchEvent(new Event(AUTH_EVENT));
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await updateOrderStatus(id, newStatus);
      loadOrders();
    } catch (err) {
      alert("Xatolik yuz berdi!");
    }
  };

  // Qidiruv filtri (6 xonali kod, Ism, Tel yoki Email bo'yicha)
  const filteredOrders = orders.filter(
    (o) =>
      o.tracking_code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.phone.includes(searchQuery) ||
      o.email.toLowerCase().includes(searchQuery.toLowerCase()),
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
    <div className="min-h-screen bg-zinc-950 text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-5">
          <div>
            <h1 className="text-2xl font-black">Buyurtmalarni Boshqarish</h1>
            <p className="text-xs text-zinc-400">
              Barcha kelib tushgan zakazlar ro`yxati
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-500/10 text-red-500 text-xs font-bold hover:bg-red-500/20"
          >
            <LuLogOut size={14} /> Chiqish
          </button>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-3 bg-zinc-900 border border-zinc-800 px-4 py-3 rounded-2xl max-w-md">
          <LuSearch size={18} className="text-zinc-400" />
          <input
            type="text"
            placeholder="6 xonali kod, Ism, Tel yoki Email bo'yicha qidirish..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-white focus:outline-none"
          />
        </div>

        {/* Orders Table / Cards */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12 text-zinc-500">
              Yuklanmoqda...
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-zinc-500 bg-zinc-900/50 rounded-2xl border border-zinc-800/50">
              Buyurtmalar topilmadi.
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order.id}
                className="p-6 rounded-2xl bg-zinc-900 border border-zinc-800 flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-400 font-mono font-bold text-xs">
                      #{order.tracking_code}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {new Date(order.created_at).toLocaleString()}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                        order.status === "pending"
                          ? "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20"
                          : order.status === "approved"
                            ? "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                            : order.status === "completed"
                              ? "bg-green-500/10 text-green-400 border border-green-500/20"
                              : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white">
                      {order.name}
                    </h3>
                    <p className="text-xs text-zinc-400">
                      Tarif:{" "}
                      <span className="text-amber-400 font-semibold">
                        {order.tier}
                      </span>{" "}
                      ({order.tech}) | Chegirma:{" "}
                      <span className="text-green-400 font-semibold">
                        {order.discount}
                      </span>
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-xs text-zinc-300">
                    <span>📞 {order.phone}</span>
                    <span>✉️ {order.email}</span>
                    {order.telegram && <span>✈️ {order.telegram}</span>}
                  </div>

                  {order.comment && (
                    <p className="text-xs text-zinc-400 bg-zinc-950 p-3 rounded-xl border border-zinc-800/80">
                      <strong>Izoh:</strong> {order.comment}
                    </p>
                  )}
                </div>

                {/* Status o'zgartirish tugmalari */}
                <div className="flex flex-wrap md:flex-col gap-2 shrink-0">
                  <button
                    onClick={() => handleStatusChange(order.id, "approved")}
                    className="px-3.5 py-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-bold transition-all"
                  >
                    Qabul qilish
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, "completed")}
                    className="px-3.5 py-2 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs font-bold transition-all"
                  >
                    Bajarildi
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, "rejected")}
                    className="px-3.5 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-bold transition-all"
                  >
                    Rad etish
                  </button>
                  <button
                    onClick={() => handleStatusChange(order.id, "pending")}
                    className="px-3.5 py-2 rounded-xl bg-zinc-800 text-zinc-400 hover:bg-zinc-700 text-xs font-bold transition-all"
                  >
                    Kutishga qaytarish
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
