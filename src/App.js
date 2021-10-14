// import logo from './logo.svg';
import './App.css'
import { useState, useEffect } from 'react'
import conf, { IMG_PATH, UPLOAD_AVATAR, TEST_AVATAR } from './config'
import axios from 'axios'

function App() {
  let [imgSrc, setImgSrc] = useState('')
  let [myName, setMyName] = useState('')
  console.log({ conf })

  useEffect(() => {
    ;(async () => {
      const r = await fetch(TEST_AVATAR + '/2')
      const obj = await r.json()
      setMyName(obj.name)
      setImgSrc(obj.avatar)
    })()
  }, [])
  const doUpload = async () => {
    const fd = new FormData(document.form1)
    const r = await axios.post(UPLOAD_AVATAR, fd)

    console.log(r.data)
    setImgSrc(r.data.filename)
  }

  const mySubmit = async (e) => {
    e.preventDefault()

    // urlencoded, json, formData

    // 1. json react 資料進出勁量使用
    /*
    const dataObj = {
      //input 的avatar / name 值
      avatar: document.fake_form.avatar.value,
      name: document.fake_form.name.value,
    };
    const r = await fetch(TEST_AVATAR, {
      method: 'POST',
      body: JSON.stringify(dataObj),
      headers: {
        'Content-Type': 'application/json'
      }
      //headers的規格建立 區別於json urlencoded / formData
    });
    const data = await r.json();
    console.log(data)
*/

    // 2. urlencoded
    /*
    //document.fake_form 得到input的資料
    const usp = new URLSearchParams(new FormData(document.fake_form));
    // console.log(usp.toString());
    const r = await fetch(TEST_AVATAR, {
      method: 'POST',
      body: usp.toString(),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const data = await r.json();
    console.log(data);
    */

    // 3. FormData # 記後端index.js要使用 uploadImg.none()如果沒有要上傳圖片 , # multer 的功能

    // const r = await fetch(TEST_AVATAR, {
    //   method: 'POST',
    //   body: new FormData(document.fake_form),
    //   //不用設定headers Content-type 因為forData 會自動去使用
    //   //network 的Headers 最下面有 ------wiki  這些開頭代表有送出
    // })
    // const data = await r.json()
    // console.log(data);

    // ****** 修改 ******
    const r = await fetch(TEST_AVATAR + '/2', {
      method: 'PUT',
      body: new FormData(document.fake_form),
    })
    const data = await r.json()
    console.log(data)
  }

  const loading = (
    <>
      <p>loading</p>
    </>
  )

  const mainView = (
    <>
      <form name="fake_form" onSubmit={mySubmit}>
        <img
          src={
            imgSrc ? IMG_PATH + '/' + imgSrc : IMG_PATH + '/default-avatar.png'
          }
          alt=""
          width="300px"
          id="img01"
        />
        <button
          type="button"
          className="btn btn-success"
          onClick={(e) => document.querySelector('#avatar').click()}
        >
          上傳大頭貼
        </button>

        <input
          type="hidden"
          className="form-control"
          name="avatar"
          value={imgSrc}
        />

        <div className="mb-3">
          <label htmlFor="my_name" className="form-label">
            name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={myName}
            onChange={(e) => {
              setMyName(e.target.value)
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <form name="form1" style={{ display: 'none' }}>
        <input
          type="file"
          id="avatar"
          name="avatar"
          accept="image/*"
          onChange={doUpload}
        />
      </form>
    </>
  )
  //imgSrc ? IMG_PATH + '/' + imgSrc : IMG_PATH + '/default-avatar.png'
  
  return <>{imgSrc ? mainView : loading}</>
}

export default App

// 1014 pm02  avatar 上傳
