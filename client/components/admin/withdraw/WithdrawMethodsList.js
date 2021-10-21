import Link from 'next/link';
import React from 'react';
import { Table } from 'react-bootstrap';
import { FiEdit } from 'react-icons/fi';
import useMethods from '../../../data/useMethods';
import Loader from '../../Loader';

const WithdrawMethodsList = () => {
  const { data, loading } = useMethods();

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
                <th scope="col">Currency</th>
                <th scope="col">Limit</th>
                <th scope="col">Charge</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((gateway) => (
                <tr key={gateway?.id}>
                  <td>
                    <strong>
                      {gateway?.name}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      {gateway?.currency}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      {gateway?.minAmount}
                      {' '}
                      {gateway?.currency}
                      {' - '}
                      {gateway?.maxAmount}
                      {' '}
                      {gateway?.currency}
                    </strong>
                  </td>
                  <td>
                    <strong>
                      {gateway?.fixedCharge}
                      {' '}
                      {gateway?.currency}
                      {' + '}
                      {gateway?.percentageCharge}
                      %
                    </strong>
                  </td>
                  <td>
                    <strong>
                      {gateway?.active ? 'Active' : 'Inactive'}
                    </strong>
                  </td>
                  <td width="15%" align="center">
                    <Link href={`/admin/withdraws/method/${gateway?.id}`}>
                      <a className="action-btn">
                        <FiEdit />
                      </a>
                    </Link>
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

export default WithdrawMethodsList;
