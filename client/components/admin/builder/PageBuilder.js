import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BiSave } from 'react-icons/bi';
import SortableList from 'react-sortable-dnd-list';
import { usePageBySlug } from '../../../data/usePages';
import { pageUpdate } from '../../../lib/pageUpdate';
import Loader from '../../Loader';
import { HeadingBlockAdd } from '../../ui/HeadingBlock';
import { TextBlockAdd } from '../../ui/TextBlock';
import SortableSection from './SortableSection';

const PageBuilder = ({ slug }) => {
  const [items, setItems] = useState([]);
  const [actionLoader, setActionLoader] = useState(false);

  const { data, loading } = usePageBySlug(slug);

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

  const handleSubmit = () => {
    const params = {
      name: data?.name,
      slug: data?.slug,
      content: items
    };
    pageUpdate(slug, params, setActionLoader);
  };

  useEffect(() => {
    const jsonItems = data ? data?.content : [];
    setItems(jsonItems);
  }, [data]);

  if (loading) {
    return <Loader height="200px" />;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <h3>Pick Components</h3>
          <div className="component-wrapper">
            <HeadingBlockAdd handleAdd={handleAdd} />
            <TextBlockAdd handleAdd={handleAdd} />
          </div>
        </div>
        <div className="col-md-8">
          <div className="basic-card">
            <h3>Builder</h3>
            <SortableList
              className="list"
              itemComponent={SortableSection}
              itemComponentProps={{ handleDelete, handleEdit }}
              value={items}
              index={0}
              onChange={(value) => setItems(value)}
            />
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
          </div>
        </div>
      </div>
    </>
  );
};
export default PageBuilder;
