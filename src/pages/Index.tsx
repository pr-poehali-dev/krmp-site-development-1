import { useState } from "react";
import Icon from "@/components/ui/icon";

type Priority = "critical" | "high" | "medium" | "low";
type Status = "todo" | "in_progress" | "review" | "done";

interface Task {
  id: number;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  assignee: string;
  assigneeColor: string;
  deadline: string;
  xp: number;
  tags: string[];
}

interface Member {
  name: string;
  initials: string;
  color: string;
  level: number;
  xp: number;
  maxXp: number;
  tasksCompleted: number;
  achievement: string;
}

const INITIAL_TASKS: Task[] = [
  {
    id: 1,
    title: "Разработать API авторизации",
    description: "JWT токены, refresh, logout endpoint",
    priority: "critical",
    status: "in_progress",
    assignee: "Алексей",
    assigneeColor: "#00ff87",
    deadline: "2026-05-14",
    xp: 150,
    tags: ["backend", "auth"],
  },
  {
    id: 2,
    title: "Дизайн главной страницы",
    description: "Hero секция, блоки преимуществ, футер",
    priority: "high",
    status: "review",
    assignee: "Мария",
    assigneeColor: "#a855f7",
    deadline: "2026-05-13",
    xp: 100,
    tags: ["design", "ui"],
  },
  {
    id: 3,
    title: "Настройка CI/CD пайплайна",
    description: "GitHub Actions, деплой на prod",
    priority: "high",
    status: "todo",
    assignee: "Дмитрий",
    assigneeColor: "#3b82f6",
    deadline: "2026-05-16",
    xp: 120,
    tags: ["devops"],
  },
  {
    id: 4,
    title: "Написать unit-тесты",
    description: "Покрытие критических компонентов 80%+",
    priority: "medium",
    status: "todo",
    assignee: "Алексей",
    assigneeColor: "#00ff87",
    deadline: "2026-05-18",
    xp: 80,
    tags: ["testing"],
  },
  {
    id: 5,
    title: "Оптимизация БД запросов",
    description: "Индексы, кэширование, N+1 проблема",
    priority: "medium",
    status: "in_progress",
    assignee: "Дмитрий",
    assigneeColor: "#3b82f6",
    deadline: "2026-05-15",
    xp: 110,
    tags: ["backend", "performance"],
  },
  {
    id: 6,
    title: "Мобильная адаптация",
    description: "Responsive верстка всех страниц",
    priority: "low",
    status: "done",
    assignee: "Мария",
    assigneeColor: "#a855f7",
    deadline: "2026-05-10",
    xp: 90,
    tags: ["frontend", "ui"],
  },
];

const MEMBERS: Member[] = [
  {
    name: "Алексей",
    initials: "АК",
    color: "#00ff87",
    level: 12,
    xp: 680,
    maxXp: 1000,
    tasksCompleted: 34,
    achievement: "🔥 Серийный кодер",
  },
  {
    name: "Мария",
    initials: "МС",
    color: "#a855f7",
    level: 9,
    xp: 420,
    maxXp: 800,
    tasksCompleted: 21,
    achievement: "🎨 Мастер дизайна",
  },
  {
    name: "Дмитрий",
    initials: "ДП",
    color: "#3b82f6",
    level: 11,
    xp: 550,
    maxXp: 900,
    tasksCompleted: 28,
    achievement: "⚡ Быстрый старт",
  },
];

const COLUMNS: { id: Status; label: string; color: string; icon: string }[] = [
  { id: "todo", label: "К выполнению", color: "#64748b", icon: "Circle" },
  { id: "in_progress", label: "В работе", color: "#3b82f6", icon: "Zap" },
  { id: "review", label: "На ревью", color: "#f59e0b", icon: "Eye" },
  { id: "done", label: "Готово", color: "#00ff87", icon: "CheckCircle2" },
];

const PRIORITY_CONFIG: Record<Priority, { label: string; color: string; bg: string }> = {
  critical: { label: "Критично", color: "#ff4444", bg: "rgba(255,68,68,0.12)" },
  high: { label: "Высокий", color: "#f59e0b", bg: "rgba(245,158,11,0.12)" },
  medium: { label: "Средний", color: "#3b82f6", bg: "rgba(59,130,246,0.12)" },
  low: { label: "Низкий", color: "#64748b", bg: "rgba(100,116,139,0.12)" },
};

