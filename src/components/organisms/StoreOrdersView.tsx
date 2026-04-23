import React from 'react';
import type { FC } from 'react';
import { Table } from '../atoms/Table';
import type { TableColumn } from '../atoms/Table';
import { Input } from '../atoms/Input';
import { Button } from '../atoms/Button';
import { Modal } from '../atoms/Modal';
import { OrderCard } from '../molecules/OrderCard';
import { OrderForm } from '../molecules/OrderForm';
import type { OrderFormFields } from '../molecules/OrderForm';
import { ConfirmDialog } from '../molecules/ConfirmDialog';
import { useTranslation } from '../../i18n';
import { useAccessibility } from '../../accessibility';
import type { Order, Inventory } from '../../services/types';
import { getInventory, placeOrder, getOrderById, deleteOrder } from '../../services/storeApi';
import { theme } from '../../tokens/theme';

interface InventoryRow {
  status: string;
  count: number;
}

export interface StoreOrdersViewProps {
  /** Whether user is authenticated */
  isLoggedIn?: boolean;
  /** Override inventory data for stories */
  initialInventory?: Inventory;
  /** Override order for stories */
  initialOrder?: Order;
  /** When true, skip API calls (story mode) */
  mockMode?: boolean;
}

/** Wrapper component so Table columns translate on locale switch */
const InventoryTable: FC<{ data: InventoryRow[] }> = ({ data }) => {
  const { t } = useTranslation();

  const columns: TableColumn<InventoryRow>[] = [
    {
      key: 'status',
      headerTranslationKey: 'petstore.table.headers.status',
      render: (row) => t(`petstore.common.status.${row.status}`),
    },
    {
      key: 'count',
      headerTranslationKey: 'petstore.table.headers.count',
    },
  ];

  return (
    <Table<InventoryRow>
      columns={columns}
      data={data}
      emptyMessageTranslationKey="petstore.table.emptyInventory"
    />
  );
};

