import React, { useEffect, useState, useContext } from 'react'
import './css/Client.css'
import ClientsAfter from './js/ClientsAfter.js'
import ClientsBefore from './js/ClientsBefore.js'
import clientClick from '../public/sounds/clientClick.mp3'
import clientUpgrade from '../public/sounds/clientUpgrade.mp3'
import clientThanksgiving from '../public/sounds/clientThanksgiving.mp3'
import abbreviateNum from './js/numberAbbreviator.js'
import { AppContext } from './main/AppContext.jsx'

function Client() {
  const {
    minDelay,
    maxDelay,
    setCountMoney,
    countMoney,
    pasIncreaseMoney,
    actIncreaseMoney,
    multiplier,
  } = useContext(AppContext)

  const numOfClicks = 10
  const [image, setImage] = useState('')
  const [progress, setProgress] = useState(0)
  const [isClientUpgraded, setIsClientUpgraded] = useState(
    localStorage.getItem('isClientUpgraded') === 'true'
  )
  const [bonus, setBonus] = useState(0)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    localStorage.setItem('isClientUpgraded', isClientUpgraded.toString())
  }, [isClientUpgraded])

  const step = Math.floor(100 / numOfClicks)

  const getRandomRange = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = src
      img.onload = () => resolve(img)
      img.onerror = (err) => reject(err)
    })
  }

  useEffect(() => {
    const randomDelay = getRandomRange(minDelay, maxDelay)
    const timer = setTimeout(async () => {
      const randomIndex = Math.floor(Math.random() * ClientsBefore.length)
      try {
        const loadedImage = await loadImage(ClientsBefore[randomIndex])
        setImage(loadedImage.src)
      } catch (error) {
        console.error("Error loading image:", error)
      }

      const clientRect = document.querySelector(".Client").getBoundingClientRect()
      const menuRect = document.querySelector(".slider-container").getBoundingClientRect()
      setPosition({
        x: getRandomRange(50, window.innerWidth - clientRect.width - menuRect.width - 50),
        y: getRandomRange(50, window.innerHeight - clientRect.height - 50),
      })

      setIsVisible(true)
      setIsClientUpgraded(false)
      setProgress(0)

      setTimeout(() => {
        setIsVisible(false)
      }, 10000)
    }, randomDelay)

    return () => clearTimeout(timer)
  }, [isVisible])

  const handleClick = () => {
    if (!isClientUpgraded) {
      if (100 - progress <= step) {
        new Audio(clientUpgrade).play()
        const randomIndex = Math.floor(Math.random() * ClientsAfter.length)
        setImage(ClientsAfter[randomIndex])
        setIsClientUpgraded(true)
        new Audio(clientThanksgiving).play()

        const calculatedBonus = pasIncreaseMoney < 1000000
          ? BigInt(Math.floor(Number(pasIncreaseMoney + actIncreaseMoney) * multiplier))
          : (pasIncreaseMoney + actIncreaseMoney) / 100n * BigInt(Math.floor(multiplier * 100))

        setBonus(calculatedBonus)
        setCountMoney(countMoney + calculatedBonus)

        setTimeout(() => setIsVisible(false), 2000)
      }
      new Audio(clientClick).play()
      setProgress((prevProgress) => prevProgress + step)
    }
  }

  return (
    <div
      className="Client"
      onClick={handleClick}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      {isClientUpgraded && (
        <div className="Client__bonus">
          <p>{`+${abbreviateNum(bonus)}`}</p>
          <img className="Client__money" src="money.png" alt="Money" />
        </div>
      )}
      <img className="Client__img" src={image} alt="Client" />
      {!isClientUpgraded && (
        <div className="Client__progressbar">
          <div className="Client__progress" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  )
}

export default Client