const daysUntil = (dateStr: string) => {
  const diff = new Date(dateStr).getTime() - Date.now();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};

const formatDeadline = (dateStr: string) => {
  const days = daysUntil(dateStr);
  if (days < 0) return { text: `${Math.abs(days)}д просрочено`, urgent: true };
  if (days === 0) return { text: "Сегодня", urgent: true };
  if (days === 1) return { text: "Завтра", urgent: true };
  return { text: `${days}д`, urgent: false };
};

export default function Index() {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [activeTab, setActiveTab] = useState<"board" | "team" | "achievements">("board");
  const [filterPriority, setFilterPriority] = useState<Priority | "all">("all");
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDeadline, setNewTaskDeadline] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("Алексей");
  const [newTaskPriority, setNewTaskPriority] = useState<Priority>("medium");

  const totalXP = tasks.filter((t) => t.status === "done").reduce((s, t) => s + t.xp, 0);
  const completedCount = tasks.filter((t) => t.status === "done").length;
  const inProgressCount = tasks.filter((t) => t.status === "in_progress").length;
  const overdueCount = tasks.filter(
    (t) => t.status !== "done" && daysUntil(t.deadline) < 0
  ).length;

  const filteredTasks =
    filterPriority === "all"
      ? tasks
      : tasks.filter((t) => t.priority === filterPriority);

  const moveTask = (taskId: number, newStatus: Status) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
    );
  };

  const addTask = () => {
    if (!newTaskTitle.trim()) return;
    const member = MEMBERS.find((m) => m.name === newTaskAssignee)!;
    const newTask: Task = {
      id: Date.now(),
      title: newTaskTitle,
      description: "",
      priority: newTaskPriority,
      status: "todo",
      assignee: newTaskAssignee,
      assigneeColor: member.color,
      deadline: newTaskDeadline || "2026-06-01",
      xp: { critical: 150, high: 100, medium: 80, low: 50 }[newTaskPriority],
      tags: [],
    };
    setTasks((prev) => [newTask, ...prev]);
    setNewTaskTitle("");
    setNewTaskDeadline("");
    setShowAddTask(false);
  };

  const ACHIEVEMENTS = [
    { icon: "🏆", title: "Первая победа", desc: "Завершить первую задачу", unlocked: completedCount >= 1, xp: 50 },
    { icon: "⚡", title: "Молния", desc: "5 задач в работе одновременно", unlocked: inProgressCount >= 5, xp: 100 },
    { icon: "🔥", title: "На огне", desc: "Завершить 5 задач", unlocked: completedCount >= 5, xp: 200 },
    { icon: "💎", title: "Бриллиант", desc: "Набрать 300 XP", unlocked: totalXP >= 300, xp: 300 },
    { icon: "🎯", title: "Снайпер", desc: "Закрыть задачу до дедлайна", unlocked: completedCount >= 1, xp: 75 },
    { icon: "👑", title: "Король задач", desc: "Завершить 10 задач", unlocked: completedCount >= 10, xp: 500 },
  ];

  return (
    <div className="min-h-screen grid-bg" style={{ fontFamily: "'Golos Text', sans-serif" }}>
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 80% 10%, rgba(0,255,135,0.04) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(168,85,247,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Header */}
      <header
        className="sticky top-0 z-50 border-b"
        style={{
          background: "hsl(220 20% 8% / 0.9)",
          backdropFilter: "blur(16px)",
          borderColor: "hsl(var(--border))",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center animate-pulse-glow"
              style={{ background: "#00ff87" }}
            >
              <span style={{ color: "#0a0f0a", fontSize: 16, fontWeight: 900 }}>Q</span>
            </div>
            <span
              className="text-xl font-bold tracking-wide"
              style={{ fontFamily: "'Oswald', sans-serif", color: "hsl(var(--foreground))" }}
            >
              QUEST<span style={{ color: "#00ff87" }}>CRM</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <StatPill icon="Star" value={`${totalXP} XP`} color="#00ff87" label="Заработано" />
            <StatPill icon="CheckCircle2" value={String(completedCount)} color="#3b82f6" label="Выполнено" />
            <StatPill icon="Zap" value={String(inProgressCount)} color="#a855f7" label="В работе" />
            {overdueCount > 0 && (
              <StatPill icon="AlertTriangle" value={String(overdueCount)} color="#ff4444" label="Просрочено" />
            )}
          </div>

          <button
            onClick={() => setShowAddTask(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105"
            style={{
              background: "#00ff87",
              color: "#0a0f0a",
              boxShadow: "0 0 16px rgba(0,255,135,0.4)",
            }}
          >
            <Icon name="Plus" size={16} />
            Новая задача
          </button>
        </div>
      </header>

      <div className="max-w-[1400px] mx-auto px-6 py-6">
        {/* Tabs */}
        <div className="flex gap-1 mb-6 p-1 rounded-xl w-fit" style={{ background: "hsl(var(--card))" }}>
          {[
            { id: "board", label: "Доска", icon: "LayoutDashboard" },
            { id: "team", label: "Команда", icon: "Users" },
            { id: "achievements", label: "Достижения", icon: "Trophy" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={
                activeTab === tab.id
                  ? { background: "#00ff87", color: "#0a0f0a", boxShadow: "0 0 12px rgba(0,255,135,0.3)" }
                  : { color: "hsl(var(--muted-foreground))" }
              }
            >
              <Icon name={tab.icon} size={15} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* BOARD TAB */}
        {activeTab === "board" && (
          <div className="animate-fade-in">
            <div className="flex items-center gap-2 mb-5 flex-wrap">
              <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>Приоритет:</span>
              {(["all", "critical", "high", "medium", "low"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setFilterPriority(p)}
                  className="px-3 py-1 rounded-full text-xs font-medium transition-all border"
                  style={
                    filterPriority === p
                      ? {
                          background: p === "all" ? "#00ff87" : PRIORITY_CONFIG[p as Priority]?.color,
                          color: "#0a0f0a",
                          borderColor: "transparent",
                        }
                      : { borderColor: "hsl(var(--border))", color: "hsl(var(--muted-foreground))" }
                  }
                >
                  {p === "all" ? "Все" : PRIORITY_CONFIG[p as Priority].label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {COLUMNS.map((col) => {
                const colTasks = filteredTasks.filter((t) => t.status === col.id);
                return (
                  <div key={col.id} className="flex flex-col gap-3">
                    <div
                      className="flex items-center justify-between px-3 py-2 rounded-xl"
                      style={{ background: `${col.color}18`, border: `1px solid ${col.color}30` }}
                    >
                      <div className="flex items-center gap-2">
                        <Icon name={col.icon} size={15} style={{ color: col.color }} />
                        <span className="text-sm font-semibold" style={{ color: col.color }}>
                          {col.label}
                        </span>
                      </div>
                      <span
                        className="text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: `${col.color}25`, color: col.color }}
                      >
                        {colTasks.length}
                      </span>
                    </div>

                    <div className="flex flex-col gap-2 min-h-[80px]">
                      {colTasks.map((task) => (
                        <TaskCard key={task.id} task={task} onMove={moveTask} />
                      ))}
                      {colTasks.length === 0 && (
                        <div
                          className="rounded-xl p-4 text-center text-xs"
                          style={{ border: "1px dashed hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}
                        >
                          Нет задач
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TEAM TAB */}
        {activeTab === "team" && (
          <div className="animate-fade-in grid grid-cols-1 md:grid-cols-3 gap-5">
            {MEMBERS.map((member, i) => (
              <MemberCard key={member.name} member={member} rank={i + 1} />
            ))}
          </div>
        )}

        {/* ACHIEVEMENTS TAB */}
        {activeTab === "achievements" && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {ACHIEVEMENTS.map((ach) => (
                <div
                  key={ach.title}
                  className="rounded-2xl p-5 transition-all"
                  style={{
                    background: ach.unlocked ? "hsl(var(--card))" : "hsl(var(--muted))",
                    border: ach.unlocked ? "1px solid rgba(0,255,135,0.3)" : "1px solid hsl(var(--border))",
                    opacity: ach.unlocked ? 1 : 0.5,
                    boxShadow: ach.unlocked ? "0 0 20px rgba(0,255,135,0.08)" : "none",
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0"
                      style={{ background: ach.unlocked ? "rgba(0,255,135,0.15)" : "hsl(var(--border))" }}
                    >
                      {ach.icon}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{ach.title}</span>
                        <span className="text-xs font-bold" style={{ color: ach.unlocked ? "#00ff87" : "hsl(var(--muted-foreground))" }}>
                          +{ach.xp} XP
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
                        {ach.desc}
                      </p>
                      {ach.unlocked && (
                        <div className="mt-2 text-xs font-semibold flex items-center gap-1" style={{ color: "#00ff87" }}>
                          <Icon name="CheckCircle2" size={12} />
                          Разблокировано
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)" }}
          onClick={() => setShowAddTask(false)}
        >
          <div
            className="w-full max-w-md rounded-2xl p-6 animate-scale-in"
            style={{
              background: "hsl(var(--card))",
              border: "1px solid rgba(0,255,135,0.3)",
              boxShadow: "0 0 40px rgba(0,255,135,0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: "'Oswald', sans-serif", color: "#00ff87" }}
              >
                НОВЫЙ КВЕСТ
              </h2>
              <button onClick={() => setShowAddTask(false)} style={{ color: "hsl(var(--muted-foreground))" }}>
                <Icon name="X" size={20} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "hsl(var(--muted-foreground))" }}>
                  НАЗВАНИЕ ЗАДАЧИ
                </label>
                <input
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none"
                  style={{
                    background: "hsl(var(--muted))",
                    border: "1px solid hsl(var(--border))",
                    color: "hsl(var(--foreground))",
                  }}
                  placeholder="Что нужно сделать?"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTask()}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "hsl(var(--muted-foreground))" }}>
                    ДЕДЛАЙН
                  </label>
                  <input
                    type="date"
                    className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                    style={{
                      background: "hsl(var(--muted))",
                      border: "1px solid hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                      colorScheme: "dark",
                    }}
                    value={newTaskDeadline}
                    onChange={(e) => setNewTaskDeadline(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: "hsl(var(--muted-foreground))" }}>
                    ПРИОРИТЕТ
                  </label>
                  <select
                    className="w-full rounded-xl px-3 py-3 text-sm outline-none"
                    style={{
                      background: "hsl(var(--muted))",
                      border: "1px solid hsl(var(--border))",
                      color: "hsl(var(--foreground))",
                    }}
                    value={newTaskPriority}
                    onChange={(e) => setNewTaskPriority(e.target.value as Priority)}
                  >
                    <option value="critical">Критично</option>
                    <option value="high">Высокий</option>
                    <option value="medium">Средний</option>
                    <option value="low">Низкий</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: "hsl(var(--muted-foreground))" }}>
                  ОТВЕТСТВЕННЫЙ
                </label>
                <div className="flex gap-2">
                  {MEMBERS.map((m) => (
                    <button
                      key={m.name}
                      onClick={() => setNewTaskAssignee(m.name)}
                      className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all"
                      style={
                        newTaskAssignee === m.name
                          ? { background: m.color, color: "#0a0f0a" }
                          : { background: "hsl(var(--muted))", border: `1px solid ${m.color}40`, color: m.color }
                      }
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={addTask}
                className="w-full py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                style={{
                  background: "#00ff87",
                  color: "#0a0f0a",
                  boxShadow: "0 0 20px rgba(0,255,135,0.4)",
                }}
              >
                <div className="flex items-center justify-center gap-2">
                  <Icon name="Sword" size={16} />
                  Создать квест
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function StatPill({ icon, value, color, label }: { icon: string; value: string; color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <Icon name={icon} size={14} style={{ color }} />
      <div>
        <div className="text-sm font-bold leading-none" style={{ color }}>
          {value}
        </div>
        <div className="text-xs leading-none mt-0.5" style={{ color: "hsl(var(--muted-foreground))" }}>
          {label}
        </div>
      </div>
    </div>
  );
}

function TaskCard({ task, onMove }: { task: Task; onMove: (id: number, s: Status) => void }) {
  const [showMenu, setShowMenu] = useState(false);
  const priority = PRIORITY_CONFIG[task.priority];
  const deadline = formatDeadline(task.deadline);

  return (
    <div
      className="rounded-xl p-3.5 task-card-enter cursor-pointer relative group"
      style={{
        background: "hsl(var(--card))",
        border: "1px solid hsl(var(--border))",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.15s",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = `${priority.color}50`;
        el.style.boxShadow = `0 0 12px ${priority.color}18`;
        el.style.transform = "scale(1.02)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = "hsl(var(--border))";
        el.style.boxShadow = "none";
        el.style.transform = "scale(1)";
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="text-xs font-semibold px-2 py-0.5 rounded-full"
          style={{ background: priority.bg, color: priority.color }}
        >
          {priority.label}
        </span>
        <div className="relative">
          <button
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded"
            style={{ color: "hsl(var(--muted-foreground))" }}
            onClick={() => setShowMenu(!showMenu)}
          >
            <Icon name="MoreHorizontal" size={14} />
          </button>
          {showMenu && (
            <div
              className="absolute right-0 top-6 z-10 rounded-xl overflow-hidden w-44 animate-scale-in"
              style={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
              }}
            >
              {COLUMNS.filter((c) => c.id !== task.status).map((col) => (
                <button
                  key={col.id}
                  className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors"
                  style={{ color: "hsl(var(--foreground))" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "hsl(var(--muted))")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                  onClick={() => { onMove(task.id, col.id); setShowMenu(false); }}
                >
                  <Icon name={col.icon} size={12} style={{ color: col.color }} />
                  → {col.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <h3 className="text-sm font-semibold mb-1 leading-snug">{task.title}</h3>
      {task.description && (
        <p className="text-xs mb-2.5 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
          {task.description}
        </p>
      )}

      {task.tags.length > 0 && (
        <div className="flex gap-1 mb-2.5 flex-wrap">
          {task.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-1.5 py-0.5 rounded"
              style={{ background: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" }}
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center font-bold flex-shrink-0"
            style={{ background: `${task.assigneeColor}25`, color: task.assigneeColor, fontSize: 9 }}
          >
            {task.assignee.slice(0, 2)}
          </div>
          <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
            {task.assignee}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span
            className="text-xs font-semibold flex items-center gap-0.5"
            style={{ color: deadline.urgent ? "#ff4444" : "hsl(var(--muted-foreground))" }}
          >
            <Icon name="Clock" size={10} />
            {deadline.text}
          </span>
          <span className="text-xs font-bold" style={{ color: "#00ff87" }}>
            +{task.xp}xp
          </span>
        </div>
      </div>
    </div>
  );
}

function MemberCard({ member, rank }: { member: Member; rank: number }) {
  const xpPercent = Math.round((member.xp / member.maxXp) * 100);
  const rankColors = ["#f59e0b", "hsl(var(--muted-foreground))", "#cd7f32"];

  return (
    <div
      className="rounded-2xl p-5 animate-fade-in"
      style={{
        background: "hsl(var(--card))",
        border: `1px solid ${member.color}30`,
        boxShadow: `0 0 24px ${member.color}08`,
        transition: "transform 0.15s",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1.02)")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "scale(1)")}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center text-base font-bold"
            style={{ background: `${member.color}20`, color: member.color, border: `1.5px solid ${member.color}50` }}
          >
            {member.initials}
          </div>
          <div>
            <div className="font-bold">{member.name}</div>
            <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
              {member.achievement}
            </div>
          </div>
        </div>
        <div
          className="text-lg font-black"
          style={{ color: rank <= 3 ? rankColors[rank - 1] : "hsl(var(--muted-foreground))", fontFamily: "'Oswald', sans-serif" }}
        >
          #{rank}
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <div
            className="px-2.5 py-1 rounded-lg text-xs font-bold"
            style={{ background: `${member.color}20`, color: member.color }}
          >
            LVL {member.level}
          </div>
          <span className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>
            {member.xp} / {member.maxXp} XP
          </span>
        </div>
        <span className="text-xs font-semibold" style={{ color: member.color }}>
          {xpPercent}%
        </span>
      </div>

      <div className="w-full h-2 rounded-full mb-4 overflow-hidden" style={{ background: "hsl(var(--muted))" }}>
        <div
          className="h-full rounded-full"
          style={{
            width: `${xpPercent}%`,
            background: `linear-gradient(90deg, ${member.color}, ${member.color}99)`,
            boxShadow: `0 0 8px ${member.color}60`,
            transition: "width 0.7s ease",
          }}
        />
      </div>

      <div
        className="flex items-center justify-between text-sm pt-3"
        style={{ borderTop: "1px solid hsl(var(--border))" }}
      >
        <div className="text-center">
          <div className="font-bold" style={{ color: member.color }}>
            {member.tasksCompleted}
          </div>
          <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>выполнено</div>
        </div>
        <div className="text-center">
          <div className="font-bold">{member.level * 50 + member.xp}</div>
          <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>всего XP</div>
        </div>
        <div className="text-center">
          <div className="font-bold">{Math.round((member.tasksCompleted / member.level) * 10) / 10}</div>
          <div className="text-xs" style={{ color: "hsl(var(--muted-foreground))" }}>задач/уровень</div>
        </div>
      </div>
    </div>
  );
}