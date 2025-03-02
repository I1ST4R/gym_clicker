const TrainerLevels = [
  "Trainer/img1.png", 
  "Trainer/img2.png", 
  "Trainer/img3.png", 
  "Trainer/img4.png", 
  "Trainer/img5.png", 
]

function getTrainerImage(level) {
  if(level === 0) return TrainerLevels[1]
  return TrainerLevels[Math.ceil(level / 8)]
}

export default getTrainerImage