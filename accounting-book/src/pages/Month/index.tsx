import { useState, useMemo, useEffect } from 'react'
import classnames from 'classnames'
import { NavBar, DatePicker } from 'antd-mobile'
import moment from 'moment'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import './index.scss'

import DailyBill from './components/DayBill'

export default function Month() {
    const [dateVisible, setDateVisible] = useState(false)
    const [currentDate, setCurrentDate] = useState(moment().format('YYYY | MM'))
    const [currentMonthList, setCurrentMonthList] = useState([])

    const { billList } = useSelector((state: any) => state.bill)
    const monthGroup = useMemo(() => {
        return _.groupBy(billList, (item: any) => moment(item.date).format('YYYY | MM'))
    }, [billList])
    // console.log(monthGroup)

    const onConfirm = (date: Date) => {
        const currentDate = moment(date).format('YYYY | MM')
        setCurrentDate(currentDate)
        setDateVisible(false)
        // console.log(monthGroup[currentDate])
        setCurrentMonthList(monthGroup[currentDate] || [])
    }

    const monthResult = useMemo(() => {
        const pay = currentMonthList.filter((item: any) => item.type === "pay").reduce((a: number, c: any) => a + c.money, 0)
        const income = currentMonthList.filter((item: any) => item.type === "income").reduce((a: number, c: any) => a + c.money, 0)
        return {
            pay,
            income,
            total: pay + income
        }
    }, [currentMonthList])
    // console.log(monthResult)

    useEffect(() => {
        setCurrentMonthList(monthGroup[currentDate] || [])
    }, [monthGroup])

    const dayGroup = useMemo(() => {
        const groupDate = _.groupBy(currentMonthList, (item: any) => moment(item.date).format('YYYY-MM-DD'))
        const keys = Object.keys(groupDate)
        keys.sort((day1: any, day2: any) => day1.date < day2.date ? -1 : 1)
        return {
            keys,
            groupDate
        }
    }, [currentMonthList])
    // console.log(dayGroup)

    return (
        <div className="monthlyBill">
            <NavBar className="nav" backArrow={false}>
                月度收支
            </NavBar>
            <div className="content">
                <div className="header">
                    {/* 时间切换区域 */}
                    <div className="date" onClick={() => setDateVisible(true)}>
                        <span className="text">
                        {currentDate}月账单
                        </span>
                        <span className={classnames('arrow', {'expand': dateVisible})}></span>
                    </div>
                    {/* 统计区域 */}
                    <div className='twoLineOverview'>
                        <div className="item">
                            <span className="money">{monthResult.pay.toFixed(2)}</span>
                            <span className="type">支出</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.income.toFixed(2)}</span>
                            <span className="type">收入</span>
                        </div>
                        <div className="item">
                            <span className="money">{monthResult.total.toFixed(2)}</span>
                            <span className="type">结余</span>
                        </div>
                    </div>
                    {/* 时间选择器 */}
                    <DatePicker
                        className="kaDate"
                        title="记账日期"
                        precision="month"
                        visible={dateVisible}
                        max={new Date()}
                        onCancel={() => setDateVisible(false)}
                        onConfirm={onConfirm}
                        onClose={() => setDateVisible(false)}
                    />
                </div>
                {
                    dayGroup.keys.map((key: string) => {
                        return <DailyBill key={key} date={key} billList={dayGroup.groupDate[key]}/>
                    })
                }
            </div>
        </div>
    )
}