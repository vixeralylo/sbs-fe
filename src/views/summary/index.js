import React, { useEffect } from 'react'
import useStore from '../../zustand/store'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const Summary = () => {
  const { fetchSummary, summaryList } = useStore((state) => state)

  useEffect(() => {
    fetchSummary()
  }, [fetchSummary])

  const formatNumber = (number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(number)
  }

  function isCurrentMonthYear(monthYear) {
    const currentMonthYear = new Date().toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric',
    })
    return monthYear === currentMonthYear
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Summary</strong>
          </CCardHeader>
          <CCardBody>
            <table className="table mtop30">
              <thead>
                <tr>
                  <th scope="col">MONTH / YEAR</th>
                  <th scope="col">MARGIN SO</th>
                  <th scope="col">GAJI KARYAWAN</th>
                  <th scope="col">PLN</th>
                  <th scope="col">COST</th>
                  <th scope="col">ADS</th>
                  <th scope="col">LOST</th>
                  <th scope="col">TAKE PROFIT</th>
                  <th scope="col">SUM</th>
                </tr>
              </thead>
              <tbody>
                {summaryList.map((items, i) => (
                  <tr key={i} className={isCurrentMonthYear(items.month_year) ? 'bold-row' : ''}>
                    <td>{items.month_year}</td>
                    <td>{formatNumber(items.SummaryDetail.total_margin_so)}</td>
                    <td>{formatNumber(items.SummaryDetail.gaji_karyawan)}</td>
                    <td>{formatNumber(items.SummaryDetail.pln)}</td>
                    <td>{formatNumber(items.SummaryDetail.total_cost)}</td>
                    <td>{formatNumber(items.SummaryDetail.total_ads)}</td>
                    <td>{formatNumber(items.SummaryDetail.total_loss)}</td>
                    <td>{formatNumber(items.SummaryDetail.total_take_profit)}</td>
                    <td>{formatNumber(items.SummaryDetail.sum_total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Summary
