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
