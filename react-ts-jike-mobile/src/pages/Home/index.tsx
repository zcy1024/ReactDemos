import { Tabs } from "antd-mobile"
import { useTabs } from "./useTabs"
import "./style.css"
import HomeList from "./HomeList"

export default function Home() {
    const { channels } = useTabs()

    return (
        <div>
            <div className="tabContainer">
                <Tabs defaultActiveKey="0">
                    {
                        channels.map((item) => (
                            <Tabs.Tab title={item.name} key={item.id}>
                                <div className="listContainer">
                                    <HomeList channel_id={'' + item.id} />
                                </div>
                            </Tabs.Tab>
                        ))
                    }
                </Tabs>
            </div>
        </div>
    )
}