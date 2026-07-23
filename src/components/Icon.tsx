import {
  Landmark, Banknote, Home, ScrollText, ArrowLeftRight, Wrench, Building2,
  CreditCard, TrendingDown, TrendingUp, Package, ShoppingCart, Send, Scale,
  User, Tag, ClipboardList, AlertTriangle, RefreshCw, Bell, Target,
  type LucideIcon,
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  'landmark': Landmark,
  'banknote': Banknote,
  'home': Home,
  'scroll-text': ScrollText,
  'arrow-left-right': ArrowLeftRight,
  'wrench': Wrench,
  'building-2': Building2,
  'credit-card': CreditCard,
  'trending-down': TrendingDown,
  'trending-up': TrendingUp,
  'package': Package,
  'shopping-cart': ShoppingCart,
  'send': Send,
  'scale': Scale,
  'user': User,
  'tag': Tag,
  'clipboard-list': ClipboardList,
  'alert-triangle': AlertTriangle,
  'refresh-cw': RefreshCw,
  'bell': Bell,
  'target': Target,
};

interface IconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function Icon({ name, className = '', size = 24 }: IconProps) {
  const IconComponent = iconMap[name];
  if (!IconComponent) return <span className={className}>{name}</span>;
  return <IconComponent className={className} size={size} />;
}
