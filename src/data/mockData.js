// All data below is fictional and hardcoded for demo purposes only.

export const revenueChartData = [
  { month: 0, revenue: 18400, target: 20000 },
  { month: 1, revenue: 22100, target: 21000 },
  { month: 2, revenue: 19800, target: 22000 },
  { month: 3, revenue: 26500, target: 23000 },
  { month: 4, revenue: 31200, target: 24000 },
  { month: 5, revenue: 34750, target: 26000 },
]

export const statCards = [
  {
    key: 'revenue',
    value: '$152,430',
    delta: '+12.4%',
    trend: 'up',
  },
  {
    key: 'customers',
    value: '1,284',
    delta: '+5.2%',
    trend: 'up',
  },
  {
    key: 'pending',
    value: '37',
    delta: '-3.1%',
    trend: 'down',
  },
  {
    key: 'growth',
    value: '18.6%',
    delta: '+2.8%',
    trend: 'up',
  },
]

// name: { en, ar } — fictional companies/clients, industry-agnostic
export const orders = [
  { id: 1, name: { en: 'Horizon Consulting Group', ar: 'مجموعة هورايزن للاستشارات' }, status: 'active', date: '2026-08-28', amount: 4250 },
  { id: 2, name: { en: 'Silverline Media Co.', ar: 'شركة سيلفرلاين للإعلام' }, status: 'completed', date: '2026-08-25', amount: 1890 },
  { id: 3, name: { en: 'Bluepeak Logistics', ar: 'بلوبيك للخدمات اللوجستية' }, status: 'pending', date: '2026-08-24', amount: 6720 },
  { id: 4, name: { en: 'Crestwood Partners', ar: 'كريستوود للشراكات' }, status: 'active', date: '2026-08-22', amount: 3125 },
  { id: 5, name: { en: 'Vantage Point Studio', ar: 'استوديو فانتج بوينت' }, status: 'completed', date: '2026-08-20', amount: 980 },
  { id: 6, name: { en: 'Northgate Solutions', ar: 'نورث جيت للحلول' }, status: 'pending', date: '2026-08-19', amount: 5410 },
  { id: 7, name: { en: 'Amberline Retail Group', ar: 'مجموعة أمبرلاين للتجزئة' }, status: 'active', date: '2026-08-17', amount: 2340 },
  { id: 8, name: { en: 'Pinnacle Ventures', ar: 'بيناكل فنتشرز' }, status: 'completed', date: '2026-08-15', amount: 7890 },
  { id: 9, name: { en: 'Clearwater Holdings', ar: 'كليرووتر القابضة' }, status: 'active', date: '2026-08-13', amount: 1560 },
  { id: 10, name: { en: 'Meridian Tech Partners', ar: 'ميريديان للشراكات التقنية' }, status: 'pending', date: '2026-08-11', amount: 4990 },
  { id: 11, name: { en: 'Ironwood Enterprises', ar: 'آيرونوود للمشاريع' }, status: 'completed', date: '2026-08-09', amount: 3670 },
  { id: 12, name: { en: 'Coastal Grove Agency', ar: 'وكالة كوستال جروف' }, status: 'active', date: '2026-08-07', amount: 2210 },
  { id: 13, name: { en: 'Falcon Ridge Group', ar: 'مجموعة فالكون ريدج' }, status: 'pending', date: '2026-08-05', amount: 8340 },
  { id: 14, name: { en: 'Summit & Co.', ar: 'شركة سوميت وشركاه' }, status: 'completed', date: '2026-08-02', amount: 1420 },
  { id: 15, name: { en: 'Lumen Field Services', ar: 'لومن للخدمات الميدانية' }, status: 'active', date: '2026-07-30', amount: 5030 },
]

export const currentUser = {
  fullName: { en: 'Sarah Al-Amin', ar: 'سارة الأمين' },
  email: 'sarah.alamin@nexora-demo.com',
  role: { en: 'Operations Manager', ar: 'مديرة العمليات' },
  company: { en: 'Nexora Demo Workspace', ar: 'مساحة عمل نيكسورا التجريبية' },
}

export function getOrdersByStatus() {
  const counts = { active: 0, pending: 0, completed: 0 }
  orders.forEach((o) => { counts[o.status] += 1 })
  return Object.entries(counts).map(([status, count]) => ({ status, count }))
}

export const customerStats = [
  { key: 'totalCustomers', value: '1,284', delta: '+5.2%', trend: 'up' },
  { key: 'newThisMonth', value: '86', delta: '+14.7%', trend: 'up' },
  { key: 'activeRate', value: '92.3%', delta: '+1.4%', trend: 'up' },
  { key: 'lifetimeValue', value: '$1,940', delta: '-2.1%', trend: 'down' },
]

