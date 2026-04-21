import React from 'react';
import * as LucideIcons from 'lucide-react-native';
import { LucideProps } from 'lucide-react-native';

interface LucideIconProps extends LucideProps {
  name: string;
  color?: string;
  size?: number;
  strokeWidth?: number;
}

export const LucideIcon = ({ name, color = '#1A87E5', size = 24, strokeWidth = 2, ...props }: LucideIconProps) => {
  // Convert kebab-case or camelCase to PascalCase (e.g., 'home-clean' -> 'HomeClean')
  // Then map 'HomeClean' to 'Home' or similar if needed, or just capitalize properly.
  // Lucide icons are exported as PascalCase (e.g. 'Home', 'Activity', etc.)
  
  const formattedName = name
    .split('-')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join('');

  const IconComponent = (LucideIcons as any)[formattedName] || LucideIcons.HelpCircle;

  return <IconComponent color={color} size={size} strokeWidth={strokeWidth} {...props} />;
};
