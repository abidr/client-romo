import { useRouter } from 'next/router';
import React from 'react';
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { FiEdit, FiTrash } from 'react-icons/fi';
import usePages from '../../../data/usePages';
import currencyDelete from '../../../lib/currencyRequest';
import Loader from '../../Loader';

const PageList = () => {
  const { data, loading } = usePages();
  const router = useRouter();

  const deleteInit = (slug, name) => {
    confirmAlert({
      title: `${name}`,
      message: 'Are you sure to remove this page?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => currencyDelete(slug)
        },
        {
          label: 'No',
        }
      ]
    });
  };

  return (
    <>
      {loading ? (
        <Loader height="300px" />
      ) : (
        <>
          <Table striped hover className="dark-color" responsive>
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Type</th>
                <th scope="col">Slug</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((page) => (
                <tr key={page?.id}>
                  <td>
                    <strong>
                      {page?.name}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      {page?.type}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      {page?.slug}
                    </strong>
                  </td>
                  <td width="15%" align="center">
                    <div className="d-flex">
                      <button
                        type="button"
                        onClick={() => router.push(`/admin/settings/wallet/${page?.slug}`)}
                        className="action-btn"
                      >
                        <FiEdit />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteInit(page?.slug, page?.name)}
                        className="action-btn danger ml-10"
                      >
                        <FiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default PageList;
