import FoodItem from './FoodItem'
import './index.scss'

const FoodsCategory = (props: any) => {
  const { name, foods } = props

  return (
    <div className="category">
      <dl className="cate-list">
        <dt className="cate-title">{name}</dt>

        {foods.map((item: any) => {
          return <FoodItem key={item.id} {...item} />
        })}
      </dl>
    </div>
  )
}

export default FoodsCategory
