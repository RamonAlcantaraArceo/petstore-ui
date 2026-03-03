import type { FC } from 'react';
import { Card } from '../atoms/Card';
import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { useTranslation } from '../../i18n';
import type { Order } from '../../services/types';

export interface OrderCardProps {
  order: Order;
  onDelete?: (order: Order) => void;
  readonly?: boolean;
  className?: string;
}

export const OrderCard: FC<OrderCardProps> = ({ order, onDelete, readonly = false, className }) => {
  const { t } = useTranslation();

  const formattedDate = order.shipDate
    ? new Date(order.shipDate).toLocaleDateString()
    : '—';

  return (
    <Card
      elevation="base"
      padding="md"
      border
      fullWidth
      {...(className !== undefined && { className })}
      aria-label={t('petstore.orders.card.ariaLabel', { id: String(order.id) })}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontWeight: 600, fontSize: '1rem' }}>
            {t('petstore.orders.card.orderId')}: #{order.id}
          </span>
          <Badge variant={order.status} />
        </div>

        {/* Details */}
        <div style={{ fontSize: '0.875rem', color: '#64748b', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div>
            <span style={{ fontWeight: 500 }}>{t('petstore.orders.card.petId')}: </span>
            {order.petId}
          </div>
          <div>
            <span style={{ fontWeight: 500 }}>{t('petstore.orders.card.quantity')}: </span>
            {order.quantity}
          </div>
          <div>
            <span style={{ fontWeight: 500 }}>{t('petstore.orders.card.shipDate')}: </span>
            {formattedDate}
          </div>
        </div>

        {/* Actions */}
        {!readonly && onDelete && (
          <div style={{ marginTop: '0.5rem' }}>
            <Button
              size="small"
              variant="danger"
              onClick={() => onDelete(order)}
              announceOnAction={t('petstore.orders.card.announceDelete', { id: String(order.id) })}
            >
              {t('petstore.orders.card.delete')}
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
