import { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { getBillList } from "../../store/modules/billStore"
import { TabBar } from "antd-mobile"
import {
  BillOutline,
  CalculatorOutline,
  AddCircleOutline
} from "antd-mobile-icons/es"

import "./index.scss"

const tabs = [
    {
      key: '/',
      title: '月度账单',
      icon: <BillOutline />,
    },
    {
      key: '/new',
      title: '记账',
      icon: <AddCircleOutline />,
    },
    {
      key: '/year',
      title: '年度账单',
      icon: <CalculatorOutline />,
    },
  ]

export default function Layout() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBillList())
    }, [dispatch])

    const navigate = useNavigate()
    const switchRoute = (path: string) => {
        navigate(path)
    }

    return (
        <div className="layout">
            <div className="container">
                <Outlet />
            </div>
            <div className="footer">
                <TabBar onChange={switchRoute}>
                    {tabs.map(item => (<TabBar.Item key={item.key} icon={item.icon} title={item.title} />))}
                </TabBar>
            </div>
        </div>
    )
}