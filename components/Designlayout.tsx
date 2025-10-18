"use client"
import React from 'react'
import { gsap } from "gsap";
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/all';
gsap.registerPlugin(useGSAP,SplitText);

const Designlayout = () =>
{
    useGSAP(() =>
    {
        const t1 = gsap.timeline({ repeat: -1 })
        t1.to(".star2", {
            rotation: 360,
            duration: 1.3,
            ease:"power1.inOut"
        }).to("star2", {
            rotation: 360,
            duration: 0.2,
        })

        const t2 = gsap.timeline();
        t2.fromTo(".star1",
            { x: 100, y: 100, opacity: 0 }, // initial position
            { x: 0, y: 0, opacity: 1, duration: 1, ease: "power2.out", }
        )
        const t3 = gsap.timeline({ repeat: -1 });
        t3.to(".star3", {
            scale: 1.4,
            duration: 0.4,
            repeat: -1,
            yoyo: true,
            ease: "power1.inOut",
            transformOrigin:"center center"
        })

        document.fonts.ready.then(() =>
        {
            const heroSplit = new SplitText(".subtitle", { type: 'chars,lines' });
            gsap.from(heroSplit.chars, {
                opacity:0,
                 yPercent: 100,
                duration: 1,
                ease: 'expo.out',
                stagger: 0.05,
            })
        })
    })
    

  return (
      <>
          <div >
              <h1
                className="subtitle  relative mt-20 uppercase text-2xl md:text-4xl leading-10 md:leading-12 bold 
                text-center text-white bg-[#3F3F46] max-w-3xl mx-auto h-fit px-2 md:px-4 max-sm:mx-2
                py-2 md:py-4 rounded-tl-4xl rounded-br-4xl  shadow-xl outline-2 outline-outlinecolor"
          >
            Show your vesion,<br/> meet the innovators.
          </h1>
          <p
          className="text-white my-4 text-center"
          >
            Submit ideas vote on Pitches and Get Noticed in Virtual competitiond
          </p>
              <img
                src="/assets/star2-removebg-preview.png"
                alt=""
                  className="star2 md:w-20 md:h-20 w-10 h-10 left- bottom-0"
              />
              <img
                src="assets/bg-img.png"
                alt=""
                className="star1 absolute md:w-20 md:h-20 w-10 h-10 right-0 top-0"
              />
              <img src="assets/star1.png"
                  alt=""
                  className='star3 absolute h-10 w-10 top-7 left-50'
              />
              <img src="assets/star1.png"
                  alt=""
                  className='star3 absolute h-7 w-7 bottom-10 left-20'
        />
        <img src="assets/star1.png"
                  alt=""
                  className='star3 absolute h-7 w-7 top-50 right-50'
        />
        <img src="assets/star1.png"
                  alt=""
                  className='star3 absolute h-7 w-7 bottom-5 right-0'
        />
        
              
        </div>
      </>
  )
}

export default Designlayout