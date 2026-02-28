/**
 * Atomic Components
 * 
 * Basic building blocks of the design system.
 * These components are the smallest reusable units that compose larger interfaces.
 */

export { Button } from './Button';
export type { ButtonProps } from './Button';

export { Input } from './Input'; 
export type { InputProps } from './Input';

export { Card } from './Card';
export type { CardProps } from './Card';

export { Badge } from './Badge';
export type { BadgeProps } from './Badge';

export { Select } from './Select';
export type { SelectProps, SelectOption } from './Select';

export { Modal } from './Modal';
export type { ModalProps } from './Modal';

export { Table } from './Table';
export type { TableProps, TableColumn } from './Table';

export { Tabs } from './Tabs';
export type { TabsProps, TabItem } from './Tabs';

// Re-export default exports for alternative import patterns
export { default as ButtonComponent } from './Button';
export { default as InputComponent } from './Input';
export { default as CardComponent } from './Card';
export { default as BadgeComponent } from './Badge';
export { default as SelectComponent } from './Select';
export { default as ModalComponent } from './Modal';
export { default as TableComponent } from './Table';
export { default as TabsComponent } from './Tabs';