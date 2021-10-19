import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import Pagination from 'react-js-pagination';
import usePayments from '../../data/usePayments';

const PaymentHistory = () => {
  const [page, setPage] = useState(1);
  const { data } = usePayments(page, 10);

  return (
    <>
      <Table striped hover className="dark-color" responsive>
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Status</th>
            <th scope="col">Merchant</th>
            <th scope="col">Trx ID</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((history) => (
            <tr key={history?.id}>
              <td><span>{dayjs(history?.createdAt).format('DD/MM/YYYY')}</span></td>
              <td><strong className="status success">{history?.status}</strong></td>
              <td>
                <strong>
                  {history?.merchant}
                </strong>
              </td>
              <td>
                <strong>
                  {history?.trxId}
                </strong>
              </td>
              <td>
                <strong className="cl-red">
                  -
                  {history?.amount}
                  {' '}
                  {history?.currency}
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

export default PaymentHistory;
