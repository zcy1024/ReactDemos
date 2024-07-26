import { Image, InfiniteScroll, List } from 'antd-mobile'
// mock数据
// import { users } from './users'
import { useList } from './useList'
import { Props } from './useList'
import { useNavigate } from 'react-router-dom'

const HomeList = (props: Props) => {
    const { listRes, hasMore, loadMore } = useList(props)
    // console.log(listRes)

    const navigate = useNavigate()
    const goToDetail = (id: string) => {
        navigate(`/detail?id=${id}`)
    }

    return (
        <>
            <List>
                {listRes.results.map((item) => (
                    <List.Item
                        key={item.art_id}
                        prefix={
                            <Image
                                src={item.cover.images?.[0]}
                                style={{ borderRadius: 20 }}
                                fit="cover"
                                width={40}
                                height={40}
                            />
                        }
                        description={item.pubdate}
                        onClick={() => goToDetail(item.art_id)}
                    >
                        {item.title}
                    </List.Item>
                ))}
                <InfiniteScroll hasMore={hasMore} loadMore={loadMore} threshold={10} />
            </List>
        </>
    )
}

export default HomeList