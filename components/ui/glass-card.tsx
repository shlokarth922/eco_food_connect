"use client";

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'subtle';
}

export function GlassCard({ children, className, variant = 'default' }: GlassCardProps) {
  const variants = {
    default: 'glass-morphism',
    elevated: 'glass-morphism-elevated',
    subtle: 'glass-morphism-subtle'
  };

  return (
    <div className={cn(variants[variant], className)}>
      {children}
    </div>
  );
}