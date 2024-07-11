import { Button, DatePicker, Input, NavBar } from 'antd-mobile'
import Icon from '../../components/Icon'
import './index.scss'
import classNames from 'classnames'
import { billListData } from '../../contants'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { addBillList } from '../../store/modules/billStore'
import { useDispatch } from 'react-redux'
import moment from 'moment'

export default function New() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [billType, setBillType] = useState('pay')
    const [money, setMoney] = useState('')
    const [useFor, setUseFor] = useState('')
    const [date, setDate] = useState(new Date())

    const moneyChange = (value: string) => {
        setMoney(value)
    }

    const saveBill = () => {
        const data = {
            type: billType,
            money: billType === 'pay' ? -money : Number(money),
            date: date,
            useFor: useFor
        }
        // console.log(data)
        dispatch(addBillList(data))
    }

    const [dateVisible, setDateVisible] = useState(false)

    const dateConfirm = (value: Date) => {
        setDate(value)
        setDateVisible(false)
    }

    return (
        <div className="keepAccounts">
            <NavBar className="nav" onBack={() => navigate(-1)}>
                记一笔
            </NavBar>

            <div className="header">
                <div className="kaType">
                    <Button
                        shape="rounded"
                        className={classNames(billType === 'pay' && 'selected')}
                        onClick={() => setBillType('pay')}
                    >
                        支出
                    </Button>
                    <Button
                        className={classNames(billType === 'income' && 'selected')}
                        shape="rounded"
                        onClick={() => setBillType('income')}
                    >
                        收入
                    </Button>
                </div>

                <div className="kaFormWrapper">
                    <div className="kaForm">
                        <div className="date">
                            <Icon type="calendar" className="icon" />
                            <span className="text" onClick={() => setDateVisible(true)}>{moment(date).format('YYYY-MM-DD')}</span>
                            <DatePicker
                                className="kaDate"
                                title="记账日期"
                                max={new Date()}
                                visible={dateVisible}
                                onCancel={() => setDateVisible(false)}
                                onClose={() => setDateVisible(false)}
                                onConfirm={dateConfirm}
                            />
                        </div>
                        <div className="kaInput">
                            <Input
                                className="input"
                                placeholder="0.00"
                                type="number"
                                value={money}
                                onChange={moneyChange}
                            />
                            <span className="iconYuan">¥</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="kaTypeList">
                {billListData[billType].map((item: any) => {
                    return (
                        <div className="kaType" key={item.type}>
                            <div className="title">{item.name}</div>
                            <div className="list">
                                {item.list.map((item: any) => {
                                    return (
                                        <div
                                            className={classNames(
                                                'item',
                                                item.type === useFor && 'selected'
                                            )}
                                            key={item.type}
                                            onClick={() => setUseFor(item.type)}
                                        >
                                            <div className="icon">
                                                <Icon type={item.type} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <div className="btns">
                <Button className="btn save" onClick={saveBill}>
                    保 存
                </Button>
            </div>
        </div>
    )
}