// name: { en, ar } — fictional individuals, industry-agnostic
export const customers = [
  { id: 1, name: { en: 'Layla Haddad', ar: 'ليلى حداد' }, email: 'layla.haddad@example.com', status: 'active', joinedDate: '2025-11-02', totalSpent: 8420, orders: 14 },
  { id: 2, name: { en: 'Omar Nasser', ar: 'عمر ناصر' }, email: 'omar.nasser@example.com', status: 'active', joinedDate: '2025-09-18', totalSpent: 5230, orders: 9 },
  { id: 3, name: { en: 'Grace Okafor', ar: 'غريس أوكافور' }, email: 'grace.okafor@example.com', status: 'pending', joinedDate: '2026-08-30', totalSpent: 0, orders: 0 },
  { id: 4, name: { en: 'Yousef Al-Rashid', ar: 'يوسف الرشيد' }, email: 'yousef.alrashid@example.com', status: 'active', joinedDate: '2025-06-11', totalSpent: 12980, orders: 22 },
  { id: 5, name: { en: 'Mia Andersen', ar: 'ميا أندرسن' }, email: 'mia.andersen@example.com', status: 'inactive', joinedDate: '2024-12-04', totalSpent: 1340, orders: 3 },
  { id: 6, name: { en: 'Rania Saab', ar: 'رانيا صعب' }, email: 'rania.saab@example.com', status: 'active', joinedDate: '2025-10-22', totalSpent: 6740, orders: 11 },
  { id: 7, name: { en: 'Daniel Kim', ar: 'دانيال كيم' }, email: 'daniel.kim@example.com', status: 'active', joinedDate: '2025-04-15', totalSpent: 9310, orders: 16 },
  { id: 8, name: { en: 'Hana Mansour', ar: 'هنا منصور' }, email: 'hana.mansour@example.com', status: 'pending', joinedDate: '2026-08-27', totalSpent: 0, orders: 0 },
  { id: 9, name: { en: 'Lucas Ferreira', ar: 'لوكاس فيريرا' }, email: 'lucas.ferreira@example.com', status: 'inactive', joinedDate: '2024-08-19', totalSpent: 2150, orders: 5 },
  { id: 10, name: { en: 'Noor Fawzi', ar: 'نور فوزي' }, email: 'noor.fawzi@example.com', status: 'active', joinedDate: '2025-07-03', totalSpent: 4890, orders: 8 },
  { id: 11, name: { en: 'Ethan Brooks', ar: 'إيثان بروكس' }, email: 'ethan.brooks@example.com', status: 'active', joinedDate: '2025-02-27', totalSpent: 15620, orders: 27 },
  { id: 12, name: { en: 'Salma Idris', ar: 'سلمى إدريس' }, email: 'salma.idris@example.com', status: 'active', joinedDate: '2025-12-09', totalSpent: 3480, orders: 6 },
  { id: 13, name: { en: 'Marco Rossi', ar: 'ماركو روسي' }, email: 'marco.rossi@example.com', status: 'pending', joinedDate: '2026-08-24', totalSpent: 0, orders: 0 },
  { id: 14, name: { en: 'Amina Toure', ar: 'أمينة توري' }, email: 'amina.toure@example.com', status: 'active', joinedDate: '2025-05-30', totalSpent: 7260, orders: 12 },
  { id: 15, name: { en: 'Karim Bishara', ar: 'كريم بشارة' }, email: 'karim.bishara@example.com', status: 'inactive', joinedDate: '2024-10-14', totalSpent: 980, orders: 2 },
  { id: 16, name: { en: 'Sophia Lindqvist', ar: 'صوفيا ليندكفيست' }, email: 'sophia.lindqvist@example.com', status: 'active', joinedDate: '2025-03-08', totalSpent: 10740, orders: 19 },
  { id: 17, name: { en: 'Tariq Ghannam', ar: 'طارق غنام' }, email: 'tariq.ghannam@example.com', status: 'active', joinedDate: '2025-08-16', totalSpent: 5980, orders: 10 },
  { id: 18, name: { en: 'Elena Popescu', ar: 'إيلينا بوبيسكو' }, email: 'elena.popescu@example.com', status: 'pending', joinedDate: '2026-08-19', totalSpent: 0, orders: 0 },
]

export const reportStats = [
  { key: 'avgOrderValue', value: '$412', delta: '+6.8%', trend: 'up' },
  { key: 'repeatRate', value: '64.1%', delta: '+3.5%', trend: 'up' },
  { key: 'totalOrders', value: '2,930', delta: '+9.2%', trend: 'up' },
  { key: 'satisfaction', value: '4.7 / 5', delta: '-0.1', trend: 'down' },
]

export const channelBreakdown = [
  { channel: 'direct', value: 42 },
  { channel: 'referral', value: 27 },
  { channel: 'online', value: 21 },
  { channel: 'partner', value: 10 },
]
