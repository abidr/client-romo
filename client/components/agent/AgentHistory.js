import dayjs from 'dayjs';
import React, { useState } from 'react';
import { Table } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Pagination from 'react-js-pagination';
import useAgentLogs from '../../data/useAgents';
import statusColor from '../../utils/statusColor';

const AgentHistory = () => {
  const [page, setPage] = useState(1);
  const { data } = useAgentLogs(page, 10);
  const { t } = useTranslation();

  return (
    <>
      <Table striped hover className="dark-color" responsive>
        <thead>
          <tr>
            <th scope="col">{t('Date')}</th>
            <th scope="col">{t('Status')}</th>
            <th scope="col">{t('User Email')}</th>
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
                {history?.userEmail}
              </td>
              <td>
                <strong className="cl-green">
                  +
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

export default AgentHistory;
