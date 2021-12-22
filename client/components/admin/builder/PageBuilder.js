/* eslint-disable max-len */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { BiSave } from 'react-icons/bi';
import SortableList from 'react-sortable-dnd-list';
import { usePageBySlug } from '../../../data/usePages';
import { pageUpdate } from '../../../lib/pageUpdate';
import Loader from '../../Loader';
import BlockAdd from '../../ui/editor/BlockAdd';
import ComponentsField from '../../ui/editor/ComponentsField';
import SortableSection from './SortableSection';

const PageBuilder = ({ slug }) => {
  const [name, setName] = useState();
  const [slugBuild, setSlugBuild] = useState();
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
      name,
      slug: slugBuild,
      content: items
    };
    pageUpdate(slug, params, setActionLoader);
  };

  useEffect(() => {
    const jsonItems = data ? data?.content : [];
    setName(data?.name);
    setSlugBuild(data?.slug);
    setItems(jsonItems);
  }, [data]);

  if (loading) {
    return <Loader height="200px" />;
  }

  return (
    <>
      <div className="row">
        <div className="col-md-4">
          <div className="basic-card">
            <h4 className="box-title">Page Settings</h4>
            <div className="settings-box">
              <form>
                <div className="single-profile">
                  <label htmlFor="pageTitle">Page Title</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="pageTitle"
                    name="title"
                    type="text"
                    placeholder="Title"
                    required
                  />
                </div>
                <div className="single-profile">
                  <label htmlFor="pageSlug">Slug</label>
                  <input
                    value={slugBuild}
                    onChange={(e) => setSlugBuild(e.target.value)}
                    id="pageSlug"
                    name="slug"
                    type="text"
                    placeholder="Slug"
                    required
                  />
                </div>
              </form>
            </div>
          </div>
          <div className="basic-card mt-20">
            <h4 className="box-title">Pick Components</h4>
            <div className="component-wrapper">
              {ComponentsField.map((field) => <BlockAdd key={field.component} field={field} handleAdd={handleAdd} />)}
            </div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="basic-card">
            <h4 className="box-title">Builder</h4>
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