export const StoreOrdersView: FC<StoreOrdersViewProps> = ({
  isLoggedIn = false,
  initialInventory,
  initialOrder,
  mockMode = false,
}) => {
  const { t } = useTranslation();
  const { ariaAttributes } = useAccessibility({
    'aria-label': t('petstore.app.orders.ariaLabel'),
  });

  // Inventory state
  const [inventoryRows, setInventoryRows] = React.useState<InventoryRow[]>([]);
  const [inventoryLoading, setInventoryLoading] = React.useState(false);

  // Order lookup state
  const [lookupId, setLookupId] = React.useState('');
  const [lookedUpOrder, setLookedUpOrder] = React.useState<Order | undefined>(initialOrder);
  const [lookupError, setLookupError] = React.useState<string | null>(null);
  const [lookupLoading, setLookupLoading] = React.useState(false);

  // Place order modal
  const [formOpen, setFormOpen] = React.useState(false);
  const [formLoading, setFormLoading] = React.useState(false);

  // Delete confirmation
  const [deletingOrder, setDeletingOrder] = React.useState<Order | undefined>(undefined);

  // Fetch inventory
  const fetchInventory = React.useCallback(async () => {
    if (mockMode && initialInventory) {
      setInventoryRows(
        Object.entries(initialInventory).map(([status, count]) => ({ status, count })),
      );
      return;
    }
    if (mockMode) return;
    setInventoryLoading(true);
    const result = await getInventory();
    if (result.data) {
      setInventoryRows(
        Object.entries(result.data).map(([status, count]) => ({ status, count: count as number })),
      );
    }
    setInventoryLoading(false);
  }, [mockMode, initialInventory]);

  React.useEffect(() => {
    fetchInventory();
  }, [fetchInventory]);

  // Order lookup handler
  const handleLookup = async () => {
    const id = Number(lookupId);
    if (!id || id < 1) return;
    setLookupError(null);
    setLookupLoading(true);
    if (mockMode) {
      setLookupLoading(false);
      return;
    }
    const result = await getOrderById(id);
    if (result.data) {
      setLookedUpOrder(result.data);
      setLookupError(null);
    } else {
      setLookedUpOrder(undefined);
      setLookupError(result.error || t('petstore.app.orders.notFound'));
    }
    setLookupLoading(false);
  };

  // Place order
  const handlePlaceOrder = async (fields: OrderFormFields) => {
    if (mockMode) {
      setFormOpen(false);
      return;
    }
    setFormLoading(true);
    await placeOrder({
      petId: Number(fields.petId),
      quantity: Number(fields.quantity),
      shipDate: new Date().toISOString(),
      status: 'placed',
      complete: false,
    });
    setFormLoading(false);
    setFormOpen(false);
    fetchInventory();
  };

  // Delete order
  const handleDeleteConfirm = async () => {
    if (!deletingOrder || mockMode) {
      setDeletingOrder(undefined);
      return;
    }
    await deleteOrder(deletingOrder.id);
    setDeletingOrder(undefined);
    if (lookedUpOrder?.id === deletingOrder.id) {
      setLookedUpOrder(undefined);
    }
    fetchInventory();
  };

  return (
    <section {...ariaAttributes} style={{ padding: theme.spacing[4] }}>
      {/* --- Inventory Section --- */}
      <div style={{ marginBottom: theme.spacing[6] }}>
        <h2
          style={{
            fontSize: theme.typography.fontSize.lg,
            marginBottom: theme.spacing[3],
            fontWeight: theme.typography.fontWeight.semibold,
          }}
        >
          {t('petstore.app.orders.inventoryTitle')}
        </h2>
        {inventoryLoading ? (
          <p style={{ color: theme.colors.text.secondary, fontSize: theme.typography.fontSize.sm }}>
            {t('petstore.app.orders.loading')}
          </p>
        ) : (
          <InventoryTable data={inventoryRows} />
        )}
      </div>

      {/* --- Order Lookup Section --- */}
      <div style={{ marginBottom: theme.spacing[6] }}>
        <h2
          style={{
            fontSize: theme.typography.fontSize.lg,
            marginBottom: theme.spacing[3],
            fontWeight: theme.typography.fontWeight.semibold,
          }}
        >
          {t('petstore.app.orders.lookupTitle')}
        </h2>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            gap: theme.spacing[3],
            flexWrap: 'wrap',
            marginBottom: theme.spacing[3],
          }}
        >
          <Input
            name="orderId"
            type="number"
            labelTranslationKey="petstore.app.orders.lookupLabel"
            placeholderTranslationKey="petstore.app.orders.lookupPlaceholder"
            value={lookupId}
            onChange={(e) => setLookupId(e.target.value)}
            min={1}
          />
          <Button
            variant="secondary"
            onClick={handleLookup}
            disabled={lookupLoading || !lookupId}
            loading={lookupLoading}
          >
            {t('petstore.app.orders.lookupButton')}
          </Button>
          {isLoggedIn && (
            <Button
              variant="primary"
              onClick={() => setFormOpen(true)}
              announceOnAction={t('petstore.app.orders.announcePlaceOrder')}
            >
              {t('petstore.app.orders.placeOrderButton')}
            </Button>
          )}
        </div>

        {lookupError && (
          <div
            role="alert"
            style={{
              color: theme.colors.semantic.error,
              fontSize: theme.typography.fontSize.sm,
              marginBottom: theme.spacing[3],
            }}
          >
            {lookupError}
          </div>
        )}

        {lookedUpOrder && (
          <div style={{ maxWidth: '24rem' }}>
            <OrderCard
              order={lookedUpOrder}
              readonly={!isLoggedIn}
              {...(isLoggedIn ? { onDelete: (o: Order) => setDeletingOrder(o) } : {})}
            />
          </div>
        )}
      </div>

      {/* Place Order Modal */}
      <Modal
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        titleTranslationKey="petstore.orders.form.ariaLabel"
        size="small"
      >
        <OrderForm
          onSubmit={handlePlaceOrder}
          onCancel={() => setFormOpen(false)}
          isLoading={formLoading}
        />
      </Modal>

      {/* Delete Confirmation */}
      <ConfirmDialog
        isOpen={!!deletingOrder}
        titleTranslationKey="petstore.app.orders.deleteTitle"
        message={
          deletingOrder
            ? t('petstore.app.orders.deleteMessage', { id: String(deletingOrder.id) })
            : ''
        }
        variant="danger"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingOrder(undefined)}
      />
    </section>
  );
};
