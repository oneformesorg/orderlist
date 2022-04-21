import { IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EditItemModal, EditItemModalRef } from '@modules/EditItemModal/EditItemModal';
import React, { useRef } from 'react';

type Props = {
  id: string
  icon: IconDefinition
}
export function ViewAndEditItem({ id , icon }: Props) {
  const modalRef = useRef<EditItemModalRef>(null);
  return (
    <>
      <button onClick={() => modalRef.current.showModal()}>
        <FontAwesomeIcon icon={icon} />
      </button>
      <EditItemModal id={id} ref={modalRef} />
    </>
  );
}
