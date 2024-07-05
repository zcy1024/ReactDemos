import { useSearchParams, useParams } from "react-router-dom"

export default function Article() {
    // const [params] = useSearchParams()
    // const id = params.get('id')
    // const name = params.get('name')

    const params = useParams()
    const id = params.id
    const name = params.name

    return (
        <div>
            article-{id}-{name}
        </div>
    )
}