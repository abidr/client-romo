import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import useExchanges from '../../data/useExchanges';

const ExchangeHistory = () => {
  const [page, setPage] = useState(1);
  const { data } = useExchanges(page, 10);

  return (
    <>
      <Table striped hover className="dark-color" responsive>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Description</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Fee</th>
            <th scope="col">You Get</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((history) => (
            <tr key={history?.id}>
              <td><span>{dayjs(history?.createdAt).format('DD/MM/YYYY')}</span></td>
              <td>
                <strong
                  style={{ textTransform: 'capitalize' }}
                  className={`status ${(history?.status === 'failed') ? 'danger' : 'success'}`}
                >
                  {history?.status}
                </strong>
              </td>
              <td>
                <strong>
                  Exchange #
                  {history?.id}
                </strong>
              </td>
              <td>
                <strong className="cl-red">
                  -
                  {history?.amountFrom.toFixed(4)}
                  {' '}
                  {history?.from}
                </strong>
              </td>
              <td>
                <strong>
                  {history?.amountTo.toFixed(4)}
                  {' '}
                  {history?.to}
                </strong>
              </td>
              <td>
                {history?.fee.toFixed(4)}
                {' '}
                {history?.to}
              </td>
              <td>
                <strong className="cl-green">
                  +
                  {history?.total.toFixed(4)}
                  {' '}
                  {history?.to}
                </strong>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Pagination
        activePage={page}
        itemsCountPerPage={10}
        totalItemsCount={data?.count || 10}
        pageRangeDisplayed={10}
        onChange={(pageNumber) => setPage(pageNumber)}
        itemClass="page-item"
        linkClass="page-link"
      />
    </>
  );
};

export default ExchangeHistory;
