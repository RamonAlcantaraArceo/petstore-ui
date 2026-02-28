import React from 'react';
import { theme } from '../../tokens/theme';
import { useTranslation } from '../../i18n';
import { useAccessibility } from '../../accessibility';

export interface TableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (row: T) => React.ReactNode;
}

export interface TableProps<T> {
  columns: TableColumn<T>[];
  data: T[];
  emptyMessage: string;
}

function TableInner<T>({ columns, data, emptyMessage }: TableProps<T>): JSX.Element {
  const { t } = useTranslation();
  const { ariaAttributes } = useAccessibility({
    'aria-label': t('accessibility.labels.table', { defaultValue: 'Data table' }),
  });

  const tableStyles: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontFamily: theme.typography.fontFamily.sans.join(', '),
    fontSize: theme.typography.fontSize.sm,
    color: theme.colors.text.primary,
  };

  const headerCellStyles: React.CSSProperties = {
    textAlign: 'left',
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    borderBottom: `1px solid ${theme.colors.secondary[300]}`,
    backgroundColor: theme.colors.secondary[50],
    fontWeight: theme.typography.fontWeight.semibold,
  };

  const bodyCellStyles: React.CSSProperties = {
    padding: `${theme.spacing[3]} ${theme.spacing[4]}`,
    borderBottom: `1px solid ${theme.colors.secondary[200]}`,
  };

  return (
    <table style={tableStyles} {...ariaAttributes}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={String(column.key)} scope="col" style={headerCellStyles}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, index) => (
            <tr key={index}>
              {columns.map((column) => (
                <td key={String(column.key)} style={bodyCellStyles}>
                  {column.render ? column.render(row) : String((row as Record<string, unknown>)[String(column.key)] ?? '')}
                </td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length} style={bodyCellStyles}>
              {emptyMessage}
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}

export const Table = TableInner as <T>(props: TableProps<T>) => JSX.Element;

export default Table;
