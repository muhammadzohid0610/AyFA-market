import React from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
// Footer style

const Footer = () => {
  return (
    <footer className='bg-[#1DBE60] w-[100%] height-[100%] mt-10 '>
      <div className="max-w-[1200px] px-[10px] mx-auto ">
        <div className=" flex justify-between gap-3 flex-wrap p-[25px] ">
          <div className="footer__left">
            <h3 className="text-5xl	 cursor-pointer font-medium	text-[#FDFDFD] pb-[20px]">
              <Link to="/"> AYFA</Link>
            </h3>
            <div className="footer__left_text mt-[20px] max-w-[300px] text-[#fff] opacity-70	">
            Не упустите возможность купить изделия ручной работы. Мы уже собрали более 200 компаний-партнеров.
            </div>
          </div>
          <div className="footer__content">
            <div className='text-[#FDFDFD]'>
            Время работы 8:30-22:00
            </div>
            <div className="flex flex-col	gap-3 mt-5">
              
              <div className='opacity-70 text-[#FDFDFD]'>
                +996 999 000 450
              </div>
              <div className='opacity-70 text-[#FDFDFD]'>
                +996 553 444 436
              </div>
              <div className='opacity-70 text-[#FDFDFD]'>
               +996 558 000 005
              </div>
            

            </div>
          </div>
          <div className="footer__content">
            <div className='text-[#FDFDFD]'>
            Д.Курманжан 515
            </div>
            <div className="flex flex-col	gap-3 mt-5">
             
              <div className='opacity-70 text-[#FDFDFD]'>
               <a href="https://wa.me/+996999000450">wa.me/+996999000450</a>
              </div>
              <div className='opacity-70 text-[#FDFDFD]'>
              <a href="https://t.me/+996999000450">t.me/+996999000450</a>

              </div>
            
            

            </div>
          </div>
          <div className="footer__content">
            <div className='text-[#FDFDFD]'>
              Category 3
            </div>
            <div className="flex flex-col	gap-3 mt-5">
           
              <div className='flex gap-[10px] items-center mt-[20px]'>
                <div>
                  <a href="https://www.instagram.com/_ayfa_osh__/">
                  <img src="/svg/insta.svg" alt="" /></a>
                </div> <div>
                  <img src="/svg/face.svg" alt="" />
                </div> <div>
                  <img src="/svg/twitter.svg" alt="" />
                </div> <div>
                  <img src="/svg/youtube.svg" alt="" />
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className='flex justify-center  text-[#fff] opacity-70  mt-[100px] mb-3'>
          <p>© 2024 Все права защищены. Компания 'PROlab Agency'</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer