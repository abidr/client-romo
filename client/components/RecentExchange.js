import React from 'react';
import { Pagination, Table } from 'react-bootstrap';
import statdown from '../images/stat-down.png';
import statup from '../images/stat-up.png';

const RecentExchange = () => (
  <>
    <Table striped hover className="dark-color">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Description</th>
          <th scope="col">Direction</th>
          <th scope="col">Status</th>
          <th scope="col">Amount</th>
          <th scope="col">Bank or Card</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span>15 March, 2021</span></td>
          <td>
            <strong>Padlock Holdings Bank Corp</strong>
            {' '}
            <span>- Widthdraw</span>
          </td>
          <td><img src={statup} alt="" /></td>
          <td><strong className="status success">+0.548</strong></td>
          <td><strong>- $589.20</strong></td>
          <td><strong className="cl-red">USD XXXX-2359</strong></td>
        </tr>
        <tr>
          <td><span>13 March, 2021</span></td>
          <td>
            <strong>Rahul payment</strong>
            {' '}
            <span>- Refund</span>
          </td>
          <td><img src={statdown} alt="" /></td>
          <td><strong className="status danger">-0.548</strong></td>
          <td><strong>- $589.9</strong></td>
          <td><strong className="cl-red">USD Bank of Rob</strong></td>
        </tr>
        <tr>
          <td><span>15 March, 2021</span></td>
          <td>
            <strong>Padlock Holdings Bank Corp</strong>
            {' '}
            <span>- Widthdraw</span>
          </td>
          <td><img src={statup} alt="" /></td>
          <td><strong className="status success">+0.548</strong></td>
          <td><strong>- $589.20</strong></td>
          <td><strong className="cl-red">USD XXXX-2359</strong></td>
        </tr>
        <tr>
          <td><span>13 March, 2021</span></td>
          <td>
            <strong>Rahul payment</strong>
            {' '}
            <span>- Refund</span>
          </td>
          <td><img src={statdown} alt="" /></td>
          <td><strong className="status danger">-0.548</strong></td>
          <td><strong>- $589.9</strong></td>
          <td><strong className="cl-red">USD Bank of Rob</strong></td>
        </tr>
        <tr>
          <td><span>15 March, 2021</span></td>
          <td>
            <strong>Padlock Holdings Bank Corp</strong>
            {' '}
            <span>- Widthdraw</span>
          </td>
          <td><img src={statup} alt="" /></td>
          <td><strong className="status success">+0.548</strong></td>
          <td><strong>- $589.20</strong></td>
          <td><strong className="cl-red">USD XXXX-2359</strong></td>
        </tr>
        <tr>
          <td><span>13 March, 2021</span></td>
          <td>
            <strong>Rahul payment</strong>
            {' '}
            <span>- Refund</span>
          </td>
          <td><img src={statdown} alt="" /></td>
          <td><strong className="status danger">-0.548</strong></td>
          <td><strong>- $589.9</strong></td>
          <td><strong className="cl-red">USD Bank of Rob</strong></td>
        </tr>

      </tbody>
    </Table>
    <Pagination className="mt-30">
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active activeLabel="">{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>
      <Pagination.Item disabled>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
    </Pagination>
  </>
);

export default RecentExchange;
