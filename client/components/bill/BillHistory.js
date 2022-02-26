import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Pagination from 'react-js-pagination';
import { useBillAll } from '../../data/useBills';
import statusColor from '../../utils/statusColor';

const BillHistory = () => {
  const [page, setPage] = useState(1);
  const { data } = useBillAll(page, 10);
  const { t } = useTranslation();

  return (
    <>
      <Table striped hover className="dark-color" responsive>
        <thead>
          <tr>
            <th scope="col">{t('Date')}</th>
            <th scope="col">{t('Status')}</th>
            <th scope="col">{t('Service')}</th>
            <th scope="col">{t('Narration')}</th>
            <th scope="col">{t('Trx ID')}</th>
            <th scope="col">{t('Amount')}</th>
          </tr>
        </thead>
        <tbody>
          {data?.data?.map((history) => (
            <tr key={history?.id}>
              <td><span>{dayjs(history?.createdAt).format('DD/MM/YYYY')}</span></td>
              <td>
                <strong
                  style={{ textTransform: 'capitalize' }}
                  className={`status ${statusColor(history?.status)}`}
                >
                  {t(history?.status)}
                </strong>
              </td>
              <td>
                <strong>
                  {t(history?.service)}
                </strong>
              </td>
              <td>
                <strong>
                  {t(history?.narration)}
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

export default BillHistory;
