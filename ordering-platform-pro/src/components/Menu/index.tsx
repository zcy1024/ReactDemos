import classNames from 'classnames'

import { useDispatch, useSelector } from 'react-redux'
import { setActiveIndex } from '../../store/modules/takeaway'

import './index.scss'

const Menu = () => {
  const dispatch = useDispatch()
  const { foodsList, activeIndex } = useSelector((state: any) => state.foods)
  const menus = foodsList.map((item: any) => ({ tag: item.tag, name: item.name }))
  return (
    <nav className="list-menu">
      {/* 添加active类名会变成激活状态 */}
      {menus.map((item: any, index: number) => {
        return (
          <div
            key={item.tag}
            className={classNames(
              'list-menu-item',
              {
                'active': index === activeIndex
              }
            )}
            onClick={() => dispatch(setActiveIndex(index))}
          >
            {item.name}
          </div>
        )
      })}
    </nav>
  )
}

export default Menu
