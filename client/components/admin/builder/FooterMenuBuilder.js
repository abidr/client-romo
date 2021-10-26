import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BiPlusCircle, BiSave } from 'react-icons/bi';
import SortableList from 'react-sortable-dnd-list';
import { v1 as uuidv1 } from 'uuid';
import { useFooterMenu } from '../../../data/useMenu';
import { footerMenuUpdate } from '../../../lib/menuUpdate';
import Loader from '../../Loader';
import SortableItem from './SortableItem';

const FooterMenuBuilder = () => {
  const [items, setItems] = useState([]);
  const [actionLoader, setActionLoader] = useState(false);

  const { data, loading } = useFooterMenu();

  const handleAdd = (item) => {
    const arr = [...items];
    arr.push(item);
    setItems(arr);
  };

  const handleDelete = (id) => {
    const arr = items.filter((itm) => itm.id !== id);
    setItems(arr);
  };

  const handleEdit = (id, field, value) => {
    const index = items.findIndex((itm) => itm.id === id);
    const arr = [...items];
    arr[index][field] = value;
    setItems(arr);
  };

  useEffect(() => {
    const jsonItems = data ? JSON.parse(data?.param1) : [];
    setItems(jsonItems);
  }, [data]);

  const handleSubmit = () => {
    const params = {
      param1: JSON.stringify(items)
    };
    footerMenuUpdate(params, setActionLoader);
  };

  if (loading) {
    return <Loader height="200px" />;
  }

  return (
    <>
      <SortableList
        className="list"
        itemComponent={SortableItem}
        itemComponentProps={{ setItems, handleDelete, handleEdit }}
        value={items}
        index={0}
        onChange={(value) => setItems(value)}
      />
      <button
        type="button"
        className="bttn-mid btn-primary btn-new mt-10"
        onClick={() => handleAdd({ id: uuidv1(), name: 'New Item', url: '/' })}
      >
        <BiPlusCircle />
        Add New Menu
      </button>
      <button
        type="button"
        className="bttn-mid btn-ylo btn-new"
        onClick={() => handleSubmit()}
        disabled={actionLoader}
      >
        {actionLoader ? (
          <>
            <Spinner animation="border" role="status" size="sm" />
            {' '}
            Save Changes
          </>
        ) : (
          <>
            <BiSave />
            Save Changes
          </>
        )}
      </button>
    </>
  );
};
export default FooterMenuBuilder;
