import Link from 'next/link';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import Pagination from 'react-js-pagination';
import { useKycAll } from '../../../data/useKyc';
import Loader from '../../Loader';

const KycList = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(25);

  const { data, loading } = useKycAll(page, perPage);
  console.log(data);
  return (
    <>
      <div className="filter">
        <div className="filter-box">
          <p>Per Page </p>
          <select value={perPage} name="status" onChange={(e) => setPerPage(e.target.value)}>
            <option value="20">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
            <option value="150">150</option>
            <option value="200">200</option>
          </select>
        </div>
      </div>
      {loading ? (
        <Loader height="300px" />
      ) : (
        <>
          <Table striped hover className="dark-color" responsive>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Status</th>
                <th scope="col">User</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((history) => (
                <tr key={history?.id}>
                  <td>
                    <strong>
                      #
                      {history?.id}
                    </strong>
                  </td>
                  <td>
                    <strong style={{ textTransform: 'capitalize' }}>
                      {history?.status}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      #
                      {history?.user?.id}
                      {' '}
                      <br />
                      {history?.user.name}
                      {' '}
                      <br />
                      {history?.user.email}
                    </strong>
                  </td>
                  <td width="15%" align="center">
                    <Link href={`/admin/users/${history?.user?.id}`}>
                      <a className="action-btn">
                        <FiEdit />
                      </a>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination
            activePage={page}
            itemsCountPerPage={perPage}
            totalItemsCount={data?.count || perPage}
            pageRangeDisplayed={perPage}
            onChange={(pageNumber) => setPage(pageNumber)}
            itemClass="page-item"
            linkClass="page-link"
          />
        </>
      )}
    </>
  );
};

export default KycList;
