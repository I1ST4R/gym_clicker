const TrainerLevels = [
  "src/assets/Trainer/img1.png", 
  "src/assets/Trainer/img2.png", 
  "src/assets/Trainer/img3.png", 
  "src/assets/Trainer/img4.png", 
  "src/assets/Trainer/img5.png", 
]

function getTrainerImage(level) {
  if(level === 0) return TrainerLevels[1]
  return TrainerLevels[Math.ceil(level / 6)]
}

export default getTrainerImage