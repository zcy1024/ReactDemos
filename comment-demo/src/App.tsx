import { useEffect, useRef, useState } from 'react'

import classnames from 'classnames'
import { nanoid } from 'nanoid'
import moment from 'moment'
import axios from 'axios'

import './App.scss'
import avatar from './images/bozai.png'

/**
 * 评论列表的渲染和操作
 *
 * 1. 根据状态渲染评论列表
 * 2. 删除评论
 */

// 评论列表数据
// const defaultList = [
//   {
//     // 评论id
//     rpid: '3',
//     // 用户信息
//     user: {
//       uid: '13258165',
//       avatar: 'https://github.com/zcy1024/SuiStudy/blob/main/coin_study/imgs/WUKONG.png?raw=true',
//       uname: 'Black Myth: WuKong',
//     },
//     // 评论内容
//     content: '你们一定都听过，他的故事！',
//     // 评论时间
//     ctime: '08-20 10:00',
//     like: 820,
//   },
//   {
//     rpid: '2',
//     user: {
//       uid: '36080105',
//       avatar: 'https://github.com/zcy1024/SuiStudy/blob/main/coin_study/imgs/WUKONG.png?raw=true',
//       uname: '天命人',
//     },
//     content: '以霹雳手段，行菩萨心肠，这才是你的，天命！',
//     ctime: '08-20 00:00',
//     like: 1024,
//   },
//   {
//     rpid: '1',
//     user: {
//       uid: '30009257',
//       avatar,
//       uname: '黑马前端',
//     },
//     content: '学前端就来黑马',
//     ctime: '06-21 00:00',
//     like: 666,
//   },
// ]
// 当前登录用户信息
const user = {
  // 用户id
  uid: '30009257',
  // 用户头像
  avatar,
  // 用户昵称
  uname: '黑马前端',
}

/**
 * 导航 Tab 的渲染和操作
 *
 * 1. 渲染导航 Tab 和高亮
 * 2. 评论列表排序
 *  最热 => 喜欢数量降序
 *  最新 => 创建时间降序
 */

// 导航 Tab 数组
const tabs = [
  { type: 'time', text: '最新' },
  { type: 'hot', text: '最热' },
]

function useGetList(URL: string) {
  const [commentList, setCommentList] = useState([])
  useEffect(() => {
    async function getCommentList() {
      const res = await axios.get(URL)
      setCommentList(res.data)
    }
    getCommentList()
  }, [])
  return {
    commentList,
    setCommentList
  }
}

function Item({ item, onDel }) {
  return (
    <div className="reply-item">
      {/* 头像 */}
      <div className="root-reply-avatar">
        <div className="bili-avatar">
          <img
            className="bili-avatar-img"
            alt=""
            src={item.user.avatar}
          />
        </div>
      </div>

      <div className="content-wrap">
        {/* 用户名 */}
        <div className="user-info">
          <div className="user-name">{item.user.uname}</div>
        </div>
        {/* 评论内容 */}
        <div className="root-reply">
          <span className="reply-content">{item.content}</span>
          <div className="reply-info">
            {/* 评论时间 */}
            <span className="reply-time">{item.ctime}</span>
            {/* 评论数量 */}
            <span className="reply-time">点赞数:{item.like}</span>
            {
              user.uid === item.user.uid
              && 
              <span className="delete-btn" onClick={() => onDel(item.rpid)}>
                删除
              </span>
            }

          </div>
        </div>
      </div>
    </div>
  )
}

const App = () => {
  // const [commentList, setCommentList] = useState(defaultList)

  const {commentList, setCommentList} = useGetList("http://localhost:3004/list")

  const clickDelete = (rpid: string) => {
    setCommentList(commentList.filter((item: any) => item.rpid !== rpid))
  }

  const [type, setType] = useState("time")

  const clickTab = (curType: string) => {
    setType(curType)
    if (curType === "hot")
      setCommentList(commentList.sort((itema: any, itemb: any) => itema.like > itemb.like ? -1 : 1))
    else
      setCommentList(commentList.sort((itema: any, itemb: any) => itema.ctime > itemb.ctime ? -1 : 1))
  }

  const [content, setContent] = useState('')
  const commentRef = useRef(null)

  const handlePublish = () => {
    setCommentList([
      ...commentList,
      {
        // 评论id
        rpid: nanoid(),
        // 用户信息
        user: {
          uid: '369963999',
          avatar: 'https://github.com/zcy1024/SuiStudy/blob/main/coin_study/imgs/WUKONG.png?raw=true',
          uname: 'StarrySky',
        },
        // 评论内容
        content,
        // 评论时间
        ctime: moment().format("MM-DD HH:mm"),
        like: 0,
      }
    ])
    setContent('')
    let dom: any = commentRef.current!
    dom.focus();
  }

  return (
    <div className="app">
      {/* 导航 Tab */}
      <div className="reply-navigation">
        <ul className="nav-bar">
          <li className="nav-title">
            <span className="nav-title-text">评论</span>
            {/* 评论数量 */}
            <span className="total-reply">{10}</span>
          </li>
          <li className="nav-sort">
            {/* 高亮类名： active */}
            {/* {tabs.map(item => <span className={'nav-item' + (item.type === type ? " active" : "")} key={item.type} onClick={() => clickTab(item.type)}>{item.text}</span>)} */}
            {/* {tabs.map(item => <span className={`nav-item ${item.type === type && "active"}`} key={item.type} onClick={() => clickTab(item.type)}>{item.text}</span>)} */}
            {tabs.map(item => <span className={classnames("nav-item", {"active": item.type === type})} key={item.type} onClick={() => clickTab(item.type)}>{item.text}</span>)}
          </li>
        </ul>
      </div>

      <div className="reply-wrap">
        {/* 发表评论 */}
        <div className="box-normal">
          {/* 当前用户头像 */}
          <div className="reply-box-avatar">
            <div className="bili-avatar">
              <img className="bili-avatar-img" src={avatar} alt="用户头像" />
            </div>
          </div>
          <div className="reply-box-wrap">
            {/* 评论框 */}
            <textarea
              className="reply-box-textarea"
              placeholder="发一条友善的评论"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              ref={commentRef}
            />
            {/* 发布按钮 */}
            <div className="reply-box-send">
              <div className="send-text" onClick={handlePublish}>发布</div>
            </div>
          </div>
        </div>
        {/* 评论列表 */}
        <div className="reply-list">
          {/* 评论项 */}
          {commentList.map((item: any) => <Item item={item} onDel={clickDelete} key={item.rpid}/>)}
        </div>
      </div>
    </div>
  )
}

export default App