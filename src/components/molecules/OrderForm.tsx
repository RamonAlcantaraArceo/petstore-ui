import React from 'react';
import type { FC, FormEvent } from 'react';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { useTranslation } from '../../i18n';
import { useAccessibility } from '../../accessibility';
export interface OrderFormFields {
  petId: string;
  quantity: string;
}

export interface OrderFormProps {
  onSubmit: (fields: OrderFormFields) => void;
  onCancel: () => void;
  isLoading?: boolean;
  className?: string;
}

export const OrderForm: FC<OrderFormProps> = ({ onSubmit, onCancel, isLoading = false, className }) => {
  const { t } = useTranslation();
  const [fields, setFields] = React.useState<OrderFormFields>({ petId: '', quantity: '1' });

  const { ariaAttributes } = useAccessibility({
    announceOnAction: t('petstore.orders.form.announceSubmit'),
  });

  const set = (key: keyof OrderFormFields) =>
    (e: React.ChangeEvent<HTMLInputElement>) =>
      setFields((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(fields);
  };

  return (
    <form
      className={`order-form ${className || ''}`.trim()}
      onSubmit={handleSubmit}
      aria-label={t('petstore.orders.form.ariaLabel')}
      {...ariaAttributes}
    >
      <Input
        name="petId"
        labelTranslationKey="petstore.orders.form.petId"
        value={fields.petId}
        onChange={set('petId')}
        required
        autoFocus
      />
      <Input
        name="quantity"
        type="number"
        labelTranslationKey="petstore.orders.form.quantity"
        value={fields.quantity}
        onChange={set('quantity')}
        required
        min={1}
      />
      <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem' }}>
        <Button type="submit" variant="primary" disabled={isLoading} loading={isLoading}>
          {t('petstore.orders.form.submit')}
        </Button>
        <Button type="button" variant="secondary" onClick={onCancel}>
          {t('petstore.orders.form.cancel')}
        </Button>
      </div>
    </form>
  );
};
