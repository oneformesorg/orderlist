import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';

type Props = {
  lists: string[]
  onDeleteList: (listName: string) => void
}

export function ListTable({ lists, onDeleteList }: Props) {
  const { t } = useTranslation();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [idToDelete, setIdToDelete] = useState<number>();
  return (
    <Table striped bordered hover className="mt-3">
      <thead>
        <tr>
          <th>{t('LIST')}</th>
          <th className="text-center">{t('DELETE')}</th>
        </tr>
      </thead>
      <tbody>
        {lists.map((list, i) => (
          <tr key={`${i}_${list}`}>
            <td>
              {list}
            </td>
            <td className="text-center">
              {confirmDelete && idToDelete === i ? (
                <button
                  onClick={() => {
                    onDeleteList(list);
                    setIdToDelete(undefined);
                    setConfirmDelete(false);
                  }}
                  className="text-danger">
                  {t('CONFIRM')}
                </button>
              ) : (
                <button
                  onClick={() => {
                    setIdToDelete(i);
                    setConfirmDelete(true);
                  }}
                  className="text-danger">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              )}
            </td>
          </tr>
        ))}
      </tbody>
      <tfoot>
        {lists.length === 0 && (
          <tr>
            <td colSpan={2} className="text-center">
              {t('NO_SUBLISTS_YET')}
            </td>
          </tr>
        )}
      </tfoot>
    </Table>
  );
}
