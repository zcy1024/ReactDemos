import {
    Card,
    Breadcrumb,
    Form,
    Button,
    Radio,
    Input,
    Upload,
    Space,
    Select,
    message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import './index.scss'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

import { useState, useRef, useEffect } from 'react'
import { createArticleAPI, getArticleByIdAPI, updateArticleAPI } from '../../apis/article'
import { useChannel } from '../../hooks/useChannel'

const { Option } = Select

const Publish = () => {
    const navigate = useNavigate()

    const { channelList } = useChannel()

    const onFinish = async (formValue: any) => {
        if (imageList.length !== imageType)
            return message.warning("封面类型和图片数量不匹配！！！")

        // console.log(formValue)
        const { title, content, channel_id } = formValue
        const reqData = {
            title,
            content,
            cover: {
                type: imageType,
                images: imageList.map((item: any) => item.url ? item.url : item.response.data.url)
            },
            channel_id
        }
        !articleID ? await createArticleAPI(reqData) : await updateArticleAPI(articleID, reqData)
        navigate("/article")
    }

    const [imageList, setImageList] = useState([])
    const imageRef = useRef()
    const onUploadChange = (value: any) => {
        // console.log("uploading...", value)
        setImageList(value.fileList)

        const length = value.fileList.length
        // const parent = imageRef.current.nativeElement.children[0]
        // const child = parent.children[length - 1]
        // console.log(value.fileList.splice(0, length - 1))
        if (value.fileList[length - 1].status === "error") {
            // console.log(child)
            // parent.removeChild(child)
            setImageList(imageList.splice(0, length - 1))
            message.warning("图片太大了！！！")
        }
    }

    const [imageType, setImageType] = useState(0)
    const onTypeChange = (e: any) => {
        setImageType(e.target.value)
    }

    const [searchParams] = useSearchParams()
    const articleID = searchParams.get("id")
    const [form] = Form.useForm()
    useEffect(() => {
        async function getArticleById(articleID: string) {
            const res = await getArticleByIdAPI(articleID)
            // console.log(res)
            form.setFieldsValue({
                ...res.data,
                type: res.data.cover.type
            })
            setImageType(res.data.cover.type)
            setImageList(res.data.cover.images.map((url: string) => {
                return { url }
            }))
        }
        articleID && getArticleById(articleID)
    }, [articleID, form])

    return (
        <div className="publish">
            <Card
                title={
                    <Breadcrumb items={[
                        { title: <Link to={'/'}>首页</Link> },
                        { title: `${articleID ? "编辑" : "发布"}文章` },
                    ]}
                    />
                }
            >
                <Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 16 }}
                    initialValues={{ type: imageType }}
                    onFinish={onFinish}
                    form={form}
                >
                    <Form.Item
                        label="标题"
                        name="title"
                        rules={[{ required: true, message: '请输入文章标题' }]}
                    >
                        <Input placeholder="请输入文章标题" style={{ width: 400 }} />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name="channel_id"
                        rules={[{ required: true, message: '请选择文章频道' }]}
                    >
                        <Select placeholder="请选择文章频道" style={{ width: 400 }}>
                            {channelList.map((item: any) => <Option key={item.id} value={item.id}>{item.name}</Option>)}
                        </Select>
                    </Form.Item>
                    <Form.Item label="封面">
                        <Form.Item name="type">
                            <Radio.Group onChange={onTypeChange}>
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {
                            imageType > 0 &&
                            <Upload
                                name="image"
                                listType="picture-card"
                                showUploadList
                                action={'http://geek.itheima.net/v1_0/upload'}
                                onChange={onUploadChange}
                                maxCount={imageType}
                                ref={imageRef}
                                fileList={imageList}
                            >
                                <div style={{ marginTop: 8 }}>
                                    <PlusOutlined />
                                </div>
                            </Upload>
                        }
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name="content"
                        rules={[{ required: true, message: '请输入文章内容' }]}
                    >
                        <ReactQuill
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Space>
                            <Button size="large" type="primary" htmlType="submit">
                                {`${articleID ? "更新" : "发布"}文章`}
                            </Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

export default Publish